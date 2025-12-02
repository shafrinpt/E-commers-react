import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";
import { resetPassword } from "../Api/authApi";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;
  const otpVerified = location.state?.otpVerified;

  if (!email || !otpVerified) navigate("/forgot-password");

  const [showPass, setShowPass] = useState(false);
  const [showCPass, setShowCPass] = useState(false);

  const formik = useFormik({
    initialValues: { password: "", confirmPassword: "" },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(6, "Min 6 characters")
        .required("Password required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords do not match")
        .required("Confirm password"),
    }),
    onSubmit: async (values) => {
      try {
        const res = await resetPassword({ email, password: values.password });

        toast.success("🎉 Password updated successfully!");
        navigate("/login");

      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    },
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-50 to-white">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-200"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Reset Password
        </h2>

        {/* Password */}
        <div className="relative">
          <input
            type={showPass ? "text" : "password"}
            name="password"
            placeholder="New Password"
            className="w-full border p-3 rounded mb-2 pr-12"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          <span
            onClick={() => setShowPass(!showPass)}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
          >
            {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
          </span>
        </div>

        {formik.touched.password && formik.errors.password && (
          <p className="text-red-500 text-sm">{formik.errors.password}</p>
        )}

        {/* Confirm Password */}
        <div className="relative">
          <input
            type={showCPass ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            className="w-full border p-3 rounded mb-2 pr-12"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          <span
            onClick={() => setShowCPass(!showCPass)}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
          >
            {showCPass ? <EyeOff size={20} /> : <Eye size={20} />}
          </span>
        </div>

        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
          <p className="text-red-500 text-sm">{formik.errors.confirmPassword}</p>
        )}

        <button
          type="submit"
          className="w-full bg-amber-900 hover:bg-amber-800 text-white py-3 rounded mt-3 font-semibold"
        >
          Update Password
        </button>

        <p
          className="text-center text-sm mt-4 cursor-pointer text-amber-900 hover:underline"
          onClick={() => navigate("/login")}
        >
          ← Back to Login
        </p>
      </form>
    </div>
  );
};

export default ResetPassword;
