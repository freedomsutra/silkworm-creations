'use client';

import React, { useState } from 'react';
import { SareeProduct } from '@/types';
import { useCart } from '@/context/CartContext';
import { Eye, ShoppingBag, Zap, Video, Star, Sparkles, Check, Heart, Share2, ShieldCheck, Plane } from 'lucide-react';
import Link from 'next/link';

interface ProductCardProps {
  product: SareeProduct;
  onQuickView: (product: SareeProduct) => void;
  onWatchDrape: (product: SareeProduct) => void;
}

function shortFabric(fabric: string): string {
  if (fabric.includes('Pure Linen / Handloom Cotton')) return 'Linen Cotton';
  if (fabric.includes('Banarasi Semi-Silk Tissue')) return 'Banarasi Tissue';
  return fabric;
}

export default function ProductCard({ product, onQuickView, onWatchDrape }: ProductCardProps) {
  const { addItem, triggerInstantCheckout, isWishlisted, toggleWishlist, formatPrice, isDomestic, destinationCountry, currency } = useCart();
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
      className="group relative bg-white rounded-3xl overflow-hidden border border-stone-200/90 hover:border-gold-500/60 transition-all duration-300 hover:shadow-xl flex flex-col w-full min-w-0"
    >
      {/* Product Image Container with Dual-Image Hover Transition */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-stone-100">
        <Link 
          href={`/products/${product.handle}`}
          className="absolute inset-0 block cursor-pointer z-0"
          aria-label={`View ${product.title} full details`}
        >
          {/* Primary Image: Model Drape Shot with tailored vertical framing */}
          <img
            src={product.images[0] || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80'}
            alt={product.title}
            className="w-full h-full object-cover object-[center_15%] transition-opacity duration-500 group-hover:opacity-0 absolute inset-0"
            loading="lazy"
            decoding="async"
          />

          {/* Secondary Image: Close-up Texture & Zari Weave Flip */}
          <img
            src={product.images[1] || product.images[0]}
            alt={`${product.title} fabric texture zoom`}
            className="w-full h-full object-cover object-[center_15%] transition-all duration-500 opacity-0 group-hover:opacity-100 group-hover:scale-105 absolute inset-0"
            loading="lazy"
            decoding="async"
          />
        </Link>


        {/* Top-Left Badges Overlay (Luxury Editorial Style) */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 items-start z-10 max-w-[70%]">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-950/95 text-gold-300 border border-gold-400/40 backdrop-blur-md shadow-sm">
            {shortFabric(product.fabric)}
          </span>
          {discountPercent > 0 && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#5C1D24]/95 text-rose-200 border border-rose-400/40 backdrop-blur-md shadow-sm">
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

        {/* Complimentary Fall & Pico Ribbon (Personalized) */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 py-1 px-2.5 rounded-xl bg-cream-50/95 backdrop-blur-md border border-gold-500/30 text-[9px] sm:text-[10px] font-semibold text-emerald-950 flex items-center justify-between z-10 shadow-2xs overflow-hidden">
          <span className="flex items-center gap-1.5 truncate">
            {isDomestic ? (
              <>
                <Sparkles className="w-3 h-3 text-gold-600 flex-shrink-0" />
                <span className="truncate">Free Fall &amp; Pico Pre-Finished</span>
              </>
            ) : (
              <>
                <Plane className="w-3 h-3 text-gold-600 flex-shrink-0" />
                <span className="truncate">DHL Air &bull; Fall &amp; Pico Included</span>
              </>
            )}
          </span>
          <span className="text-[9px] text-stone-500 font-medium flex-shrink-0 ml-1 hidden xs:inline">
            {isDomestic ? 'Ready to Wear' : 'Export Edition'}
          </span>
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
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onQuickView(product);
            }}
            className="p-3 bg-white text-emerald-950 rounded-full hover:bg-gold-500 transition-colors shadow-lg pointer-events-auto transform hover:scale-105 cursor-pointer"
            title="Quick View Saree"
            aria-label="Quick View Saree"
          >
            <Eye className="w-4 h-4 text-emerald-900" />
          </button>
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

          <h3 className="line-clamp-2 leading-snug">
            <Link
              href={`/products/${product.handle}`}
              className="font-serif text-sm sm:text-base font-bold text-stone-900 hover:text-emerald-800 hover:underline transition-colors block"
            >
              {product.title}
            </Link>
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

          {/* Balanced Dual Action CTAs: + Add to Bag (Trousseau / Multi-Item) + 1-Click Buy (Impulse) */}
          <div className="grid grid-cols-2 gap-2 w-full min-w-0">
            <button
              onClick={handleAddToCart}
              className={`py-2.5 px-2 rounded-xl border font-bold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-98 min-w-0 ${
                added 
                  ? 'bg-emerald-800 text-white border-emerald-800 shadow-xs' 
                  : 'bg-stone-100 hover:bg-stone-200/90 text-stone-900 border-stone-300/80 hover:border-stone-400'
              }`}
              aria-label={added ? 'Added to bag' : `Add ${product.title} to bag`}
            >
              {added ? (
                <>
                  <Check className="w-3.5 h-3.5 text-gold-300 flex-shrink-0" />
                  <span className="truncate text-white font-semibold">Added ✓</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5 text-stone-700 flex-shrink-0" />
                  <span className="truncate font-semibold">Add to Bag</span>
                </>
              )}
            </button>

            <button
              onClick={handleInstantBuy}
              className="py-2.5 px-2 bg-gradient-to-r from-emerald-950 via-[#103322] to-emerald-950 hover:from-emerald-900 text-gold-300 border border-gold-400/50 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1 shadow-sm transition-all hover:border-gold-300 active:scale-98 min-w-0"
              aria-label={isDomestic ? `1-Click Buy with UPI for ${product.title}` : `Instant checkout in ${currency} for ${product.title}`}
            >
              <Zap className="w-3.5 h-3.5 text-gold-400 fill-gold-400 flex-shrink-0" />
              <span className="truncate text-gold-200 font-semibold tracking-wide">
                {isDomestic ? '1-Click Buy' : 'Instant Buy'}
              </span>
            </button>
          </div>

          {/* Compact Trust Note */}
          <p className="text-[10px] text-stone-400 text-center mt-2 flex items-center justify-center gap-1">
            {isDomestic ? (
              <>
                <span>7-Day Doorstep Exchange</span>
                <span>&bull;</span>
                <span>Zero Synthetic Blends</span>
              </>
            ) : (
              <>
                <span>DHL Express Dispatch</span>
                <span>&bull;</span>
                <span>Duties Pre-Paid</span>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
