'use client';

import React, { useState } from 'react';
import { MapPin, Clock, Phone, Navigation, Sparkles, Calendar, Video, Plane } from 'lucide-react';
import ShowroomAppointmentModal from '@/components/ShowroomAppointmentModal';
import { useCart } from '@/context/CartContext';

export default function ShowroomSection() {
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false);
  const { isDomestic, destinationCountry, formatPrice } = useCart();

  const internationalVideoUrl = `https://wa.me/917876719360?text=${encodeURIComponent(
    `Hi SilkWorm Creation, I am contacting you from ${destinationCountry}. I'd like to schedule a private 1-on-1 daylight video drape session to view your handloom sarees.`
  )}`;

  return (
    <section id="showroom" className="py-16 bg-emerald-950 text-cream-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Store Details */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/15 border border-gold-400/30 text-gold-300 text-xs font-bold uppercase tracking-wider">
              {isDomestic ? <MapPin className="w-3.5 h-3.5 text-gold-400" /> : <Plane className="w-3.5 h-3.5 text-gold-400" />}
              <span>{isDomestic ? 'Flagship Boutique Experience' : `Punjab Atelier & ${destinationCountry} Concierge`}</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-cream-50 leading-tight">
              {isDomestic 
                ? 'Visit SilkWorm Creation in Person' 
                : 'Visiting Punjab Soon? Or Drape Live in Natural Daylight'}
            </h2>

            <p className="text-xs sm:text-sm text-cream-200/90 leading-relaxed">
              {isDomestic
                ? 'Nothing compares to feeling the tactile drape of handcrafted linen and handloom weave. We welcome you to our flagship boutique in the Chandigarh–Panchkula–Zirakpur hub.'
                : `Planning your next wedding or festive visit to India? Reserve a private styling session at our atelier just 15 minutes from Chandigarh Airport (IXC), or schedule a 1-on-1 daylight video drape session from ${destinationCountry} right now.`
              }
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-emerald-900/60 border border-gold-500/20">
                <MapPin className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif text-sm font-bold text-white">
                    {isDomestic ? 'Showroom Address' : 'Atelier Location (15 Mins from Chandigarh Airport)'}
                  </h4>
                  <p className="text-xs text-cream-200 mt-0.5">
                    SCO 2, 1st Floor, Reliance Square, Opposite City Plaza, Near D-Mart, Peer Muchalla, Zirakpur, Punjab 160104
                  </p>
                  <p className="text-[11px] text-gold-300/80 mt-1">
                    {isDomestic 
                      ? 'Adjacent to Panchkula Sector 20 • 15 Mins from Chandigarh Airport' 
                      : 'Convenient airport transit stopover • VIP bridal appointments available'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {isDomestic ? (
                  <div className="p-4 rounded-2xl bg-emerald-900/60 border border-gold-500/20 flex items-center gap-3">
                    <Clock className="w-5 h-5 text-gold-400 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-white">Timings</p>
                      <p className="text-[11px] text-cream-200">11:00 AM – 8:00 PM</p>
                      <p className="text-[10px] text-gold-400">Open 7 Days a Week</p>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl bg-emerald-900/60 border border-gold-500/20 flex items-center gap-3">
                    <Video className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-white">Daylight Video Call</p>
                      <p className="text-[11px] text-cream-200">Live Showroom Drape</p>
                      <p className="text-[10px] text-gold-400">Coordinated with your timezone</p>
                    </div>
                  </div>
                )}

                <div className="p-4 rounded-2xl bg-emerald-900/60 border border-gold-500/20 flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gold-400 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-white">Direct Atelier Line</p>
                    <p className="text-[11px] text-cream-200">+91 78767 19360</p>
                    <p className="text-[10px] text-green-400 font-medium">WhatsApp &amp; Voice</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              {isDomestic ? (
                <>
                  <a
                    href="https://maps.google.com/?q=Reliance+Square+Peer+Muchalla+Zirakpur"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3.5 bg-gold-500 hover:bg-gold-400 text-emerald-950 font-bold rounded-2xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-colors"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>Get Google Maps Directions</span>
                  </a>

                  <button
                    onClick={() => setAppointmentModalOpen(true)}
                    className="px-6 py-3.5 bg-emerald-900 hover:bg-emerald-800 text-cream-100 font-semibold rounded-2xl text-xs border border-gold-400/40 flex items-center justify-center gap-2 transition-all hover:border-gold-400 shadow-md"
                  >
                    <Calendar className="w-4 h-4 text-gold-400" />
                    <span>Book VIP Showroom Visit</span>
                  </button>
                </>
              ) : (
                <>
                  <a
                    href={internationalVideoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3.5 bg-gold-500 hover:bg-gold-400 text-emerald-950 font-bold rounded-2xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-colors"
                  >
                    <Video className="w-4 h-4 text-emerald-950" />
                    <span>Schedule Daylight Video Drape</span>
                  </a>

                  <button
                    onClick={() => setAppointmentModalOpen(true)}
                    className="px-6 py-3.5 bg-emerald-900 hover:bg-emerald-800 text-cream-100 font-semibold rounded-2xl text-xs border border-gold-400/40 flex items-center justify-center gap-2 transition-all hover:border-gold-400 shadow-md"
                  >
                    <Calendar className="w-4 h-4 text-gold-400" />
                    <span>Book India Trip Atelier Visit</span>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Right Column: Visual Card */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-lg aspect-[16/11] rounded-3xl overflow-hidden border-2 border-gold-500/30 shadow-2xl bg-emerald-900">
              <img
                src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80"
                alt="SilkWorm Creation Showroom Collection"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-5 inset-x-5 p-4 rounded-2xl bg-emerald-950/80 backdrop-blur-md border border-gold-400/30 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-white">Full Handloom Gallery On Display</p>
                  <p className="text-[11px] text-cream-300">Over 100+ unlisted bridal, festive &amp; everyday drapes</p>
                </div>
                <span className="px-3 py-1 bg-gold-500 text-emerald-950 rounded-lg text-[10px] font-bold uppercase">
                  {isDomestic ? 'Tricity Flagship' : `Export to ${destinationCountry}`}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      <ShowroomAppointmentModal
        isOpen={appointmentModalOpen}
        onClose={() => setAppointmentModalOpen(false)}
      />
    </section>
  );
}
