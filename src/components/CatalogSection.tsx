'use client';

import React, { useState, useMemo } from 'react';
import { SareeProduct } from '@/types';
import ProductCard from './ProductCard';
import { Search, Sparkles, Filter, X, Tag, ChevronDown, Layers, Check } from 'lucide-react';

interface CatalogSectionProps {
  products: SareeProduct[];
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  onQuickView: (product: SareeProduct) => void;
  onWatchDrape: (product: SareeProduct) => void;
}

const CATEGORY_TABS = [
  { id: 'All', label: 'All Sarees' },
  { id: 'Pure Linen', label: 'Pure Linen' },
  { id: 'Banarasi Tissue', label: 'Banarasi Tissue' },
  { id: 'Handloom Cotton', label: 'Handloom Cotton' },
  { id: 'Wedding', label: 'Wedding & Festive' },
];

const COLORS = ['All', 'Red', 'Black', 'Green', 'Blue', 'Pink/Purple', 'Gold/Yellow', 'Beige/Neutral'];

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

function matchesCategory(p: SareeProduct, cat: string): boolean {
  if (cat === 'All') return true;
  const fabric = p.fabric.toLowerCase();
  const occasion = p.occasion.toLowerCase();
  const title = p.title.toLowerCase();
  const tags = p.tags.map(t => t.toLowerCase());

  if (cat === 'Pure Linen') {
    return fabric.includes('linen') || tags.some(t => t.includes('linen'));
  }
  if (cat === 'Banarasi Tissue') {
    return (
      fabric.includes('banarasi') || 
      fabric.includes('tissue') || 
      title.includes('banarasi') || 
      title.includes('tissue') || 
      tags.some(t => t.includes('banarasi') || t.includes('tissue'))
    );
  }
  if (cat === 'Handloom Cotton') {
    return fabric.includes('cotton') || tags.some(t => t.includes('cotton'));
  }
  if (cat === 'Wedding') {
    return occasion === 'wedding' || tags.some(t => t.includes('wedding')) || tags.some(t => t.includes('festive'));
  }

  const catLower = cat.toLowerCase();
  return (
    fabric.includes(catLower) ||
    occasion === catLower ||
    tags.some(t => t.includes(catLower))
  );
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
  const [isExpanded, setIsExpanded] = useState(false);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: products.length };
    CATEGORY_TABS.forEach(tab => {
      if (tab.id !== 'All') {
        counts[tab.id] = products.filter(p => matchesCategory(p, tab.id)).length;
      }
    });
    return counts;
  }, [products]);

  // Color counts
  const colorCounts = useMemo(() => {
    const counts: Record<string, number> = { All: products.length };
    products.forEach((p) => {
      counts[p.primaryColor] = (counts[p.primaryColor] || 0) + 1;
    });
    return counts;
  }, [products]);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category match
      if (!matchesCategory(p, selectedCategory)) {
        return false;
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

  const hasActiveFilter = searchQuery.trim() !== '' || selectedColor !== 'All' || priceBand !== 'all' || selectedCategory !== 'All';
  const displayedProducts = (hasActiveFilter || isExpanded) ? filteredProducts : filteredProducts.slice(0, 8);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedColor('All');
    setPriceBand('all');
    onCategoryChange('All');
  };

  return (
    <section id="catalog-section" className="py-14 sm:py-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-w-0">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 w-full px-2">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-900/10 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-2.5">
          <Sparkles className="w-3.5 h-3.5 text-gold-600" />
          <span>Handpicked Artisan Collection</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-emerald-950">
          The Saree Repertory
        </h2>
        <p className="text-stone-600 text-xs sm:text-sm mt-2.5 max-w-lg mx-auto">
          Every piece is handcrafted with pure yarns, inspected at our Chandigarh boutique, and delivered ready-to-wear with complimentary Fall &amp; Pico.
        </p>
      </div>

      {/* Sticky High-Fashion Visual Filter Bar */}
      <div className="sticky top-[56px] sm:top-[66px] lg:top-[74px] z-30 bg-white/95 backdrop-blur-xl rounded-3xl p-3 sm:p-5 border border-stone-200/90 shadow-[0_8px_30px_rgba(0,0,0,0.06)] mb-8 space-y-3.5 w-full max-w-full min-w-0 overflow-hidden transition-all">
        
        {/* Row 1: Category Quick-Tabs */}
        <div className="flex items-center justify-between gap-2 border-b border-stone-100 pb-2.5">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none w-full min-w-0">
            <span className="text-xs text-stone-500 font-bold uppercase tracking-wider flex items-center gap-1 flex-shrink-0 mr-1 hidden sm:flex">
              <Layers className="w-3.5 h-3.5 text-gold-600" />
              <span>Weave:</span>
            </span>
            {CATEGORY_TABS.map((cat) => {
              const isActive = selectedCategory === cat.id;
              const count = categoryCounts[cat.id] ?? 0;
              return (
                <button
                  key={cat.id}
                  onClick={() => onCategoryChange(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 flex-shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-emerald-950 text-gold-300 shadow-sm ring-1 ring-gold-400/30'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-200/80'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isActive ? 'bg-gold-500/20 text-gold-300' : 'bg-stone-200 text-stone-600'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {hasActiveFilter && (
            <button
              onClick={resetFilters}
              className="text-xs text-stone-500 hover:text-emerald-900 font-semibold underline flex-shrink-0 ml-2 whitespace-nowrap"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Row 2: Search, Budget Pills & Sort */}
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between w-full min-w-0">
          
          {/* Search Input */}
          <div className="relative w-full md:w-72 min-w-0">
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
                aria-label="Clear search"
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
              className={`px-3 py-1.5 text-xs font-semibold rounded-full whitespace-nowrap transition-all flex-shrink-0 cursor-pointer ${
                priceBand === 'all' ? 'bg-emerald-950 text-gold-300 border border-gold-400/50 shadow-xs' : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-200/60'
              }`}
            >
              All Prices
            </button>

            <button
              onClick={() => setPriceBand('under-8500')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-full whitespace-nowrap transition-all flex-shrink-0 cursor-pointer ${
                priceBand === 'under-8500' ? 'bg-emerald-950 text-gold-300 border border-gold-400/50 shadow-xs' : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-200/60'
              }`}
            >
              Under ₹8,500
            </button>
            <button
              onClick={() => setPriceBand('8500-10000')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-full whitespace-nowrap transition-all flex-shrink-0 cursor-pointer ${
                priceBand === '8500-10000' ? 'bg-emerald-950 text-gold-300 border border-gold-400/50 shadow-xs' : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-200/60'
              }`}
            >
              ₹8,500 - ₹10,000
            </button>
            <button
              onClick={() => setPriceBand('above-10000')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-full whitespace-nowrap transition-all flex-shrink-0 cursor-pointer ${
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
              className="py-1.5 px-2.5 text-xs rounded-xl bg-stone-50 border border-stone-200 font-semibold text-stone-800 focus:outline-none focus:border-gold-500 cursor-pointer"
            >
              <option value="featured">Featured Collection</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Customer Rating</option>
            </select>
          </div>
        </div>

        {/* Row 3: Color Swatch Chips Horizontal Scroll */}
        <div className="pt-2.5 border-t border-stone-100 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none w-full min-w-0">
          <span className="text-xs text-stone-500 font-semibold flex-shrink-0 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-gold-600" />
            <span>Palette:</span>
          </span>
          {COLORS.map((c) => {
            const count = colorCounts[c] || 0;
            const isSelected = selectedColor === c;
            return (
              <button
                key={c}
                onClick={() => setSelectedColor(c)}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 flex-shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-950 text-white border border-gold-400/60 shadow-sm ring-1 ring-gold-400/20'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-200/60'
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full border border-black/15 shadow-2xs flex-shrink-0"
                  style={{ backgroundColor: COLOR_SWATCHES[c] || '#D4AF37' }}
                />
                <span>{c}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  isSelected ? 'bg-gold-500 text-emerald-950' : 'bg-stone-200 text-stone-600'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between mb-6 px-1">
        <p className="text-xs font-semibold text-stone-500">
          Showing <span className="text-emerald-950 font-bold">{displayedProducts.length}</span> of{' '}
          <span className="text-emerald-950 font-bold">{filteredProducts.length}</span> handcrafted sarees
        </p>
        {selectedCategory !== 'All' && (
          <span className="text-xs font-bold text-gold-700 uppercase tracking-wider">
            {selectedCategory} Edit
          </span>
        )}
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-8 shadow-xs">
          <p className="font-serif text-lg font-bold text-emerald-950 mb-2">No Sarees Found</p>
          <p className="text-xs text-stone-500 max-w-sm mx-auto mb-4">
            We couldn't find any sarees matching your filters. Try resetting your search query or selecting "All Sarees".
          </p>
          <button
            onClick={resetFilters}
            className="px-6 py-2.5 rounded-full bg-emerald-950 text-gold-300 text-xs font-bold uppercase tracking-wider shadow-md hover:bg-emerald-900 transition-colors cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full min-w-0">
          {displayedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={onQuickView}
              onWatchDrape={onWatchDrape}
            />
          ))}
        </div>
      )}

      {/* Progressive Disclosure Toggle (Eliminating Vertical Scroll Fatigue) */}
      {!hasActiveFilter && filteredProducts.length > 8 && (
        <div className="mt-12 text-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-emerald-950 via-[#123624] to-emerald-950 hover:from-emerald-900 hover:to-emerald-900 text-gold-300 font-bold text-xs uppercase tracking-[0.2em] border border-gold-400/50 shadow-[0_10px_25px_rgba(11,23,17,0.15)] hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 inline-flex items-center gap-2.5 cursor-pointer"
          >
            <span>
              {isExpanded 
                ? 'Show Curated Selection (8 Sarees)' 
                : `Explore All 17 Sarees (${filteredProducts.length - 8} More Masterpieces)`}
            </span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 text-gold-400 ${isExpanded ? 'rotate-180' : ''}`} />
          </button>
          <p className="text-[11px] text-stone-500 mt-2.5">
            {isExpanded 
              ? 'Displaying complete handloom repertory' 
              : 'Showing featured handpicked edits &bull; Click to unfold complete atelier collection'}
          </p>
        </div>
      )}
    </section>
  );
}
