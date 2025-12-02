import React from "react";

import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { verifyOtp } from "../Api/authApi";

const VerifyOTP = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  if (!email) navigate("/forgot-password");

  const formik = useFormik({
    initialValues: { otp: "" },
    validationSchema: Yup.object({
      otp: Yup.string()
        .length(6, "OTP must be 6 digits")
        .required("OTP is required"),
    }),
    onSubmit: async (values) => {
      try {
        const res = await verifyOtp({ email, otp: values.otp });
        toast.success("✅ OTP Verified!");
        navigate("/reset-password", {
          state: { email, otpVerified: true },
        });

      } catch (error) {
        toast.error(error.response?.data?.message || "Invalid OTP");
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
          Verify OTP
        </h2>

        <p className="text-center text-sm text-gray-600 mb-4">
          OTP sent to <span className="font-medium">{email}</span>
        </p>

        <input
          type="text"
          maxLength={6}
          name="otp"
          placeholder="Enter 6-digit OTP"
          className="w-full border p-3 rounded mb-2 text-center tracking-widest text-lg"
          value={formik.values.otp}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        {formik.touched.otp && formik.errors.otp && (
          <p className="text-red-500 text-sm">{formik.errors.otp}</p>
        )}

        <button
          type="submit"
          className="w-full bg-amber-900 hover:bg-amber-800 text-white py-3 rounded mt-3 font-semibold"
        >
          Verify OTP
        </button>

        <p
          className="text-center text-sm mt-4 cursor-pointer text-amber-900 hover:underline"
          onClick={() => navigate("/forgot-password")}
        >
          ← Back
        </p>
      </form>
    </div>
  );
};

export default VerifyOTP;
