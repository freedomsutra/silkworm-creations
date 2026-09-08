'use client';

import React, { useState, useMemo } from 'react';
import { SareeProduct } from '@/types';
import ProductCard from './ProductCard';
import { SlidersHorizontal, Search, Sparkles, Filter, X, Tag } from 'lucide-react';

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
  const [priceBand, setPriceBand] = useState<'all' | 'under-8500' | '8500-10000' | 'above-10000'>('all');

  const colors = ['All', 'Red', 'Black', 'Green', 'Blue', 'Pink/Purple', 'Gold/Yellow', 'Beige/Neutral'];

  const COLOR_SWATCHES: Record<string, string> = {
    'All': '#D4AF37',
    'Red': '#C41E3A',
    'Black': '#1A1A1A',
    'Green': '#1B4D3E',
    'Blue': '#1E3F66',
    'Pink/Purple': '#9B4D68',
    'Gold/Yellow': '#D4AF37',
    'Beige/Neutral': '#D2B48C',
  };

  const colorCounts = useMemo(() => {
    const counts: Record<string, number> = { All: products.length };
    products.forEach((p) => {
      counts[p.primaryColor] = (counts[p.primaryColor] || 0) + 1;
    });
    return counts;
  }, [products]);

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

      // Price band
      if (priceBand === 'under-8500' && p.price >= 8500) return false;
      if (priceBand === '8500-10000' && (p.price < 8500 || p.price > 10000)) return false;
      if (priceBand === 'above-10000' && p.price <= 10000) return false;

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
  }, [products, selectedCategory, selectedColor, priceBand, searchQuery, sortBy]);

  return (
    <section id="catalog-section" className="py-14 sm:py-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-w-0">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 w-full px-2">
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
      <div className="bg-white rounded-3xl p-4 sm:p-6 border border-stone-200/90 shadow-sm mb-8 space-y-4 w-full max-w-full min-w-0 overflow-hidden">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between w-full min-w-0">
          
          {/* Search Input */}
          <div className="relative w-full md:w-80 min-w-0">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by weave, color, occasion..."
              className="w-full pl-10 pr-8 py-2.5 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:border-gold-500 transition-colors"
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

          {/* Budget Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 min-w-0 scrollbar-none">
            <span className="text-xs text-stone-500 font-semibold flex items-center gap-1 flex-shrink-0">
              <Tag className="w-3.5 h-3.5 text-gold-600" />
              <span>Budget:</span>
            </span>
            <button
              onClick={() => setPriceBand('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-full whitespace-nowrap transition-all flex-shrink-0 ${
                priceBand === 'all' ? 'bg-emerald-950 text-gold-300 border border-gold-400/50 shadow-xs' : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-200/60'
              }`}
            >
              All Prices
            </button>

            <button
              onClick={() => setPriceBand('under-8500')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-full whitespace-nowrap transition-all flex-shrink-0 ${
                priceBand === 'under-8500' ? 'bg-emerald-950 text-gold-300 border border-gold-400/50 shadow-xs' : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-200/60'
              }`}
            >
              Under ₹8,500
            </button>
            <button
              onClick={() => setPriceBand('8500-10000')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-full whitespace-nowrap transition-all flex-shrink-0 ${
                priceBand === '8500-10000' ? 'bg-emerald-950 text-gold-300 border border-gold-400/50 shadow-xs' : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-200/60'
              }`}
            >
              ₹8,500 - ₹10,000
            </button>
            <button
              onClick={() => setPriceBand('above-10000')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-full whitespace-nowrap transition-all flex-shrink-0 ${
                priceBand === 'above-10000' ? 'bg-emerald-950 text-gold-300 border border-gold-400/50 shadow-xs' : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-200/60'
              }`}
            >
              ₹10,000+ Luxury
            </button>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end min-w-0 flex-shrink-0">
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
        <div className="pt-3 border-t border-stone-100 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none w-full min-w-0">
          <span className="text-xs text-stone-500 font-semibold flex-shrink-0 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-gold-600" />
            <span>Palette:</span>
          </span>
          {colors.map((c) => {
            const count = colorCounts[c] || 0;
            return (
              <button
                key={c}
                onClick={() => setSelectedColor(c)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 flex-shrink-0 ${
                  selectedColor === c
                    ? 'bg-emerald-950 text-white border border-gold-400/60 shadow-sm ring-1 ring-gold-400/20'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-200/60'
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full border border-black/15 shadow-2xs flex-shrink-0"
                  style={{ backgroundColor: COLOR_SWATCHES[c] || '#D4AF37' }}
                />
                <span>{c}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                  selectedColor === c ? 'bg-gold-500 text-emerald-950' : 'bg-stone-200 text-stone-600'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-stone-200 p-8">
          <p className="font-serif text-lg font-bold text-emerald-950 mb-2">No Sarees Found</p>
          <p className="text-xs text-stone-500 max-w-sm mx-auto mb-4">
            We couldn't find any sarees matching your filters. Try resetting your search query or selecting "All Sarees".
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedColor('All');
              setPriceBand('all');
              onCategoryChange('All');
            }}
            className="px-5 py-2.5 rounded-full bg-emerald-900 text-gold-300 text-xs font-bold"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full min-w-0">

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
