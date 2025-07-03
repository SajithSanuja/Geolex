import React from "react";
import ProductBox from "../ProductBox/ProductBox";

interface Product {
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

interface ProductGridProps {
  title: string;
  products: Product[];
  maxItems?: number;
  columns?: number;
  wishlistItems?: string[]; // Array of product IDs that are in wishlist
  onToggleWishlist?: (productId: string, productData: {
    id: string;
    name: string;
    image: string;
    price: number;
    originalPrice?: number;
    category: string;
    inStock?: boolean;
  }) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  title = "Popular products",
  products,
  maxItems,
  columns,
  wishlistItems = [],
  onToggleWishlist,
}) => {
  const displayProducts = maxItems ? products.slice(0, maxItems) : products;

  return (
    <section className="w-full py-4 sm:py-6 lg:py-8 bg-white">
      {/* Responsive Container - Adjusted padding for different screen sizes */}
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-[6%] xl:px-[8%]">
        {/* Section Title - Responsive */}
        <div className="mb-4 sm:mb-6 lg:mb-8">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
            {title}
          </h2>
        </div>

        {/* Products Grid - Fully Responsive */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-6">
          {displayProducts.map((product) => (
            <ProductBox
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              originalPrice={product.originalPrice}
              image={product.image}
              category={product.category}
              inStock={product.inStock}
              discount={product.discount}
              rating={product.rating}
              reviewCount={product.reviewCount}
              isInWishlist={wishlistItems.includes(product.id)}
              onToggleWishlist={onToggleWishlist}
            />
          ))}
        </div>

        {/* View More Button - Responsive */}
        {maxItems && products.length > maxItems && (
          <div className="text-center mt-6 sm:mt-8 lg:mt-10">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 sm:px-8 sm:py-3 rounded-lg font-medium text-sm sm:text-base transition-colors duration-200 w-full sm:w-auto">
              View All Products
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;
