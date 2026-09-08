'use client';

import React, { useState } from 'react';
import { ShoppingBag, Search, Menu, X, Phone, Heart, Sparkles, MapPin, Video, Globe, Truck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Currency } from '@/types';
import Link from 'next/link';

interface NavbarProps {
  onCategorySelect: (cat: string) => void;
  selectedCategory: string;
}

export default function Navbar({ onCategorySelect, selectedCategory }: NavbarProps) {
  const { totalItems, openCart, wishlist, openWishlist, currency, setCurrency, openTrackModal } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const categories = [
    { label: 'All Sarees', value: 'All' },
    { label: 'Pure Linen', value: 'Pure Linen' },
    { label: 'Banarasi Tissue', value: 'Banarasi Semi-Silk Tissue' },
    { label: 'Handloom Cotton', value: 'Handloom Cotton' },
    { label: 'Wedding & Festive', value: 'Wedding' },
    { label: 'Office Weaves', value: 'Office Wear' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-cream-50/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Mobile Menu Trigger & Wishlist */}
          <div className="flex items-center gap-1 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 -ml-2 text-stone-800 hover:text-emerald-900 rounded-md"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            <button
              onClick={openWishlist}
              className="relative p-2 text-stone-700 hover:text-rose-600"
              aria-label="View Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute 1 top-1 right-1 w-2 h-2 bg-rose-500 rounded-full" />
              )}
            </button>
          </div>

          {/* Brand Logo & Emblem */}
          <Link href="/" className="flex flex-col items-center justify-center cursor-pointer" onClick={() => onCategorySelect('All')}>
            <span className="font-serif text-2xl sm:text-3xl font-bold tracking-wider text-emerald-950">
              SILKWORM
            </span>
            <span className="text-[9px] sm:text-[10px] font-sans uppercase tracking-[0.35em] text-gold-700 font-semibold -mt-1">
              CREATION &bull; CHANDIGARH
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => onCategorySelect(cat.value)}
                className={`px-3.5 py-2 text-xs font-semibold uppercase tracking-wider rounded-full transition-all ${
                  selectedCategory === cat.value
                    ? 'bg-emerald-900 text-gold-300 shadow-sm'
                    : 'text-stone-700 hover:text-emerald-900 hover:bg-stone-100/70'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Currency Switcher */}
            <div className="hidden sm:flex items-center gap-1 border border-stone-300/80 rounded-full px-2.5 py-1 bg-white text-xs">
              <Globe className="w-3.5 h-3.5 text-stone-400" />
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as Currency)}
                className="bg-transparent text-stone-800 font-bold focus:outline-none cursor-pointer text-xs"
              >
                <option value="INR">INR (₹)</option>
                <option value="USD">USD ($)</option>
                <option value="CAD">CAD (CA$)</option>
                <option value="GBP">GBP (£)</option>
                <option value="AED">AED (د.إ)</option>
              </select>
            </div>

            {/* Track Order Button */}
            <button
              onClick={openTrackModal}
              className="hidden md:flex items-center gap-1 text-xs font-semibold text-stone-700 hover:text-emerald-900 px-2.5 py-1.5 rounded-full border border-stone-300/70 bg-white"
              title="Track Saree Order"
            >
              <Truck className="w-3.5 h-3.5 text-emerald-800" />
              <span>Track</span>
            </button>

            {/* Wishlist Button (Desktop) */}
            <button
              onClick={openWishlist}
              className="hidden lg:flex relative p-2.5 text-stone-700 hover:text-rose-600 rounded-full hover:bg-stone-100 transition-colors"
              aria-label="View Wishlist"
              title="Saved Sarees"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute 1 top-1 right-1 bg-rose-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={openCart}
              className="relative p-2.5 bg-emerald-900 text-cream-100 hover:bg-emerald-950 rounded-full shadow-sm transition-transform active:scale-95"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-5 h-5 text-gold-300" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold-500 text-emerald-950 text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-cream-50 animate-bounce">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-cream-50 shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-stone-200">
                <div>
                  <h3 className="font-serif text-xl font-bold text-emerald-950">SILKWORM</h3>
                  <p className="text-[10px] tracking-widest text-gold-700 uppercase font-semibold">CREATION</p>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-stone-600 hover:text-stone-900 rounded-lg"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile Currency Selector */}
              <div className="mt-4 p-3 bg-white rounded-xl border border-stone-200 flex items-center justify-between text-xs">
                <span className="font-medium text-stone-600">Select Currency:</span>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as Currency)}
                  className="font-bold text-emerald-950 bg-stone-50 border border-stone-200 rounded-lg px-2 py-1"
                >
                  <option value="INR">INR (₹)</option>
                  <option value="USD">USD ($)</option>
                  <option value="CAD">CAD (CA$)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="AED">AED (د.إ)</option>
                </select>
              </div>

              <div className="mt-6 space-y-1">
                <p className="text-[11px] font-bold uppercase tracking-wider text-stone-400 px-3 mb-2">Collections</p>
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => {
                      onCategorySelect(cat.value);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                      selectedCategory === cat.value
                        ? 'bg-emerald-900 text-gold-300'
                        : 'text-stone-800 hover:bg-stone-200/50'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-stone-200 space-y-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openTrackModal();
                  }}
                  className="w-full flex items-center gap-3 p-3 bg-stone-100 rounded-xl font-semibold text-xs text-stone-800"
                >
                  <Truck className="w-4 h-4 text-emerald-800" />
                  <span>Track Saree Dispatch</span>
                </button>

                <a
                  href="https://wa.me/917876719360?text=Hi%20SilkWorm%20Creation,%20I%20would%20like%20to%20book%20a%201-on-1%20video%20call%20to%20see%20your%20sarees"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-emerald-900/10 text-emerald-950 rounded-xl font-semibold text-xs"
                >
                  <Video className="w-4 h-4 text-emerald-800" />
                  <span>Book WhatsApp Video Call</span>
                </a>

                <a
                  href="https://maps.google.com/?q=Reliance+Square+Peer+Muchalla+Zirakpur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-stone-100 text-stone-800 rounded-xl font-medium text-xs"
                >
                  <MapPin className="w-4 h-4 text-gold-700" />
                  <span>SCO 2, Reliance Square, Zirakpur</span>
                </a>
              </div>
            </div>

            <div className="pt-6 border-t border-stone-200 text-xs text-stone-500">
              <p className="font-medium text-stone-800">Showroom Hours:</p>
              <p>Mon - Sun: 11:00 AM - 8:00 PM</p>
              <p className="mt-1 text-[10px] text-stone-400">GSTIN: 06ADFPH4354N1ZD</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
