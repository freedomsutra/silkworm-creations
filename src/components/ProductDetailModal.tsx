'use client';

import React, { useState } from 'react';
import { SareeProduct } from '@/types';
import { useCart } from '@/context/CartContext';
import { 
  X, Star, Sun, Lightbulb, Video, ShoppingBag, Zap, 
  ShieldCheck, Scissors, Truck, MapPin, Sparkles, CheckCircle2, MessageCircle
} from 'lucide-react';

interface ProductDetailModalProps {
  product: SareeProduct | null;
  onClose: () => void;
  onWatchDrape: (product: SareeProduct) => void;
}

export default function ProductDetailModal({ product, onClose, onWatchDrape }: ProductDetailModalProps) {
  const { addItem, triggerInstantCheckout } = useCart();
  const [selectedImg, setSelectedImg] = useState(0);
  const [isDaylightMode, setIsDaylightMode] = useState(false);
  const [fallPico, setFallPico] = useState(true);
  const [blouseStitching, setBlouseStitching] = useState(false);
  const [blouseSize, setBlouseSize] = useState('Standard 38');
  
  // Pincode Delivery Estimator
  const [pincode, setPincode] = useState('');
  const [deliveryResult, setDeliveryResult] = useState<string | null>(null);

  if (!product) return null;

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length === 6) {
      if (['160017', '160019', '160022', '160055', '134117', '160104', '140603'].includes(pincode.trim())) {
        setDeliveryResult('⚡ Same-Day Delivery available for Chandigarh / Panchkula / Zirakpur (Orders before 4 PM)');
      } else {
        setDeliveryResult('🚚 Estimated Delivery in 2 - 4 Business Days with Tracked Express Courier');
      }
    } else {
      setDeliveryResult('Please enter a valid 6-digit Indian PIN code');
    }
  };

  const handleAddToCart = () => {
    addItem(product, fallPico, blouseStitching, blouseSize);
    onClose();
  };

  const handleBuyNow = () => {
    onClose();
    triggerInstantCheckout(product);
  };

  const whatsappMessage = encodeURIComponent(
    `Hi SilkWorm Creation, I am interested in "${product.title}" (₹${product.price}). Can you show me this saree on a quick 1-on-1 video call from your showroom in natural daylight?`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />

      {/* Modal Container */}
      <div className="relative bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl z-10 border border-stone-200 my-auto max-h-[92vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 bg-cream-50">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-gold-300">
              {product.fabric}
            </span>
            <span className="text-xs text-stone-500 font-medium">SKU: SWC-{product.id}</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-500 hover:text-stone-900 rounded-full hover:bg-stone-200/60 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Left Column: Gallery & Lighting Switcher */}
          <div className="md:col-span-6 space-y-4">
            {/* Main Image with Daylight Switcher */}
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 shadow-inner group">
              <img
                src={product.images[selectedImg] || product.images[0]}
                alt={product.title}
                className={`w-full h-full object-cover transition-all duration-500 ${
                  isDaylightMode ? 'brightness-105 contrast-105 saturate-110' : ''
                }`}
              />

              {/* Lighting Mode Switcher Banner */}
              <div className="absolute top-3 inset-x-3 flex items-center justify-between">
                <button
                  onClick={() => setIsDaylightMode(!isDaylightMode)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md backdrop-blur-md transition-all ${
                    isDaylightMode
                      ? 'bg-amber-400 text-stone-900 ring-2 ring-amber-300'
                      : 'bg-stone-900/80 text-white hover:bg-stone-900'
                  }`}
                >
                  {isDaylightMode ? <Sun className="w-4 h-4 text-amber-900 fill-current" /> : <Lightbulb className="w-4 h-4 text-gold-400" />}
                  <span>{isDaylightMode ? 'Natural Sunlight View' : 'Studio Flash View'}</span>
                </button>

                <button
                  onClick={() => onWatchDrape(product)}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-900/90 text-gold-300 backdrop-blur-md hover:bg-emerald-950 flex items-center gap-1.5 shadow-md"
                >
                  <Video className="w-4 h-4 text-green-400 animate-pulse" />
                  <span>Drape Motion</span>
                </button>
              </div>

              {/* Daylight explanation note */}
              {isDaylightMode && (
                <div className="absolute bottom-3 inset-x-3 p-2 rounded-xl bg-amber-500/90 text-stone-950 text-[10px] font-semibold text-center backdrop-blur-md">
                  ☀️ Simulated Outdoor Natural Lighting (Color true to real-world drape)
                </div>
              )}
            </div>

            {/* Thumbnail selector */}
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImg(idx)}
                    className={`relative w-16 h-20 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                      selectedImg === idx ? 'border-gold-500 ring-2 ring-gold-500/20' : 'border-stone-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Details & Customizations */}
          <div className="md:col-span-6 space-y-6">
            <div>
              <div className="flex items-center gap-1.5 text-amber-500 text-xs font-bold mb-1">
                <Star className="w-4 h-4 fill-current" />
                <span>{product.rating}</span>
                <span className="text-stone-400 font-normal">({product.reviewsCount} verified reviews)</span>
              </div>
              <h2 className="font-serif text-2xl font-bold text-emerald-950 leading-snug">
                {product.title}
              </h2>
              <div className="flex items-baseline gap-3 mt-2">
                <span className="text-2xl font-bold text-emerald-950">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                <span className="text-sm text-stone-400 line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
                <span className="px-2 py-0.5 text-xs font-bold text-emerald-800 bg-emerald-100 rounded-md">
                  Tax Included
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed">
              {product.description}
            </p>

            {/* Saree Specifications Table */}
            <div className="p-4 rounded-2xl bg-cream-50 border border-stone-200/80 text-xs space-y-2">
              <div className="grid grid-cols-2 gap-2 border-b border-stone-200/60 pb-2">
                <span className="text-stone-500 font-medium">Fabric Weave:</span>
                <span className="font-bold text-stone-800">{product.fabric}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 border-b border-stone-200/60 pb-2">
                <span className="text-stone-500 font-medium">Length &amp; Blouse:</span>
                <span className="font-bold text-stone-800">{product.length}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="text-stone-500 font-medium">Wash &amp; Care:</span>
                <span className="font-bold text-stone-800">{product.washCare}</span>
              </div>
            </div>

            {/* Custom Saree Add-ons (Fall & Pico + Blouse Stitching) */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Custom Tailoring &amp; Finishing
              </h4>

              {/* Free Fall & Pico Toggle */}
              <label className="flex items-center justify-between p-3.5 rounded-xl border border-stone-200 bg-white hover:border-gold-500/60 cursor-pointer transition-colors">
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={fallPico}
                    onChange={(e) => setFallPico(e.target.checked)}
                    className="w-4 h-4 text-emerald-900 rounded focus:ring-gold-500"
                  />
                  <div>
                    <p className="text-xs font-bold text-stone-900">Complimentary Fall &amp; Pico Edging</p>
                    <p className="text-[11px] text-stone-500">Hand-finished border reinforcement ready to drape</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                  FREE
                </span>
              </label>

              {/* Blouse Stitching Add-on */}
              <div className="p-3.5 rounded-xl border border-stone-200 bg-white space-y-3">
                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={blouseStitching}
                      onChange={(e) => setBlouseStitching(e.target.checked)}
                      className="w-4 h-4 text-emerald-900 rounded focus:ring-gold-500"
                    />
                    <div>
                      <p className="text-xs font-bold text-stone-900">Add Custom Blouse Tailoring</p>
                      <p className="text-[11px] text-stone-500">Lined, padded or regular tailoring</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-stone-800">
                    +₹1,200
                  </span>
                </label>

                {blouseStitching && (
                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-xs text-stone-600 font-medium">Select Bust Size:</span>
                    <select
                      value={blouseSize}
                      onChange={(e) => setBlouseSize(e.target.value)}
                      className="py-1 px-3 text-xs rounded-lg border border-stone-200 bg-stone-50 font-semibold"
                    >
                      <option value="Size 34 (XS)">Size 34 (XS)</option>
                      <option value="Size 36 (S)">Size 36 (S)</option>
                      <option value="Size 38 (M)">Size 38 (M - Most Popular)</option>
                      <option value="Size 40 (L)">Size 40 (L)</option>
                      <option value="Size 42 (XL)">Size 42 (XL)</option>
                      <option value="Custom Measurements (WhatsApp)">Provide via WhatsApp</option>
                    </select>
                  </div>
                )}
              </div>
            </div>

            {/* Pincode & Delivery Date Estimator */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs">
              <p className="font-bold text-stone-800 mb-2 flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-emerald-800" />
                <span>Check Delivery Date at Your Location</span>
              </p>
              <form onSubmit={handleCheckPincode} className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter 6-digit Pincode (e.g. 160017)"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                  className="flex-1 px-3 py-2 text-xs rounded-xl bg-white border border-stone-200 focus:outline-none focus:border-gold-500 font-mono"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-stone-800 hover:bg-stone-900 text-white rounded-xl font-bold text-xs"
                >
                  Verify
                </button>
              </form>
              {deliveryResult && (
                <p className="mt-2 text-xs font-semibold text-emerald-900 bg-emerald-50 p-2 rounded-lg border border-emerald-200">
                  {deliveryResult}
                </p>
              )}
            </div>

            {/* Primary Action Buttons */}
            <div className="space-y-2.5 pt-2">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  className="py-3.5 px-4 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-900 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="py-3.5 px-4 rounded-2xl bg-emerald-900 hover:bg-emerald-950 text-gold-300 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/20 transition-all transform hover:-translate-y-0.5"
                >
                  <Zap className="w-4 h-4 text-gold-400 fill-current" />
                  <span>1-Click Buy (UPI)</span>
                </button>
              </div>

              {/* WhatsApp Assisted Viewing CTA */}
              <a
                href={`https://wa.me/917876719360?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-2xl border border-emerald-900/30 bg-emerald-50 hover:bg-emerald-100 text-emerald-950 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <Video className="w-4 h-4 text-green-600 animate-pulse" />
                <span>Book 1-on-1 Video Call on WhatsApp to Inspect Saree</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
