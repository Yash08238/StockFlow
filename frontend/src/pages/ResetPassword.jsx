import React, { useState } from "react";
import toast from "react-hot-toast";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import Input from "../components/Input";
import Button from "../components/Button";
import {
  BsLock,
  BsEye,
  BsEyeSlash,
  BsArrowLeft,
  BsShieldLock,
} from "react-icons/bs";

/**
 * Reset Password Page - Set new password with reset token
 * All API logic preserved - UI enhanced
 */
const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const token = searchParams.get("token");
  const id = searchParams.get("id");

  if (!token || !id) {
    return (
      <AuthLayout
        title="Invalid Link"
        subtitle="This password reset link is invalid or has expired."
      >
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-red-100 flex items-center justify-center">
            <BsShieldLock className="text-3xl text-red-500" />
          </div>
          <p className="text-sm text-slate-600">
            Please request a new password reset link.
          </p>
          <Link to="/forgotpassword" className="btn btn-primary inline-flex">
            Request New Link
          </Link>
          <div>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              <BsArrowLeft />
              Back to Sign In
            </Link>
          </div>
        </div>
      </AuthLayout>
    );
  }

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/pass/reset`, {
        id,
        token,
        newPassword: values.password,
      });
      toast.success("Password reset successful. Redirecting...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      console.error(error);
      if (error.response?.status === 403) {
        toast.error("Password reset not available for Google accounts");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        toast.error(
          error.response?.data?.message || "Failed to reset password"
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Set New Password"
      subtitle="Create a strong password for your account"
    >
      <Formik
        initialValues={{ password: "", confirmPassword: "" }}
        validationSchema={Yup.object({
          password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Confirm Password is required"),
        })}
        onSubmit={handleSubmit}
      >
        {({
          isSubmitting,
          errors,
          touched,
          handleChange,
          handleBlur,
          values,
        }) => (
          <Form className="space-y-5">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              label="New Password"
              placeholder="Create a strong password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password && errors.password}
              leftIcon={<BsLock />}
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-400 hover:text-slate-600 transition-colors p-1"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <BsEyeSlash size={18} />
                  ) : (
                    <BsEye size={18} />
                  )}
                </button>
              }
            />
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              label="Confirm Password"
              placeholder="Re-enter your password"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.confirmPassword && errors.confirmPassword}
              leftIcon={<BsLock />}
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="text-slate-400 hover:text-slate-600 transition-colors p-1"
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                >
                  {showConfirmPassword ? (
                    <BsEyeSlash size={18} />
                  ) : (
                    <BsEye size={18} />
                  )}
                </button>
              }
            />

            <Button type="submit" className="w-full" isLoading={isSubmitting}>
              Reset Password
            </Button>

            <div className="text-center">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
              >
                <BsArrowLeft />
                Back to Sign In
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
};

export default ResetPassword;
