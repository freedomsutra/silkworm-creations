'use client';

import React, { useState } from 'react';
import { SareeProduct } from '@/types';
import { useCart } from '@/context/CartContext';
import { Eye, ShoppingBag, Zap, Video, Star, Sparkles, Check } from 'lucide-react';

interface ProductCardProps {
  product: SareeProduct;
  onQuickView: (product: SareeProduct) => void;
  onWatchDrape: (product: SareeProduct) => void;
}

export default function ProductCard({ product, onQuickView, onWatchDrape }: ProductCardProps) {
  const { addItem, triggerInstantCheckout } = useCart();
  const [added, setAdded] = useState(false);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleInstantBuy = (e: React.MouseEvent) => {
    e.stopPropagation();
    triggerInstantCheckout(product);
  };

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <div 
      onClick={() => onQuickView(product)}
      className="group relative bg-white rounded-2xl overflow-hidden border border-stone-200/80 hover:border-gold-500/50 transition-all duration-300 hover:shadow-xl flex flex-col cursor-pointer"
    >
      {/* Product Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-stone-100">
        <img
          src={product.images[currentImgIndex] || product.images[0] || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80'}
          alt={product.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
          <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-emerald-950 text-gold-300 backdrop-blur-md shadow-sm">
            {product.fabric}
          </span>
          {discountPercent > 0 && (
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-rose-600 text-white">
              Save {discountPercent}%
            </span>
          )}
        </div>

        {/* Complimentary Fall & Pico Ribbon */}
        <div className="absolute bottom-3 left-3 right-3 py-1 px-2.5 rounded-lg bg-cream-50/90 backdrop-blur-md border border-gold-500/30 text-[10px] font-semibold text-emerald-950 flex items-center justify-between">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-gold-600" />
            <span>Free Fall &amp; Pico Done</span>
          </span>
          <span className="text-[9px] text-stone-500">Unstitched Blouse</span>
        </div>

        {/* Floating Quick Action Overlay on Desktop */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:flex items-center justify-center gap-2 p-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onWatchDrape(product);
            }}
            className="p-3 bg-white text-emerald-950 rounded-full hover:bg-gold-500 transition-colors shadow-md"
            title="Watch Drape Video"
            aria-label="Watch Drape Video"
          >
            <Video className="w-4 h-4 text-emerald-900" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="p-3 bg-white text-emerald-950 rounded-full hover:bg-gold-500 transition-colors shadow-md"
            title="Quick View &amp; Daylight Light Switcher"
            aria-label="Quick View"
          >
            <Eye className="w-4 h-4 text-emerald-900" />
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Star Rating & Reviews */}
          <div className="flex items-center gap-1 mb-1.5">
            <div className="flex items-center text-amber-500">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="text-xs font-bold text-stone-800">{product.rating}</span>
            <span className="text-[11px] text-stone-400">({product.reviewsCount} reviews)</span>
          </div>

          <h3 className="font-serif text-sm sm:text-base font-bold text-stone-900 line-clamp-2 group-hover:text-emerald-900 transition-colors">
            {product.title}
          </h3>

          <p className="text-xs text-stone-500 mt-1 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-700" />
            <span>{product.occasion} Edit</span>
          </p>
        </div>

        {/* Pricing & Fast Checkout CTA Buttons */}
        <div className="mt-4 pt-3 border-t border-stone-100">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-base sm:text-lg font-bold text-emerald-950">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            <span className="text-xs text-stone-400 line-through">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleAddToCart}
              className={`py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                added 
                  ? 'bg-emerald-800 text-white' 
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-800'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5 text-stone-600" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>

            <button
              onClick={handleInstantBuy}
              className="py-2 px-3 bg-emerald-900 hover:bg-emerald-950 text-gold-300 rounded-xl font-bold text-xs flex items-center justify-center gap-1 shadow-sm transition-all"
            >
              <Zap className="w-3.5 h-3.5 text-gold-400 fill-current" />
              <span>1-Click Buy</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
