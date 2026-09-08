'use client';

import React from 'react';
import { Star, CheckCircle2, Quote, Sparkles, MapPin, ExternalLink } from 'lucide-react';
import { REVIEWS } from '@/data/products';

export default function ReviewsSection() {
  return (
    <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
          <Star className="w-3.5 h-3.5 fill-current text-amber-600" />
          <span>Verifiable Client Proof</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-emerald-950">
          Loved Across Chandigarh &amp; Worldwide
        </h2>
        <p className="text-stone-600 text-xs sm:text-sm mt-2">
          Real patron experiences from our Tricity boutique &amp; international doorstep deliveries.
        </p>

        {/* Aggregate Score Bar */}
        <div className="mt-4 inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-cream-100 border border-stone-200 shadow-xs">
          <div className="flex text-amber-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>
          <span className="text-xs font-bold text-stone-800">4.9 out of 5</span>
          <span className="text-stone-300">|</span>
          <span className="text-xs text-stone-600 font-medium">Google Business &amp; Instagram Verified</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {REVIEWS.map((rev) => (
          <div
            key={rev.id}
            className="p-6 rounded-3xl bg-white border border-stone-200/90 shadow-sm flex flex-col justify-between hover:border-gold-500/50 transition-all hover:shadow-md"
          >
            <div>
              {/* Header with Source Badge & Stars */}
              <div className="flex items-center justify-between mb-3.5">
                <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {rev.source}
                </span>
                <span className="text-[10px] text-stone-400">{rev.date}</span>
              </div>

              <div className="flex text-amber-500 mb-2">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>

              <h4 className="font-serif text-sm font-bold text-stone-900 mb-2 leading-snug">
                &ldquo;{rev.title}&rdquo;
              </h4>

              <p className="text-xs text-stone-600 leading-relaxed">
                {rev.comment}
              </p>
            </div>

            {/* Author Profile with Photo & Social Tag */}
            <div className="pt-4 mt-4 border-t border-stone-100">
              <div className="flex items-center gap-3">
                <img
                  src={rev.clientPhoto}
                  alt={rev.author}
                  className="w-10 h-10 rounded-full object-cover border-2 border-gold-400/40 shadow-xs flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-emerald-950 flex items-center gap-1">
                    <span className="truncate">{rev.author}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0 inline" />
                  </p>
                  <p className="text-[10px] text-stone-500 truncate">{rev.location}</p>
                  <p className="text-[10px] text-gold-700 font-medium truncate">{rev.socialTag}</p>
                </div>
              </div>

              <p className="text-[10px] font-semibold text-emerald-900 mt-2.5 pt-2 border-t border-stone-100/80 line-clamp-1">
                Draped: {rev.productName}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
