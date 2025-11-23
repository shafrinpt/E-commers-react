import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // ✅ Fetch profile data
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);
        setFormData({
          name: res.data.user.name,
          phone: res.data.user.phone || "",
        });
      } catch {
        toast.error("⚠️ Session expired. Please log in again.");
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchProfile();
  }, [navigate]);

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ✅ Update profile info
  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "http://localhost:5000/api/users/profile",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("✅ Profile updated!");
    } catch {
      toast.error("❌ Failed to update profile");
    }
  };

  // ✅ Change password
  const handlePasswordChange = async () => {
    if (password.length < 6) {
      toast.warning("⚠️ Password must be at least 6 characters");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "http://localhost:5000/api/users/password",
        { password },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("🔐 Password updated successfully!");
      setPassword("");
    } catch {
      toast.error("❌ Failed to update password");
    }
  };

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    toast.info("👋 Logged out successfully");
    navigate("/login");
  };

  if (!user)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600">
        Loading profile...
      </div>
    );

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-amber-50 via-pink-50 to-amber-100 px-4 py-8">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-amber-800">My Profile</h2>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-600 hover:text-red-700"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>

        {/* Profile Info */}
        <div className="flex flex-col items-center mb-6">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border-4 border-amber-500 shadow-lg mb-3"
          />
          <h3 className="text-xl font-semibold text-gray-800">{user.name}</h3>
          <p className="text-gray-500">{user.email}</p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
          />
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
          />

          <button
            onClick={handleUpdate}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg font-semibold transition-all"
          >
            💾 Save Changes
          </button>

          <hr className="my-6 border-gray-300" />

          {/* Password Section */}
          <h3 className="text-lg font-semibold text-amber-800 mb-2">
            Change Password
          </h3>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New Password"
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
          />
          <button
            onClick={handlePasswordChange}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-all"
          >
            🔐 Update Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
