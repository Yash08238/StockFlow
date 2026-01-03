import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, selectUserId, updateUser } from "../redux/UsersSlice";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";
import Badge from "../components/Badge";
import axios from "axios";
import {
  BsPerson,
  BsCamera,
  BsEnvelope,
  BsPhone,
  BsShieldCheck,
  BsCalendar3,
  BsPencilSquare,
  BsCheckLg,
  BsX,
} from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";

import { useNavigate } from "react-router-dom";

/**
 * Profile Page - Professional user account management with Purple theme
 */
const Profile = () => {
  const user = useSelector(selectUser);
  const userId = useSelector(selectUserId);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    mobile: user?.mobile || "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // Get image source
  const getImageSrc = () => {
    if (previewUrl) return previewUrl;
    if (user?.image) {
      if (user.image.startsWith("http")) return user.image;
      return `data:image/png;base64,${user.image}`;
    }
    return null;
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // Save profile
  const handleSave = async () => {
    setLoading(true);
    try {
      const data = new FormData();
      data.append("userId", userId);
      data.append("username", formData.username);
      data.append("mobile", formData.mobile);
      data.append("email", formData.email);

      if (imageFile) {
        data.append("image", imageFile);
      }

      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/user/profile`,
        data
      );

      if (res.data && res.data.success) {
        dispatch(updateUser(res.data.result));
        toast.success("Profile updated successfully!");
        setIsEditing(false);
        setImageFile(null);
        setPreviewUrl(null);
      }
    } catch (error) {
      console.error("Update failed", error);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setIsEditing(false);
    setImageFile(null);
    setPreviewUrl(null);
    setFormData({
      username: user?.username || "",
      email: user?.email || "",
      mobile: user?.mobile || "",
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-title">My Profile</h1>
          <p className="page-subtitle">Manage your account settings</p>
        </div>
        {!isEditing && (
          <Button variant="primary" onClick={() => setIsEditing(true)}>
            <BsPencilSquare />
            Edit Profile
          </Button>
        )}
      </div>

      {/* Profile Card */}
      <Card>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Avatar Section */}
          <div className="flex flex-col items-center">
            <div className="relative group">
              <div className="w-32 h-32 rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-xl">
                {getImageSrc() ? (
                  <img
                    src={getImageSrc()}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-white text-5xl font-bold">
                    {user?.username?.charAt(0)?.toUpperCase() || "U"}
                  </span>
                )}
              </div>

              {isEditing && (
                <label className="absolute bottom-2 right-2 w-10 h-10 bg-white rounded-xl shadow-lg cursor-pointer hover:bg-slate-50 flex items-center justify-center transition-colors border border-slate-200">
                  <BsCamera className="text-slate-600" />
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              )}
            </div>

            <div className="mt-4 text-center">
              <h2 className="text-xl font-bold text-slate-900">
                {user?.username || "User"}
              </h2>
              <Badge variant="info" className="mt-2">
                <BsShieldCheck className="text-xs" />
                Administrator
              </Badge>
            </div>
          </div>

          {/* Form Section */}
          <div className="flex-1 space-y-6">
            {/* Username */}
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                <BsPerson />
                Username
              </label>
              {isEditing ? (
                <Input
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  placeholder="Enter your username"
                />
              ) : (
                <p className="px-4 py-2.5 bg-slate-50 rounded-xl text-slate-900 font-medium">
                  {user?.username || "Not set"}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                <BsEnvelope />
                Email Address
              </label>
              <p className="px-4 py-2.5 bg-slate-50 rounded-xl text-slate-500 flex items-center gap-2">
                {user?.email || "Not set"}
                <span className="text-xs text-slate-400">
                  (Cannot be changed)
                </span>
              </p>
            </div>

            {/* Phone */}
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                <BsPhone />
                Phone Number
              </label>
              {isEditing ? (
                <Input
                  value={formData.mobile}
                  onChange={(e) =>
                    setFormData({ ...formData, mobile: e.target.value })
                  }
                  placeholder="Enter your phone number"
                />
              ) : (
                <p className="px-4 py-2.5 bg-slate-50 rounded-xl text-slate-900 font-medium">
                  {user?.mobile || "Not set"}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            {isEditing && (
              <div className="flex gap-3 pt-4 border-t border-slate-100">
                <Button variant="secondary" onClick={handleCancel}>
                  <BsX className="text-lg" />
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={handleSave}
                  isLoading={loading}
                >
                  <BsCheckLg />
                  Save Changes
                </Button>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Account Info Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">
              <BsShieldCheck className="text-xl text-indigo-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Account Role</p>
              <p className="text-lg font-semibold text-slate-900">
                Administrator
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
              {user?.authProvider === "google" ? (
                <FcGoogle className="text-xl" />
              ) : (
                <BsCalendar3 className="text-xl text-purple-600" />
              )}
            </div>
            <div>
              <p className="text-sm text-slate-500">
                {user?.authProvider === "google"
                  ? "Signed in with"
                  : "Member since"}
              </p>
              <p className="text-lg font-semibold text-slate-900">
                {user?.authProvider === "google"
                  ? "Google"
                  : new Date().getFullYear()}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Support Section */}
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Need Help?</h3>
            <p className="text-sm text-slate-500">
              Have questions or need assistance? Our support team is here to
              help.
            </p>
          </div>
          <Button onClick={() => navigate("/contact")}>Contact Support</Button>
        </div>
      </Card>
    </div>
  );
};

export default Profile;
