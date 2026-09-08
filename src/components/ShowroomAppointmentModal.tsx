'use client';

import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, Sparkles, CheckCircle2, MessageCircle, Users } from 'lucide-react';

interface ShowroomAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ShowroomAppointmentModal({ isOpen, onClose }: ShowroomAppointmentModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('Morning (11:00 AM – 1:30 PM)');
  const [occasion, setOccasion] = useState('Bridal & Wedding Trousseau');
  const [guests, setGuests] = useState('1 - 2 Guests');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `*VIP Showroom Appointment Request - SilkWorm Creation*\n` +
      `👤 *Patron:* ${name || 'Customer'}\n` +
      `📞 *Phone:* ${phone}\n` +
      `📅 *Date:* ${date || 'Upcoming visit'}\n` +
      `⏰ *Time Slot:* ${timeSlot}\n` +
      `👗 *Occasion / Interest:* ${occasion}\n` +
      `👥 *Party Size:* ${guests}\n` +
      `📍 *Showroom:* SCO 2, 1st Floor, Reliance Square, Peer Muchalla, Zirakpur`
    );
    window.open(`https://wa.me/917876719360?text=${msg}`, '_blank');
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl z-10 border border-stone-200 p-6 sm:p-7 flex flex-col space-y-4 max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 bg-amber-100 text-amber-900 rounded-2xl">
              <Sparkles className="w-5 h-5 text-gold-600" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base sm:text-lg text-emerald-950">
                VIP Boutique Appointment
              </h3>
              <p className="text-[11px] text-stone-500">
                SilkWorm Creation &bull; Peer Muchalla, Zirakpur (Chandigarh Hub)
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-stone-400 hover:text-stone-800 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Value Proposition */}
        <div className="p-3 rounded-2xl bg-cream-100 border border-gold-300/40 text-[11px] text-stone-700 space-y-1">
          <p className="font-bold text-emerald-950 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-800" />
            <span>Dedicated Personal Draper &bull; Trial Lounge &bull; Fresh Refreshments</span>
          </p>
          <p className="text-stone-500">
            Enjoy private access to our full 100+ unlisted handloom catalog with zero obligation to purchase.
          </p>
        </div>

        {submitted ? (
          <div className="py-10 text-center space-y-3">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-lg font-bold text-emerald-950">Opening WhatsApp Concierge...</h4>
            <p className="text-xs text-stone-600">
              Our boutique manager is confirming your appointment slot right now!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-stone-700 block mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Harpreet Kaur"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-stone-200 bg-stone-50 focus:outline-none focus:border-gold-500"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">WhatsApp Mobile</label>
                <input
                  type="tel"
                  required
                  placeholder="10-digit number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-stone-200 bg-stone-50 focus:outline-none focus:border-gold-500 font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-stone-700 block mb-1">Preferred Date</label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 focus:outline-none focus:border-gold-500 text-stone-700 font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Preferred Time Slot</label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 font-medium"
                >
                  <option value="Morning (11:00 AM – 1:30 PM)">Morning (11:00 AM – 1:30 PM)</option>
                  <option value="Afternoon (2:00 PM – 4:30 PM)">Afternoon (2:00 PM – 4:30 PM)</option>
                  <option value="Evening (5:00 PM – 7:30 PM)">Evening (5:00 PM – 7:30 PM)</option>
                  <option value="Late VIP (7:30 PM – 8:30 PM)">Late VIP (7:30 PM – 8:30 PM)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-stone-700 block mb-1">Saree Occasion / Style</label>
                <select
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 font-medium"
                >
                  <option value="Bridal & Wedding Trousseau">Bridal & Wedding Trousseau</option>
                  <option value="Anand Karaj / Sangeet / Reception">Anand Karaj / Sangeet / Reception</option>
                  <option value="Everyday Handloom Cotton & Linen">Everyday Handloom Cotton & Linen</option>
                  <option value="Banarasi & Pure Silk Weaves">Banarasi & Pure Silk Weaves</option>
                  <option value="Executive & Keynote Elegance">Executive & Keynote Elegance</option>
                  <option value="Casual Boutique Exploration">Casual Boutique Exploration</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Accompanying Guests</label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 font-medium"
                >
                  <option value="Solo Consultation">Solo Consultation</option>
                  <option value="1 - 2 Guests">1 - 2 Guests</option>
                  <option value="3 - 5 Guests (Family Trousseau)">3 - 5 Guests (Family Trousseau)</option>
                  <option value="5+ Guests (Full Bridal Party)">5+ Guests (Full Bridal Party)</option>
                </select>
              </div>
            </div>

            <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 flex items-start gap-2.5 text-[11px] text-stone-600">
              <MapPin className="w-4 h-4 text-gold-600 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Showroom Address:</strong> SCO 2, 1st Floor, Reliance Square, Peer Muchalla, Zirakpur (Next to Sector 20 Panchkula). Free parking available.
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-gold-500 hover:bg-gold-400 text-emerald-950 font-bold rounded-2xl uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all pt-3.5"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Confirm Appointment via WhatsApp Concierge</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
