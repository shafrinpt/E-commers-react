import axiosInstance from "./axiosInstance";

// ✅ Forgot password
export const requestPasswordReset = (email) => {
  return axiosInstance.post("/api/users/request-reset", { email });
};

// ✅ Login
export const loginUser = (values) => {
  return axiosInstance.post("/api/users/login", values);
};
//register
export const registerUser = (values) => {
  return axiosInstance.post("/api/users/register", values);
};
//resetPassword
export const resetPassword = (data) => {
  return axiosInstance.post("/api/users/reset-password", data);
};
//verifyOTP
export const verifyOtp = (data) => {
  return axiosInstance.post("/api/users/verify-otp", data);
};


