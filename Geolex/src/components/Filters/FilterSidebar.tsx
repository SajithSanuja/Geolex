import React, { useState, useRef, useCallback } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import './FilterSidebar.css';

interface FilterOption {
  id: string;
  name: string;
  count?: number;
}

interface FilterSection {
  title: string;
  options: FilterOption[];
  type: 'checkbox' | 'radio';
}

interface FilterSidebarProps {
  filters: FilterSection[];
  selectedFilters: Record<string, string[]>;
  onFilterChange: (sectionTitle: string, optionId: string, isSelected: boolean) => void;
  priceRange: { min: number; max: number };
  selectedPriceRange: { min: number; max: number };
  onPriceRangeChange: (range: { min: number; max: number }) => void;
}

const DualRangeSlider: React.FC<{
  min: number;
  max: number;
  value: { min: number; max: number };
  onChange: (value: { min: number; max: number }) => void;
}> = ({ min, max, value, onChange }) => {
  const [isDragging, setIsDragging] = useState<'min' | 'max' | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const getValueFromPosition = useCallback((clientX: number) => {
    if (!sliderRef.current) return min;
    
    const rect = sliderRef.current.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    return Math.round(min + percentage * (max - min));
  }, [min, max]);

  const handleMouseDown = useCallback((type: 'min' | 'max') => (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(type);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    
    const newValue = getValueFromPosition(e.clientX);
    
    if (isDragging === 'min') {
      onChange({ min: Math.min(newValue, value.max), max: value.max });
    } else {
      onChange({ min: value.min, max: Math.max(newValue, value.min) });
    }
  }, [isDragging, getValueFromPosition, value, onChange]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(null);
  }, []);

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const minPercent = ((value.min - min) / (max - min)) * 100;
  const maxPercent = ((value.max - min) / (max - min)) * 100;

  return (
    <div className="dual-range-container" ref={sliderRef}>
      {/* Background Track */}
      <div className="slider-track-bg"></div>
      
      {/* Active Range */}
      <div 
        className="slider-track-active"
        style={{
          left: `${minPercent}%`,
          width: `${maxPercent - minPercent}%`
        }}
      ></div>
      
      {/* Min Thumb */}
      <div 
        className="slider-thumb slider-thumb-min"
        style={{ left: `${minPercent}%` }}
        onMouseDown={handleMouseDown('min')}
      ></div>
      
      {/* Max Thumb */}
      <div 
        className="slider-thumb slider-thumb-max"
        style={{ left: `${maxPercent}%` }}
        onMouseDown={handleMouseDown('max')}
      ></div>
    </div>
  );
};

interface FilterSidebarProps {
  filters: FilterSection[];
  selectedFilters: Record<string, string[]>;
  onFilterChange: (sectionTitle: string, optionId: string, isSelected: boolean) => void;
  priceRange: { min: number; max: number };
  selectedPriceRange: { min: number; max: number };
  onPriceRangeChange: (range: { min: number; max: number }) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  selectedFilters,
  onFilterChange,
  priceRange,
  selectedPriceRange,
  onPriceRangeChange,
}) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(filters.map(f => f.title))
  );

  const toggleSection = (title: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(title)) {
      newExpanded.delete(title);
    } else {
      newExpanded.add(title);
    }
    setExpandedSections(newExpanded);
  };

  const formatPrice = (price: number) => {
    return `Rs. ${price.toLocaleString()}`;
  };

  return (
    <div className="w-full max-w-sm text-gray-900 p-6 rounded-lg shadow-lg border border-gray-200" style={{ backgroundColor: 'white' }}>
      <h2 className="text-xl font-bold mb-6 text-gray-900">FILTERS</h2>
      
      {/* Product Brands */}
      {filters.map((section) => (
        <div key={section.title} className="mb-6">
          <div 
            className="flex items-center justify-between cursor-pointer mb-4"
            onClick={() => toggleSection(section.title)}
          >
            <h3 className="text-lg font-semibold text-gray-900 uppercase tracking-wide">
              {section.title}
            </h3>
            {expandedSections.has(section.title) ? (
              <ChevronUpIcon className="w-5 h-5 text-gray-700" />
            ) : (
              <ChevronDownIcon className="w-5 h-5 text-gray-700" />
            )}
          </div>
          
          {expandedSections.has(section.title) && (
            <div className="space-y-3">
              {section.options.map((option) => (
                <label
                  key={option.id}
                  className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 p-2 rounded transition-colors"
                >
                  <input
                    type={section.type}
                    name={section.type === 'radio' ? section.title : undefined}
                    checked={selectedFilters[section.title]?.includes(option.id) || false}
                    onChange={(e) => onFilterChange(section.title, option.id, e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="text-gray-900 flex-1">{option.name}</span>
                  {option.count && (
                    <span className="text-gray-500 text-sm">({option.count})</span>
                  )}
                </label>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Price Range Filter */}
      <div className="mb-6">
        <div 
          className="flex items-center justify-between cursor-pointer mb-4"
          onClick={() => toggleSection('FILTER BY PRICE')}
        >
          <h3 className="text-lg font-semibold text-gray-900 uppercase tracking-wide">
            FILTER BY PRICE
          </h3>
          {expandedSections.has('FILTER BY PRICE') ? (
            <ChevronUpIcon className="w-5 h-5 text-gray-700" />
          ) : (
            <ChevronDownIcon className="w-5 h-5 text-gray-700" />
          )}
        </div>
        
        {expandedSections.has('FILTER BY PRICE') && (
          <div className="space-y-4">
            {/* Price Range Slider */}
            <div className="px-2">
              <div className="relative mb-6">
                <DualRangeSlider
                  min={priceRange.min}
                  max={priceRange.max}
                  value={selectedPriceRange}
                  onChange={onPriceRangeChange}
                />
                <div className="flex justify-between text-sm text-gray-600 mt-3">
                  <span className="font-medium">{formatPrice(selectedPriceRange.min)}</span>
                  <span className="font-medium">{formatPrice(selectedPriceRange.max)}</span>
                </div>
              </div>
            </div>
            
            {/* Price Input Fields */}
            <div className="flex space-x-2">
              <div className="flex-1">
                <input
                  type="number"
                  value={selectedPriceRange.min}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (value <= selectedPriceRange.max && value >= priceRange.min) {
                      onPriceRangeChange({ min: value, max: selectedPriceRange.max });
                    }
                  }}
                  min={priceRange.min}
                  max={selectedPriceRange.max}
                  className="w-full px-3 py-2 bg-white text-gray-900 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Min"
                />
              </div>
              <div className="flex-1">
                <input
                  type="number"
                  value={selectedPriceRange.max}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (value >= selectedPriceRange.min && value <= priceRange.max) {
                      onPriceRangeChange({ min: selectedPriceRange.min, max: value });
                    }
                  }}
                  min={selectedPriceRange.min}
                  max={priceRange.max}
                  className="w-full px-3 py-2 bg-white text-gray-900 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Max"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterSidebar;
