'use client';

import React from 'react';
import { Sparkles, MapPin, Video, PhoneCall } from 'lucide-react';

export default function AnnouncementBar() {
  return (
    <div className="bg-emerald-900 text-cream-100 text-xs py-2 px-4 font-medium border-b border-gold-500/20">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-center sm:text-left">
        <div className="flex items-center gap-2 justify-center">
          <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-pulse" />
          <span>Complimentary <strong>Fall &amp; Pico</strong> with all sarees</span>
          <span className="hidden md:inline text-gold-400/60">•</span>
          <span className="hidden md:inline text-gold-300">Free Express Shipping Across India</span>
        </div>
        <div className="flex items-center gap-4 justify-center text-[11px] text-cream-200">
          <a 
            href="https://maps.google.com/?q=Reliance+Square+Peer+Muchalla+Zirakpur" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-gold-300 transition-colors"
          >
            <MapPin className="w-3 h-3 text-gold-400" />
            <span>Showroom: SCO 2, Reliance Sq, Zirakpur</span>
          </a>
          <span className="text-gold-400/40">|</span>
          <a 
            href="https://wa.me/917876719360?text=Hi%20SilkWorm%20Creation,%20I%20would%20like%20to%20book%20a%201-on-1%20video%20call%20to%20see%20your%20sarees" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-gold-300 transition-colors text-gold-400 font-semibold"
          >
            <Video className="w-3 h-3 text-green-400" />
            <span>Book Video Consultation</span>
          </a>
        </div>
      </div>
    </div>
  );
}
