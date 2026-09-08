'use client';

import React from 'react';
import { Video, ShoppingBag, Zap, ShieldCheck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { SareeProduct } from '@/types';

interface StickyMobileBarProps {
  onBookVideoCall?: () => void;
  product?: SareeProduct;
  onInstantBuy?: () => void;
  onAddToCart?: () => void;
}

export default function StickyMobileBar({
  onBookVideoCall,
  product,
  onInstantBuy,
  onAddToCart
}: StickyMobileBarProps) {
  const { totalItems, openCart, formatPrice, addItem, triggerInstantCheckout } = useCart();

  const handleVideoClick = () => {
    if (onBookVideoCall) {
      onBookVideoCall();
    } else {
      const msg = encodeURIComponent(
        product 
          ? `Hi SilkWorm Creation! I'd like a 1-on-1 WhatsApp video drape call for ${product.title} (${formatPrice(product.price)}).`
          : `Hi SilkWorm Creation! I would like to book a quick WhatsApp video drape call to see sarees in natural daylight.`
      );
      window.open(`https://wa.me/917876719360?text=${msg}`, '_blank');
    }
  };

  const handlePrimaryClick = () => {
    if (product) {
      if (onInstantBuy) {
        onInstantBuy();
      } else {
        triggerInstantCheckout(product);
      }
    } else {
      openCart();
    }
  };

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-lg border-t border-stone-200/90 px-3 py-2.5 shadow-[0_-4px_25px_rgba(0,0,0,0.12)]">
      <div className="flex items-center gap-2">
        {/* Left Action: WhatsApp Drape Call */}
        <button
          onClick={handleVideoClick}
          className="flex-1 py-3 px-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-950 border border-emerald-800/20 font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
        >
          <Video className="w-4 h-4 text-emerald-700 flex-shrink-0" />
          <span className="truncate">Drape Call</span>
        </button>

        {/* Right Action: Cart or Instant Buy */}
        {product ? (
          <button
            onClick={handlePrimaryClick}
            className="flex-[1.4] py-3 px-3 rounded-2xl bg-emerald-950 hover:bg-emerald-900 text-gold-300 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md shadow-emerald-950/20 transition-all active:scale-[0.98]"
          >
            <Zap className="w-3.5 h-3.5 text-gold-400 fill-current" />
            <span className="truncate">Buy Now &bull; {formatPrice(product.price)}</span>
          </button>
        ) : (
          <button
            onClick={handlePrimaryClick}
            className="flex-1 py-3 px-3 rounded-2xl bg-emerald-950 hover:bg-emerald-900 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-950/20 transition-all active:scale-[0.98]"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4 text-gold-400" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-amber-500 text-emerald-950 rounded-full text-[9px] font-black flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </div>
            <span className="truncate">
              {totalItems > 0 ? `View Bag (${totalItems})` : 'View Bag'}
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
