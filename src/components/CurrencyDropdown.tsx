'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { Currency } from '@/types';
import { ChevronDown, Check } from 'lucide-react';

interface CurrencyOption {
  code: Currency;
  label: string;
  flag: string;
  symbol: string;
  region: string;
}

const CURRENCY_OPTIONS: CurrencyOption[] = [
  { code: 'INR', label: 'INR', flag: '🇮🇳', symbol: '₹', region: 'India (Domestic)' },
  { code: 'USD', label: 'USD', flag: '🇺🇸', symbol: '$', region: 'United States' },
  { code: 'CAD', label: 'CAD', flag: '🇨🇦', symbol: 'CA$', region: 'Canada' },
  { code: 'GBP', label: 'GBP', flag: '🇬🇧', symbol: '£', region: 'United Kingdom' },
  { code: 'AED', label: 'AED', flag: '🇦🇪', symbol: 'AED', region: 'UAE & Gulf' },
];

export default function CurrencyDropdown({ className = '' }: { className?: string }) {
  const { currency, setCurrency } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeOption = CURRENCY_OPTIONS.find((c) => c.code === currency) || CURRENCY_OPTIONS[0];

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setIsOpen(false);
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen]);

  const handleSelect = (code: Currency) => {
    setCurrency(code);
    setIsOpen(false);
  };

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      {/* Trigger Button: Luxury Pill */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-stone-300/80 bg-white/95 hover:border-gold-500/70 text-stone-800 text-xs font-semibold shadow-2xs transition-all hover:bg-stone-50 active:scale-98 cursor-pointer focus:outline-none focus:ring-1 focus:ring-gold-500/40"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Select Currency and Region"
      >
        <span className="text-sm leading-none">{activeOption.flag}</span>
        <span className="font-bold text-stone-900 tracking-wide">{activeOption.symbol} {activeOption.code}</span>
        <ChevronDown className={`w-3 h-3 text-stone-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Floating Custom Luxury Popover */}
      {isOpen && (
        <div 
          className="absolute right-0 mt-2 w-64 rounded-2xl bg-white/95 backdrop-blur-xl border border-stone-200/90 shadow-[0_20px_50px_rgba(0,0,0,0.15)] ring-1 ring-gold-500/20 py-2 z-50 animate-in fade-in zoom-in-95 duration-150"
          role="listbox"
        >
          <div className="px-3.5 py-2 border-b border-stone-100 flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-700">
              Select Currency &amp; Region
            </span>
            <span className="text-[9px] text-stone-400 font-medium">All Duties Calculated</span>
          </div>

          <div className="p-1 space-y-0.5">
            {CURRENCY_OPTIONS.map((opt) => {
              const isSelected = opt.code === currency;
              return (
                <button
                  key={opt.code}
                  type="button"
                  onClick={() => handleSelect(opt.code)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs text-left transition-all ${
                    isSelected 
                      ? 'bg-emerald-950 text-white font-bold shadow-xs' 
                      : 'text-stone-700 hover:bg-stone-100/90 hover:text-stone-900'
                  }`}
                  role="option"
                  aria-selected={isSelected}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-base flex-shrink-0">{opt.flag}</span>
                    <div className="min-w-0">
                      <p className={`font-semibold truncate ${isSelected ? 'text-white' : 'text-stone-900'}`}>
                        {opt.symbol} {opt.code}
                      </p>
                      <p className={`text-[10px] truncate ${isSelected ? 'text-gold-300' : 'text-stone-500'}`}>
                        {opt.region}
                      </p>
                    </div>
                  </div>

                  {isSelected && (
                    <Check className="w-4 h-4 text-gold-400 flex-shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-1 px-3.5 pt-2 border-t border-stone-100 text-[10px] text-stone-500 flex items-center justify-between">
            <span>Live Day Conversion</span>
            <span className="text-emerald-800 font-semibold">Zero Foreign Markup</span>
          </div>
        </div>
      )}
    </div>
  );
}
