'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ShoppingBag, Menu, X, Heart, MapPin, Video, Globe, Truck, ChevronDown, PhoneCall } from 'lucide-react';
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);


  const categories = [
    { label: 'All Sarees', value: 'All', count: '17' },
    { label: 'Pure Linen', value: 'Pure Linen', count: '04' },
    { label: 'Banarasi Tissue', value: 'Banarasi Semi-Silk Tissue', count: '03' },
    { label: 'Handloom Cotton', value: 'Handloom Cotton', count: '05' },
    { label: 'Wedding & Festive', value: 'Wedding', count: '03' },
    { label: 'Office Weaves', value: 'Office Wear', count: '02' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-xl border-b border-stone-200/70 transition-all shadow-[0_2px_20px_rgba(0,0,0,0.02)]">

      {/* Main Top Navigation Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Left: Mobile Menu Trigger & Wishlist */}
          <div className="flex items-center gap-1 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 -ml-1 text-stone-800 hover:text-emerald-950 rounded-lg focus:outline-none"
              aria-label="Open boutique menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <button
              onClick={openWishlist}
              className="relative p-2 text-stone-700 hover:text-rose-600 focus:outline-none"
              aria-label="View Saved Sarees"
            >
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full" />
              )}
            </button>
          </div>

          {/* Left: Desktop Quick Concierge Links */}
          <div className="hidden lg:flex items-center gap-5 text-xs text-stone-600 font-medium">
            <a
              href="https://maps.google.com/?q=Reliance+Square+Peer+Muchalla+Zirakpur"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-emerald-950 transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-gold-600" />
              <span>Zirakpur Flagship</span>
            </a>
            <span className="text-stone-300">&bull;</span>
            <button
              onClick={openTrackModal}
              className="flex items-center gap-1.5 hover:text-emerald-950 transition-colors"
            >
              <Truck className="w-3.5 h-3.5 text-emerald-800" />
              <span>Track Finishing</span>
            </button>
          </div>

          {/* Center: Luxury Brand Monogram & Wordmark */}
          <Link
            href="/"
            onClick={() => onCategorySelect('All')}
            className="flex flex-col items-center justify-center text-center group cursor-pointer min-w-0 max-w-[190px] xs:max-w-[220px] sm:max-w-none"
          >
            <span className="font-serif text-lg xs:text-xl sm:text-2xl lg:text-3xl font-normal tracking-[0.16em] xs:tracking-[0.20em] sm:tracking-[0.24em] text-emerald-950 group-hover:text-gold-700 transition-colors truncate">
              SILKWORM
            </span>
            <span className="text-[6.5px] xs:text-[7.5px] sm:text-[8.5px] font-sans uppercase tracking-[0.22em] xs:tracking-[0.28em] sm:tracking-[0.38em] text-gold-700 font-semibold -mt-0.5 truncate">
              CREATION &bull; ATELIER CHANDIGARH
            </span>
          </Link>

          {/* Right: Utility Actions (Currency, Wishlist, Cart) */}
          <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
            {/* Currency Selector Pill */}
            <div className="relative flex items-center gap-1 border border-stone-300/70 rounded-full px-2 sm:px-3 py-1 bg-white/80 backdrop-blur-sm text-[11px] sm:text-xs shadow-2xs hover:border-gold-500/60 transition-colors">
              <Globe className="w-3 h-3 text-gold-600 flex-shrink-0" />
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as Currency)}
                className="bg-transparent text-stone-800 font-bold focus:outline-none cursor-pointer text-[11px] sm:text-xs pr-1 appearance-none"
                aria-label="Select currency"
              >
                <option value="INR">₹ INR</option>
                <option value="USD">$ USD</option>
                <option value="CAD">CA$ CAD</option>
                <option value="GBP">£ GBP</option>
                <option value="AED">AED</option>
              </select>
              <ChevronDown className="w-2.5 h-2.5 text-stone-400 pointer-events-none -ml-0.5" />
            </div>


            {/* Wishlist Button (Desktop) */}
            <button
              onClick={openWishlist}
              className="hidden lg:flex relative p-2 text-stone-700 hover:text-rose-600 rounded-full hover:bg-stone-100 transition-colors"
              aria-label="View Saved Sarees"
              title="Saved Sarees"
            >
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 bg-rose-500 text-white text-[8px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Bag Button */}
            <button
              onClick={openCart}
              className="relative p-2.5 bg-emerald-950 hover:bg-emerald-900 text-white rounded-full shadow-sm transition-transform active:scale-95 flex items-center justify-center"
              aria-label="View Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4 text-gold-400" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold-500 text-emerald-950 text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white shadow-xs animate-bounce">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Category Navigation Sub-Bar (Clean Luxury Editorial Links) */}
      <nav className="hidden lg:block border-t border-stone-200/50 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-6 xl:space-x-8 py-2.5">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.value;
              return (
                <button
                  key={cat.value}
                  onClick={() => onCategorySelect(cat.value)}
                  className={`relative py-1 text-[11px] xl:text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 ${
                    isActive
                      ? 'text-emerald-950 font-bold'
                      : 'text-stone-600 hover:text-emerald-950'
                  }`}
                >
                  <span>{cat.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold-400 via-amber-400 to-gold-500 rounded-full animate-in fade-in zoom-in-95 duration-200" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </header>

    {/* Mobile Slide-Over Menu Drawer portaled directly to document.body */}
    {mounted && mobileMenuOpen && typeof document !== 'undefined' && createPortal(
      <div className="fixed inset-0 z-[100] lg:hidden animate-in fade-in duration-200">
        <div 
          className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
          onClick={() => setMobileMenuOpen(false)} 
        />

        <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-[#FAF8F5] shadow-2xl p-6 flex flex-col justify-between overflow-y-auto z-10 animate-in slide-in-from-left duration-300">
          <div>
            {/* Drawer Brand Header */}
            <div className="flex items-center justify-between pb-5 border-b border-stone-200/80">
              <div>
                <h3 className="font-serif text-lg font-bold tracking-[0.2em] text-emerald-950">
                  SILKWORM
                </h3>
                <p className="text-[9px] tracking-[0.3em] text-gold-700 uppercase font-semibold">
                  ATELIER CHANDIGARH
                </p>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 text-stone-500 hover:text-stone-900 rounded-lg"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Currency Selector Box */}
            <div className="mt-4 p-3 bg-white rounded-2xl border border-stone-200 shadow-2xs flex items-center justify-between text-xs">
              <span className="font-semibold text-stone-600 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-gold-600" />
                <span>Currency:</span>
              </span>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as Currency)}
                className="font-bold text-emerald-950 bg-stone-50 border border-stone-200 rounded-xl px-2.5 py-1 text-xs focus:outline-none"
              >
                <option value="INR">INR (₹ India)</option>
                <option value="USD">USD ($ USA)</option>
                <option value="CAD">CAD (CA$ Canada)</option>
                <option value="GBP">GBP (£ UK)</option>
                <option value="AED">AED (د.إ UAE)</option>
              </select>
            </div>

            {/* Editorial Categories Navigation */}
            <div className="mt-6 space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold-700 px-3 mb-2">
                Handloom Collections
              </p>
              {categories.map((cat, idx) => {
                const isActive = selectedCategory === cat.value;
                return (
                  <button
                    key={cat.value}
                    onClick={() => {
                      onCategorySelect(cat.value);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-3 rounded-xl text-xs font-semibold tracking-wider flex items-center justify-between transition-all ${
                      isActive
                        ? 'bg-emerald-950 text-white font-bold shadow-sm'
                        : 'text-stone-800 hover:bg-stone-200/60'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className={`text-[10px] ${isActive ? 'text-gold-400' : 'text-stone-400'} font-mono`}>
                        0{idx + 1}
                      </span>
                      <span>{cat.label}</span>
                    </span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* VIP Concierge Shortcuts */}
            <div className="mt-6 pt-4 border-t border-stone-200/80 space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400 px-3 mb-1">
                Concierge &amp; Showroom
              </p>

              <a
                href="https://wa.me/917876719360?text=Hi%20SilkWorm%20Creation,%20I%20would%20like%20to%20book%20a%201-on-1%20video%20call%20to%20see%20your%20sarees"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-emerald-950 text-gold-300 rounded-xl font-semibold text-xs shadow-xs"
              >
                <Video className="w-4 h-4 text-green-400" />
                <span>Book WhatsApp Daylight Drape</span>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openTrackModal();
                }}
                className="w-full flex items-center gap-3 p-3 bg-white border border-stone-200 text-stone-800 rounded-xl font-semibold text-xs"
              >
                <Truck className="w-4 h-4 text-emerald-800" />
                <span>Track Saree Dispatch</span>
              </button>

              <a
                href="https://maps.google.com/?q=Reliance+Square+Peer+Muchalla+Zirakpur"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-white border border-stone-200 text-stone-800 rounded-xl font-medium text-xs"
              >
                <MapPin className="w-4 h-4 text-gold-700" />
                <span className="truncate">SCO 2, Reliance Sq, Zirakpur</span>
              </a>
            </div>
          </div>

          {/* Drawer Footer */}
          <div className="pt-6 border-t border-stone-200 text-xs text-stone-500 space-y-1">
            <p className="font-semibold text-stone-800">Showroom Hours: 11 AM – 8 PM</p>
            <p className="text-[11px] text-stone-500">Open 7 Days &bull; Panchkula / Chandigarh Hub</p>
            <p className="text-[10px] text-gold-700 font-medium pt-1">Silk Mark Certified &bull; 100% Pure Natural Weave</p>
          </div>
        </div>
      </div>,
      document.body
    )}
  </>
);
}

