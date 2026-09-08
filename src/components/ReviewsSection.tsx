'use client';

import React from 'react';
import { Star, CheckCircle2, Quote, Sparkles } from 'lucide-react';
import { REVIEWS } from '@/data/products';

export default function ReviewsSection() {
  return (
    <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
          <Star className="w-3.5 h-3.5 fill-current text-amber-600" />
          <span>Verified Client Voices</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-emerald-950">
          Loved Across Chandigarh &amp; Worldwide
        </h2>
        <p className="text-stone-600 text-xs sm:text-sm mt-2">
          From Tricity brides to international saree connoisseurs, here is why patrons trust SilkWorm Creation.
        </p>

        {/* Aggregate Score Bar */}
        <div className="mt-4 inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-cream-100 border border-stone-200">
          <div className="flex text-amber-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>
          <span className="text-xs font-bold text-stone-800">4.9 out of 5</span>
          <span className="text-stone-300">|</span>
          <span className="text-xs text-stone-500">100% Verified Purchases</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {REVIEWS.map((rev) => (
          <div
            key={rev.id}
            className="p-6 rounded-3xl bg-white border border-stone-200/90 shadow-sm flex flex-col justify-between hover:border-gold-500/40 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex text-amber-500">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-[10px] text-stone-400">{rev.date}</span>
              </div>

              <h4 className="font-serif text-sm font-bold text-stone-900 mb-2">
                &ldquo;{rev.title}&rdquo;
              </h4>

              <p className="text-xs text-stone-600 leading-relaxed">
                {rev.comment}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-stone-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-emerald-950 flex items-center gap-1">
                    <span>{rev.author}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 inline" />
                  </p>
                  <p className="text-[10px] text-stone-500">{rev.location}</p>
                </div>
              </div>
              <p className="text-[10px] font-semibold text-gold-700 mt-1 line-clamp-1">
                Purchased: {rev.productName}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
