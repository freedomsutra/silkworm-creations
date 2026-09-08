'use client';

import React from 'react';
import { ShieldCheck, Scissors, Video, MapPin, Truck, RefreshCw } from 'lucide-react';

export default function TrustBadges() {
  const badges = [
    {
      icon: ShieldCheck,
      title: 'Silk Mark & Pure Weaves',
      desc: '100% authentic pure linen and handloom weaves direct from artisan clusters.'
    },
    {
      icon: Scissors,
      title: 'Free Fall & Pico Done',
      desc: 'Every saree arrives tailored, inspected, and ready to drape straight out of the box.'
    },
    {
      icon: Video,
      title: 'WhatsApp Video Viewing',
      desc: 'Check the real drape, zari sheen, and daylight shade before purchasing.'
    },
    {
      icon: MapPin,
      title: 'Showroom in Tricity',
      desc: 'Visit our flagship boutique in SCO 2, Reliance Square, Peer Muchalla (Open 7 Days).'
    }
  ];

  return (
    <section className="bg-cream-100 py-10 border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {badges.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className="flex items-start gap-4 p-5 rounded-2xl bg-cream-50 border border-stone-200/70 hover:border-gold-500/40 transition-colors shadow-sm"
              >
                <div className="p-3 rounded-xl bg-emerald-900/10 text-emerald-900 flex-shrink-0">
                  <Icon className="w-6 h-6 text-emerald-800" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-emerald-950 mb-1">{b.title}</h4>
                  <p className="text-xs text-stone-600 leading-relaxed">{b.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
