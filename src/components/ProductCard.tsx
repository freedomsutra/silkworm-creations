'use client';

import React, { useState } from 'react';
import { SareeProduct } from '@/types';
import { useCart } from '@/context/CartContext';
import { Eye, ShoppingBag, Zap, Video, Star, Sparkles, Check, Heart, Share2, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

interface ProductCardProps {
  product: SareeProduct;
  onQuickView: (product: SareeProduct) => void;
  onWatchDrape: (product: SareeProduct) => void;
}

export default function ProductCard({ product, onQuickView, onWatchDrape }: ProductCardProps) {
  const { addItem, triggerInstantCheckout, isWishlisted, toggleWishlist, formatPrice } = useCart();
  const [added, setAdded] = useState(false);

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

  const handleShareWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = typeof window !== 'undefined' ? `${window.location.origin}/products/${product.handle}` : '';
    const text = encodeURIComponent(`Look at this authentic ${product.title} from SilkWorm Creation: ${url}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <div 
      onClick={() => onQuickView(product)}
      className="group relative bg-white rounded-3xl overflow-hidden border border-stone-200/90 hover:border-gold-500/60 transition-all duration-300 hover:shadow-xl flex flex-col cursor-pointer"
    >
      {/* Product Image Container with Dual-Image Hover Transition */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-stone-100">
        
        {/* Primary Image: Model Drape Shot */}
        <img
          src={product.images[0] || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80'}
          alt={product.title}
          className="w-full h-full object-cover object-center transition-opacity duration-500 group-hover:opacity-0 absolute inset-0"
          loading="lazy"
        />

        {/* Secondary Image: Close-up Texture & Zari Weave Flip */}
        <img
          src={product.images[1] || product.images[0]}
          alt={`${product.title} fabric texture zoom`}
          className="w-full h-full object-cover object-center transition-all duration-500 opacity-0 group-hover:opacity-100 group-hover:scale-105 absolute inset-0"
          loading="lazy"
        />

        {/* Top-Left Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start z-10">
          <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-emerald-950 text-gold-300 backdrop-blur-md shadow-sm">
            {product.fabric}
          </span>
          {discountPercent > 0 && (
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-rose-600 text-white shadow-xs">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Top-Right Wishlist & WhatsApp Share */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className="p-2 bg-white/90 hover:bg-white backdrop-blur-md rounded-full text-stone-700 hover:text-rose-500 shadow-sm transition-transform active:scale-90"
            aria-label="Save to Wishlist"
            title="Save to Wishlist"
          >
            <Heart className={`w-4 h-4 ${isWishlisted(product.id) ? 'fill-current text-rose-500' : ''}`} />
          </button>
          <button
            onClick={handleShareWhatsApp}
            className="p-2 bg-white/90 hover:bg-white backdrop-blur-md rounded-full text-stone-700 hover:text-green-600 shadow-sm transition-transform active:scale-90"
            aria-label="Share on WhatsApp"
            title="Share on WhatsApp"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        {/* Complimentary Fall & Pico Ribbon */}
        <div className="absolute bottom-3 left-3 right-3 py-1.5 px-3 rounded-xl bg-cream-50/95 backdrop-blur-md border border-gold-500/30 text-[10px] font-semibold text-emerald-950 flex items-center justify-between z-10 shadow-xs">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-gold-600" />
            <span>Free Fall &amp; Pico Pre-Finished</span>
          </span>
          <span className="text-[9px] text-stone-500 font-medium">Ready to Wear</span>
        </div>

        {/* Hover Action Overlay on Desktop */}
        <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:flex items-center justify-center gap-2.5 p-4 z-20 pointer-events-none">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onWatchDrape(product);
            }}
            className="p-3 bg-white text-emerald-950 rounded-full hover:bg-gold-500 transition-colors shadow-lg pointer-events-auto transform hover:scale-105"
            title="Watch Drape Video"
            aria-label="Watch Drape Video"
          >
            <Video className="w-4 h-4 text-emerald-900" />
          </button>
          <Link
            href={`/products/${product.handle}`}
            onClick={(e) => e.stopPropagation()}
            className="p-3 bg-white text-emerald-950 rounded-full hover:bg-gold-500 transition-colors shadow-lg pointer-events-auto transform hover:scale-105"
            title="View Full Saree Story"
            aria-label="View Full Saree Story"
          >
            <Eye className="w-4 h-4 text-emerald-900" />
          </Link>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Star Rating & Silk Mark Badge */}
          <div className="flex items-center justify-between gap-1 mb-2">
            <div className="flex items-center gap-1">
              <div className="flex text-amber-500">
                <Star className="w-3.5 h-3.5 fill-current" />
              </div>
              <span className="text-xs font-bold text-stone-800">{product.rating}</span>
              <span className="text-[11px] text-stone-400">({product.reviewsCount})</span>
            </div>

            <span className="flex items-center gap-1 text-[10px] font-bold text-gold-700 bg-gold-500/10 px-2 py-0.5 rounded-full">
              <ShieldCheck className="w-3 h-3 text-gold-600" />
              <span>Silk Mark</span>
            </span>
          </div>

          <h3 className="font-serif text-sm sm:text-base font-bold text-stone-900 line-clamp-2 group-hover:text-emerald-950 transition-colors leading-snug">
            {product.title}
          </h3>

          <p className="text-xs text-stone-500 mt-1.5 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-700" />
            <span>{product.occasion} Edit</span>
          </p>
        </div>

        {/* Pricing & Streamlined Luxury CTA */}
        <div className="mt-4 pt-3 border-t border-stone-100">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-lg font-bold text-emerald-950 font-serif">
              {formatPrice(product.price)}
            </span>
            <span className="text-xs text-stone-400 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          </div>

          {/* Streamlined Primary CTA */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleInstantBuy}
              className="flex-1 py-2.5 bg-emerald-950 hover:bg-emerald-900 text-gold-300 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm transition-all"
            >
              <Zap className="w-3.5 h-3.5 text-gold-400 fill-current" />
              <span>1-Click Buy (UPI)</span>
            </button>

            <button
              onClick={handleAddToCart}
              className={`p-2.5 rounded-xl border transition-all ${
                added 
                  ? 'bg-emerald-800 text-white border-emerald-800' 
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-800 border-stone-200'
              }`}
              title="Add to Bag"
              aria-label="Add to Bag"
            >
              {added ? <Check className="w-4 h-4 text-white" /> : <ShoppingBag className="w-4 h-4" />}
            </button>
          </div>

          {/* Compact Trust Note */}
          <p className="text-[10px] text-stone-400 text-center mt-2 flex items-center justify-center gap-1">
            <span>7-Day Doorstep Exchange</span>
            <span>&bull;</span>
            <span>Zero Synthetic Blends</span>
          </p>
        </div>
      </div>
    </div>
  );
}
