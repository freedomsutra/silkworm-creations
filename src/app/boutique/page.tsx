'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  MapPin, 
  Clock, 
  Phone, 
  Video, 
  Navigation, 
  Calendar, 
  Sparkles, 
  ShieldCheck, 
  Car, 
  ArrowRight, 
  CheckCircle2,
  Compass
} from 'lucide-react';
import AnnouncementBar from '@/components/AnnouncementBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ShowroomAppointmentModal from '@/components/ShowroomAppointmentModal';
import WhatsAppVideoModal from '@/components/WhatsAppVideoModal';
import WhatsAppFloatingButton from '@/components/WhatsAppFloatingButton';
import StickyMobileBar from '@/components/StickyMobileBar';
import CartDrawer from '@/components/CartDrawer';
import WishlistDrawer from '@/components/WishlistDrawer';
import TrackOrderModal from '@/components/TrackOrderModal';
import FastCheckoutModal from '@/components/FastCheckoutModal';

export default function BoutiquePage() {
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  return (
    <main className="min-h-screen flex flex-col bg-cream-50 pb-28 md:pb-0 w-full max-w-full overflow-x-clip min-w-0">
      <AnnouncementBar />
      <Navbar onCategorySelect={() => {}} selectedCategory="All" />

      {/* Hero Header: Romanticized Artisanal Provenance */}
      <section className="relative bg-[#0A1610] text-cream-100 py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-500/10 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="relative max-w-5xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-400/40 text-gold-300 text-xs font-bold uppercase tracking-[0.25em]">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>Artisanal Provenance &bull; Flagship Salon</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-normal tracking-tight text-cream-50">
            Atelier Chandigarh
          </h1>

          <p className="text-gold-300 font-serif italic text-lg sm:text-xl max-w-2xl mx-auto">
            "Handcrafted in the Heritage Weaving Guilds of India • Atelier Chandigarh"
          </p>

          <p className="text-xs sm:text-sm md:text-base text-stone-300 max-w-2xl mx-auto font-normal leading-relaxed pt-2">
            A dedicated sanctuary for handloom connoisseurs. We invite patrons for private daylight viewings, personalized bridal consultations, and tactile appreciation of pure organic weaves.
          </p>
        </div>
      </section>

      {/* Main Visiting Guide & Atelier Information */}
      <section className="py-12 sm:py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Salon Experience & Curated Services */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <span className="text-gold-700 text-xs font-bold uppercase tracking-[0.25em]">The Flagship Experience</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-emerald-950 mt-1">
                A Private Draping Salon in Natural Sunlight
              </h2>
              <p className="text-stone-600 text-sm mt-3 leading-relaxed">
                True handloom silks and linens reveal their soul under natural sunlight. Our Chandigarh atelier features floor-to-ceiling daylight salons where every nuance of zari sheen, hand-knotted tassel work, and fabric drape can be examined before purchase.
              </p>
            </div>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-xs space-y-2">
                <div className="w-9 h-9 rounded-xl bg-gold-500/10 flex items-center justify-center text-gold-700">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-emerald-950 text-base">Over 100+ Unlisted Pieces</h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Browse rare bridal tissue drapes, bespoke master-weaver editions, and archived linen collections exclusive to the atelier.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-xs space-y-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-950/10 flex items-center justify-center text-emerald-950">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-emerald-950 text-base">Master Stylist Drape</h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  One-on-one styling with seasoned handloom drapers to find the ideal pleat architecture for your physique and occasion.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-xs space-y-2">
                <div className="w-9 h-9 rounded-xl bg-gold-500/10 flex items-center justify-center text-gold-700">
                  <Car className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-emerald-950 text-base">Valet &amp; Elevator Access</h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Complimentary parking, valet assistance, and private elevator directly to the first-floor salon suite.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-xs space-y-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-950/10 flex items-center justify-center text-emerald-950">
                  <Video className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-emerald-950 text-base">Overseas Video Link</h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Unable to visit in person? Connect live via WhatsApp daylight video consultation from anywhere in the world.
                </p>
              </div>
            </div>

            {/* Atelier Address Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200 shadow-md space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-emerald-950 text-gold-300">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-emerald-950">
                    Showroom &amp; Dispatch Atelier
                  </h3>
                  <p className="text-xs text-stone-500">
                    Serving Chandigarh Capital Region &bull; Panchkula &bull; Mohali &bull; Global Air Dispatches
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-stone-100 text-sm text-stone-700 space-y-1.5">
                <p className="font-semibold text-stone-900">
                  SCO 2, 1st Floor, Reliance Square
                </p>
                <p className="text-stone-600 text-xs leading-relaxed">
                  Opposite City Plaza, Near D-Mart, Peer Muchalla / Sector 20 Panchkula Hub<br />
                  Zirakpur, Punjab 160104, India
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-stone-100 text-xs">
                <div className="flex items-center gap-2 text-stone-600">
                  <Clock className="w-4 h-4 text-emerald-800 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-stone-900">Salon Hours</p>
                    <p>11:00 AM – 8:00 PM (Open 7 Days)</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-stone-600">
                  <Phone className="w-4 h-4 text-emerald-800 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-stone-900">Concierge Desk</p>
                    <p>+91 78767 19360 (Voice &amp; WhatsApp)</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <a
                  href="https://maps.google.com/?q=Reliance+Square+Peer+Muchalla+Zirakpur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-gold-300 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Open in Google Maps</span>
                </a>

                <button
                  onClick={() => setAppointmentModalOpen(true)}
                  className="flex-1 py-3 px-4 rounded-xl bg-gold-500 hover:bg-gold-400 text-emerald-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Reserve Private Salon</span>
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Showcase & Direct Consultation */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] border border-stone-200 shadow-xl bg-stone-100 group">
              <img
                src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80"
                alt="SilkWorm Creation Atelier Chandigarh"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              
              <div className="absolute bottom-6 inset-x-6 text-white space-y-2">
                <span className="px-3 py-1 rounded-full bg-gold-500/20 text-gold-300 border border-gold-400/40 text-[10px] font-bold uppercase tracking-widest">
                  Flagship Boutique
                </span>
                <h3 className="font-serif text-xl font-bold">
                  Tactile Handloom Weaving Gallery
                </h3>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Every saree is inspected under 5000K daylight lighting and customized with complimentary Fall &amp; Pico before dispatch.
                </p>
              </div>
            </div>

            {/* Quick WhatsApp Video Drape Call Card */}
            <div className="p-6 rounded-3xl bg-emerald-950 text-cream-100 border border-gold-400/40 shadow-lg space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-300">
                  Global Stylist Video Drape
                </span>
              </div>
              <h4 className="font-serif text-lg font-bold text-gold-300">
                Live Daylight Video Drape Call
              </h4>
              <p className="text-xs text-stone-300 leading-relaxed">
                Connect directly with our senior drapers over WhatsApp video. Inspect fabric weights, border luster, and pallu drops live before placing an international or domestic order.
              </p>
              <button
                onClick={() => setVideoModalOpen(true)}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-gold-400 via-gold-500 to-amber-400 hover:from-gold-300 hover:to-amber-300 text-emerald-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <Video className="w-4 h-4 text-emerald-950" />
                <span>Schedule WhatsApp Video Drape</span>
              </button>
            </div>
          </div>

        </div>
      </section>

      <Footer />

      <WhatsAppFloatingButton />
      <StickyMobileBar onBookVideoCall={() => setVideoModalOpen(true)} />

      <ShowroomAppointmentModal 
        isOpen={appointmentModalOpen} 
        onClose={() => setAppointmentModalOpen(false)} 
      />

      <WhatsAppVideoModal 
        isOpen={videoModalOpen} 
        onClose={() => setVideoModalOpen(false)} 
      />

      <FastCheckoutModal />
      <CartDrawer />
      <WishlistDrawer />
      <TrackOrderModal />
    </main>
  );
}
