'use client';

import React from 'react';
import { ArrowRight, Video, Sparkles, ShieldCheck, MapPin, Compass } from 'lucide-react';

interface HeroBannerProps {
  onExploreClick: () => void;
  onBookVideoCall: () => void;
}

export default function HeroBanner({ onExploreClick, onBookVideoCall }: HeroBannerProps) {
  return (
    <section className="relative overflow-hidden bg-emerald-950 text-cream-100">
      {/* Background Subtle Gradient & Accents */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-gold-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-700/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Copy & Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/15 border border-gold-400/30 text-gold-300 text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-spin" style={{ animationDuration: '4s' }} />
              <span>HANDLOOM HERITAGE &bull; CHANDIGARH TRICITY</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-cream-50 leading-[1.15]">
              Woven with Heritage,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-gold-300 to-amber-200">
                Draped with Grace.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-cream-200/90 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Discover master-woven Pure Linen, Banarasi Tissue, and Handloom Cotton Sarees. Experience every weave in natural daylight through 1-on-1 video calls or visit our flagship boutique in Reliance Square, Zirakpur.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto px-8 py-4 bg-gold-500 hover:bg-gold-400 text-emerald-950 font-bold rounded-full shadow-lg shadow-gold-500/20 flex items-center justify-center gap-2 text-sm uppercase tracking-wider transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Shop Handloom Edit</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onBookVideoCall}
                className="w-full sm:w-auto px-7 py-4 bg-emerald-900/80 hover:bg-emerald-800 text-cream-100 font-semibold rounded-full border border-gold-400/40 flex items-center justify-center gap-2.5 text-sm transition-all"
              >
                <Video className="w-4 h-4 text-gold-400 animate-pulse" />
                <span>Book WhatsApp Drape Call</span>
              </button>
            </div>

            {/* Trust Points */}
            <div className="pt-6 border-t border-emerald-800/80 grid grid-cols-3 gap-3 text-center lg:text-left">
              <div>
                <p className="font-serif text-xl sm:text-2xl font-bold text-gold-300">100%</p>
                <p className="text-[11px] sm:text-xs text-cream-300">Authentic Handloom</p>
              </div>
              <div>
                <p className="font-serif text-xl sm:text-2xl font-bold text-gold-300">FREE</p>
                <p className="text-[11px] sm:text-xs text-cream-300">Fall &amp; Pico Detailing</p>
              </div>
              <div>
                <p className="font-serif text-xl sm:text-2xl font-bold text-gold-300">4.9 ★</p>
                <p className="text-[11px] sm:text-xs text-cream-300">Client Satisfaction</p>
              </div>
            </div>
          </div>

          {/* Right Column: Elevated Luxury Editorial Showcase */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-gold-400/40 bg-emerald-900 group">
              {/* Main Lifestyle Editorial Photo */}
              <img
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85"
                alt="SilkWorm Creation Handcrafted Pure Linen Saree Drape"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter contrast-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/95 via-emerald-950/25 to-transparent" />
              
              {/* Official Badges Header (Responsive Safe) */}
              <div className="absolute top-3 inset-x-3 sm:top-4 sm:inset-x-4 flex items-center justify-between gap-2 z-10">
                <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-emerald-950/90 backdrop-blur-md border border-gold-400/50 text-[9px] sm:text-[10px] font-bold text-gold-300 shadow-md tracking-wider uppercase truncate">
                  <ShieldCheck className="w-3 h-3 text-gold-400 flex-shrink-0" />
                  <span className="truncate">Silk Mark Certified</span>
                </div>

                <div className="bg-emerald-950/90 backdrop-blur-md px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-gold-400/40 text-[9px] sm:text-[10px] font-bold text-cream-100 tracking-wider uppercase flex-shrink-0">
                  Tricity Flagship
                </div>
              </div>

              {/* Floating Editorial Card (Mobile Overflow Safe) */}
              <div className="absolute bottom-3 inset-x-3 sm:bottom-5 sm:inset-x-5 p-3 sm:p-4 rounded-2xl bg-emerald-950/95 backdrop-blur-md border border-gold-400/30 text-cream-100 shadow-xl overflow-hidden z-10">
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 truncate">
                      <span className="text-[9px] sm:text-[10px] font-bold text-gold-400 uppercase tracking-wider truncate">Autumn Edit</span>
                      <span className="w-1 h-1 rounded-full bg-gold-400 flex-shrink-0" />
                      <span className="text-[9px] sm:text-[10px] text-green-400 font-semibold truncate">Ready to Drape</span>
                    </div>
                    <p className="font-serif text-sm sm:text-base font-bold text-cream-50 mt-0.5 truncate">Pure Linen Zari Saree</p>
                    <p className="text-[11px] sm:text-xs text-cream-300 font-medium mt-0.5 truncate">₹8,699 &bull; Free Fall &amp; Pico Done</p>
                  </div>
                  <button
                    onClick={onExploreClick}
                    className="p-2.5 sm:p-3 bg-gold-500 text-emerald-950 rounded-full font-bold hover:bg-gold-400 transition-transform active:scale-95 shadow-md flex-shrink-0"
                    aria-label="View Handcrafted Saree"
                  >
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
