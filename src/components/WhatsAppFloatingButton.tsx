'use client';

import React, { useState } from 'react';
import { MessageCircle, Video, MapPin, X, Phone } from 'lucide-react';

export default function WhatsAppFloatingButton() {
  const [popoverOpen, setPopoverOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      
      {/* Popover Quick Menu */}
      {popoverOpen && (
        <div className="mb-3 w-72 bg-white rounded-2xl shadow-2xl border border-stone-200 p-4 space-y-3 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center justify-between border-b border-stone-100 pb-2">
            <div>
              <p className="font-serif font-bold text-xs text-emerald-950">SilkWorm Concierge</p>
              <p className="text-[10px] text-stone-500">Live Stylist &bull; Showroom Hours</p>
            </div>
            <button onClick={() => setPopoverOpen(false)} className="p-1 text-stone-400 hover:text-stone-700">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-1.5">
            <a
              href="https://wa.me/917876719360?text=Hi%20SilkWorm%20Creation!%20I%20would%20like%20to%20see%20sarees%20on%20a%20video%20call%20in%20natural%20daylight."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 p-2.5 rounded-xl bg-green-50 hover:bg-green-100 text-green-900 text-xs font-semibold transition-colors"
            >
              <Video className="w-4 h-4 text-green-600" />
              <span>Book 1-on-1 Video Call</span>
            </a>

            <a
              href="https://wa.me/917876719360?text=Hi%20SilkWorm%20Creation!%20I%20have%20a%20question%20about%20your%20saree%20collection."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 p-2.5 rounded-xl bg-stone-50 hover:bg-stone-100 text-stone-800 text-xs font-medium transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-emerald-800" />
              <span>Chat with Saree Stylist</span>
            </a>

            <a
              href="https://maps.google.com/?q=Reliance+Square+Peer+Muchalla+Zirakpur"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 p-2.5 rounded-xl bg-stone-50 hover:bg-stone-100 text-stone-800 text-xs font-medium transition-colors"
            >
              <MapPin className="w-4 h-4 text-gold-700" />
              <span>Showroom Location &amp; Map</span>
            </a>
          </div>
        </div>
      )}

      {/* Trigger Button */}
      <button
        onClick={() => setPopoverOpen(!popoverOpen)}
        className="relative group p-4 bg-emerald-900 hover:bg-emerald-950 text-white rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-105 active:scale-95 border-2 border-gold-400"
        aria-label="WhatsApp Concierge"
      >
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white animate-ping" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white" />
        <MessageCircle className="w-6 h-6 text-gold-300" />
      </button>
    </div>
  );
}
