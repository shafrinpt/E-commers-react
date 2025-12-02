import axiosInstance from "./axiosInstance";

export const getAllProducts = async () => {
  const res = await axiosInstance.get("/api/items");
  return res.data; // ✅ return data only
};
