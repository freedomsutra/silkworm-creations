'use client';

import React, { useState } from 'react';
import { SareeProduct } from '@/types';
import { useCart } from '@/context/CartContext';
import { 
  Star, Sun, Lightbulb, Video, ShoppingBag, Zap, Heart, 
  Share2, Scissors, Truck, ShieldCheck, Check, Sparkles, MapPin, ChevronDown, RefreshCw, Plane 
} from 'lucide-react';
import Link from 'next/link';
import DrapeVideoModal from '@/components/DrapeVideoModal';
import WhatsAppVideoModal from '@/components/WhatsAppVideoModal';
import StickyMobileBar from '@/components/StickyMobileBar';

export default function ProductDetailClient({ 
  product, 
  relatedProducts 
}: { 
  product: SareeProduct;
  relatedProducts: SareeProduct[];
}) {
  const { 
    addItem, 
    triggerInstantCheckout, 
    isWishlisted, 
    toggleWishlist, 
    formatPrice, 
    isDomestic, 
    destinationCountry, 
    shippingCarrier, 
    shippingTimeline, 
    currency 
  } = useCart();
  const [selectedImg, setSelectedImg] = useState(0);
  const [isDaylightMode, setIsDaylightMode] = useState(false);
  const [fallPico, setFallPico] = useState(true);
  const [readyToWearPleating, setReadyToWearPleating] = useState(false);
  const [blouseStitching, setBlouseStitching] = useState(false);
  const [blouseSize, setBlouseSize] = useState('Standard 38');
  const [drapeOpen, setDrapeOpen] = useState(false);
  const [videoConsultationOpen, setVideoConsultationOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [pincode, setPincode] = useState('');
  const [deliveryResult, setDeliveryResult] = useState<string | null>(null);

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length === 6) {
      if (['160017', '160019', '160022', '160055', '134117', '160104', '140603'].includes(pincode.trim())) {
        setDeliveryResult('⚡ Same-Day Express Delivery available in Chandigarh / Panchkula / Zirakpur');
      } else {
        setDeliveryResult('🚚 Estimated Delivery in 2 - 4 Business Days with Tracked Express Air Courier');
      }
    } else {
      setDeliveryResult('Please enter a valid 6-digit Indian PIN code');
    }
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(`Look at this authentic ${product.title} from SilkWorm Creation Chandigarh: ${window.location.href}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const whatsappInquiry = encodeURIComponent(
    isDomestic
      ? `Hi SilkWorm Creation! I am interested in ${product.title} (${formatPrice(product.price)}). Can you show me this saree on a quick video call in natural daylight from your Zirakpur showroom?`
      : `Hi SilkWorm Creation! I am contacting you from ${destinationCountry} regarding ${product.title} (${formatPrice(product.price)}). Can you schedule a daylight video drape inspection call before dispatching to ${destinationCountry}?`
  );

  return (
    <div className="space-y-16">
      {/* Breadcrumb */}
      <nav className="text-xs text-stone-500 flex items-center gap-2">
        <Link href="/" className="hover:text-emerald-950">Home</Link>
        <span>/</span>
        <Link href={`/?category=${encodeURIComponent(product.fabric)}`} className="hover:text-emerald-950">{product.fabric}</Link>
        <span>/</span>
        <span className="text-stone-800 font-semibold line-clamp-1">{product.title}</span>
      </nav>

      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Gallery Column */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-stone-100 border border-stone-200 shadow-sm group">
            <img
              src={product.images[selectedImg] || product.images[0]}
              alt={product.title}
              className={`w-full h-full object-cover transition-all duration-500 ${
                isDaylightMode ? 'brightness-105 contrast-105 saturate-110' : ''
              }`}
            />

            {/* Lighting Mode Toggle */}
            <div className="absolute top-4 inset-x-4 flex items-center justify-between">
              <button
                onClick={() => setIsDaylightMode(!isDaylightMode)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md backdrop-blur-md transition-all ${
                  isDaylightMode
                    ? 'bg-amber-400 text-stone-950 ring-2 ring-amber-300'
                    : 'bg-stone-900/85 text-white hover:bg-stone-900'
                }`}
              >
                {isDaylightMode ? <Sun className="w-4 h-4 text-amber-900 fill-current" /> : <Lightbulb className="w-4 h-4 text-gold-400" />}
                <span>{isDaylightMode ? 'Natural Sunlight View' : 'Studio Flash View'}</span>
              </button>

              <button
                onClick={() => setDrapeOpen(true)}
                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-900/90 text-gold-300 backdrop-blur-md hover:bg-emerald-950 flex items-center gap-2 shadow-md"
              >
                <Video className="w-4 h-4 text-green-400 animate-pulse" />
                <span>Drape Motion</span>
              </button>
            </div>

            {/* Wishlist button */}
            <button
              onClick={() => toggleWishlist(product.id)}
              className="absolute bottom-4 right-4 p-3 bg-white/90 backdrop-blur-md rounded-full text-stone-700 hover:text-rose-500 shadow-md transition-transform active:scale-95"
              aria-label="Wishlist"
            >
              <Heart className={`w-5 h-5 ${isWishlisted(product.id) ? 'fill-current text-rose-500' : ''}`} />
            </button>
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImg(idx)}
                  className={`relative w-20 h-24 rounded-2xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                    selectedImg === idx ? 'border-gold-500 ring-2 ring-gold-500/20' : 'border-stone-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details & Purchase Controls */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-950 text-gold-300">
                {product.fabric}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleShareWhatsApp}
                  className="flex items-center gap-1 text-xs font-bold text-green-700 bg-green-50 hover:bg-green-100 px-3 py-1.5 rounded-full transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share on WhatsApp</span>
                </button>
              </div>
            </div>

            <h1 className="font-serif text-3xl font-bold text-emerald-950 leading-snug">
              {product.title}
            </h1>

            <div className="flex items-center gap-2 mt-2">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-xs font-bold text-stone-800">{product.rating}</span>
              <span className="text-xs text-stone-400">({product.reviewsCount} verified reviews)</span>
            </div>

            <div className="flex items-baseline gap-3 mt-4">
              <span className="text-3xl font-bold text-emerald-950">
                {formatPrice(product.price)}
              </span>
              <span className="text-base text-stone-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
              <span className="px-2 py-0.5 text-xs font-bold text-emerald-800 bg-emerald-100 rounded-md">
                  Tax Included
                </span>
              </div>

              {/* Govt Recognized Silk Mark Seal */}
              <div className="mt-3 flex items-center gap-3 p-3 rounded-2xl bg-amber-50/80 border border-gold-500/40 text-emerald-950">
                <div className="p-2 bg-gold-500 text-emerald-950 rounded-xl font-bold flex-shrink-0 shadow-xs">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                    <span>Govt. Recognized Silk Mark Certified</span>
                    <span className="px-1.5 py-0.5 bg-emerald-950 text-gold-300 text-[9px] font-bold rounded">100% Pure Weave</span>
                  </p>
                  <p className="text-[11px] text-stone-600">Pure natural yarns with handloom artisan verification.</p>
                </div>
              </div>
          </div>

          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            {product.description}
          </p>

          {/* Saree Specs */}
          <div className="p-4 rounded-2xl bg-white border border-stone-200 text-xs space-y-2.5 shadow-sm">
            <div className="grid grid-cols-2 gap-2 border-b border-stone-100 pb-2">
              <span className="text-stone-500 font-medium">Fabric Type:</span>
              <span className="font-bold text-stone-800">{product.fabric}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 border-b border-stone-100 pb-2">
              <span className="text-stone-500 font-medium">Saree Length:</span>
              <span className="font-bold text-stone-800">{product.length}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 border-b border-stone-100 pb-2">
              <span className="text-stone-500 font-medium">Blouse Piece:</span>
              <span className="font-bold text-stone-800">{product.blousePiece}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <span className="text-stone-500 font-medium">Wash Care:</span>
              <span className="font-bold text-stone-800">{product.washCare}</span>
            </div>
          </div>

          {/* Custom Tailoring */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Tailoring &amp; Finishing Services
            </h4>

            {/* Fall & Pico */}
            <label className="flex items-center justify-between p-3.5 rounded-xl border border-stone-200 bg-white hover:border-gold-500/60 cursor-pointer transition-colors">
              <div className="flex items-center gap-2.5">
                <input
                  type="checkbox"
                  checked={fallPico}
                  onChange={(e) => setFallPico(e.target.checked)}
                  className="w-4 h-4 text-emerald-900 rounded focus:ring-gold-500"
                />
                <div>
                  <p className="text-xs font-bold text-stone-900">Complimentary Fall &amp; Pico Done</p>
                  <p className="text-[11px] text-stone-500">Tailored border reinforcement ready to wear</p>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                FREE
              </span>
            </label>

            {/* International Special: Ready-to-Wear 1-Minute Drape Pleating */}
            {!isDomestic && (
              <label className="flex items-center justify-between p-3.5 rounded-xl border border-gold-400/50 bg-gold-50/20 hover:border-gold-500 cursor-pointer transition-colors">
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={readyToWearPleating}
                    onChange={(e) => setReadyToWearPleating(e.target.checked)}
                    className="w-4 h-4 text-emerald-900 rounded focus:ring-gold-500"
                  />
                  <div>
                    <p className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                      <span>Ready-to-Wear 1-Minute Drape</span>
                      <span className="px-1.5 py-0.5 bg-emerald-950 text-gold-300 text-[8px] font-bold rounded">Pre-Pleated</span>
                    </p>
                    <p className="text-[11px] text-stone-600">Custom waistband hooks &amp; pleats. Slip on like a skirt in 60 seconds.</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-950">
                  +{formatPrice(750)}
                </span>
              </label>
            )}

            {/* Blouse Stitching */}
            <div className="p-3.5 rounded-xl border border-stone-200 bg-white space-y-3">
              <label className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={blouseStitching}
                    onChange={(e) => setBlouseStitching(e.target.checked)}
                    className="w-4 h-4 text-emerald-900 rounded"
                  />
                  <div>
                    <p className="text-xs font-bold text-stone-900">Add Custom Blouse Tailoring</p>
                    <p className="text-[11px] text-stone-500">Lined, padded or regular tailoring</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-stone-800">+{formatPrice(1200)}</span>
              </label>

              {blouseStitching && (
                <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-xs text-stone-600 font-medium">Bust Size:</span>
                  <select
                    value={blouseSize}
                    onChange={(e) => setBlouseSize(e.target.value)}
                    className="py-1 px-3 text-xs rounded-lg border border-stone-200 bg-stone-50 font-semibold"
                  >
                    <option value="Size 34 (XS)">Size 34 (XS)</option>
                    <option value="Size 36 (S)">Size 36 (S)</option>
                    <option value="Size 38 (M)">Size 38 (M)</option>
                    <option value="Size 40 (L)">Size 40 (L)</option>
                    <option value="Size 42 (XL)">Size 42 (XL)</option>
                    <option value="Custom via WhatsApp">Custom via WhatsApp</option>
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* Delivery Logistics: Domestic vs International */}
          {isDomestic ? (
            <div className="p-4 rounded-2xl bg-cream-100/70 border border-stone-200 text-xs">
              <p className="font-bold text-stone-800 mb-2 flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-emerald-800" />
                <span>Check Delivery ETA at Your Pincode</span>
              </p>
              <form onSubmit={handlePincodeCheck} className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter 6-digit Pincode (e.g. 160017)"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                  className="flex-1 px-3 py-2 text-xs rounded-xl bg-white border border-stone-200 focus:outline-none focus:border-gold-500 font-mono"
                />
                <button type="submit" className="px-4 py-2 bg-stone-800 hover:bg-stone-900 text-white rounded-xl font-bold text-xs">
                  Verify
                </button>
              </form>
              {deliveryResult && (
                <p className="mt-2 text-xs font-semibold text-emerald-900 bg-emerald-50 p-2 rounded-lg border border-emerald-200">
                  {deliveryResult}
                </p>
              )}
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-950 via-[#0a2316] to-emerald-950 text-cream-100 border border-gold-500/30 text-xs space-y-2.5 shadow-md">
              <div className="flex items-center justify-between">
                <p className="font-serif font-bold text-gold-300 flex items-center gap-1.5 text-sm">
                  <Plane className="w-4 h-4 text-gold-400 flex-shrink-0" />
                  <span>DHL Express to {destinationCountry}</span>
                </p>
                <span className="px-2.5 py-0.5 bg-gold-500 text-emerald-950 text-[10px] font-bold rounded-full">
                  4–6 Business Days
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-emerald-900/60 text-[11px]">
                <div>
                  <p className="text-cream-300/80 text-[10px]">Landed Duty Guarantee</p>
                  <p className="font-semibold text-white">All Customs Pre-Cleared</p>
                </div>
                <div>
                  <p className="text-cream-300/80 text-[10px]">Export Presentation</p>
                  <p className="font-semibold text-white">Signature Keepsake Box</p>
                </div>
              </div>
              <p className="text-[11px] text-cream-300/80 leading-relaxed">
                Tracked end-to-end air courier directly from our atelier in Punjab to your doorstep in {destinationCountry}. Zero unexpected customs duties on delivery.
              </p>
            </div>
          )}

          {/* CTA Buttons */}
          <div className="space-y-3 pt-2">
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => addItem(product, fallPico, blouseStitching, blouseSize, readyToWearPleating)}
                className="py-4 px-4 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-900 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>

              <button
                onClick={() => triggerInstantCheckout(product)}
                className="py-4 px-4 rounded-2xl bg-emerald-900 hover:bg-emerald-950 text-gold-300 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/20 transition-all transform hover:-translate-y-0.5"
              >
                <Zap className="w-4 h-4 text-gold-400 fill-current" />
                <span>{isDomestic ? '1-Click Buy (UPI)' : `Instant Buy (${currency})`}</span>
              </button>
            </div>

            <a
              href={`https://wa.me/917876719360?text=${whatsappInquiry}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 rounded-2xl border border-emerald-900/30 bg-emerald-50 hover:bg-emerald-100 text-emerald-950 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <Video className="w-4 h-4 text-green-600 animate-pulse" />
              <span>{isDomestic ? 'Book 1-on-1 Video Call on WhatsApp to Inspect Saree' : `Schedule 1-on-1 Daylight Video Call (${destinationCountry})`}</span>
            </a>

            {/* Trust Guarantees */}
            <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-cream-100/90 border border-stone-200 text-center text-[10px] text-stone-700">
              {isDomestic ? (
                <>
                  <div className="flex flex-col items-center gap-1">
                    <RefreshCw className="w-3.5 h-3.5 text-emerald-800" />
                    <span className="font-bold text-stone-900">7-Day Exchange</span>
                    <span className="text-[9px] text-stone-500">Doorstep pickup</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 border-x border-stone-200">
                    <Sparkles className="w-3.5 h-3.5 text-gold-600" />
                    <span className="font-bold text-stone-900">Free Fall &amp; Pico</span>
                    <span className="text-[9px] text-stone-500">Pre-finished drape</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-800" />
                    <span className="font-bold text-stone-900">Transit Insured</span>
                    <span className="text-[9px] text-stone-500">100% Protection</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-col items-center gap-1">
                    <Plane className="w-3.5 h-3.5 text-emerald-800" />
                    <span className="font-bold text-stone-900">DHL Air Express</span>
                    <span className="text-[9px] text-stone-500">4–6 Days Tracked</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 border-x border-stone-200">
                    <ShieldCheck className="w-3.5 h-3.5 text-gold-600" />
                    <span className="font-bold text-stone-900">Duties Pre-Paid</span>
                    <span className="text-[9px] text-stone-500">Zero Extra Fees</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-800" />
                    <span className="font-bold text-stone-900">Artisan Certified</span>
                    <span className="text-[9px] text-stone-500">Silk Mark Handloom</span>
                  </div>
                </>
              )}
            </div>
          </div>

        </div>

      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="pt-12 border-t border-stone-200 space-y-6">
          <h3 className="font-serif text-2xl font-bold text-emerald-950">You May Also Admire</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(p => (
              <Link key={p.id} href={`/products/${p.handle}`} className="group bg-white rounded-2xl overflow-hidden border border-stone-200 p-3 block hover:shadow-lg transition-shadow">
                <div className="aspect-[3/4] rounded-xl overflow-hidden bg-stone-100 mb-3">
                  <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <h4 className="font-serif text-xs font-bold text-stone-900 line-clamp-1">{p.title}</h4>
                <p className="font-bold text-xs text-emerald-950 mt-1">{formatPrice(p.price)}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Modals */}
      <DrapeVideoModal
        product={drapeOpen ? product : null}
        onClose={() => setDrapeOpen(false)}
        onBookCall={() => {
          setDrapeOpen(false);
          setVideoConsultationOpen(true);
        }}
      />

      <StickyMobileBar 
        product={product} 
        onBookVideoCall={() => setVideoConsultationOpen(true)} 
        onInstantBuy={() => triggerInstantCheckout(product)} 
      />

      <WhatsAppVideoModal
        isOpen={videoConsultationOpen}
        onClose={() => setVideoConsultationOpen(false)}
      />
    </div>
  );
}
