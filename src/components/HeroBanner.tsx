'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight, Video, Sparkles, ShieldCheck, Plane, ChevronLeft, ChevronRight, Eye, Check } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface HeroBannerProps {
  onExploreClick: () => void;
  onBookVideoCall: () => void;
}

interface RunwayLook {
  id: string;
  number: string;
  tag: string;
  title: string;
  collection: string;
  fabricSpec: string;
  image: string;
  macroTexture: string;
  price: number;
  hue: string;
}

const RUNWAY_LOOKS: RunwayLook[] = [
  {
    id: 'look-1',
    number: '01',
    tag: 'Look 01 • Bridal & Festive Edit',
    title: 'Pure Linen Crimson Zari Saree',
    collection: 'Autumn / Winter 2026 Runway',
    fabricSpec: '100s Organic Handloom Linen • Metallic Zari Weft',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85',
    macroTexture: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80',
    price: 8699,
    hue: 'from-amber-500/20 via-rose-500/10 to-transparent',
  },
  {
    id: 'look-2',
    number: '02',
    tag: 'Look 02 • Golden Hour Salon',
    title: 'Banarasi Semi-Silk Tissue Drape',
    collection: 'Heritage Weavers Edition',
    fabricSpec: 'Ultra-Lustrous Metallic Tissue • Hand-Finished Zari Pallu',
    image: 'https://cdn.shopify.com/s/files/1/0773/1897/9769/files/ChatGPT_Image_May_19_2026_02_34_53_PM.png?v=1779181548',
    macroTexture: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80',
    price: 11999,
    hue: 'from-gold-400/25 via-amber-600/10 to-transparent',
  },
  {
    id: 'look-3',
    number: '03',
    tag: 'Look 03 • Minimalist Evening',
    title: 'Noir Pure Linen with Emerald Border',
    collection: 'Monochrome Contemporary Edit',
    fabricSpec: 'Organic Hand-Spun Warp • Hand-Knotted Tassel Pallu',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=85',
    macroTexture: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
    price: 7899,
    hue: 'from-emerald-500/20 via-teal-900/10 to-transparent',
  },
];

