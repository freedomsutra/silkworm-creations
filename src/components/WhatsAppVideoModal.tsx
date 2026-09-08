'use client';

import React, { useState } from 'react';
import { X, Video, MessageCircle, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface WhatsAppVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WhatsAppVideoModal({ isOpen, onClose }: WhatsAppVideoModalProps) {
  const [preferredTime, setPreferredTime] = useState('Now (During Showroom Hours)');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  if (!isOpen) return null;

  const handleLaunchWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `Hello SilkWorm Creation! My name is ${name || 'Customer'}. I would like to schedule a 1-on-1 WhatsApp video call (${preferredTime}) to view sarees in natural daylight.`
    );
    window.open(`https://wa.me/917876719360?text=${msg}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl z-10 border border-stone-200 p-6 flex flex-col space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-green-100 text-green-700 rounded-xl">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-emerald-950">
                1-on-1 Video Consultation
              </h3>
              <p className="text-[11px] text-stone-500">Live from our Chandigarh showroom</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-stone-400 hover:text-stone-800 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-stone-600 leading-relaxed">
          See the actual fabric texture, zari border sheen, and color shade in natural sunlight with a personal boutique stylist before you order.
        </p>

        <form onSubmit={handleLaunchWhatsApp} className="space-y-3">
          <div>
            <label className="text-[11px] font-bold text-stone-700 block mb-0.5">Your Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Gurpreet Kaur"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 bg-stone-50 focus:outline-none focus:border-gold-500"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-stone-700 block mb-0.5">WhatsApp Mobile Number</label>
            <input
              type="tel"
              required
              placeholder="10-digit mobile number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 bg-stone-50 focus:outline-none focus:border-gold-500 font-mono"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-stone-700 block mb-0.5">Preferred Call Time</label>
            <select
              value={preferredTime}
              onChange={(e) => setPreferredTime(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 bg-stone-50 font-semibold"
            >
              <option value="Immediately (Now)">Immediately (Showroom hours: 11 AM - 8 PM)</option>
              <option value="Today Afternoon (2 PM - 5 PM)">Today Afternoon (2 PM - 5 PM)</option>
              <option value="Today Evening (5 PM - 8 PM)">Today Evening (5 PM - 8 PM)</option>
              <option value="Tomorrow Morning (11 AM - 1 PM)">Tomorrow Morning (11 AM - 1 PM)</option>
            </select>
          </div>

          <div className="p-2.5 bg-cream-50 rounded-xl border border-stone-200 text-[11px] text-stone-600 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-800 flex-shrink-0" />
            <span>Zero obligation to purchase &bull; 100% Free Service</span>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-green-600 hover:bg-green-700 text-white rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-colors pt-3"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Connect on WhatsApp Video Call</span>
          </button>
        </form>
      </div>
    </div>
  );
}
