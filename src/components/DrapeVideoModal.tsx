'use client';

import React from 'react';
import { SareeProduct } from '@/types';
import { X, Video, Sparkles, Check, Phone } from 'lucide-react';

interface DrapeVideoModalProps {
  product: SareeProduct | null;
  onClose: () => void;
  onBookCall: () => void;
}

export default function DrapeVideoModal({ product, onClose, onBookCall }: DrapeVideoModalProps) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-emerald-950 text-cream-100 w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl z-10 border border-gold-500/30 p-6 flex flex-col space-y-4">
        <div className="flex items-center justify-between border-b border-emerald-800 pb-3">
          <div className="flex items-center gap-2">
            <Video className="w-4 h-4 text-green-400" />
            <h3 className="font-serif font-bold text-sm text-gold-300">
              Drape &amp; Movement Preview
            </h3>
          </div>
          <button onClick={onClose} className="p-1 text-cream-300 hover:text-white rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Simulation Box */}
        <div className="relative aspect-[9/16] max-h-96 rounded-2xl overflow-hidden bg-black flex items-center justify-center border border-gold-500/20">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-full object-cover object-center opacity-85 scale-105 animate-pulse"
            style={{ animationDuration: '4s' }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex flex-col justify-end p-5">
            <div className="space-y-2">
              <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-gold-500 text-emerald-950 uppercase tracking-wider">
                Fluid Drape &bull; {product.fabric}
              </span>
              <p className="font-serif text-base font-bold text-white">{product.title}</p>
              <p className="text-xs text-cream-200">
                Notice how the pallu falls with zero stiffness and creates sharp, elegant pleats.
              </p>
            </div>
          </div>
        </div>

        {/* Action button */}
        <div className="pt-2 space-y-2">
          <button
            onClick={() => {
              onClose();
              onBookCall();
            }}
            className="w-full py-3.5 bg-gold-500 hover:bg-gold-400 text-emerald-950 rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
          >
            <Video className="w-4 h-4" />
            <span>See this live on a WhatsApp Video Call</span>
          </button>
        </div>
      </div>
    </div>
  );
}