export default function HeroBanner({ onExploreClick, onBookVideoCall }: HeroBannerProps) {
  const { isDomestic, destinationCountry, currency, formatPrice } = useCart();
  const [activeLookIndex, setActiveLookIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const currentLook = RUNWAY_LOOKS[activeLookIndex];

  // Auto-advance looks smoothly
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveLookIndex((prev) => (prev + 1) % RUNWAY_LOOKS.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleNextLook = () => {
    setIsAutoPlaying(false);
    setActiveLookIndex((prev) => (prev + 1) % RUNWAY_LOOKS.length);
  };

  const handlePrevLook = () => {
    setIsAutoPlaying(false);
    setActiveLookIndex((prev) => (prev - 1 + RUNWAY_LOOKS.length) % RUNWAY_LOOKS.length);
  };

  const handleSelectLook = (idx: number) => {
    setIsAutoPlaying(false);
    setActiveLookIndex(idx);
  };

  return (
    <section className="relative overflow-hidden bg-[#0A1610] text-cream-100 min-h-[640px] lg:min-h-[720px] flex items-center">
      {/* Dynamic Ambient Runway Light & Subtle Gold Grid */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      
      {/* Smooth Ambient Light Spotlights */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none transition-colors duration-1000">
        <div className="absolute top-1/4 -right-20 w-[500px] h-[500px] bg-gold-500/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-emerald-700/15 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Haute Couture Editorial Copy & Interactive Runway Selector */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Runway Badges Row */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-500/10 border border-gold-400/40 text-gold-300 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em]">
                {isDomestic ? (
                  <>
                    <Sparkles className="w-3 h-3 text-gold-400" />
                    <span>Haute Handloom &bull; Chandigarh Atelier</span>
                  </>
                ) : (
                  <>
                    <Plane className="w-3.5 h-3.5 text-gold-400" />
                    <span>Global Atelier Export &bull; {destinationCountry.toUpperCase()}</span>
                  </>
                )}
              </span>

              {/* Live Daylight Inspection Beacon (WCAG Compliant High Contrast) */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-900/90 border border-emerald-400/60 text-[10px] sm:text-xs shadow-xs">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span className="text-emerald-100 font-semibold tracking-wide">Live Daylight Salon Active</span>
              </div>
            </div>

            {/* Editorial Headline with Dramatic Luxury Serif Hierarchy */}
            <div className="space-y-2">
              <p className="text-gold-400 text-xs sm:text-sm uppercase tracking-[0.3em] font-medium font-sans">
                Autumn / Winter 2026 Lookbook
              </p>
              <h1 className="font-serif text-4xl sm:text-6xl lg:text-[68px] font-normal tracking-tight text-cream-50 leading-[1.08]">
                Woven with <span className="italic font-normal text-gold-200">Heritage</span>,<br />
                Draped with <span className="font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-amber-200 to-gold-400">Grace.</span>
              </h1>
            </div>

            {/* Value Proposition Description */}
            <p className="text-xs sm:text-sm md:text-base text-stone-200 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              {isDomestic ? (
                "Master-woven Pure Linen, Banarasi Semi-Silk Tissue, and Handloom Cotton Sarees crafted by heritage weaver guilds. Every piece is pre-finished with complimentary Fall & Pico and dispatched directly from our Zirakpur flagship."
              ) : (
                `Authentic Indian artisanal handloom sarees delivered directly to your doorstep in ${destinationCountry}. Finished with complimentary Fall & Pico, pre-stitched 1-minute drape options, and guaranteed pre-cleared customs duties.`
              )}
            </p>

            {/* Interactive 3-Look Runway Tabs */}
            <div className="pt-2">
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mr-1">
                  Runway:
                </span>
                {RUNWAY_LOOKS.map((look, idx) => (
                  <button
                    key={look.id}
                    onClick={() => handleSelectLook(idx)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                      activeLookIndex === idx
                        ? 'bg-gold-500 text-emerald-950 shadow-md shadow-gold-500/20 scale-105'
                        : 'bg-emerald-950/80 hover:bg-emerald-900/80 text-stone-300 border border-stone-800'
                    }`}
                  >
                    <span>{look.number}</span>
                    <span className="hidden sm:inline font-sans text-[10px] uppercase tracking-wider">
                      {idx === 0 ? 'Crimson Zari' : idx === 1 ? 'Banarasi Tissue' : 'Noir Emerald'}
                    </span>
                  </button>
                ))}

                {/* Next / Prev Chevrons */}
                <div className="flex items-center gap-1 ml-2">
                  <button
                    onClick={handlePrevLook}
                    className="p-1 rounded-full bg-emerald-950 hover:bg-emerald-900 border border-stone-700 text-stone-300 hover:text-white transition-colors"
                    aria-label="Previous Look"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={handleNextLook}
                    className="p-1 rounded-full bg-emerald-950 hover:bg-emerald-900 border border-stone-700 text-stone-300 hover:text-white transition-colors"
                    aria-label="Next Look"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* High-Fashion Luxury CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-gold-400 via-gold-500 to-amber-400 hover:from-gold-300 hover:to-amber-300 text-emerald-950 font-bold rounded-full shadow-[0_10px_30px_rgba(212,175,55,0.25)] flex items-center justify-center gap-2.5 text-xs uppercase tracking-[0.2em] transition-all transform hover:-translate-y-0.5 active:translate-y-0 group"
              >
                <span>{isDomestic ? 'Shop The Atelier Edit' : `Explore Collection (${currency})`}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onBookVideoCall}
                className="w-full sm:w-auto px-7 py-4 bg-emerald-950/80 hover:bg-emerald-900/90 text-cream-100 font-semibold rounded-full border border-gold-400/40 backdrop-blur-md flex items-center justify-center gap-2.5 text-xs tracking-wider transition-all hover:border-gold-400 shadow-md"
              >
                <Video className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span>{isDomestic ? 'Book WhatsApp Daylight Drape' : `Daylight Video Salon (${destinationCountry})`}</span>
              </button>
            </div>

            {/* Trust Points Metrics */}
            <div className="pt-6 border-t border-stone-800/80 grid grid-cols-3 gap-2 sm:gap-4 text-center lg:text-left">
              {isDomestic ? (
                <>
                  <div className="min-w-0">
                    <p className="font-serif text-sm sm:text-lg lg:text-xl font-bold text-gold-300 tracking-wider truncate">100% PURE</p>
                    <p className="text-[9px] sm:text-[11px] text-stone-400 font-medium truncate">Silk Mark Certified</p>
                  </div>
                  <div className="min-w-0">
                    <p className="font-serif text-sm sm:text-lg lg:text-xl font-bold text-gold-300 tracking-wider truncate">FALL &amp; PICO</p>
                    <p className="text-[9px] sm:text-[11px] text-stone-400 font-medium truncate">Complimentary Pre-Done</p>
                  </div>
                  <div className="min-w-0">
                    <p className="font-serif text-sm sm:text-lg lg:text-xl font-bold text-gold-300 tracking-wider truncate">2&ndash;3 DAYS</p>
                    <p className="text-[9px] sm:text-[11px] text-stone-400 font-medium truncate">Pan-India Express</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="min-w-0">
                    <p className="font-serif text-sm sm:text-lg lg:text-xl font-bold text-gold-300 tracking-wider truncate">4&ndash;6 DAYS</p>
                    <p className="text-[9px] sm:text-[11px] text-stone-400 font-medium truncate">DHL Express Air</p>
                  </div>
                  <div className="min-w-0">
                    <p className="font-serif text-sm sm:text-lg lg:text-xl font-bold text-gold-300 tracking-wider truncate">DUTY-FREE</p>
                    <p className="text-[9px] sm:text-[11px] text-stone-400 font-medium truncate">Pre-Cleared Customs</p>
                  </div>
                  <div className="min-w-0">
                    <p className="font-serif text-sm sm:text-lg lg:text-xl font-bold text-gold-300 tracking-wider truncate">1-MIN DRAPE</p>
                    <p className="text-[9px] sm:text-[11px] text-stone-400 font-medium truncate">Pre-Pleated Option</p>
                  </div>
                </>
              )}
            </div>

          </div>

          {/* Right Column: Multi-Depth Haute Couture Atelier Collage */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* The Main Editorial Portrait Container */}
            <div className="relative w-full max-w-[340px] sm:max-w-[400px] aspect-[3/4] rounded-3xl overflow-hidden border border-gold-400/40 shadow-[0_25px_60px_rgba(0,0,0,0.6)] bg-emerald-950 group">
              
              {/* Runway Image with Smooth Transition */}
              <img
                key={currentLook.image}
                src={currentLook.image}
                alt={currentLook.title}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85';
                }}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-700 filter contrast-[1.02] animate-in fade-in duration-500"
              />
              
              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

              {/* Top Runway Badges Header */}
              <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between gap-2 z-10">
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/85 backdrop-blur-md border border-gold-400/50 text-[10px] font-bold text-gold-300 shadow-md uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
                  <span>Silk Mark Handloom</span>
                </span>

                <span className="px-2.5 py-1 rounded-full bg-emerald-950/85 backdrop-blur-md border border-stone-700 text-[10px] font-mono font-bold text-stone-300">
                  {currentLook.number} / 03
                </span>
              </div>

              {/* Floating Tactile Macro Fabric Texture Swatch Card */}
              <div className="absolute top-16 right-3.5 w-24 sm:w-28 rounded-2xl bg-white/95 backdrop-blur-md border border-gold-400/50 p-1.5 shadow-xl text-stone-900 z-10 transform hover:scale-105 transition-transform duration-300 hidden sm:block">
                <div className="relative aspect-square rounded-xl overflow-hidden mb-1 border border-stone-200">
                  <img
                    src={currentLook.macroTexture}
                    alt="Macro Fabric Swatch"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-1 right-1 px-1 py-0.5 rounded bg-black/70 text-[8px] font-mono text-gold-300 font-bold">
                    100x
                  </span>
                </div>
                <p className="text-[8.5px] font-bold text-emerald-950 uppercase tracking-tight text-center truncate">
                  Artisan Weave
                </p>
                <p className="text-[7.5px] text-stone-500 text-center truncate">
                  Zero Synthetics
                </p>
              </div>

              {/* Bottom Editorial Caption Card */}
              <div className="absolute bottom-3 inset-x-3 sm:bottom-4 sm:inset-x-4 p-3.5 sm:p-4 rounded-2xl bg-black/80 backdrop-blur-xl border border-gold-400/35 text-cream-100 shadow-2xl z-10">
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-bold text-gold-400 uppercase tracking-widest truncate">
                        {currentLook.tag}
                      </span>
                    </div>
                    <h3 className="font-serif text-sm sm:text-base font-bold text-white mt-0.5 truncate">
                      {currentLook.title}
                    </h3>
                    <p className="text-[10px] text-stone-300 truncate mt-0.5 font-mono">
                      {currentLook.fabricSpec}
                    </p>
                    <p className="text-xs font-bold text-gold-300 mt-1">
                      {formatPrice(currentLook.price)}{' '}
                      <span className="text-[10px] text-stone-400 font-normal font-sans">
                        &bull; Fall &amp; Pico Included
                      </span>
                    </p>
                  </div>

                  <button
                    onClick={onExploreClick}
                    className="p-3 bg-gradient-to-r from-gold-400 to-gold-500 text-emerald-950 rounded-2xl font-bold hover:scale-105 active:scale-95 transition-all shadow-md flex-shrink-0"
                    aria-label="Explore This Saree"
                  >
                    <ArrowRight className="w-4 h-4" />
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
