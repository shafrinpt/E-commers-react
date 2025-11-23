import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
    }),
    onSubmit: async (values) => {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/users/request-reset",
          { email: values.email }
        );

        toast.success("📩 OTP sent to your email");
        navigate("/verify-otp", { state: { email: values.email } });

      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");
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
          Forgot Password
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Enter your registered email"
          className="w-full border p-3 rounded mb-2"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        {formik.touched.email && formik.errors.email && (
          <p className="text-red-500 text-sm">{formik.errors.email}</p>
        )}

        <button
          type="submit"
          className="w-full bg-amber-900 hover:bg-amber-800 text-white py-3 rounded mt-3 font-semibold"
        >
          Send OTP
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

export default ForgotPassword;
