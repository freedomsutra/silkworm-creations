'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { SareeProduct } from '@/types';
import ProductCard from './ProductCard';
import { 
  Search, 
  Sparkles, 
  Filter, 
  X, 
  Tag, 
  ChevronDown, 
  Layers, 
  Check, 
  SlidersHorizontal,
  RotateCcw,
  Palette
} from 'lucide-react';

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
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('catalog-section');
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const inView = rect.top <= window.innerHeight * 0.75 && rect.bottom >= 140;
      setShowMobileFilter(inView);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileDrawerOpen]);

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

  // Active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedCategory !== 'All') count++;
    if (selectedColor !== 'All') count++;
    if (priceBand !== 'all') count++;
    if (searchQuery.trim() !== '') count++;
    return count;
  }, [selectedCategory, selectedColor, priceBand, searchQuery]);

  const hasActiveFilter = activeFilterCount > 0;

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
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 w-full px-2">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-900/10 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-2.5">
          <Sparkles className="w-3.5 h-3.5 text-gold-600" />
          <span>Handpicked Artisan Collection</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-emerald-950">
          The Saree Repertory
        </h2>
        <p className="text-stone-600 text-xs sm:text-sm mt-2.5 max-w-lg mx-auto">
          Every piece is handcrafted with pure yarns, inspected at Atelier Chandigarh, and delivered ready-to-wear with complimentary Fall &amp; Pico.
        </p>
      </div>

      {/* Main Faceted Grid Layout: Left Sidebar + Right Products Grid */}
      <div className="flex flex-col lg:flex-row gap-8 items-start w-full">
        
        {/* ========================================================= */}
        {/* DESKTOP LEFT SIDEBAR: Sticky during browsing, unsticks    */}
        {/* when products reach their end                            */}
        {/* ========================================================= */}
        <aside className="hidden lg:block w-64 xl:w-72 flex-shrink-0 sticky top-24 self-start max-h-[calc(100vh-7rem)] overflow-y-auto scrollbar-none bg-white rounded-3xl p-6 border border-stone-200/90 shadow-sm space-y-6">
          
          {/* Sidebar Header */}
          <div className="flex items-center justify-between pb-4 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-gold-700" />
              <h3 className="font-serif font-bold text-base text-emerald-950">
                Refine Selection
              </h3>
            </div>
            {hasActiveFilter && (
              <button
                onClick={resetFilters}
                className="text-xs text-stone-500 hover:text-emerald-900 font-medium underline cursor-pointer"
              >
                Clear All
              </button>
            )}
          </div>

          {/* Search Input */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">
              Search Collection
            </label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search weave, color..."
                className="w-full pl-9 pr-7 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:border-gold-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                  aria-label="Clear search"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {/* Weave Collections (Category Radio List) */}
          <div className="space-y-2.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-gold-700" />
              <span>Weave Category</span>
            </label>
            <div className="space-y-1">
              {CATEGORY_TABS.map((cat) => {
                const isActive = selectedCategory === cat.id;
                const count = categoryCounts[cat.id] ?? 0;
                return (
                  <button
                    key={cat.id}
                    onClick={() => onCategoryChange(cat.id)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                      isActive
                        ? 'bg-emerald-950 text-gold-300 shadow-sm font-bold'
                        : 'text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {isActive && <Check className="w-3 h-3 text-gold-400" />}
                      <span>{cat.label}</span>
                    </span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                      isActive ? 'bg-gold-500/20 text-gold-300' : 'bg-stone-100 text-stone-500'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Color Palette Swatches */}
          <div className="space-y-2.5 pt-3 border-t border-stone-100">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-gold-700" />
                <span>Color Palette</span>
              </label>
              {selectedColor !== 'All' && (
                <button
                  onClick={() => setSelectedColor('All')}
                  className="text-[10px] text-stone-400 hover:text-stone-700 underline"
                >
                  Reset
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-1.5">
              {COLORS.map((c) => {
                const isSelected = selectedColor === c;
                const count = colorCounts[c] || 0;
                return (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    className={`px-2.5 py-1.5 rounded-xl text-xs font-medium flex items-center gap-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-950 text-gold-300 ring-1 ring-gold-400/40 font-bold'
                        : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-200/60'
                    }`}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full border border-black/15 shadow-2xs flex-shrink-0"
                      style={{ backgroundColor: COLOR_SWATCHES[c] || '#D4AF37' }}
                    />
                    <span className="truncate text-[11px] flex-1 text-left">{c}</span>
                    <span className={`text-[9px] font-mono px-1 rounded-full ${
                      isSelected ? 'bg-gold-500/20 text-gold-300' : 'text-stone-400'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price Bands */}
          <div className="space-y-2.5 pt-3 border-t border-stone-100">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-gold-700" />
                <span>Price Tier</span>
              </label>
              {priceBand !== 'all' && (
                <button
                  onClick={() => setPriceBand('all')}
                  className="text-[10px] text-stone-400 hover:text-stone-700 underline"
                >
                  Reset
                </button>
              )}
            </div>

            <div className="space-y-1">
              {[
                { id: 'all', label: 'All Prices' },
                { id: 'under-8500', label: 'Under ₹8,500' },
                { id: '8500-10000', label: '₹8,500 – ₹10,000' },
                { id: 'above-10000', label: '₹10,000+ Luxury' },
              ].map((tier) => {
                const isSelected = priceBand === tier.id;
                return (
                  <button
                    key={tier.id}
                    onClick={() => setPriceBand(tier.id as any)}
                    className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-950 text-gold-300 font-bold shadow-xs'
                        : 'text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    <span>{tier.label}</span>
                    {isSelected && <Check className="w-3 h-3 text-gold-400" />}
                  </button>
                );
              })}
            </div>
          </div>

        </aside>

        {/* ========================================================= */}
        {/* RIGHT COLUMN: Results Header + Product Cards Grid         */}
        {/* ========================================================= */}
        <div className="flex-1 min-w-0 w-full space-y-6">
          
          {/* Top Utility & Sort Row */}
          <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-stone-200/80 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            
            {/* Left: Result Count & Active Filter Tags */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-stone-600">
                Showing <strong className="text-emerald-950">{displayedProducts.length}</strong> of{' '}
                <strong className="text-emerald-950">{filteredProducts.length}</strong> sarees
              </span>

              {/* Mobile Filter Button Trigger (Inside top bar for quick tap) */}
              <button
                onClick={() => setMobileDrawerOpen(true)}
                className="lg:hidden ml-auto sm:ml-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-950 text-gold-300 text-xs font-bold uppercase tracking-wider shadow-xs cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-gold-400" />
                <span>Filters {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
              </button>

              {/* Active Filter Chips */}
              {selectedCategory !== 'All' && (
                <button
                  onClick={() => onCategoryChange('All')}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-900/10 text-emerald-950 text-[11px] font-semibold hover:bg-emerald-900/20"
                >
                  <span>Weave: {selectedCategory}</span>
                  <X className="w-3 h-3 text-stone-500" />
                </button>
              )}

              {selectedColor !== 'All' && (
                <button
                  onClick={() => setSelectedColor('All')}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-stone-100 text-stone-800 text-[11px] font-semibold hover:bg-stone-200"
                >
                  <span>Color: {selectedColor}</span>
                  <X className="w-3 h-3 text-stone-500" />
                </button>
              )}

              {priceBand !== 'all' && (
                <button
                  onClick={() => setPriceBand('all')}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-stone-100 text-stone-800 text-[11px] font-semibold hover:bg-stone-200"
                >
                  <span>Price: {priceBand}</span>
                  <X className="w-3 h-3 text-stone-500" />
                </button>
              )}

              {hasActiveFilter && (
                <button
                  onClick={resetFilters}
                  className="text-xs text-stone-500 hover:text-emerald-900 underline font-medium ml-1"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Right: Sort Selector */}
            <div className="flex items-center justify-between sm:justify-end gap-2 flex-shrink-0">
              <span className="text-xs text-stone-500 font-medium">Sort:</span>
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="py-1.5 px-3 text-xs rounded-xl bg-stone-50 border border-stone-200 font-semibold text-stone-800 focus:outline-none focus:border-gold-500 cursor-pointer"
              >
                <option value="featured">Featured Collection</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Customer Rating</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-8 shadow-xs">
              <p className="font-serif text-lg font-bold text-emerald-950 mb-2">No Sarees Match Your Selection</p>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full min-w-0">
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

          {/* Progressive Disclosure Toggle */}
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

        </div>
      </div>

      {/* ========================================================= */}
      {/* MOBILE FLOATING FILTER BUTTON (FAB)                      */}
      {/* Visible only while catalog section is in viewport        */}
      {/* ========================================================= */}
      <button
        onClick={() => setMobileDrawerOpen(true)}
        className={`fixed bottom-20 left-4 z-40 lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-full bg-emerald-950 text-gold-300 border border-gold-400/50 shadow-[0_10px_25px_rgba(0,0,0,0.35)] backdrop-blur-md text-xs font-bold uppercase tracking-wider active:scale-95 transition-all duration-300 cursor-pointer ${
          showMobileFilter
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-6 pointer-events-none'
        }`}
        aria-label="Open filter menu"
      >
        <SlidersHorizontal className="w-3.5 h-3.5 text-gold-400" />
        <span>Filters</span>
        {activeFilterCount > 0 && (
          <span className="w-5 h-5 rounded-full bg-gold-500 text-emerald-950 text-[10px] font-black flex items-center justify-center -mr-1">
            {activeFilterCount}
          </span>
        )}
      </button>

      {/* ========================================================= */}
      {/* MOBILE FILTER & SORT DRAWER (Portaled to document.body)   */}
      {/* ========================================================= */}
      {mounted && mobileDrawerOpen && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[100] lg:hidden animate-in fade-in duration-200">
          
          {/* Backdrop Overlay */}
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileDrawerOpen(false)}
          />

          {/* Slide-Up / Slide-Over Drawer Sheet */}
          <div className="fixed inset-y-0 right-0 max-w-sm w-full bg-[#FAF8F5] shadow-2xl flex flex-col justify-between overflow-hidden z-10 animate-in slide-in-from-right duration-300">
            
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-5 border-b border-stone-200 bg-white">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-gold-700" />
                <h3 className="font-serif font-bold text-base text-emerald-950">
                  Filter &amp; Sort Sarees
                </h3>
                {activeFilterCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-gold-500/20 text-gold-800 text-[10px] font-bold">
                    {activeFilterCount} active
                  </span>
                )}
              </div>
              <button
                onClick={() => setMobileDrawerOpen(false)}
                className="p-1.5 text-stone-400 hover:text-stone-800 rounded-full"
                aria-label="Close filters"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Scrollable Body */}
            <div className="p-5 overflow-y-auto space-y-6 flex-1">
              
              {/* Search */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">
                  Search Weaves
                </label>
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search weave, pattern, color..."
                    className="w-full pl-9 pr-7 py-2.5 text-xs rounded-xl bg-white border border-stone-200 focus:outline-none focus:border-gold-500"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>

              {/* Sort Options */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">
                  Sort Order
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'featured', label: 'Featured' },
                    { id: 'price-low', label: 'Price: Low-High' },
                    { id: 'price-high', label: 'Price: High-Low' },
                    { id: 'rating', label: 'Highest Rated' },
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSortBy(s.id as any)}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold text-center transition-all ${
                        sortBy === s.id
                          ? 'bg-emerald-950 text-gold-300 font-bold shadow-xs'
                          : 'bg-white border border-stone-200 text-stone-700'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Weave Categories */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-gold-700" />
                  <span>Weave Collection</span>
                </label>
                <div className="space-y-1.5">
                  {CATEGORY_TABS.map((cat) => {
                    const isActive = selectedCategory === cat.id;
                    const count = categoryCounts[cat.id] ?? 0;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => onCategoryChange(cat.id)}
                        className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-all ${
                          isActive
                            ? 'bg-emerald-950 text-gold-300 font-bold shadow-xs'
                            : 'bg-white border border-stone-200/80 text-stone-700'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          {isActive && <Check className="w-3 h-3 text-gold-400" />}
                          <span>{cat.label}</span>
                        </span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                          isActive ? 'bg-gold-500/20 text-gold-300' : 'bg-stone-100 text-stone-500'
                        }`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Color Palette */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-gold-700" />
                  <span>Color Palette</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {COLORS.map((c) => {
                    const isSelected = selectedColor === c;
                    const count = colorCounts[c] || 0;
                    return (
                      <button
                        key={c}
                        onClick={() => setSelectedColor(c)}
                        className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                          isSelected
                            ? 'bg-emerald-950 text-gold-300 font-bold ring-1 ring-gold-400/40'
                            : 'bg-white border border-stone-200 text-stone-700'
                        }`}
                      >
                        <span
                          className="w-2.5 h-2.5 rounded-full border border-black/15 shadow-2xs flex-shrink-0"
                          style={{ backgroundColor: COLOR_SWATCHES[c] || '#D4AF37' }}
                        />
                        <span className="truncate flex-1 text-left">{c}</span>
                        <span className={`text-[9px] font-mono px-1 rounded-full ${
                          isSelected ? 'bg-gold-500/20 text-gold-300' : 'text-stone-400'
                        }`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price Tier */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-gold-700" />
                  <span>Price Tier</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'all', label: 'All Prices' },
                    { id: 'under-8500', label: 'Under ₹8.5K' },
                    { id: '8500-10000', label: '₹8.5K – ₹10K' },
                    { id: 'above-10000', label: '₹10K+ Luxury' },
                  ].map((tier) => {
                    const isSelected = priceBand === tier.id;
                    return (
                      <button
                        key={tier.id}
                        onClick={() => setPriceBand(tier.id as any)}
                        className={`px-3 py-2 rounded-xl text-xs font-semibold text-center transition-all ${
                          isSelected
                            ? 'bg-emerald-950 text-gold-300 font-bold shadow-xs'
                            : 'bg-white border border-stone-200 text-stone-700'
                        }`}
                      >
                        {tier.label}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Drawer Footer Actions */}
            <div className="p-4 border-t border-stone-200 bg-white flex items-center gap-3">
              {hasActiveFilter && (
                <button
                  onClick={resetFilters}
                  className="px-4 py-3 rounded-xl border border-stone-200 text-stone-700 font-bold text-xs uppercase tracking-wider hover:bg-stone-50 transition-colors"
                >
                  Reset
                </button>
              )}
              <button
                onClick={() => setMobileDrawerOpen(false)}
                className="flex-1 py-3.5 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-gold-300 font-bold text-xs uppercase tracking-wider shadow-md transition-colors text-center"
              >
                View {filteredProducts.length} Sarees
              </button>
            </div>

          </div>
        </div>,
        document.body
      )}

    </section>
  );
}
