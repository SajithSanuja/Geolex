import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/HomePage/Home";
import type { WishlistItem } from "./data/wishlistData";
import type { CartItem } from "./data/cartData";
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

  // Initialize cart from localStorage or empty array
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const savedCart = localStorage.getItem('geolex-cart-app');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
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

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('geolex-cart-app', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [cartItems]);

  const handleWishlistChange = (items: WishlistItem[]) => {
    setWishlistItems(items);
  };

  const handleCartChange = (items: CartItem[]) => {
    setCartItems(items);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background-color)' }}>
      <Navbar 
        enableShrinking={false} 
        size="sm" 
        wishlistItems={wishlistItems}
        onWishlistChange={handleWishlistChange}
        cartItems={cartItems}
        onCartChange={handleCartChange}
      />
      <Home 
        wishlistItems={wishlistItems}
        onWishlistChange={handleWishlistChange}
        cartItems={cartItems}
        onCartChange={handleCartChange}
      />
    </div>
  );
}

export default App;
