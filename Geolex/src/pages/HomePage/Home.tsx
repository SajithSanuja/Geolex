import React, { useState } from "react";
import Banner from "../../components/Banner/Banner";
import Categories from "../../components/Categories/Categories";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import { BannerImages, SampleProducts } from "../../assets/assets";
import type { WishlistItem } from "../../data/wishlistData";

interface HomeProps {
  wishlistItems: WishlistItem[];
  onWishlistChange: (items: WishlistItem[]) => void;
}

const Home: React.FC<HomeProps> = ({ wishlistItems, onWishlistChange }) => {
  const [showCategories, setShowCategories] = useState(false);

  const toggleCategories = () => {
    setShowCategories(!showCategories);
  };

  const handleToggleWishlist = (productId: string, productData: {
    id: string;
    name: string;
    image: string;
    price: number;
    originalPrice?: number;
    category: string;
    inStock?: boolean;
  }) => {
    const existingIndex = wishlistItems.findIndex(item => item.id === productId);
    
    if (existingIndex >= 0) {
      // Remove from wishlist
      onWishlistChange(wishlistItems.filter(item => item.id !== productId));
    } else {
      // Add to wishlist
      const newWishlistItem: WishlistItem = {
        id: productData.id,
        name: productData.name,
        image: productData.image,
        price: productData.price,
        originalPrice: productData.originalPrice,
        category: productData.category,
        inStock: productData.inStock,
      };
      onWishlistChange([...wishlistItems, newWishlistItem]);
    }
  };

  return (
    <>
      {/* Banner Section */}
      <div className="px-0 py-0 md:px-6 md:py-6 lg:px-0 lg:py-0">
        <Banner
          images={BannerImages}
          height="h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh]"
          autoSlideInterval={8000}
        />
      </div>

      {/* Mobile Categories Toggle Button - Visible on mobile and medium screens (including Zenbook) */}
      <div className="block lg:hidden bg-white border-y border-gray-200">
        <div className="flex items-center justify-center px-6 py-4">
          {/* Left horizontal line */}
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-gray-400"></div>
          
          {/* Elegant toggle button */}
          <button
            onClick={toggleCategories}
            className="mx-6 px-6 py-3 bg-[var(--category-plate-bg)] hover:bg-[var(--category-hover-bg)] border border-[var(--category-border)] hover:border-[var(--category-text-hover)] rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-out font-poppins font-medium text-[var(--category-text)] hover:text-[var(--category-text-hover)] flex items-center space-x-3 group transform hover:scale-105 active:scale-95 relative overflow-hidden"
          >
            {/* Background animation overlay */}
            <div className={`absolute inset-0 bg-gradient-to-r from-[var(--category-text-hover)]/10 to-transparent transition-all duration-500 ease-out ${
              showCategories ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
            }`}></div>
            
            {/* Icon */}
            <div className="relative z-10">
              <svg
                className={`w-5 h-5 transition-all duration-500 ease-out ${
                  showCategories ? "rotate-180 text-[var(--category-text-hover)]" : "rotate-0"
                } group-hover:text-[var(--category-text-hover)]`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Subtle glow effect */}
              <div className="absolute inset-0 bg-[var(--category-text-hover)] opacity-0 group-hover:opacity-20 blur-sm rounded-full transition-opacity duration-300"></div>
            </div>
            
            {/* Button text */}
            <span className="text-sm font-medium tracking-wide relative z-10 transition-all duration-300">
              {showCategories ? "Hide Categories" : "Show Categories"}
            </span>
            
            {/* Chevron indicator */}
            <svg
              className={`w-4 h-4 transition-all duration-500 ease-out relative z-10 ${
                showCategories ? "rotate-180" : "rotate-0"
              } group-hover:text-[var(--category-text-hover)]`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          
          {/* Right horizontal line */}
          <div className="flex-1 h-px bg-gradient-to-l from-transparent via-gray-300 to-gray-400"></div>
        </div>
      </div>

      {/* Categories Section - Hidden on mobile/medium by default, always visible on large screens */}
      <div className={`lg:block transition-all duration-400 ease-in-out origin-top ${
        showCategories 
          ? "opacity-100 scale-y-100 h-auto" 
          : "opacity-0 scale-y-0 h-0 overflow-hidden"
      }`}>
        <Categories />
      </div>

      {/* Featured Products Section */}
      <ProductGrid
        title="Featured Products"
        products={SampleProducts}
        columns={4}
        maxItems={8}
        wishlistItems={wishlistItems.map(item => item.id)}
        onToggleWishlist={handleToggleWishlist}
      />

      {/* Welcome Section */}
      <main className="w-screen px-4 sm:px-6 lg:px-8 py-8">
        <div className="w-full text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Geolex
          </h1>
          <p className="text-lg text-gray-600">
            Your premier destination for quality computer hardware and
            electronics
          </p>
        </div>
      </main>
    </>
  );
};

export default Home;
