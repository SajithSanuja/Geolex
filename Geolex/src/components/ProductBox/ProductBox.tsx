import React from "react";

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
  reviewCount,
}) => {
  const hasDiscount = originalPrice && originalPrice > price;
  const discountPercentage = hasDiscount
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : discount;

  return (
    <div className="relative rounded-lg overflow-hidden group h-full flex flex-col">
      {/* Background */}
      <div className="absolute inset-0 bg-white/20 border border-white/30 rounded-lg shadow-xl"></div>

      {/* Content Container */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Product Image Container - Enhanced Responsive */}
        <div
          className="relative overflow-hidden flex-shrink-0"
          style={{
            aspectRatio: "1/1",
            backgroundColor: "#6b72801a",
          }}
        >
          {/* Responsive Wishlist Heart Icon */}
          <button className="absolute top-1 sm:top-1.5 md:top-2 right-1 sm:right-1.5 md:right-2 z-20 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-white/30 hover:bg-white/50 rounded-full flex items-center justify-center shadow-lg border border-white/40 transition-all duration-200">
            <svg
              className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 text-gray-700 hover:text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>

          {/* Responsive Discount Badge */}
          {discountPercentage && (
            <div className="absolute top-1 sm:top-1.5 md:top-2 left-1 sm:left-1.5 md:left-2 bg-red-500/90 text-white px-1 py-0.5 sm:px-1.5 sm:py-0.5 md:px-2 md:py-1 rounded border border-red-400/50 text-xs sm:text-xs md:text-sm font-semibold shadow-lg">
              -{discountPercentage}%
            </div>
          )}

          <img
            src={image}
            alt={name}
            className="w-full h-full object-contain p-1 sm:p-1.5 md:p-2 lg:p-3 group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* Enhanced Responsive Product Info */}
        <div className="p-1.5 sm:p-2 md:p-2.5 lg:p-3 bg-gradient-to-b from-slate-900/95 to-slate-950/98 border-t border-slate-700/30 flex flex-col flex-grow">
          {/* Responsive Product Name */}
          <h3 className="font-medium text-white mb-1 text-xs sm:text-sm md:text-base lg:text-lg leading-tight line-clamp-2 drop-shadow-lg">
            {name}
          </h3>

          {/* Responsive Category */}
          <p className="text-xs sm:text-sm md:text-sm text-slate-300/90 mb-1 sm:mb-1.5 line-clamp-1 drop-shadow-md">
            - {category} -
          </p>

          {/* Responsive Rating */}
          {rating && (
            <div className="flex items-center justify-center mb-1 sm:mb-1.5 md:mb-2">
              <div className="flex items-center text-yellow-400 bg-slate-800/40 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full border border-slate-600/40">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    className={`w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 drop-shadow-sm ${
                      index < Math.floor(rating) ? "fill-current" : "text-gray-400"
                    }`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-xs sm:text-sm text-white ml-0.5 sm:ml-1 drop-shadow-sm">
                  {rating}
                </span>
              </div>
            </div>
          )}

          <div className="flex-grow"></div>

          {/* Responsive Price */}
          <div className="text-center mb-1 sm:mb-1.5 md:mb-2 bg-slate-800/30 rounded-lg py-1.5 sm:py-2 border border-slate-600/40">
            <div className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white drop-shadow-lg">
              Rs. {price.toLocaleString()}
            </div>
            {hasDiscount && (
              <div className="text-xs sm:text-sm md:text-sm text-slate-400/80 line-through drop-shadow-md">
                Rs. {originalPrice.toLocaleString()}
              </div>
            )}
          </div>

          {/* Responsive Buy Button */}
          <button
            className={`w-full py-1 sm:py-1.5 md:py-2 px-2 sm:px-3 rounded font-medium text-xs sm:text-sm md:text-base transition-all duration-200 border shadow-lg ${
              inStock
                ? "bg-slate-700/80 hover:bg-[#13ee9e] text-white border-slate-500/50 hover:border-[#13ee9e]/70 hover:shadow-[#13ee9e]/25"
                : "bg-gray-700/50 text-gray-400 cursor-not-allowed border-gray-600/30"
            }`}
            disabled={!inStock}
          >
            {inStock ? "Buy now" : "Out of Stock"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductBox;
