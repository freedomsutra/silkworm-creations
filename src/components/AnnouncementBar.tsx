'use client';

import React from 'react';
import { Sparkles, MapPin, Video, Plane, ShieldCheck } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function AnnouncementBar() {
  const { isDomestic, destinationCountry } = useCart();

  return (
    <div className="bg-[#0A2318] text-cream-100 text-xs py-2 px-3 sm:px-4 font-medium border-b border-gold-500/20 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-between text-[11px] sm:text-xs">
        {/* Left / Center Guarantee */}
        <div className="flex items-center gap-2 mx-auto sm:mx-0 text-center sm:text-left truncate">
          {isDomestic ? (
            <>
              <Sparkles className="w-3.5 h-3.5 text-gold-400 flex-shrink-0 animate-pulse" />
              <span className="truncate">
                <strong className="text-gold-300 font-semibold">Complimentary Fall &amp; Pico</strong> on All Sarees
              </span>
              <span className="hidden md:inline text-gold-400/40">&bull;</span>
              <span className="hidden md:inline text-cream-200">Free Express Delivery Across India</span>
            </>
          ) : (
            <>
              <Plane className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
              <span className="truncate">
                <strong className="text-gold-300 font-semibold">Express Delivery to {destinationCountry}</strong> in 4–6 Days
              </span>
              <span className="hidden md:inline text-gold-400/40">&bull;</span>
              <span className="hidden md:inline text-cream-200">All Duties &amp; Taxes Pre-Paid &bull; Fall &amp; Pico Pre-Finished</span>
            </>
          )}
        </div>

        {/* Right Luxury Quick Links (Desktop & Tablet) */}
        <div className="hidden sm:flex items-center gap-4 text-[11px] text-cream-200 flex-shrink-0">
          {isDomestic ? (
            <a
              href="https://maps.google.com/?q=Reliance+Square+Peer+Muchalla+Zirakpur"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-gold-300 transition-colors"
            >
              <MapPin className="w-3 h-3 text-gold-400" />
              <span className="truncate">Reliance Sq, Zirakpur</span>
            </a>
          ) : (
            <span className="flex items-center gap-1 text-gold-300 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
              <span>100% Insured Air Courier</span>
            </span>
          )}

          <span className="text-gold-400/30">|</span>

          <a
            href="https://wa.me/917876719360?text=Hi%20SilkWorm%20Creation,%20I%20would%20like%20to%20book%20a%201-on-1%20video%20call%20to%20see%20your%20sarees"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-gold-400 hover:text-gold-300 transition-colors font-medium"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping" />
            <Video className="w-3 h-3 text-green-400" />
            <span>{isDomestic ? 'Book Video Drape' : 'Daylight Video Drape Salon'}</span>
          </a>
        </div>
      </div>
    </div>
  );
}

