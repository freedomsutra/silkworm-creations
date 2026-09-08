'use client';

import React from 'react';
import { Instagram, ArrowUpRight, Play, Heart, Sparkles } from 'lucide-react';
import { SareeProduct } from '@/types';

interface ShopTheGramProps {
  products: SareeProduct[];
  onSelectProduct: (product: SareeProduct) => void;
}

export default function ShopTheGram({ products, onSelectProduct }: ShopTheGramProps) {
  const gramPosts = [
    {
      img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
      caption: 'Pure linen saree with contrast border styled for a Chandigarh afternoon wedding ✨',
      likes: '1.2k',
      productIndex: 0
    },
    {
      img: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80',
      caption: 'The way this Banarasi semi-silk tissue catches the evening golden hour 🌅',
      likes: '890',
      productIndex: 4
    },
    {
      img: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80',
      caption: 'Handloom cotton elegance for boardroom meetings &amp; special celebrations 🖤',
      likes: '2.1k',
      productIndex: 6
    },
    {
      img: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=600&q=80',
      caption: 'Pastel dream: Soft tissue saree with handcrafted digital floral print 🌸',
      likes: '1.5k',
      productIndex: 5
    }
  ];

  return (
    <section className="py-16 bg-cream-100/70 border-t border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-bold uppercase tracking-wider mb-2">
              <Instagram className="w-3.5 h-3.5" />
              <span>@silkwormcreation</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-emerald-950">
              Shop The &lsquo;Gram
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm mt-1">
              Real drapes, client styling moments, and behind-the-scenes from our Tricity showroom.
            </p>
          </div>

          <a
            href="https://www.instagram.com/silkwormcreation/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 text-white rounded-full font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md hover:opacity-95 transition-opacity"
          >
            <Instagram className="w-4 h-4" />
            <span>Follow on Instagram</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {gramPosts.map((post, idx) => {
            const product = products[post.productIndex] || products[0];
            return (
              <div
                key={idx}
                onClick={() => onSelectProduct(product)}
                className="group relative aspect-[4/5] rounded-2xl overflow-hidden bg-stone-900 cursor-pointer shadow-md hover:shadow-xl transition-all"
              >
                <img
                  src={post.img}
                  alt="SilkWorm Creation Instagram Reel"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                {/* Top Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-[10px] font-bold text-white">
                  <Play className="w-3 h-3 fill-current text-gold-400" />
                  <span>Reel</span>
                </div>

                <div className="absolute top-3 right-3 flex items-center gap-1 text-[11px] font-bold text-white">
                  <Heart className="w-3.5 h-3.5 fill-current text-rose-500" />
                  <span>{post.likes}</span>
                </div>

                {/* Bottom Overlay Content */}
                <div className="absolute bottom-4 inset-x-4 space-y-2">
                  <p className="text-xs text-cream-100 line-clamp-2 leading-relaxed">
                    {post.caption}
                  </p>

                  <div className="pt-2 border-t border-white/20 flex items-center justify-between text-gold-300">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider font-semibold text-cream-300">Shop Saree</p>
                      <p className="font-serif text-xs font-bold text-white line-clamp-1">{product.title}</p>
                    </div>
                    <span className="p-2 bg-gold-500 text-emerald-950 rounded-full font-bold">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
