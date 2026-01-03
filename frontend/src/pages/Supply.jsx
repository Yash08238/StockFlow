import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";
import Badge from "../components/Badge";
import { BsTruck, BsBoxSeam, BsPlus, BsCheck2, BsSearch } from "react-icons/bs";

/**
 * Supply Page - Restock inventory from suppliers with Purple theme
 */
const Supply = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [quantity, setQuantity] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchingProducts, setFetchingProducts] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setFetchingProducts(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/products/getproducts`
      );
      setProducts(res.data.result || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load products");
    } finally {
      setFetchingProducts(false);
    }
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectProduct = (product) => {
    setSelectedProduct(product);
    setSearchQuery(product.name);
  };

  const clearSelection = () => {
    setSelectedProduct(null);
    setSearchQuery("");
  };

  const handleUpdate = async () => {
    if (!selectedProduct) {
      toast.error("Please select a product");
      return;
    }
    if (!quantity || parseInt(quantity) <= 0) {
      toast.error("Please enter a valid quantity");
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/products/supply`, {
        productId: selectedProduct._id,
        quantityToAdd: parseInt(quantity),
      });
      toast.success("Stock Updated Successfully!");
      setSuccess(true);
      fetchProducts();

      setTimeout(() => {
        setSuccess(false);
        setQuantity("");
        setSelectedProduct(null);
        setSearchQuery("");
      }, 2000);
    } catch (e) {
      console.error(e);
      toast.error(e.response?.data?.message || "Update Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
          <BsTruck size={28} />
        </div>
        <h1 className="page-title">Supply Chain</h1>
        <p className="page-subtitle">
          Update inventory from supplier deliveries
        </p>
      </div>

      {/* Restock Form */}
      <Card>
        {success ? (
          <div className="py-12 text-center animate-scale-in">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-100 flex items-center justify-center">
              <BsCheck2 className="text-3xl text-emerald-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Stock Updated!</h3>
            <p className="text-sm text-slate-500">
              Added {quantity} units to {selectedProduct?.name}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Product Selection */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Select Product
              </label>

              <div className="max-w-md">
                <Input
                  placeholder="Search products by name..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (
                      selectedProduct &&
                      e.target.value !== selectedProduct.name
                    ) {
                      setSelectedProduct(null);
                    }
                  }}
                  leftIcon={<BsSearch />}
                  className="!mb-0"
                />
              </div>

              {searchQuery && !selectedProduct && (
                <div className="mt-2 bg-white border border-slate-200 rounded-xl shadow-lg max-h-48 overflow-y-auto">
                  {fetchingProducts ? (
                    <div className="p-4 text-center text-slate-500 text-sm">
                      Loading products...
                    </div>
                  ) : filteredProducts.length === 0 ? (
                    <div className="p-4 text-center text-slate-500 text-sm">
                      No products found
                    </div>
                  ) : (
                    filteredProducts.slice(0, 8).map((product) => (
                      <button
                        key={product._id}
                        onClick={() => selectProduct(product)}
                        className="w-full px-4 py-3 text-left hover:bg-slate-50 flex items-center justify-between border-b border-slate-100 last:border-0"
                      >
                        <div>
                          <p className="font-medium text-slate-900">
                            {product.name}
                          </p>
                          <p className="text-xs text-slate-500">
                            Current stock: {product.inventory} units
                          </p>
                        </div>
                        <Badge variant="neutral" size="sm">
                          ₹{product.price}
                        </Badge>
                      </button>
                    ))
                  )}
                </div>
              )}

              {selectedProduct && (
                <div className="mt-3 p-4 bg-indigo-50 border border-indigo-100 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <BsCheck2 className="text-indigo-600" />
                      <span className="font-medium text-indigo-700">
                        {selectedProduct.name}
                      </span>
                    </div>
                    <button
                      onClick={clearSelection}
                      className="text-xs text-slate-500 hover:text-slate-700"
                    >
                      Change
                    </button>
                  </div>
                  <div className="flex gap-4 text-sm">
                    <span className="text-slate-600">
                      Current: <strong>{selectedProduct.inventory}</strong>{" "}
                      units
                    </span>
                    <span className="text-slate-600">
                      Price: <strong>₹{selectedProduct.price}</strong>
                    </span>
                  </div>
                  {selectedProduct.dailySalesAvg > 0 && (
                    <p className="text-xs text-indigo-600 mt-2 flex items-center gap-1">
                      💡 Suggested:{" "}
                      {Math.ceil(selectedProduct.dailySalesAvg * 7)} units
                      (7-day forecast)
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Quantity Input */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Quantity to Add
              </label>
              <Input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Enter quantity received"
                leftIcon={<BsPlus />}
              />
            </div>

            {/* Preview */}
            {selectedProduct && quantity && parseInt(quantity) > 0 && (
              <div className="p-4 bg-slate-50 rounded-xl">
                <p className="text-sm text-slate-600 mb-1">After restock:</p>
                <p className="text-lg font-bold text-slate-900">
                  {selectedProduct.inventory} + {quantity} ={" "}
                  {selectedProduct.inventory + parseInt(quantity)} units
                </p>
              </div>
            )}

            {/* Submit */}
            <Button
              onClick={handleUpdate}
              isLoading={loading}
              disabled={
                !selectedProduct || !quantity || parseInt(quantity) <= 0
              }
              className="w-full"
              size="lg"
            >
              <BsTruck />
              Confirm Stock Addition
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Supply;
