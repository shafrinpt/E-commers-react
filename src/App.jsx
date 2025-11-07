import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";


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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { Layers } from "lucide-react";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* ✅ All routes under Layout share Navbar + Footer */}
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<ProductDetails />} />
          <Route path="perfume" element={<Perfume />} />
          <Route path="perfume/:id" element={<PerfumeDetail />} />
          <Route path="makeup" element={<Makeup />} />
          <Route path="makeup/:id" element={<MakeupDetail />} />
          <Route path="skincare" element={<Skincare />} />
          <Route path="skincare/:id" element={<SkincareDetail />} />
          <Route path="cart" element={<Cart />} />
          <Route path="shafrin" element={<Shafrin />} />
        </Route>
      </Routes>

      {/* ✅ Toastify Container (Global Notifications) */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
        toastClassName={() =>
          "relative flex p-4 bg-white text-gray-800 rounded-xl shadow-lg border-l-4 border-blue-500 mt-2 transition-transform transform-gpu hover:scale-105"
        }
        bodyClassName={() => "text-sm font-medium"}
        progressClassName="bg-blue-500 h-1"
      />
    </Router>
  );
};

export default App;
