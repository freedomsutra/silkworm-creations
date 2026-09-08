'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { X, Search, PackageCheck, Scissors, Truck, CheckCircle2, Clock } from 'lucide-react';

export default function TrackOrderModal() {
  const { trackModalOpen, closeTrackModal } = useCart();
  const [orderQuery, setOrderQuery] = useState('');
  const [searched, setSearched] = useState(false);

  if (!trackModalOpen) return null;

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderQuery.trim()) {
      setSearched(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/75 backdrop-blur-sm" onClick={closeTrackModal} />

      <div className="relative bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl z-10 border border-stone-200 p-6 flex flex-col space-y-5">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div>
            <h3 className="font-serif font-bold text-lg text-emerald-950">Track Your Saree Order</h3>
            <p className="text-xs text-stone-500">Enter Order ID or WhatsApp Mobile Number</p>
          </div>
          <button onClick={closeTrackModal} className="p-1.5 text-stone-400 hover:text-stone-800 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleTrack} className="flex gap-2">
          <input
            type="text"
            required
            placeholder="e.g. SWC-481920 or 9876543210"
            value={orderQuery}
            onChange={(e) => setOrderQuery(e.target.value)}
            className="flex-1 px-3 py-2.5 text-xs rounded-xl border border-stone-200 bg-stone-50 focus:outline-none focus:border-gold-500 font-mono"
          />
          <button
            type="submit"
            className="px-5 py-2.5 bg-emerald-900 hover:bg-emerald-950 text-gold-300 rounded-xl font-bold text-xs"
          >
            Track
          </button>
        </form>

        {searched && (
          <div className="p-4 bg-cream-50 rounded-2xl border border-stone-200 text-xs space-y-4 animate-in fade-in">
            <div className="flex justify-between items-center border-b border-stone-200/80 pb-2">
              <div>
                <p className="font-bold text-stone-900">Order #{orderQuery.toUpperCase()}</p>
                <p className="text-[10px] text-stone-500">Pure Linen Saree with Zari Border</p>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900">
                In Tailoring
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-emerald-900 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>1. Order Confirmed &amp; Handloom Weave Inspected</span>
              </div>
              <div className="flex items-center gap-3 text-amber-900 font-semibold">
                <Scissors className="w-4 h-4 text-amber-600 animate-spin" style={{ animationDuration: '6s' }} />
                <span>2. Fall &amp; Pico Reinforcement in Progress (Showroom Tailor)</span>
              </div>
              <div className="flex items-center gap-3 text-stone-400">
                <Truck className="w-4 h-4" />
                <span>3. Dispatched with Express Tracked Courier</span>
              </div>
              <div className="flex items-center gap-3 text-stone-400">
                <PackageCheck className="w-4 h-4" />
                <span>4. Delivered to Doorstep</span>
              </div>
            </div>

            <p className="text-[11px] text-stone-500 pt-2 border-t border-stone-200">
              Expected Delivery: <strong>Tomorrow by 5:00 PM</strong> (Chandigarh/Tricity Hub)
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
