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
import { BsEye, BsEyeSlash, BsEnvelope, BsLock } from "react-icons/bs";

/**
 * SignIn Page - Modern login form
 * All authentication logic preserved - UI only changes
 */
const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // Existing Google login handler - UNCHANGED
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/google-login`,
        {
          token: credentialResponse.credential,
        }
      );
      if (res.data && res.data.result && res.data.result.token) {
        dispatch(login(res.data.result));
        toast.success("Login Successful");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Google Login Error", error);
      toast.error("Google Login Failed");
    }
  };

  // Existing login handler - UNCHANGED
  const handleLogin = async (values, { setSubmitting }) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/login`,
        values
      );
      if (res.data && res.data.result && res.data.result.token) {
        dispatch(
          login({
            ...res.data.result,
            rememberMe: values.rememberMe,
          })
        );
        toast.success("Login Successful");
        navigate("/dashboard");
      } else {
        toast.error("Unexpected response from server");
      }
    } catch (error) {
      console.error(error);
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        toast.error("Invalid username or password");
      } else {
        toast.error("Failed to connect to server");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const initialValues = {
    username: "",
    password: "",
    rememberMe: true,
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to continue to your dashboard"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
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
              id="username"
              name="username"
              label="Username or Email"
              placeholder="Enter your username or email"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.username && errors.username}
              leftIcon={<BsEnvelope />}
            />

            <Input
              id="password"
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
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

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={values.rememberMe}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-slate-300 text-indigo-500 focus:ring-indigo-500 cursor-pointer"
                />
                <span className="text-sm text-slate-600 group-hover:text-slate-900">
                  Remember me
                </span>
              </label>
              <Link
                to="/forgotpassword"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              isLoading={isSubmitting}
              className="w-full"
            >
              Sign In
            </Button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-white text-sm text-slate-500">
                  or continue with
                </span>
              </div>
            </div>

            {/* Google Sign In */}
            <a
              href={`${import.meta.env.VITE_API_URL}/user/google`}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white border border-slate-300 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-all shadow-sm"
            >
              <FcGoogle size={20} />
              Sign in with Google
            </a>

            {/* Register Link */}
            <p className="text-center text-sm text-slate-600 mt-6">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-indigo-600 hover:text-indigo-700"
              >
                Create account
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
};

export default SignIn;
