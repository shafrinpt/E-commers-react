import { useEffect, useState } from "react";
import HeroBanner from "../components/HeroBanner";
import { getAllProducts } from "../Api/productApi";
import axios from "axios";

import { toast } from "react-toastify";
import Offer from "../components/Offer";
import FeaturedCategories from "../components/FeaturedCategories";
import BestSeller from "../components/BestSeller";
import NewLaunches from "../components/NewLaunches";
import EliteEdition from "../components/EliteEdition";
import AboutUs from "../components/AboutUs";
import CustomerReviews from "../components/CustomerReviews";

function Home() {
  const [products, setProducts] = useState([]);

  // ✅ Fetch all products from backend
useEffect(() => {
  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(Array.isArray(data) ? data : []);
      toast.success("✨ Products loaded successfully!");
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("⚠️ Failed to load products.");
    }
  };

  fetchProducts();
}, []);

  return (
    <div className="w-full bg-white text-amber-900">
      {/* ✅ Hero Banner */}
      <HeroBanner />

      {/* 🌟 1. Special Offer Section */}
      <Offer />
      

     {/* 💄 2. Featured Categories (STATIC) */} 
    <FeaturedCategories />

      
      

      {/* 🛍️ 3. Best Seller (Dynamic from Backend) */}
      <BestSeller products={products}  />
      
      

      {/* 💄 4. New Launches (STATIC) */}
      <NewLaunches />
      

      {/* 💎 5. Elite Edition (Dynamic from Backend — shows newest) */}
      <EliteEdition products={products} />
      

      {/* 🌿 6. About Us (STATIC) */}
      <AboutUs/>
      
      {/* ⭐ 7. Customer Reviews (STATIC) */}

      <CustomerReviews />
      
    </div>
  );
}

export default Home;
