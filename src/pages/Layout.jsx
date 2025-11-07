import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Layout = () => {
  return (
    <>
      <Navbar />
      {/* Main Page Content */}
      <main className="min-h-screen bg-gray-50">
        <Outlet /> {/* This is where pages will render dynamically */}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
