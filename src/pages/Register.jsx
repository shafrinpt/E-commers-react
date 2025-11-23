import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react"; // 👈 ADDED

const Register = () => {
  const navigate = useNavigate();

  // 👁️ Password eye toggle
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string().min(3, "At least 3 characters").required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    password: Yup.string().min(6, "Min 6 characters").required("Password is required"),
  });

  const formik = useFormik({
    initialValues: { name: "", email: "", phone: "", password: "" },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const res = await axios.post("http://localhost:5000/api/users/register", values);
        toast.success("✅ Registration successful!");

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        navigate("/profile");
      } catch (error) {
        toast.error(error.response?.data?.message || "❌ Registration failed");
      }
    },
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-50 to-white">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-200"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create Account
        </h2>

        {/* NAME */}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="w-full border p-3 rounded mb-2"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.name && formik.errors.name && (
          <p className="text-red-500 text-sm">{formik.errors.name}</p>
        )}

        {/* EMAIL */}
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

        {/* PHONE */}
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          className="w-full border p-3 rounded mb-2"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.phone && formik.errors.phone && (
          <p className="text-red-500 text-sm">{formik.errors.phone}</p>
        )}

        {/* PASSWORD WITH EYE ICON */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"} // 👈 toggle logic
            name="password"
            placeholder="Password"
            className="w-full border p-3 rounded mb-2 pr-12"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          {/* Eye icon */}
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

        {/* BUTTON */}
        <button
          type="submit"
          className="w-full bg-amber-900 hover:bg-amber-800 text-white py-3 rounded mt-3 font-semibold"
        >
          Sign Up
        </button>

        {/* Login Redirect */}
        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-amber-900 cursor-pointer hover:underline font-medium"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
