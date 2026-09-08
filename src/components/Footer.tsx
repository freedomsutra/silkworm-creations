'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, MapPin, Phone, Mail, Instagram, Facebook, ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-emerald-950 text-cream-200 text-xs pt-16 pb-12 border-t border-gold-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <div>
              <h3 className="font-serif text-2xl font-bold text-cream-50">SILKWORM</h3>
              <p className="text-[10px] tracking-[0.3em] text-gold-400 font-bold uppercase">CREATION &bull; CHANDIGARH</p>
            </div>
            <p className="text-xs text-cream-300/80 leading-relaxed">
              Curators of authentic handloom heritage sarees. Rooted in artisanal integrity, every piece is inspected, finished with complimentary Fall &amp; Pico, and delivered ready to grace your special occasions.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/silkwormcreation/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-emerald-900 hover:bg-gold-500 hover:text-emerald-950 text-cream-100 rounded-full transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/silkwormcreation"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-emerald-900 hover:bg-gold-500 hover:text-emerald-950 text-cream-100 rounded-full transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-sm font-bold text-gold-300">Collections</h4>
            <ul className="space-y-2 text-xs text-cream-300">
              <li><a href="#catalog-section" className="hover:text-gold-300 transition-colors">Pure Linen Sarees</a></li>
              <li><a href="#catalog-section" className="hover:text-gold-300 transition-colors">Banarasi Tissue</a></li>
              <li><a href="#catalog-section" className="hover:text-gold-300 transition-colors">Handloom Cotton</a></li>
              <li><a href="#catalog-section" className="hover:text-gold-300 transition-colors">Wedding &amp; Festive Edit</a></li>
              <li><a href="#catalog-section" className="hover:text-gold-300 transition-colors">Office &amp; Daily Weaves</a></li>
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-sm font-bold text-gold-300">Services</h4>
            <ul className="space-y-2 text-xs text-cream-300">
              <li><span>Free Fall &amp; Pico Detailing</span></li>
              <li><span>Custom Blouse Tailoring</span></li>
              <li><span>1-on-1 Video Consultation</span></li>
              <li><span>Regional Same-Day Express</span></li>
              <li><span>Worldwide NRI Shipping</span></li>
            </ul>
          </div>

          {/* Contact & Legal */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-serif text-sm font-bold text-gold-300">Flagship Salon &amp; Atelier</h4>
            <div className="space-y-2.5 text-xs text-cream-300">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                <span>
                  Atelier Chandigarh &bull; Reliance Square, Zirakpur 160104 &bull;{' '}
                  <Link href="/boutique" className="text-gold-400 hover:text-gold-300 underline font-semibold">
                    Visiting Guide &rarr;
                  </Link>
                </span>
              </p>
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-stone-400 flex-shrink-0 mt-0.5" />
                <span>Registered: 4th Floor, C-54, GH-94, Sector 20, Panchkula, Haryana 134117</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <a href="tel:+917876719360" className="hover:text-gold-300">+91 78767 19360</a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <a href="mailto:silkwormcreation@gmail.com" className="hover:text-gold-300">silkwormcreation@gmail.com</a>
              </p>
              <p className="text-[11px] text-stone-400 pt-1">
                GSTIN: <span className="font-mono text-gold-300 font-semibold">06ADFPH4354N1ZD</span>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-8 border-t border-emerald-900/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-400">
          <p>&copy; 2026 SILKWORM CREATION. All rights reserved. Jurisdictional Courts: Panchkula, Haryana.</p>
          <div className="flex items-center gap-4">
            <span>Crafted with Authentic Heritage &bull; Hosted on Vercel</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
