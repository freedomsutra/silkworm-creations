'use client';

import React, { useState, useMemo } from 'react';
import { SareeProduct } from '@/types';
import ProductCard from './ProductCard';
import { SlidersHorizontal, Search, Sparkles, Filter, X } from 'lucide-react';

interface CatalogSectionProps {
  products: SareeProduct[];
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  onQuickView: (product: SareeProduct) => void;
  onWatchDrape: (product: SareeProduct) => void;
}

export default function CatalogSection({
  products,
  selectedCategory,
  onCategoryChange,
  onQuickView,
  onWatchDrape,
}: CatalogSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedColor, setSelectedColor] = useState('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(15000);

  const colors = ['All', 'Red', 'Black', 'Green', 'Blue', 'Pink/Purple', 'Gold/Yellow', 'Beige/Neutral'];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category match
      if (selectedCategory !== 'All') {
        const matchesCat = 
          p.fabric.toLowerCase().includes(selectedCategory.toLowerCase()) ||
          p.occasion.toLowerCase() === selectedCategory.toLowerCase() ||
          p.tags.some(t => t.toLowerCase().includes(selectedCategory.toLowerCase()));
        if (!matchesCat) return false;
      }

      // Color match
      if (selectedColor !== 'All' && p.primaryColor !== selectedColor) {
        return false;
      }

      // Max price
      if (p.price > maxPrice) return false;

      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesQuery = 
          p.title.toLowerCase().includes(q) ||
          p.fabric.toLowerCase().includes(q) ||
          p.tags.some(t => t.toLowerCase().includes(q));
        if (!matchesQuery) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [products, selectedCategory, selectedColor, maxPrice, searchQuery, sortBy]);

  return (
    <section id="catalog-section" className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/10 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5 text-gold-600" />
          <span>Handpicked Artisan Collection</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-emerald-950">
          The Saree Repertory
        </h2>
        <p className="text-stone-600 text-sm mt-2">
          Every piece is handcrafted with pure yarns, inspected at our Chandigarh boutique, and delivered ready-to-wear with complimentary Fall &amp; Pico.
        </p>
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200/80 shadow-sm mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by weave, color, occasion..."
              className="w-full pl-10 pr-8 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:border-gold-500 transition-colors"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end">
            <span className="text-xs text-stone-500 font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="py-2 px-3 text-xs rounded-xl bg-stone-50 border border-stone-200 font-semibold text-stone-800 focus:outline-none focus:border-gold-500"
            >
              <option value="featured">Featured Collection</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Customer Rating</option>
            </select>
          </div>
        </div>

        {/* Color Chips Horizontal Scroll */}
        <div className="pt-3 border-t border-stone-100 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs text-stone-500 font-semibold flex-shrink-0 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-gold-600" />
            <span>Palette:</span>
          </span>
          {colors.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedColor(c)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedColor === c
                  ? 'bg-emerald-900 text-gold-300'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-stone-200 p-8">
          <p className="font-serif text-lg font-bold text-emerald-950 mb-2">No Sarees Found</p>
          <p className="text-xs text-stone-500 max-w-sm mx-auto mb-4">
            We couldn't find any sarees matching your filters. Try clearing your search query or selecting "All Sarees".
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedColor('All');
              onCategoryChange('All');
            }}
            className="px-5 py-2.5 rounded-full bg-emerald-900 text-gold-300 text-xs font-bold"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={onQuickView}
              onWatchDrape={onWatchDrape}
            />
          ))}
        </div>
      )}
    </section>
  );
}
