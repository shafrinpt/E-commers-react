import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Perfume from "./pages/Perfume";
import Makeup from "./pages/Makeup";
import Skincare from "./pages/Skincare";
import SkincareDetail from "./pages/SkincareDetail";
import MakeupDetail from "./pages/MakeupDetail";
import PerfumeDetail from "./pages/PerfumeDetail";
import Shafrin from "./pages/Shafrin";
import Layout from "./pages/Layout";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ProtectedRoute from "./pages/ProtectedRoute";

import ForgotPassword from "./pages/ForgotPassword";
import VerifyOTP from "./pages/VerifyOTP";
import ResetPassword from "./pages/ResetPassword";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<ProductDetails />} />

          <Route path="perfume" element={<Perfume />} />
          <Route path="perfume/:id" element={<PerfumeDetail />} />

          <Route path="makeup" element={<Makeup />} />
          <Route path="makeup/:id" element={<MakeupDetail />} />

          <Route path="skincare" element={<Skincare />} />
          <Route path="skincare/:id" element={<SkincareDetail />} />

          {/* 🔥 Cart Protected */}
          <Route
            path="cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />

          {/* Auth Pages */}
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />

          {/* 🔥 Forgot Password Pages */}
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="verify-otp" element={<VerifyOTP />} />
          <Route path="reset-password" element={<ResetPassword />} />

          {/* 🔒 Profile Protected */}
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route path="shafrin" element={<Shafrin />} />
        </Route>

      </Routes>

      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </Router>
  );
};

export default App;
