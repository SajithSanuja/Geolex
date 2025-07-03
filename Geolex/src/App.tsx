import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/HomePage/Home";
import type { WishlistItem } from "./data/wishlistData";
import "./App.css";

function App() {
  // Initialize wishlist from localStorage or empty array
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>(() => {
    try {
      const savedWishlist = localStorage.getItem('geolex-wishlist');
      return savedWishlist ? JSON.parse(savedWishlist) : [];
    } catch (error) {
      console.error('Error loading wishlist from localStorage:', error);
      return [];
    }
  });

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('geolex-wishlist', JSON.stringify(wishlistItems));
    } catch (error) {
      console.error('Error saving wishlist to localStorage:', error);
    }
  }, [wishlistItems]);

  const handleWishlistChange = (items: WishlistItem[]) => {
    setWishlistItems(items);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        enableShrinking={false} 
        size="sm" 
        wishlistItems={wishlistItems}
        onWishlistChange={handleWishlistChange}
      />
      <Home 
        wishlistItems={wishlistItems}
        onWishlistChange={handleWishlistChange}
      />
    </div>
  );
}

export default App;
