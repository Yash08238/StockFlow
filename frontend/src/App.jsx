import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "./redux/UsersSlice";
import { Toaster } from "react-hot-toast";
import axios from "axios";

// Public Pages
import LandingPage from "./pages/public/LandingPage";
import HowItWorksPage from "./pages/public/HowItWorksPage";
import ContactPage from "./pages/public/ContactPage";

// Auth Pages
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AuthCallback from "./pages/AuthCallback";

// Dashboard Pages
import Dashboard from "./pages/Dashboard";
import Sales from "./pages/Sales";
import Inventory from "./pages/Inventory";
import Bills from "./pages/Bills";
import Reports from "./pages/Reports";
import Supply from "./pages/Supply";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import Categories from "./pages/Categories";
import NotFound from "./pages/NotFound";

/**
 * Protected Route Wrapper
 * Redirects to login if user is not authenticated
 */
const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <MainLayout>{children}</MainLayout>;
};

/**
 * Public Route Wrapper
 * Redirects to dashboard if user is already authenticated
 */
const PublicOnlyRoute = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

function App() {
  const { token, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      // Fetch latest profile data to stay in sync
      const fetchProfile = async () => {
        try {
          const res = await axios.get(
            `${import.meta.env.VITE_API_URL}/user/profile`
          );
          if (res.data && res.data.success) {
            dispatch(updateUser(res.data.result));
          }
        } catch (error) {
          console.error("Failed to fetch profile on mount", error);
        }
      };
      fetchProfile();
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token, dispatch]);

  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 4000,
          style: {
            background: "#0f172a",
            color: "#f1f5f9",
            borderRadius: "12px",
            padding: "12px 16px",
          },
          success: {
            iconTheme: {
              primary: "#10b981",
              secondary: "#f1f5f9",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#f1f5f9",
            },
          },
        }}
      />
      <Routes>
        {/* ============================================
            PUBLIC PAGES (No login required)
            ============================================ */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* ============================================
            AUTH PAGES (Login, Register, etc.)
            ============================================ */}
        <Route
          path="/login"
          element={
            <PublicOnlyRoute>
              <SignIn />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicOnlyRoute>
              <SignUp />
            </PublicOnlyRoute>
          }
        />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="/auth/callback" element={<AuthCallback />} />

        {/* ============================================
            PROTECTED ROUTES (Dashboard / ERP)
            ============================================ */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sales"
          element={
            <ProtectedRoute>
              <Sales />
            </ProtectedRoute>
          }
        />
        <Route
          path="/inventory"
          element={
            <ProtectedRoute>
              <Inventory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bills"
          element={
            <ProtectedRoute>
              <Bills />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          }
        />
        <Route
          path="/supply"
          element={
            <ProtectedRoute>
              <Supply />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/categories"
          element={
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          }
        />

        {/* ============================================
            FALLBACK - 404 Not Found
            ============================================ */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
