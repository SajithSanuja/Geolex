import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/HomePage/Home";
import type { WishlistItem } from "./data/wishlistData";
import "./App.css";

function App() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

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
