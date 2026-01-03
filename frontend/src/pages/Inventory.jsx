import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import Input from "../components/Input";
import {
  BsPlus,
  BsFilter,
  BsSearch,
  BsTrash,
  BsCamera,
  BsUpload,
  BsBoxSeam,
} from "react-icons/bs";
import Modal from "../components/Modal";
import Button from "../components/Button";
import Card from "../components/Card";
import Badge from "../components/Badge";
import EmptyState from "../components/EmptyState";
import CameraCapture from "../components/CameraCapture";

/**
 * Inventory Page - Product catalog and stock management
 * Redesigned UI with status badges - all API calls preserved
 */
const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  // Delete Confirmation State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const [categories, setCategories] = useState({ system: [], custom: [] });
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isAddingCategory, setIsAddingCategory] = useState(false);

  // Fetch categories from API - UNCHANGED
  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/categories`);
      setCategories(res.data.result?.grouped || { system: [], custom: [] });
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  // Add Product State - UNCHANGED
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    cp: "",
    inventory: "",
    categoryId: "",
    image: null,
    base64Image: null,
    minThreshold: "",
    preferredSupplierName: "",
    lastPurchaseCost: "",
  });

  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // Fetch products - UNCHANGED
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/products/getproducts`
      );
      const loadedProducts = res.data.result.map((p) => ({
        ...p,
        imageUrl: p.image ? p.image.imageUrl : null,
      }));
      setProducts(loadedProducts);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Add product handler - UNCHANGED
  const handleAddProduct = async () => {
    try {
      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("price", newProduct.price);
      formData.append("cp", newProduct.cp || 0);
      formData.append("inventory", newProduct.inventory);
      formData.append("categoryId", newProduct.categoryId);
      formData.append("minThreshold", newProduct.minThreshold || 10);

      if (newProduct.preferredSupplierName) {
        formData.append(
          "preferredSupplierName",
          newProduct.preferredSupplierName
        );
      }
      if (newProduct.lastPurchaseCost) {
        formData.append("lastPurchaseCost", newProduct.lastPurchaseCost);
      }

      if (newProduct.image) {
        formData.append("image", newProduct.image);
      } else if (newProduct.base64Image) {
        formData.append("base64Image", newProduct.base64Image);
      } else {
        toast.error("Please add a product image");
        return;
      }

      await axios.post(
        `${import.meta.env.VITE_API_URL}/products/createProduct`,
        formData
      );

      toast.success("Product Added Successfully");
      setIsModalOpen(false);
      resetForm();
      fetchProducts();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error adding product");
    }
  };

  const resetForm = () => {
    setNewProduct({
      name: "",
      price: "",
      cp: "",
      inventory: "",
      categoryId: "",
      image: null,
      base64Image: null,
      minThreshold: "",
      preferredSupplierName: "",
      lastPurchaseCost: "",
    });
    setImagePreview(null);
  };

  const handleCameraCapture = (base64Data) => {
    setNewProduct({ ...newProduct, base64Image: base64Data, image: null });
    setImagePreview(base64Data);
    setIsCameraOpen(false);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProduct({ ...newProduct, image: file, base64Image: null });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const confirmDelete = (product) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };

  // Delete handler - UNCHANGED
  const handleDelete = async () => {
    if (!productToDelete) return;
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/products/delete/${productToDelete._id}`
      );
      toast.success("Product deleted successfully");
      setIsDeleteModalOpen(false);
      setProductToDelete(null);
      fetchProducts();
    } catch (error) {
      console.error("Delete failed", error);
      toast.error("Failed to delete product");
    }
  };

  const allCategories = [...categories.system, ...categories.custom];

  const filteredProducts = products.filter((p) => {
    const matchesCategory = filter ? p.category === filter : true;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Stock status with badges
  const getStockStatus = (product) => {
    const threshold = product.minThreshold || 10;
    if (product.inventory === 0) {
      return { label: "Out of Stock", variant: "danger" };
    }
    if (product.inventory <= threshold * 0.5) {
      return { label: "Low Stock", variant: "danger" };
    }
    if (product.inventory <= threshold) {
      return { label: "Medium", variant: "warning" };
    }
    return { label: "In Stock", variant: "success" };
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="page-title">Inventory</h1>
          <p className="page-subtitle">
            Manage your product catalog and stock levels
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <BsPlus className="text-lg" />
          Add Product
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          {/* Search */}
          <div className="flex-1 max-w-md">
            <Input
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              leftIcon={<BsSearch />}
              className="!mb-0"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <BsFilter className="text-slate-400" />
            <select
              className="input-field !mb-0 w-auto min-w-[180px]"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.system.length > 0 && (
                <optgroup label="Default Categories">
                  {categories.system.map((c) => (
                    <option key={c._id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </optgroup>
              )}
              {categories.custom.length > 0 && (
                <optgroup label="Your Categories">
                  {categories.custom.map((c) => (
                    <option key={c._id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </optgroup>
              )}
            </select>
          </div>
        </div>
      </Card>

      {/* Products Table */}
      <Card padding={false}>
        {loading ? (
          <div className="py-16 text-center text-slate-500">
            <div className="animate-pulse">Loading inventory...</div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <EmptyState
            icon={<BsBoxSeam className="text-3xl text-slate-400" />}
            title={
              products.length === 0 ? "No products yet" : "No matches found"
            }
            description={
              products.length === 0
                ? "Add your first product to get started"
                : "Try adjusting your search or filter"
            }
            actionLabel={products.length === 0 ? "Add Product" : undefined}
            onAction={
              products.length === 0 ? () => setIsModalOpen(true) : undefined
            }
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="table-modern">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th className="text-right">Price</th>
                  <th className="text-right">Cost</th>
                  <th className="text-right">Stock</th>
                  <th className="text-center">Status</th>
                  <th className="text-center w-16">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => {
                  const stockStatus = getStockStatus(product);
                  return (
                    <tr key={product._id}>
                      <td>
                        <div className="flex items-center gap-3">
                          {product.imageUrl ? (
                            <img
                              src={product.imageUrl}
                              alt={product.name}
                              className="w-10 h-10 rounded-lg object-cover border border-slate-200"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400">
                              <BsBoxSeam />
                            </div>
                          )}
                          <span className="font-medium">{product.name}</span>
                        </div>
                      </td>
                      <td className="text-slate-600">
                        {product.category || "—"}
                      </td>
                      <td className="text-right font-mono">₹{product.price}</td>
                      <td className="text-right font-mono text-slate-500">
                        ₹{product.cp || 0}
                      </td>
                      <td className="text-right">
                        <span className="font-mono">{product.inventory}</span>
                        {product.minThreshold && (
                          <span className="text-xs text-slate-400 block">
                            min: {product.minThreshold}
                          </span>
                        )}
                      </td>
                      <td className="text-center">
                        <Badge variant={stockStatus.variant} dot>
                          {stockStatus.label}
                        </Badge>
                      </td>
                      <td className="text-center">
                        <button
                          onClick={() => confirmDelete(product)}
                          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Product"
                        >
                          <BsTrash />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Add Product Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          resetForm();
        }}
        title="Add New Product"
        subtitle="Fill in the product details"
        size="lg"
      >
        <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-2 -mr-2">
          <Input
            label="Product Name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            placeholder="Enter product name"
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Sell Price (₹)"
              type="number"
              min="0"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              placeholder="0"
              required
            />
            <Input
              label="Cost Price (₹)"
              type="number"
              min="0"
              value={newProduct.cp}
              onChange={(e) =>
                setNewProduct({ ...newProduct, cp: e.target.value })
              }
              placeholder="0"
            />
            <Input
              label="Initial Stock"
              type="number"
              min="0"
              value={newProduct.inventory}
              onChange={(e) =>
                setNewProduct({ ...newProduct, inventory: e.target.value })
              }
              placeholder="0"
              required
            />
            <Input
              label="Low Stock Threshold"
              type="number"
              min="0"
              value={newProduct.minThreshold}
              onChange={(e) =>
                setNewProduct({ ...newProduct, minThreshold: e.target.value })
              }
              placeholder="10"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Category
            </label>
            <div className="flex gap-2">
              <select
                className="input-field flex-1 !mb-0"
                value={newProduct.categoryId}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, categoryId: e.target.value })
                }
              >
                <option value="">Select Category</option>
                {categories.system.length > 0 && (
                  <optgroup label="Default">
                    {categories.system.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </optgroup>
                )}
                {categories.custom.length > 0 && (
                  <optgroup label="Custom">
                    {categories.custom.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </optgroup>
                )}
              </select>
              <button
                type="button"
                onClick={() => setIsAddingCategory(!isAddingCategory)}
                className="px-3 py-2 text-sm bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-200 text-slate-600 transition-colors"
              >
                {isAddingCategory ? "✕" : "+"}
              </button>
            </div>
            {isAddingCategory && (
              <div className="mt-2 flex gap-2">
                <input
                  type="text"
                  className="input-field flex-1 !mb-0"
                  placeholder="New category name"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                />
                <Button
                  size="sm"
                  onClick={async () => {
                    if (!newCategoryName.trim()) {
                      toast.error("Enter category name");
                      return;
                    }
                    try {
                      const res = await axios.post(
                        `${import.meta.env.VITE_API_URL}/categories`,
                        { name: newCategoryName.trim() }
                      );
                      toast.success("Category created!");
                      setNewCategoryName("");
                      setIsAddingCategory(false);
                      fetchCategories();
                      if (res.data.result?._id) {
                        setNewProduct({
                          ...newProduct,
                          categoryId: res.data.result._id,
                        });
                      }
                    } catch (error) {
                      toast.error(
                        error.response?.data?.message || "Failed to create"
                      );
                    }
                  }}
                >
                  Add
                </Button>
              </div>
            )}
          </div>

          {/* Supplier Info */}
          <div className="border-t border-slate-200 pt-4 mt-4">
            <p className="text-xs font-medium text-slate-500 uppercase mb-3">
              Supplier Info (Optional)
            </p>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Supplier Name"
                value={newProduct.preferredSupplierName}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    preferredSupplierName: e.target.value,
                  })
                }
                placeholder="Supplier name"
              />
              <Input
                label="Last Purchase Cost (₹)"
                type="number"
                value={newProduct.lastPurchaseCost}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    lastPurchaseCost: e.target.value,
                  })
                }
                placeholder="0"
              />
            </div>
          </div>

          {/* Image Upload */}
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
            <label className="block text-xs font-medium text-slate-500 uppercase mb-3">
              Product Image *
            </label>

            {imagePreview && (
              <div className="relative mb-3">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-40 object-contain rounded-lg border bg-white"
                />
                <button
                  onClick={() => {
                    setImagePreview(null);
                    setNewProduct({
                      ...newProduct,
                      image: null,
                      base64Image: null,
                    });
                  }}
                  className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs hover:bg-red-600 transition-colors"
                >
                  ✕
                </button>
              </div>
            )}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setIsCameraOpen(true)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-sky-500 text-white rounded-xl hover:bg-sky-600 transition-colors text-sm font-medium"
              >
                <BsCamera size={18} />
                Capture
              </button>
              <label className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-slate-700 text-white rounded-xl hover:bg-slate-800 transition-colors text-sm font-medium cursor-pointer">
                <BsUpload size={18} />
                Upload
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </label>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end gap-3 pt-4 mt-4 border-t border-slate-100">
          <Button
            variant="secondary"
            onClick={() => {
              setIsModalOpen(false);
              resetForm();
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleAddProduct}>Add Product</Button>
        </div>
      </Modal>

      {/* Camera Capture */}
      {isCameraOpen && (
        <CameraCapture
          onCapture={handleCameraCapture}
          onClose={() => setIsCameraOpen(false)}
        />
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Product"
        size="sm"
      >
        <p className="text-slate-600 mb-6">
          Are you sure you want to delete{" "}
          <strong className="text-slate-900">{productToDelete?.name}</strong>?
          This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <Button
            variant="secondary"
            onClick={() => setIsDeleteModalOpen(false)}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Inventory;
