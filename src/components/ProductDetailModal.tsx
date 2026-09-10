'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { SareeProduct } from '@/types';
import { useCart } from '@/context/CartContext';
import { 
  X, Star, Sun, Lightbulb, Video, ShoppingBag, Zap, 
  ShieldCheck, Scissors, Truck, Sparkles, RefreshCw, Check,
  Plane, Gift, Globe, ArrowRight, ExternalLink
} from 'lucide-react';

interface ProductDetailModalProps {
  product: SareeProduct | null;
  onClose: () => void;
  onWatchDrape: (product: SareeProduct) => void;
}

export default function ProductDetailModal({ product, onClose, onWatchDrape }: ProductDetailModalProps) {
  const { 
    addItem, 
    triggerInstantCheckout, 
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
  const [added, setAdded] = useState(false);
  
  // Pincode Delivery Estimator
  const [pincode, setPincode] = useState('');
  const [deliveryResult, setDeliveryResult] = useState<string | null>(null);

  // Lock background body scroll when modal is open
  useEffect(() => {
    if (product) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [product]);

  if (!product) return null;

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length === 6) {
      if (['160017', '160019', '160022', '160055', '134117', '160104', '140603'].includes(pincode.trim())) {
        setDeliveryResult('⚡ Same-Day Express Delivery available in Chandigarh / Panchkula / Zirakpur');
      } else {
        setDeliveryResult('🚚 Estimated Delivery in 2 - 4 Business Days with Tracked Express Courier');
      }
    } else {
      setDeliveryResult('Please enter a valid 6-digit Indian PIN code');
    }
  };

  const handleAddToCart = () => {
    addItem(product, fallPico, blouseStitching, blouseSize, readyToWearPleating);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    onClose();
    triggerInstantCheckout(product);
  };

  const whatsappMessage = encodeURIComponent(
    isDomestic
      ? `Hi SilkWorm Creation, I am interested in "${product.title}" (${formatPrice(product.price)}). Can you show me this saree on a quick 1-on-1 video call from your Zirakpur showroom in natural daylight?`
      : `Hi SilkWorm Creation, I am contacting you from ${destinationCountry} regarding "${product.title}" (${formatPrice(product.price)}). Can you schedule a daylight video drape inspection call before dispatching to ${destinationCountry}?`
  );

  const editorialSummary = product.description.includes('Product Details')
    ? product.description.split('Product Details')[0].trim()
    : product.description;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />

      {/* Modal Container: Mobile Sheet / Desktop Modal (Zero Overflow Guarantee) */}
      <div className="relative bg-white w-full sm:max-w-4xl h-[92vh] sm:h-[86vh] sm:max-h-[850px] rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl z-10 border border-stone-200 flex flex-col overscroll-contain">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-3.5 border-b border-stone-100 bg-cream-50 flex-shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-gold-300 border border-gold-400/40 truncate">
              {product.fabric}
            </span>
            <span className="text-[11px] sm:text-xs text-stone-500 font-medium truncate">
              SKU: SWC-{product.id}
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <Link
              href={`/products/${product.handle}`}
              onClick={onClose}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-950 hover:text-gold-700 bg-gold-500/15 hover:bg-gold-500/25 px-3 py-1.5 rounded-full border border-gold-400/40 transition-colors"
              title="Open Full Saree Page"
            >
              <span>Full Saree Page</span>
              <ArrowRight className="w-3.5 h-3.5 text-gold-600" />
            </Link>
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 text-stone-500 hover:text-stone-900 rounded-full hover:bg-stone-200/60 transition-colors flex-shrink-0 cursor-pointer"
              aria-label="Close product preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto overflow-x-hidden p-4 sm:p-6 flex-1 min-h-0 overscroll-contain">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 sm:gap-8 items-start">
            
            {/* Left Column: Gallery & Lighting Switcher (Sticky on Desktop) */}
            <div className="sm:col-span-6 space-y-3 min-w-0 sm:sticky sm:top-0">
              {/* Main Image with Responsive Lighting Switcher */}
              <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 shadow-inner group">
                <img
                  src={product.images[selectedImg] || product.images[0]}
                  alt={product.title}
                  className={`w-full h-full object-cover transition-all duration-500 ${
                    isDaylightMode ? 'brightness-105 contrast-105 saturate-110' : ''
                  }`}
                />

                {/* Lighting Mode Switcher Banner (Responsive Compact Zero-Overflow) */}
                <div className="absolute top-2.5 inset-x-2.5 sm:top-3 sm:inset-x-3 flex items-center justify-between gap-1.5 z-10">
                  <button
                    onClick={() => setIsDaylightMode(!isDaylightMode)}
                    className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-bold flex items-center gap-1 shadow-md backdrop-blur-md transition-all flex-shrink-0 ${
                      isDaylightMode
                        ? 'bg-amber-400 text-stone-950 ring-2 ring-amber-300'
                        : 'bg-stone-900/85 text-white hover:bg-stone-900'
                    }`}
                    aria-label="Toggle Sunlight view"
                  >
                    {isDaylightMode ? <Sun className="w-3.5 h-3.5 text-amber-950 fill-current" /> : <Lightbulb className="w-3.5 h-3.5 text-gold-400" />}
                    <span>{isDaylightMode ? 'Sunlight' : 'Studio'}</span>
                    <span className="hidden xs:inline">{isDaylightMode ? ' View' : ' Flash'}</span>
                  </button>

                  <button
                    onClick={() => onWatchDrape(product)}
                    className="px-2.5 sm:px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-bold bg-emerald-950 text-gold-300 border border-gold-400/40 backdrop-blur-md hover:bg-emerald-900 flex items-center gap-1 shadow-md flex-shrink-0 cursor-pointer"
                    aria-label="View Drape Motion"
                  >
                    <Video className="w-3.5 h-3.5 text-green-400 animate-pulse" />
                    <span>Drape</span>
                    <span className="hidden xs:inline"> Motion</span>
                  </button>
                </div>

                {/* Daylight Explanation Note */}
                {isDaylightMode && (
                  <div className="absolute bottom-2.5 inset-x-2.5 p-2 rounded-xl bg-amber-500/95 text-stone-950 text-[10px] font-semibold text-center backdrop-blur-md shadow-md">
                    ☀️ Outdoor Natural Lighting (True-to-life shade)
                  </div>
                )}
              </div>

              {/* Thumbnail Selector (Smooth Edge-to-Edge Scroll) */}
              {product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1 max-w-full scrollbar-none">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImg(idx)}
                      className={`relative w-14 h-18 sm:w-16 sm:h-20 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all cursor-pointer ${
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
            <div className="sm:col-span-6 space-y-4 sm:space-y-5 min-w-0">
              <div>
                <div className="flex items-center gap-1.5 text-amber-500 text-xs font-bold mb-1">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{product.rating}</span>
                  <span className="text-stone-400 font-normal">({product.reviewsCount} verified reviews)</span>
                </div>

                <Link 
                  href={`/products/${product.handle}`} 
                  onClick={onClose}
                  className="group/title block"
                >
                  <h2 className="font-serif text-lg sm:text-2xl font-bold text-emerald-950 leading-snug group-hover/title:text-emerald-700 transition-colors break-words">
                    {product.title}
                  </h2>
                  <span className="text-[11px] text-stone-500 font-sans group-hover/title:underline inline-flex items-center gap-1 mt-0.5">
                    <span>Open dedicated product page</span>
                    <ArrowRight className="w-3 h-3 text-gold-600" />
                  </span>
                </Link>

                <div className="flex items-baseline gap-2.5 mt-2 flex-wrap">
                  <span className="text-xl sm:text-2xl font-bold text-emerald-950 font-serif">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-xs sm:text-sm text-stone-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="px-2 py-0.5 text-[10px] sm:text-xs font-bold text-emerald-800 bg-emerald-100 rounded-md">
                    Tax Included
                  </span>
                </div>

                {/* Silk Mark Seal Badge */}
                <div className="mt-3 flex items-center gap-2.5 p-2.5 sm:p-3 rounded-2xl bg-amber-50/90 border border-gold-500/40 text-emerald-950 overflow-hidden">
                  <div className="p-1.5 sm:p-2 bg-gold-500 text-emerald-950 rounded-xl font-bold flex-shrink-0 shadow-2xs">
                    <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] sm:text-xs font-bold text-emerald-950 flex items-center gap-1 truncate">
                      <span>Govt. Recognized Silk Mark</span>
                      <span className="px-1.5 py-0.5 bg-emerald-950 text-gold-300 text-[8px] font-bold rounded flex-shrink-0">100% Pure</span>
                    </p>
                    <p className="text-[10px] text-stone-600 truncate">Pure natural yarns with handloom artisan verification.</p>
                  </div>
                </div>
              </div>

              {/* Primary Action Buttons (Prominent on Desktop) */}
              <div className="hidden sm:block space-y-2 pt-1">
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    onClick={handleAddToCart}
                    className="py-3 px-3 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-900 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {added ? <Check className="w-4 h-4 text-emerald-800" /> : <ShoppingBag className="w-4 h-4" />}
                    <span>{added ? 'Added to Bag!' : 'Add to Bag'}</span>
                  </button>

                  <button
                    onClick={handleBuyNow}
                    className="py-3 px-3 rounded-2xl bg-emerald-950 hover:bg-emerald-900 text-gold-300 border border-gold-400/40 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-950/20 transition-all cursor-pointer"
                  >
                    <Zap className="w-4 h-4 text-gold-400 fill-current" />
                    <span>{isDomestic ? '1-Click Buy' : `Instant Buy`}</span>
                  </button>
                </div>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed break-words">
                {editorialSummary}
              </p>

            {/* Saree Specifications Table */}
            <div className="p-3 sm:p-4 rounded-2xl bg-cream-50 border border-stone-200/80 text-xs space-y-2 overflow-hidden">
              <div className="grid grid-cols-2 gap-2 border-b border-stone-200/60 pb-2">
                <span className="text-stone-500 font-medium">Fabric Weave:</span>
                <span className="font-bold text-stone-800 truncate">{product.fabric}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 border-b border-stone-200/60 pb-2">
                <span className="text-stone-500 font-medium">Length &amp; Blouse:</span>
                <span className="font-bold text-stone-800 truncate">{product.length}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="text-stone-500 font-medium">Wash &amp; Care:</span>
                <span className="font-bold text-stone-800 truncate">{product.washCare}</span>
              </div>
            </div>

            {/* Custom Saree Add-ons */}
            <div className="space-y-2.5 pt-1">
              <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-stone-500">
                Tailoring &amp; Finishing
              </h4>

              {/* Free Fall & Pico */}
              <label className="flex items-center justify-between p-3 rounded-xl border border-stone-200 bg-white hover:border-gold-500/60 cursor-pointer transition-colors">
                <div className="flex items-center gap-2.5 min-w-0">
                  <input
                    type="checkbox"
                    checked={fallPico}
                    onChange={(e) => setFallPico(e.target.checked)}
                    className="w-4 h-4 text-emerald-900 rounded focus:ring-gold-500 flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-stone-900 truncate">Complimentary Fall &amp; Pico</p>
                    <p className="text-[10px] text-stone-500 truncate">Pre-finished border reinforcement ready to drape</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded flex-shrink-0 ml-2">
                  FREE
                </span>
              </label>

              {/* International Special: Ready-to-Wear 1-Minute Drape Pleating */}
              {!isDomestic && (
                <label className="flex items-center justify-between p-3 rounded-xl border border-gold-400/50 bg-gold-50/20 hover:border-gold-500 cursor-pointer transition-colors">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <input
                      type="checkbox"
                      checked={readyToWearPleating}
                      onChange={(e) => setReadyToWearPleating(e.target.checked)}
                      className="w-4 h-4 text-emerald-900 rounded focus:ring-gold-500 flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-stone-900 flex items-center gap-1.5 truncate">
                        <span>Ready-to-Wear 1-Minute Drape</span>
                        <span className="px-1.5 py-0.5 bg-emerald-950 text-gold-300 text-[8px] font-bold rounded flex-shrink-0">Pre-Pleated</span>
                      </p>
                      <p className="text-[10px] text-stone-600 truncate">Custom waistband hooks &amp; pleats. Slip on like a skirt in 60s.</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-950 flex-shrink-0 ml-2">
                    +{formatPrice(750)}
                  </span>
                </label>
              )}

              {/* Custom Blouse Stitching */}
              <div className="p-3 rounded-xl border border-stone-200 bg-white space-y-2.5">
                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <input
                      type="checkbox"
                      checked={blouseStitching}
                      onChange={(e) => setBlouseStitching(e.target.checked)}
                      className="w-4 h-4 text-emerald-900 rounded focus:ring-gold-500 flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-stone-900 truncate">Add Custom Blouse Tailoring</p>
                      <p className="text-[10px] text-stone-500 truncate">Lined, padded or tailored finish</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-stone-800 flex-shrink-0 ml-2">
                    +{formatPrice(1200)}
                  </span>
                </label>

                {blouseStitching && (
                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-2">
                    <span className="text-[11px] text-stone-600 font-medium">Bust Size:</span>
                    <select
                      value={blouseSize}
                      onChange={(e) => setBlouseSize(e.target.value)}
                      className="py-1 px-2.5 text-xs rounded-lg border border-stone-200 bg-stone-50 font-semibold max-w-[180px]"
                    >
                      <option value="Size 34 (XS)">Size 34 (XS)</option>
                      <option value="Size 36 (S)">Size 36 (S)</option>
                      <option value="Size 38 (M)">Size 38 (M)</option>
                      <option value="Size 40 (L)">Size 40 (L)</option>
                      <option value="Size 42 (XL)">Size 42 (XL)</option>
                      <option value="Custom Measurements">Provide via WhatsApp</option>
                    </select>
                  </div>
                )}
              </div>
            </div>

            {/* Logistics & Delivery Card: Domestic vs International */}
            {isDomestic ? (
              <div className="p-3 sm:p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs">
                <p className="font-bold text-stone-800 mb-2 flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-emerald-800 flex-shrink-0" />
                  <span>Delivery ETA at Your Pincode</span>
                </p>
                <form onSubmit={handleCheckPincode} className="flex gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="6-digit Indian PIN code"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                    className="flex-1 min-w-0 px-3 py-2 text-xs rounded-xl bg-white border border-stone-200 focus:outline-none focus:border-gold-500 font-mono"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 bg-stone-800 hover:bg-stone-900 text-white rounded-xl font-bold text-xs flex-shrink-0"
                  >
                    Verify
                  </button>
                </form>
                {deliveryResult && (
                  <p className="mt-2 text-[11px] font-semibold text-emerald-900 bg-emerald-50 p-2 rounded-lg border border-emerald-200 break-words">
                    {deliveryResult}
                  </p>
                )}
              </div>
            ) : (
              <div className="p-3 sm:p-4 rounded-2xl bg-gradient-to-br from-emerald-950 via-[#0a2316] to-emerald-950 text-cream-100 border border-gold-500/30 text-xs space-y-2.5 shadow-md">
                <div className="flex items-center justify-between">
                  <p className="font-serif font-bold text-gold-300 flex items-center gap-1.5 text-xs sm:text-sm">
                    <Plane className="w-4 h-4 text-gold-400 flex-shrink-0" />
                    <span>DHL Express to {destinationCountry}</span>
                  </p>
                  <span className="px-2 py-0.5 bg-gold-500 text-emerald-950 text-[10px] font-bold rounded-full">
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
                <p className="text-[10px] text-cream-300/80 leading-snug">
                  Tracked end-to-end air courier directly from our atelier in Punjab to your doorstep in {destinationCountry}. Zero unexpected fees on delivery.
                </p>
              </div>
            )}

            {/* Desktop Action Buttons (Inside Scroll View) */}
            <div className="hidden sm:block space-y-2.5 pt-2">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  className="py-3 px-4 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-900 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                >
                  {added ? <Check className="w-4 h-4 text-emerald-800" /> : <ShoppingBag className="w-4 h-4" />}
                  <span>{added ? 'Added to Bag!' : 'Add to Bag'}</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="py-3 px-4 rounded-2xl bg-emerald-950 hover:bg-emerald-900 text-gold-300 border border-gold-400/40 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-950/20 transition-all"
                >
                  <Zap className="w-4 h-4 text-gold-400 fill-current" />
                  <span>{isDomestic ? '1-Click Buy' : `Instant Buy (${currency})`}</span>
                </button>
              </div>

              <a
                href={`https://wa.me/917876719360?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-2xl border border-emerald-900/20 bg-emerald-50 hover:bg-emerald-100 text-emerald-950 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <Video className="w-4 h-4 text-green-600 animate-pulse" />
                <span>{isDomestic ? 'Book 1-on-1 Video Call on WhatsApp to Inspect Saree' : `Schedule 1-on-1 Daylight Video Call (${destinationCountry})`}</span>
              </a>

              {/* Trust Guarantees */}
              <div className="grid grid-cols-3 gap-1.5 p-2.5 rounded-2xl bg-cream-100/90 border border-stone-200 text-center text-[10px] text-stone-700">
                {isDomestic ? (
                  <>
                    <div className="flex flex-col items-center gap-0.5 min-w-0">
                      <RefreshCw className="w-3.5 h-3.5 text-emerald-800 flex-shrink-0" />
                      <span className="font-bold text-stone-900 truncate w-full">7-Day Exchange</span>
                      <span className="text-[9px] text-stone-500 truncate w-full">Doorstep pickup</span>
                    </div>
                    <div className="flex flex-col items-center gap-0.5 border-x border-stone-200 min-w-0 px-1">
                      <Sparkles className="w-3.5 h-3.5 text-gold-600 flex-shrink-0" />
                      <span className="font-bold text-stone-900 truncate w-full">Free Fall &amp; Pico</span>
                      <span className="text-[9px] text-stone-500 truncate w-full">Pre-finished</span>
                    </div>
                    <div className="flex flex-col items-center gap-0.5 min-w-0">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-800 flex-shrink-0" />
                      <span className="font-bold text-stone-900 truncate w-full">Transit Insured</span>
                      <span className="text-[9px] text-stone-500 truncate w-full">100% Protection</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex flex-col items-center gap-0.5 min-w-0">
                      <Plane className="w-3.5 h-3.5 text-emerald-800 flex-shrink-0" />
                      <span className="font-bold text-stone-900 truncate w-full">DHL Air Express</span>
                      <span className="text-[9px] text-stone-500 truncate w-full">4–6 Days Tracked</span>
                    </div>
                    <div className="flex flex-col items-center gap-0.5 border-x border-stone-200 min-w-0 px-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-gold-600 flex-shrink-0" />
                      <span className="font-bold text-stone-900 truncate w-full">Duties Pre-Paid</span>
                      <span className="text-[9px] text-stone-500 truncate w-full">Zero Extra Fees</span>
                    </div>
                    <div className="flex flex-col items-center gap-0.5 min-w-0">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-800 flex-shrink-0" />
                      <span className="font-bold text-stone-900 truncate w-full">Artisan Certified</span>
                      <span className="text-[9px] text-stone-500 truncate w-full">Silk Mark Handloom</span>
                    </div>
                  </>
                )}
              </div>

              {/* Dedicated Saree Page Direct Banner */}
              <Link
                href={`/products/${product.handle}`}
                onClick={onClose}
                className="w-full py-3 px-4 rounded-2xl bg-stone-900 hover:bg-emerald-950 text-gold-300 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-gold-400/40 shadow-sm transition-all text-center mt-2 cursor-pointer"
              >
                <span>View Full Product Page &amp; Atelier Specifications</span>
                <ArrowRight className="w-4 h-4 text-gold-400" />
              </Link>
            </div>

          </div>

        </div>

      </div>

        {/* Mobile Docked Action Bar: ALWAYS accessible, never overflowing */}
        <div className="sm:hidden p-3 bg-white/95 backdrop-blur-md border-t border-stone-200 flex-shrink-0 space-y-2">
          <div className="flex items-center gap-2">
            <button
              onClick={handleAddToCart}
              className="flex-1 py-3 px-3 rounded-2xl bg-stone-100 text-stone-900 font-bold text-xs flex items-center justify-center gap-1.5 active:scale-98 transition-transform"
            >
              {added ? <Check className="w-4 h-4 text-emerald-800" /> : <ShoppingBag className="w-4 h-4" />}
              <span className="truncate">{added ? 'Added!' : 'Add to Bag'}</span>
            </button>

            <button
              onClick={handleBuyNow}
              className="flex-[1.4] py-3 px-3 rounded-2xl bg-emerald-950 text-gold-300 border border-gold-400/40 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md active:scale-98 transition-transform"
            >
              <Zap className="w-3.5 h-3.5 text-gold-400 fill-current" />
              <span className="truncate">{isDomestic ? 'Buy Now' : `Instant Buy`} &bull; {formatPrice(product.price)}</span>
            </button>
          </div>

          <a
            href={`https://wa.me/917876719360?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2 px-3 rounded-xl bg-emerald-50 text-emerald-950 text-[11px] font-semibold flex items-center justify-center gap-1.5 truncate"
          >
            <Video className="w-3.5 h-3.5 text-green-600 flex-shrink-0 animate-pulse" />
            <span className="truncate">{isDomestic ? 'Book 1-on-1 Video Call on WhatsApp' : `Book Daylight Video Drape Call (${destinationCountry})`}</span>
          </a>
        </div>

      </div>
    </div>
  );
}
