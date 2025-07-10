import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FilterSidebar from '../../components/Filters/FilterSidebar';
import ProductSort from '../../components/ProductSort/ProductSort';
import CategoryProductGrid from '../../components/CategoryProductGrid/CategoryProductGrid';
import Pagination from '../../components/Pagination/Pagination';
import { sampleProducts, filterData, priceRange } from '../../data/categoryData';
import type { Product } from '../../data/categoryData';
import type { WishlistItem } from '../../data/wishlistData';
import type { CartItem } from '../../data/cartData';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

interface FilterSection {
  title: string;
  options: Array<{ id: string; name: string; count?: number }>;
  type: 'checkbox' | 'radio';
}

interface CategoryPageProps {
  wishlistItems?: WishlistItem[];
  onWishlistChange?: (items: WishlistItem[]) => void;
  cartItems?: CartItem[];
  onCartChange?: (items: CartItem[]) => void;
}

const CategoryPage: React.FC<CategoryPageProps> = ({ 
  wishlistItems = [], 
  onWishlistChange,
  cartItems = [],
  onCartChange 
}) => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [products] = useState<Product[]>(sampleProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(sampleProducts);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRange);
  const [sortBy, setSortBy] = useState('default');
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const itemsPerPage = 12;

  // Category name mapping
  const categoryNames: Record<string, string> = {
    'laptops': 'Laptops',
    'used-desktop': 'Used Desktop',
    'brand-new-desktop': 'Brand New Desktop',
    'processors': 'Processors',
    'motherboards': 'Motherboards',
    'memory': 'Memory',
    'casing': 'Casing',
    'monitors': 'Monitors',
    'storage-odd': 'Storage & ODD',
    'ssd': 'SSD',
    'power-supply': 'Power Supply',
    'graphics-card': 'Graphics Card',
    'cooling': 'Cooling',
    'speaker-headphone': 'Speaker & Headphone',
    'laptop-accessories': 'Laptop Accessories',
    'printers-accessories': 'Printers & Accessories',
    'network-accessories': 'Network Accessories',
    'pen-drive-sd-card': 'Pen Drive & SD Card',
    'accessories': 'Accessories',
    'pcie-adapters-cables': 'PCIe Adapters & Cables',
    'keyboard-mouse': 'Keyboard & Mouse',
  };

  const currentCategoryName = categoryId ? categoryNames[categoryId] || 'All Products' : 'All Products';

  // Filter sections configuration
  const filterSections: FilterSection[] = [
    {
      title: 'PRODUCT BRANDS',
      options: filterData.brands,
      type: 'checkbox'
    },
    {
      title: 'PRODUCT AVAILABILITY',
      options: filterData.availability,
      type: 'checkbox'
    }
  ];

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...products];

    // Apply category filter if a specific category is selected
    if (categoryId) {
      const categoryMapping: Record<string, string> = {
        'laptops': 'LAPTOPS',
        'used-desktop': 'USED-DESKTOP',
        'brand-new-desktop': 'DESKTOPS',
        'processors': 'PROCESSORS',
        'motherboards': 'MOTHERBOARDS',
        'memory': 'MEMORY',
        'monitors': 'MONITORS',
        'ssd': 'SSD',
        'keyboard-mouse': 'KEYBOARD-MOUSE',
      };
      
      const categoryFilter = categoryMapping[categoryId];
      if (categoryFilter) {
        filtered = filtered.filter(product => 
          product.category.toUpperCase() === categoryFilter
        );
      }
    }

    // Apply brand filters
    if (selectedFilters['PRODUCT BRANDS']?.length > 0) {
      filtered = filtered.filter(product => 
        selectedFilters['PRODUCT BRANDS'].some(brandId => 
          product.brand.toLowerCase() === brandId.toLowerCase()
        )
      );
    }

    // Apply availability filters
    if (selectedFilters['PRODUCT AVAILABILITY']?.length > 0) {
      filtered = filtered.filter(product => {
        const availability = selectedFilters['PRODUCT AVAILABILITY'];
        if (availability.includes('in-stock')) return product.inStock;
        if (availability.includes('out-of-stock')) return !product.inStock;
        return true;
      });
    }

    // Apply price range filter
    filtered = filtered.filter(product => 
      product.price >= selectedPriceRange.min && product.price <= selectedPriceRange.max
    );

    // Apply sorting
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'popularity':
        // Sort by in-stock first, then by price
        filtered.sort((a, b) => {
          if (a.inStock === b.inStock) return a.price - b.price;
          return a.inStock ? -1 : 1;
        });
        break;
      case 'date':
        // Sort by newest first (reverse order)
        filtered.reverse();
        break;
      default:
        // Default sorting
        break;
    }

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [selectedFilters, selectedPriceRange, sortBy, products, categoryId]);

  const handleFilterChange = (sectionTitle: string, optionId: string, isSelected: boolean) => {
    setSelectedFilters(prev => {
      const newFilters = { ...prev };
      if (!newFilters[sectionTitle]) {
        newFilters[sectionTitle] = [];
      }
      
      if (isSelected) {
        newFilters[sectionTitle] = [...newFilters[sectionTitle], optionId];
      } else {
        newFilters[sectionTitle] = newFilters[sectionTitle].filter(id => id !== optionId);
      }
      
      return newFilters;
    });
  };

  const handlePriceRangeChange = (range: { min: number; max: number }) => {
    setSelectedPriceRange(range);
  };

  const handleSortChange = (newSortBy: string) => {
    setSortBy(newSortBy);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToWishlist = (productId: string, productData: {
    id: string;
    name: string;
    image: string;
    price: number;
    originalPrice?: number;
    category: string;
    inStock?: boolean;
  }) => {
    if (!onWishlistChange) return;

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

  const handleAddToCart = (productId: string, productData: {
    id: string;
    name: string;
    image: string;
    price: number;
    originalPrice?: number;
    category: string;
    inStock?: boolean;
  }) => {
    if (!onCartChange || !productData.inStock) return;

    const existingItemIndex = cartItems.findIndex(item => item.id === productId);
    
    if (existingItemIndex >= 0) {
      // Item exists, increase quantity
      const updatedCartItems = cartItems.map(item =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      onCartChange(updatedCartItems);
    } else {
      // Add new item to cart
      const newCartItem: CartItem = {
        id: productData.id,
        name: productData.name,
        image: productData.image,
        price: productData.price,
        quantity: 1,
      };
      onCartChange([...cartItems, newCartItem]);
    }
  };

  const handleQuickView = (id: string) => {
    console.log('Quick view:', id);
    // Implement quick view logic here
  };

  // Pagination calculations
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background-color)' }}>
      {/* Page Header */}
      <div className="py-8" style={{ backgroundColor: 'var(--category-bg)' }}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-white">{currentCategoryName}</h1>
            <div className="text-sm text-gray-300">
              <span>Home</span>
              <span className="mx-2">/</span>
              <span className="text-white">{currentCategoryName}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden mb-6">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg text-gray-900 hover:bg-gray-50 transition-colors border border-gray-300 shadow-sm"
            >
              {isFilterOpen ? (
                <>
                  <XMarkIcon className="w-5 h-5" />
                  <span>Close Filters</span>
                </>
              ) : (
                <>
                  <Bars3Icon className="w-5 h-5" />
                  <span>Show Filters</span>
                </>
              )}
            </button>
          </div>

          {/* Filter Sidebar */}
          <div className={`
            lg:block lg:w-80 flex-shrink-0
            ${isFilterOpen ? 'block' : 'hidden'}
            ${isFilterOpen ? 'mb-8' : ''}
          `}>
            <FilterSidebar
              filters={filterSections}
              selectedFilters={selectedFilters}
              onFilterChange={handleFilterChange}
              priceRange={priceRange}
              selectedPriceRange={selectedPriceRange}
              onPriceRangeChange={handlePriceRangeChange}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Product Sort */}
            <ProductSort
              sortBy={sortBy}
              onSortChange={handleSortChange}
              totalResults={filteredProducts.length}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
            />

            {/* Products Grid */}
            <CategoryProductGrid
              products={currentProducts}
              onAddToWishlist={handleAddToWishlist}
              onAddToCart={handleAddToCart}
              onQuickView={handleQuickView}
              wishlistItems={wishlistItems}
            />

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
