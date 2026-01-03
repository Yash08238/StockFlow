import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  BsPlus,
  BsTrash,
  BsCart3,
  BsPerson,
  BsEnvelope,
  BsReceipt,
  BsCheckCircle,
} from "react-icons/bs";
import Card from "../components/Card";
import Button from "../components/Button";
import Input from "../components/Input";
import Badge from "../components/Badge";
import EmptyState from "../components/EmptyState";

/**
 * Sales Page - Modern POS-style interface
 * All API logic preserved - UI only changes
 */
const Sales = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [customer, setCustomer] = useState({ name: "", email: "" });
  const [discount, setDiscount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch products - UNCHANGED
  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/products/getproducts`
      );
      setProducts(res.data.result || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products");
    }
  };

  // Filter products
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products;
    return products.filter((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);

  // Add to cart
  const addToCart = (product) => {
    const existing = cart.find((item) => item.productId === product._id);
    if (existing) {
      if (existing.quantity >= product.inventory) {
        toast.error("Cannot add more than available stock");
        return;
      }
      setCart(
        cart.map((item) =>
          item.productId === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          productId: product._id,
          productName: product.name,
          price: product.price,
          quantity: 1,
          maxStock: product.inventory,
        },
      ]);
    }
    toast.success(`${product.name} added`);
  };

  // Update quantity
  const updateQuantity = (productId, quantity) => {
    const item = cart.find((i) => i.productId === productId);
    if (quantity > item.maxStock) {
      toast.error("Exceeds available stock");
      return;
    }
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCart(
      cart.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  // Remove from cart
  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.productId !== productId));
  };

  // Calculate totals
  // Calculate totals
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal - discountAmount;

  // Process checkout - UNCHANGED
  const handleCheckout = async () => {
    if (!customer.name || !customer.email) {
      toast.error("Please enter customer details");
      return;
    }
    if (cart.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        customer: customer.name,
        customermail: customer.email,
        discount: Number(discount),
        products: cart.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
      };

      await axios.post(`${import.meta.env.VITE_API_URL}/sales/create`, payload);

      setShowSuccess(true);
      setCart([]);
      setCustomer({ name: "", email: "" });
      setDiscount(0);
      fetchProducts();

      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error(error.response?.data?.message || "Checkout failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success overlay
  if (showSuccess) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center animate-scale-in">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-100 flex items-center justify-center">
            <BsCheckCircle className="text-4xl text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Sale Complete!
          </h2>
          <p className="text-slate-600 mb-6">
            Invoice has been sent to the customer's email.
          </p>
          <Button onClick={() => setShowSuccess(false)}>New Sale</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="page-title">Sales Panel</h1>
        <p className="page-subtitle">Process sales and generate invoices</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Product Selection */}
        <div className="lg:col-span-2 space-y-4">
          {/* Search */}
          <Card>
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<BsCart3 />}
              className="!mb-0"
            />
          </Card>

          {/* Products Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {filteredProducts.length === 0 ? (
              <div className="col-span-full">
                <Card>
                  <EmptyState
                    title="No products found"
                    description="Add products to your inventory first."
                  />
                </Card>
              </div>
            ) : (
              filteredProducts.map((product) => {
                const inCart = cart.find((i) => i.productId === product._id);
                const isOutOfStock = product.inventory === 0;
                return (
                  <button
                    key={product._id}
                    onClick={() => !isOutOfStock && addToCart(product)}
                    disabled={isOutOfStock}
                    className={`
                      card text-left transition-all !p-3
                      ${
                        isOutOfStock
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:border-sky-300 hover:shadow-md cursor-pointer"
                      }
                      ${inCart ? "ring-2 ring-sky-500 border-sky-300" : ""}
                    `}
                  >
                    {/* Image */}
                    {product.image?.imageUrl ? (
                      <img
                        src={product.image.imageUrl}
                        alt={product.name}
                        className="w-full h-20 object-cover rounded-lg mb-2"
                      />
                    ) : (
                      <div className="w-full h-20 bg-slate-100 rounded-lg mb-2 flex items-center justify-center text-slate-400">
                        <BsCart3 size={24} />
                      </div>
                    )}

                    {/* Info */}
                    <p className="font-medium text-slate-900 text-sm truncate">
                      {product.name}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-sm font-bold text-sky-600">
                        ₹{product.price}
                      </span>
                      {isOutOfStock ? (
                        <Badge variant="danger" size="sm">
                          Out
                        </Badge>
                      ) : (
                        <span className="text-xs text-slate-400">
                          {product.inventory} left
                        </span>
                      )}
                    </div>

                    {inCart && (
                      <div className="mt-2 text-xs text-center py-1 bg-sky-50 text-sky-600 rounded-md">
                        {inCart.quantity} in cart
                      </div>
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Cart & Checkout */}
        <div className="space-y-4">
          {/* Customer Details */}
          <Card title="Customer Details" className="space-y-0">
            <Input
              placeholder="Customer Name"
              value={customer.name}
              onChange={(e) =>
                setCustomer({ ...customer, name: e.target.value })
              }
              leftIcon={<BsPerson />}
            />
            <Input
              placeholder="Customer Email"
              type="email"
              value={customer.email}
              onChange={(e) =>
                setCustomer({ ...customer, email: e.target.value })
              }
              leftIcon={<BsEnvelope />}
            />
          </Card>

          {/* Cart */}
          <Card
            title="Order Summary"
            subtitle={`${cart.length} item${cart.length !== 1 ? "s" : ""}`}
          >
            {cart.length === 0 ? (
              <div className="py-8 text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-slate-100 flex items-center justify-center">
                  <BsCart3 className="text-xl text-slate-400" />
                </div>
                <p className="text-sm text-slate-500">Cart is empty</p>
                <p className="text-xs text-slate-400">Click products to add</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[300px] overflow-y-auto -mx-5 px-5">
                {cart.map((item) => (
                  <div
                    key={item.productId}
                    className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-900 text-sm truncate">
                        {item.productName}
                      </p>
                      <p className="text-xs text-slate-500">
                        ₹{item.price} × {item.quantity}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity - 1)
                        }
                        className="w-7 h-7 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-600 text-sm font-bold transition-colors"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity + 1)
                        }
                        className="w-7 h-7 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-600 text-sm font-bold transition-colors"
                      >
                        +
                      </button>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeFromCart(item.productId)}
                      className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <BsTrash />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Totals */}
            {cart.length > 0 && (
              <div className="border-t border-slate-200 pt-4 mt-4 space-y-2">
                <Input
                  label="Discount (%)"
                  type="number"
                  min="0"
                  max="100"
                  value={discount === 0 ? "" : discount}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === "") {
                      setDiscount(0);
                      return;
                    }
                    setDiscount(Math.min(100, Math.max(0, Number(val))));
                  }}
                  placeholder="0"
                />
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-red-500">
                    <span>Discount ({discount}%)</span>
                    <span>-₹{discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold text-slate-900 pt-2 border-t border-dashed border-slate-200">
                  <span>Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
              </div>
            )}
          </Card>

          {/* Checkout Button */}
          <Button
            onClick={handleCheckout}
            isLoading={isSubmitting}
            disabled={cart.length === 0 || !customer.name || !customer.email}
            className="w-full"
            size="lg"
          >
            <BsReceipt />
            Process Sale
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sales;
