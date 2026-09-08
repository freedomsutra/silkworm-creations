'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { 
  X, Trash2, Plus, Minus, ShoppingBag, Zap, 
  Sparkles, Truck, ArrowRight, Scissors 
} from 'lucide-react';

export default function CartDrawer() {
  const { 
    isOpen, 
    closeCart, 
    items, 
    updateQuantity, 
    removeItem, 
    subtotal, 
    openCheckout 
  } = useCart();

  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(true);

  if (!isOpen) return null;

  const discount = promoApplied ? 500 : 0;
  const finalTotal = Math.max(0, subtotal - discount);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" 
        onClick={closeCart} 
      />

      <div className="fixed inset-y-0 right-0 max-w-md w-full bg-cream-50 shadow-2xl flex flex-col justify-between overflow-y-auto">
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-stone-200 bg-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-emerald-950" />
            <h3 className="font-serif font-bold text-lg text-emerald-950">
              Shopping Cart ({items.length})
            </h3>
          </div>
          <button 
            onClick={closeCart}
            className="p-1.5 text-stone-500 hover:text-stone-900 rounded-full hover:bg-stone-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping & Fall/Pico Progress Meter */}
        <div className="bg-emerald-900 text-cream-100 p-3 text-xs font-semibold flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-gold-400" />
            <span>Unlocked: <strong>Free Express Shipping &amp; Fall/Pico</strong></span>
          </div>
          <Sparkles className="w-4 h-4 text-gold-400" />
        </div>

        {/* Items List */}
        <div className="p-5 flex-1 overflow-y-auto space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16 text-stone-500 space-y-3">
              <ShoppingBag className="w-12 h-12 mx-auto text-stone-300 stroke-[1.5]" />
              <p className="font-serif text-lg font-bold text-emerald-950">Your Cart is Empty</p>
              <p className="text-xs">Explore our handloom pure linen and banarasi tissue collection.</p>
              <button
                onClick={closeCart}
                className="mt-2 px-6 py-2.5 rounded-full bg-emerald-900 text-gold-300 font-bold text-xs uppercase tracking-wider"
              >
                Browse Sarees
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div 
                key={item.product.id}
                className="p-3.5 bg-white rounded-2xl border border-stone-200 flex gap-3.5 shadow-sm"
              >
                <img
                  src={item.product.images[0]}
                  alt={item.product.title}
                  className="w-20 h-24 object-cover rounded-xl bg-stone-100 flex-shrink-0"
                />

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 className="font-serif text-xs font-bold text-stone-900 line-clamp-1">
                        {item.product.title}
                      </h4>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="text-stone-400 hover:text-rose-600 p-1 -mr-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-[11px] text-stone-500 mt-0.5">{item.product.fabric}</p>

                    <div className="mt-1 flex flex-wrap gap-1">
                      {item.fallPico && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          + Free Fall &amp; Pico
                        </span>
                      )}
                      {item.blouseStitching && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                          + Blouse Stitching ({item.blouseSize})
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-100">
                    {/* Quantity Stepper */}
                    <div className="flex items-center border border-stone-200 rounded-lg bg-stone-50">
                      <button
                        onClick={() => updateQuantity(item.product.id, -1)}
                        className="p-1 text-stone-600 hover:text-stone-900"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-bold text-stone-800">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, 1)}
                        className="p-1 text-stone-600 hover:text-stone-900"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="font-bold text-xs text-emerald-950 font-serif">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer & Checkout */}
        {items.length > 0 && (
          <div className="p-5 bg-white border-t border-stone-200 space-y-3">
            {/* Promo Voucher */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Discount Code"
                value={promoCode || 'SILK500 (Applied)'}
                readOnly
                className="flex-1 px-3 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 font-semibold text-emerald-800"
              />
              <button
                type="button"
                className="px-3 py-2 bg-stone-800 text-white rounded-xl text-xs font-bold"
              >
                Applied
              </button>
            </div>

            {/* Calculations */}
            <div className="space-y-1.5 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-emerald-800 font-medium">
                <span>Promotional Discount:</span>
                <span>- ₹{discount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-emerald-800 font-medium">
                <span>Fall &amp; Pico Tailoring:</span>
                <span>FREE</span>
              </div>
              <div className="pt-2 border-t border-stone-200 flex justify-between font-bold text-stone-900 text-sm">
                <span>Total:</span>
                <span className="text-emerald-950 font-serif text-base">
                  ₹{finalTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <button
              onClick={openCheckout}
              className="w-full py-4 bg-emerald-900 hover:bg-emerald-950 text-gold-300 rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/20 transition-all"
            >
              <Zap className="w-4 h-4 text-gold-400 fill-current" />
              <span>Proceed to 1-Click Checkout &bull; ₹{finalTotal.toLocaleString('en-IN')}</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
