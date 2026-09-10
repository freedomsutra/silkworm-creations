'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { PRODUCTS } from '@/data/products';
import { X, Heart, ShoppingBag, Trash2, Zap } from 'lucide-react';
import { SareeProduct } from '@/types';

export default function WishlistDrawer({ onQuickView }: { onQuickView?: (p: SareeProduct) => void } = {}) {
  const { wishlist, toggleWishlist, wishlistDrawerOpen, closeWishlist, addItem, triggerInstantCheckout, formatPrice } = useCart();

  if (!wishlistDrawerOpen) return null;

  const wishlistedProducts = PRODUCTS.filter(p => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" onClick={closeWishlist} />

      <div className="fixed inset-y-0 right-0 max-w-md w-full bg-cream-50 shadow-2xl flex flex-col justify-between overflow-y-auto">
        <div className="p-5 border-b border-stone-200 bg-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 fill-current text-rose-500" />
            <h3 className="font-serif font-bold text-lg text-emerald-950">
              Saved Sarees ({wishlistedProducts.length})
            </h3>
          </div>
          <button onClick={closeWishlist} className="p-1.5 text-stone-500 hover:text-stone-900 rounded-full hover:bg-stone-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 flex-1 overflow-y-auto space-y-4">
          {wishlistedProducts.length === 0 ? (
            <div className="text-center py-16 text-stone-500 space-y-3">
              <Heart className="w-12 h-12 mx-auto text-stone-300" />
              <p className="font-serif text-lg font-bold text-emerald-950">Your Wishlist is Empty</p>
              <p className="text-xs">Tap the heart icon on any saree to save it for later comparison.</p>
            </div>
          ) : (
            wishlistedProducts.map(p => (
              <div key={p.id} className="p-3.5 bg-white rounded-2xl border border-stone-200 flex gap-3.5 shadow-sm">
                <Link href={`/products/${p.handle}`} onClick={closeWishlist} className="flex-shrink-0 block">
                  <img src={p.images[0]} alt={p.title} className="w-20 h-24 object-cover rounded-xl bg-stone-100 hover:opacity-90 transition-opacity" />
                </Link>
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <div className="flex justify-between items-start gap-1">
                      <Link 
                        href={`/products/${p.handle}`} 
                        onClick={closeWishlist}
                        className="font-serif text-xs font-bold text-stone-900 hover:text-emerald-800 hover:underline line-clamp-1 block"
                      >
                        {p.title}
                      </Link>
                      <button onClick={() => toggleWishlist(p.id)} className="text-stone-400 hover:text-rose-600 p-1 flex-shrink-0">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-[11px] text-stone-500 mt-0.5">{p.fabric}</p>
                    <p className="font-bold text-xs text-emerald-950 font-serif mt-1">{formatPrice(p.price)}</p>
                  </div>

                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => {
                        addItem(p);
                        closeWishlist();
                      }}
                      className="flex-1 py-1.5 px-2 bg-stone-100 hover:bg-stone-200 text-stone-900 rounded-lg text-xs font-bold flex items-center justify-center gap-1"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Add to Cart</span>
                    </button>
                    <button
                      onClick={() => {
                        closeWishlist();
                        triggerInstantCheckout(p);
                      }}
                      className="py-1.5 px-3 bg-emerald-900 hover:bg-emerald-950 text-gold-300 rounded-lg text-xs font-bold flex items-center justify-center gap-1"
                    >
                      <Zap className="w-3 h-3 fill-current text-gold-400" />
                      <span>Buy</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
