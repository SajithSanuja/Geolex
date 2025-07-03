import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartThin } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './ProductBox.css';

interface ProductBoxProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  inStock?: boolean;
  discount?: number;
  rating?: number;
  reviewCount?: number;
  isInWishlist?: boolean;
  onToggleWishlist?: (productId: string, productData: {
    id: string;
    name: string;
    image: string;
    price: number;
    originalPrice?: number;
    category: string;
    inStock?: boolean;
  }) => void;
  onAddToCart?: (productId: string, productData: {
    id: string;
    name: string;
    image: string;
    price: number;
    originalPrice?: number;
    category: string;
    inStock?: boolean;
  }) => void;
}

// Add performance optimizations to ProductBox
const ProductBox: React.FC<ProductBoxProps> = ({
  id,
  name,
  price,
  originalPrice,
  image,
  category,
  inStock = true,
  discount,
  rating,
  reviewCount: _reviewCount, // Rename to indicate it's intentionally unused
  isInWishlist = false,
  onToggleWishlist,
  onAddToCart,
}) => {
  const hasDiscount = originalPrice && originalPrice > price;
  const discountPercentage = hasDiscount
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : discount;

  const handleWishlistToggle = () => {
    if (onToggleWishlist) {
      onToggleWishlist(id, {
        id,
        name,
        image,
        price,
        originalPrice,
        category,
        inStock,
      });
    }
  };

  const handleAddToCart = () => {
    if (onAddToCart && inStock) {
      onAddToCart(id, {
        id,
        name,
        image,
        price,
        originalPrice,
        category,
        inStock,
      });
    }
  };

  return (
    <div className="bg-white rounded-t-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden group h-full flex flex-col border-gray-100 border-0">
      {/* Product Image Container */}
      <div className="relative bg-gray-50 p-4 flex items-center justify-center" style={{ aspectRatio: "1/1" }}>
        {/* Discount Badge */}
        {discountPercentage && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium z-10">
            Save Rs. {hasDiscount ? (originalPrice! - price).toLocaleString() : `${discountPercentage}% OFF`}
          </div>
        )}


        {/* Add to Cart Icon - Top Right (below wishlist) */}
        {/* Removed - Cart button moved to bottom */}

        {/* Stock Status */}
        <div className="absolute bottom-2 right-2 z-10">
          <span className={`text-xs px-2 py-1 rounded ${
            inStock 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>

        {/* Product Image */}
        <img
          src={image}
          alt={name}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* Product Info Container */}
      <div className="p-4 flex flex-col flex-grow pb-0">
        {/* Product Name */}
        <h3 className="font-medium text-gray-900 mb-2 text-sm leading-tight line-clamp-2">
          {name}
        </h3>

        {/* Rating */}
        {rating && (
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  className={`w-3 h-3 ${
                    index < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                  }`}
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-xs text-gray-500 ml-1">{rating}</span>
            </div>
          </div>
        )}

        <div className="flex-grow"></div>

        {/* Price Section */}
        <div className="mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900">
              Rs. {price.toLocaleString()}
            </span>
            {hasDiscount && (
              <span className="text-sm text-gray-500 line-through">
                Rs. {originalPrice!.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons - Wishlist and Cart */}
        <div className="action-buttons-container">
          {/* Wishlist Heart Icon Button */}
          <button
            className={`wishlist-btn ${
              isInWishlist
                ? "text-[black]"
                : "text-gray-700"
            }`}
            onClick={handleWishlistToggle}
          >
            <FontAwesomeIcon 
              icon={isInWishlist ? faHeartSolid : faHeartThin} 
              className="w-5 h-5" 
            />
          </button>

          {/* Add to Cart Button */}
          <button
            className={`cart-btn ${
              inStock
                ? "bg-black hover:bg-gray-800 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            disabled={!inStock}
            onClick={handleAddToCart}
          >
            <FontAwesomeIcon icon={faShoppingCart} className="w-4 h-4" />
            <span>{inStock ? "Add to cart" : "Out of Stock"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductBox;
