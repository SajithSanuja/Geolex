import React from 'react';
import ProductCard from '../ProductCard/ProductCard';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  inStock: boolean;
  isOnSale?: boolean;
  isWishlisted?: boolean;
  brand?: string;
  availability?: string;
}

interface CategoryProductGridProps {
  products: Product[];
  onAddToWishlist: (id: string) => void;
  onAddToCart: (id: string) => void;
  onQuickView: (id: string) => void;
}

const CategoryProductGrid: React.FC<CategoryProductGridProps> = ({
  products,
  onAddToWishlist,
  onAddToCart,
  onQuickView,
}) => {
  if (products.length === 0) {
    return (
      <div className="flex items-center justify-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No products found</h3>
          <p className="text-gray-500">Try adjusting your filters or search criteria</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          price={product.price}
          originalPrice={product.originalPrice}
          image={product.image}
          category={product.category}
          inStock={product.inStock}
          isOnSale={product.isOnSale}
          isWishlisted={product.isWishlisted}
          onAddToWishlist={onAddToWishlist}
          onAddToCart={onAddToCart}
          onQuickView={onQuickView}
        />
      ))}
    </div>
  );
};

export default CategoryProductGrid;
