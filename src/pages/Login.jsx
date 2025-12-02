import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { loginUser } from "../Api/authApi";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // Validation Schema
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Min 6 characters")
      .required("Password is required"),
  });

  // Formik Handler
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: async (values) => {
      try {
       const res = await loginUser(values);
        toast.success("✅ Login successful!");

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        window.dispatchEvent(new Event("userChange"));
        navigate("/");
      } catch (error) {
        toast.error(error.response?.data?.message || "❌ Invalid credentials");
      }
    },
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-white">

      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-200"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login to Your Account
        </h2>

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          className="w-full border p-3 rounded mb-2"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email && (
          <p className="text-red-500 text-sm">{formik.errors.email}</p>
        )}

        {/* Password + Eye Icon */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            className="w-full border p-3 rounded mb-2 pr-12"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </span>
        </div>

        {formik.touched.password && formik.errors.password && (
          <p className="text-red-500 text-sm">{formik.errors.password}</p>
        )}

        {/* Forgot Password → Goes to separate page */}
        <p
          className="text-right text-sm text-amber-900 cursor-pointer hover:underline mb-2"
          onClick={() => navigate("/forgot-password")}
        >
          Forgot Password?
        </p>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-amber-900 hover:bg-amber-800 text-white py-3 rounded mt-3 font-semibold"
        >
          Sign In
        </button>

        <p className="text-center text-sm mt-4">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-amber-900 cursor-pointer hover:underline font-medium"
          >
            Register here
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
