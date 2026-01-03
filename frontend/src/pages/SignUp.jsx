import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { login } from "../redux/UsersSlice";
import AuthLayout from "../layouts/AuthLayout";
import Input from "../components/Input";
import Button from "../components/Button";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import {
  BsEye,
  BsEyeSlash,
  BsEnvelope,
  BsLock,
  BsPerson,
  BsPhone,
} from "react-icons/bs";

/**
 * SignUp Page - Modern registration form
 * All registration logic preserved - UI only changes
 */
const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // Existing registration handler - UNCHANGED
  const handleRegister = async (values, { setSubmitting }) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/register`,
        values
      );
      if (res.data && res.data.result && res.data.result.token) {
        dispatch(login(res.data.result));
        toast.success("Registration Successful!");
        navigate("/dashboard");
      } else {
        toast.error("Unexpected response from server");
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message || "Registration failed");
      } else {
        toast.error("Failed to connect to server");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const initialValues = {
    username: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    role: "user",
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, "Username must be at least 3 characters")
      .required("Username is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    mobile: Yup.string()
      .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
      .required("Mobile number is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start managing your business with StockFlow"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleRegister}
      >
        {({
          isSubmitting,
          errors,
          touched,
          handleChange,
          handleBlur,
          values,
        }) => (
          <Form className="space-y-4">
            <Input
              id="username"
              name="username"
              label="Username"
              placeholder="Choose a username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.username && errors.username}
              leftIcon={<BsPerson />}
            />

            <Input
              id="email"
              name="email"
              type="email"
              label="Email Address"
              placeholder="you@example.com"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && errors.email}
              leftIcon={<BsEnvelope />}
            />

            <Input
              id="mobile"
              name="mobile"
              label="Mobile Number"
              placeholder="10-digit mobile number"
              value={values.mobile}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.mobile && errors.mobile}
              leftIcon={<BsPhone />}
            />

            <Input
              id="password"
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
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
              label="Confirm Password"
              type={showPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.confirmPassword && errors.confirmPassword}
              leftIcon={<BsLock />}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              isLoading={isSubmitting}
              className="w-full"
            >
              Create Account
            </Button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-white text-sm text-slate-500">
                  or sign up with
                </span>
              </div>
            </div>

            {/* Google Sign Up */}
            <a
              href={`${import.meta.env.VITE_API_URL}/user/google`}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white border border-slate-300 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-all shadow-sm"
            >
              <FcGoogle size={20} />
              Continue with Google
            </a>

            {/* Login Link */}
            <p className="text-center text-sm text-slate-600 mt-6">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-indigo-600 hover:text-indigo-700"
              >
                Sign in
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
};

export default SignUp;
