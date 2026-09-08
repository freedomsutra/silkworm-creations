'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Does every saree come with an unstitched blouse piece?',
      a: 'Yes, all our sarees include a matching 0.8-meter running or contrast unstitched blouse piece. If you prefer to receive it ready to wear, you can select our "Add Custom Blouse Tailoring" option on the product page, and our showroom master tailor will stitch it to your exact measurements.'
    },
    {
      q: 'What is complimentary Fall & Pico, and do I need to pay extra?',
      a: 'Fall & Pico is 100% complimentary on every order. Before packing, our master craftsmen attach a pure cotton fall along the lower pleat border and finish the pallu edge with a fine picot seam, ensuring your saree is completely ready to drape straight out of the luxury gift box.'
    },
    {
      q: 'How does the 1-on-1 WhatsApp Video Viewing work?',
      a: 'Buying luxury handloom online can be daunting if you haven\'t seen the color in daylight. Click "Book Video Consultation" on any saree, and our stylist at Atelier Chandigarh will connect with you on a dedicated WhatsApp Video Call. We hold the saree up in natural sunlight, show you the reverse of the weave, and demonstrate the pallu drape before you buy.'
    },
    {
      q: 'What are your delivery timelines for Chandigarh Capital Region and Pan-India?',
      a: 'For Chandigarh, Panchkula, Mohali, and the Capital Region, we offer express Same-Day or Next-Day dispatch directly from Atelier Chandigarh. For all other Indian cities, orders are shipped via insured air couriers (BlueDart/Delhivery) and arrive within 2 to 4 business days. We also offer worldwide priority express delivery to USA, UK, Canada, Australia, and UAE.'
    },
    {
      q: 'Can I exchange the saree if the color or drape does not suit me?',
      a: 'Yes! We offer a hassle-free 7-day exchange window. Simply message us on WhatsApp (+91 78767 19360) or email silkwormcreation@gmail.com, and we will arrange a complimentary courier pickup or welcome you to Atelier Chandigarh to exchange for another piece.'
    }
  ];

  return (
    <section className="py-16 sm:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/10 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-2">
          <HelpCircle className="w-3.5 h-3.5 text-gold-600" />
          <span>Need Guidance?</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-emerald-950">
          Frequently Answered Inquiries
        </h2>
        <p className="text-stone-600 text-xs sm:text-sm mt-2">
          Everything you need to know about our handloom weaves, tailoring, and doorstep service.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="rounded-2xl border border-stone-200 bg-white overflow-hidden transition-all shadow-xs"
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full text-left p-5 flex items-center justify-between gap-4 hover:bg-stone-50 transition-colors"
              >
                <span className="font-serif text-sm font-bold text-emerald-950">
                  {faq.q}
                </span>
                <ChevronDown className={`w-4 h-4 text-gold-700 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs text-stone-600 leading-relaxed border-t border-stone-100 bg-cream-50/40">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
