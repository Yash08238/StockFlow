import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Card from "../components/Card";
import Button from "../components/Button";
import Input from "../components/Input";
import Badge from "../components/Badge";
import Modal from "../components/Modal";
import EmptyState from "../components/EmptyState";
import {
  BsPlus,
  BsTag,
  BsPencil,
  BsTrash,
  BsLock,
  BsCheck,
  BsX,
  BsTagsFill,
} from "react-icons/bs";

/**
 * Categories Page - Manage product categories
 * All API logic preserved - UI enhanced
 */
const Categories = () => {
  const [categories, setCategories] = useState({ system: [], custom: [] });
  const [loading, setLoading] = useState(true);
  const [newCategory, setNewCategory] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch categories - UNCHANGED
  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/categories`);
      setCategories(res.data.result?.grouped || { system: [], custom: [] });
    } catch (error) {
      console.error("Failed to fetch categories", error);
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  // Create category - UNCHANGED
  const handleCreate = async () => {
    if (!newCategory.trim()) {
      toast.error("Enter category name");
      return;
    }
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/categories`, {
        name: newCategory.trim(),
      });
      toast.success("Category created!");
      setNewCategory("");
      setIsModalOpen(false);
      fetchCategories();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create");
    }
  };

  // Update category - UNCHANGED
  const handleUpdate = async (id, name) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/categories/${id}`, {
        name,
      });
      toast.success("Category updated!");
      fetchCategories();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update");
    }
  };

  // Delete category - UNCHANGED
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/categories/${id}`);
      toast.success("Category deleted!");
      fetchCategories();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete");
    }
  };

  // Category Row Component
  const CategoryRow = ({ category, isSystem }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState(category.name);

    return (
      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl group hover:bg-slate-100 transition-colors">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isSystem
                ? "bg-slate-200 text-slate-500"
                : "bg-sky-100 text-sky-600"
            }`}
          >
            <BsTag />
          </div>

          {isEditing ? (
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="input-field flex-1 !mb-0 !py-1.5"
              autoFocus
            />
          ) : (
            <span className="font-medium text-slate-900">{category.name}</span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {isSystem ? (
            <Badge variant="neutral" size="sm">
              <BsLock className="text-xs mr-1" />
              System
            </Badge>
          ) : isEditing ? (
            <>
              <button
                onClick={() => {
                  handleUpdate(category._id, editName);
                  setIsEditing(false);
                }}
                className="p-2 text-emerald-600 hover:bg-emerald-100 rounded-lg transition-colors"
              >
                <BsCheck size={18} />
              </button>
              <button
                onClick={() => {
                  setEditName(category.name);
                  setIsEditing(false);
                }}
                className="p-2 text-slate-400 hover:bg-slate-200 rounded-lg transition-colors"
              >
                <BsX size={18} />
              </button>
            </>
          ) : (
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 text-slate-500 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
              >
                <BsPencil size={14} />
              </button>
              <button
                onClick={() => handleDelete(category._id)}
                className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <BsTrash size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-title">Categories</h1>
          <p className="page-subtitle">
            Organize your products with categories
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <BsPlus className="text-lg" />
          Add Category
        </Button>
      </div>

      {/* Custom Categories */}
      <Card title="Your Categories" subtitle="Custom categories you've created">
        {loading ? (
          <div className="py-8 text-center text-slate-500">
            <div className="animate-pulse">Loading...</div>
          </div>
        ) : categories.custom.length === 0 ? (
          <EmptyState
            icon={<BsTagsFill className="text-3xl text-slate-400" />}
            title="No custom categories"
            description="Create categories to organize your products"
            actionLabel="Add Category"
            onAction={() => setIsModalOpen(true)}
          />
        ) : (
          <div className="space-y-2">
            {categories.custom.map((cat) => (
              <CategoryRow key={cat._id} category={cat} isSystem={false} />
            ))}
          </div>
        )}
      </Card>

      {/* System Categories */}
      <Card
        title="Default Categories"
        subtitle="Pre-defined categories (cannot be modified)"
      >
        <div className="space-y-2">
          {categories.system.map((cat) => (
            <CategoryRow key={cat._id} category={cat} isSystem={true} />
          ))}
        </div>
      </Card>

      {/* Create Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create Category"
        size="sm"
      >
        <Input
          label="Category Name"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="e.g., Electronics, Clothing"
        />
        <div className="flex justify-end gap-3 pt-4">
          <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreate}>Create</Button>
        </div>
      </Modal>
    </div>
  );
};

export default Categories;
