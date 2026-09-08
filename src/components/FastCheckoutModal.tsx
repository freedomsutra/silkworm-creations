'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { SareeProduct } from '@/types';
import { 
  X, ShieldCheck, CheckCircle2, Zap, Phone, Lock, 
  MapPin, CreditCard, Sparkles, ArrowRight, Truck 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function FastCheckoutModal() {
  const { 
    checkoutModalOpen, 
    closeCheckout, 
    selectedProductForCheckout, 
    items, 
    subtotal, 
    formatPrice 
  } = useCart();

  const [step, setStep] = useState<'phone' | 'address' | 'payment' | 'success'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('9876543210');
  const [otp, setOtp] = useState(['4', '2', '8', '9']);
  const [fullName, setFullName] = useState('Ananya Sharma');
  const [address, setAddress] = useState('House No. 452, Sector 8-C');
  const [city, setCity] = useState('Chandigarh');
  const [pincode, setPincode] = useState('160018');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi');
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    if (checkoutModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [checkoutModalOpen]);

  if (!checkoutModalOpen) return null;

  const checkoutItems = selectedProductForCheckout
    ? [{ product: selectedProductForCheckout, quantity: 1, fallPico: true, blouseStitching: false }]
    : items;

  const totalAmount = selectedProductForCheckout
    ? selectedProductForCheckout.price
    : subtotal;

  const discountAmount = 500; // Welcome coupon
  const finalPayable = Math.max(0, totalAmount - discountAmount);

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('address');
  };

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePlaceOrder = () => {
    const id = 'SWC-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(id);
    setStep('success');
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-hidden">
      <div className="fixed inset-0 bg-black/75 backdrop-blur-sm" onClick={closeCheckout} />

      <div className="relative bg-white w-full max-w-lg h-[90vh] sm:h-auto sm:max-h-[90vh] rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl z-10 border border-stone-200 flex flex-col overscroll-contain">
        
        {/* Top Header */}
        <div className="bg-emerald-950 text-cream-100 p-4 sm:p-5 flex items-center justify-between border-b border-gold-500/30">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-gold-500 text-emerald-950">
              <Zap className="w-4 h-4 fill-current" />
            </div>
            <div>
              <p className="font-serif font-bold text-sm text-gold-300">Fast 1-Click Checkout</p>
              <p className="text-[10px] text-cream-300 flex items-center gap-1">
                <Lock className="w-3 h-3 text-gold-400" />
                <span>256-Bit Encrypted &bull; Direct Showroom Dispatch</span>
              </p>
            </div>
          </div>
          <button onClick={closeCheckout} className="p-1.5 text-cream-300 hover:text-white rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        {step !== 'success' && (
          <div className="grid grid-cols-3 bg-cream-50 text-[11px] font-bold border-b border-stone-200">
            <div className={`py-2 text-center border-b-2 ${step === 'phone' ? 'border-gold-500 text-emerald-950' : 'border-transparent text-stone-400'}`}>
              1. Phone
            </div>
            <div className={`py-2 text-center border-b-2 ${step === 'address' ? 'border-gold-500 text-emerald-950' : 'border-transparent text-stone-400'}`}>
              2. Shipping
            </div>
            <div className={`py-2 text-center border-b-2 ${step === 'payment' ? 'border-gold-500 text-emerald-950' : 'border-transparent text-stone-400'}`}>
              3. Payment
            </div>
          </div>
        )}

        <div className="p-6">
          {/* STEP 1: Phone */}
          {step === 'phone' && (
            <form onSubmit={handlePhoneSubmit} className="space-y-4">
              <div className="text-center mb-4">
                <h3 className="font-serif text-lg font-bold text-emerald-950">Enter Mobile Number</h3>
                <p className="text-xs text-stone-500">We'll send order updates and dispatch tracking via WhatsApp &amp; SMS.</p>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Mobile Number</label>
                <div className="flex gap-2">
                  <span className="px-3 py-2.5 bg-stone-100 border border-stone-200 rounded-xl text-xs font-bold text-stone-700">
                    🇮🇳 +91
                  </span>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="flex-1 px-3 py-2.5 text-sm rounded-xl border border-stone-200 bg-stone-50 focus:outline-none focus:border-gold-500 font-mono font-bold"
                    placeholder="10-digit mobile"
                    required
                  />
                </div>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between">
                <span className="flex items-center gap-1.5 font-medium">
                  <Sparkles className="w-4 h-4 text-gold-600" />
                  <span>Verified Auto-OTP Detected</span>
                </span>
                <span className="font-mono font-bold text-emerald-800">● ● ● ●</span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-emerald-900 hover:bg-emerald-950 text-gold-300 rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <span>Continue to Address</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* STEP 2: Address */}
          {step === 'address' && (
            <form onSubmit={handleAddressSubmit} className="space-y-3">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-serif text-base font-bold text-emerald-950">Delivery Address</h3>
                <button type="button" onClick={() => setStep('phone')} className="text-xs text-gold-700 underline font-semibold">Edit Phone</button>
              </div>

              <div>
                <label className="text-[11px] font-bold text-stone-600 block mb-0.5">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 bg-stone-50 focus:outline-none focus:border-gold-500"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-stone-600 block mb-0.5">House / Apartment / Street Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 bg-stone-50 focus:outline-none focus:border-gold-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-bold text-stone-600 block mb-0.5">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 bg-stone-50 focus:outline-none focus:border-gold-500"
                    required
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-stone-600 block mb-0.5">PIN Code</label>
                  <input
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 bg-stone-50 focus:outline-none focus:border-gold-500 font-mono"
                    required
                  />
                </div>
              </div>

              <div className="p-2.5 bg-cream-100 rounded-xl text-[11px] text-stone-700 flex items-center gap-2">
                <Truck className="w-4 h-4 text-emerald-800 flex-shrink-0" />
                <span>Express Dispatch from SCO 2, Reliance Square Showroom</span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-emerald-900 hover:bg-emerald-950 text-gold-300 rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all mt-2"
              >
                <span>Proceed to Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* STEP 3: Payment */}
          {step === 'payment' && (
            <div className="space-y-4">
              <h3 className="font-serif text-base font-bold text-emerald-950">Select Payment Method</h3>

              <div className="space-y-2">
                {/* UPI Option */}
                <label className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === 'upi' ? 'border-gold-500 bg-amber-50/50 ring-1 ring-gold-500' : 'border-stone-200 bg-white'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'upi'}
                      onChange={() => setPaymentMethod('upi')}
                      className="text-emerald-900"
                    />
                    <div>
                      <p className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                        <span>Instant UPI (Google Pay, PhonePe, Paytm)</span>
                        <span className="px-1.5 py-0.5 bg-green-100 text-green-800 text-[9px] font-bold rounded">Fastest</span>
                      </p>
                      <p className="text-[11px] text-stone-500">1-tap approval in your favorite UPI app</p>
                    </div>
                  </div>
                  <Zap className="w-4 h-4 text-gold-600 fill-current" />
                </label>

                {/* Card Option */}
                <label className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === 'card' ? 'border-gold-500 bg-amber-50/50 ring-1 ring-gold-500' : 'border-stone-200 bg-white'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="text-emerald-900"
                    />
                    <div>
                      <p className="text-xs font-bold text-stone-900">Credit / Debit Card</p>
                      <p className="text-[11px] text-stone-500">Visa, MasterCard, RuPay, Amex</p>
                    </div>
                  </div>
                  <CreditCard className="w-4 h-4 text-stone-500" />
                </label>

                {/* COD Option */}
                <label className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === 'cod' ? 'border-gold-500 bg-amber-50/50 ring-1 ring-gold-500' : 'border-stone-200 bg-white'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="text-emerald-900"
                    />
                    <div>
                      <p className="text-xs font-bold text-stone-900">Cash on Delivery / Pay on Delivery</p>
                      <p className="text-[11px] text-stone-500">Inspect parcel and pay upon arrival</p>
                    </div>
                  </div>
                  <Truck className="w-4 h-4 text-stone-500" />
                </label>
              </div>

              {/* Order Summary Box */}
              <div className="p-3.5 rounded-2xl bg-cream-50 border border-stone-200 text-xs space-y-1.5">
                <div className="flex justify-between text-stone-600">
                  <span>Items Subtotal ({checkoutItems.length} Saree):</span>
                  <span>{formatPrice(totalAmount)}</span>
                </div>
                <div className="flex justify-between text-emerald-800 font-medium">
                  <span>Welcome Saree Voucher (SILK500):</span>
                  <span>- {formatPrice(discountAmount)}</span>
                </div>
                <div className="flex justify-between text-emerald-800 font-medium">
                  <span>Fall &amp; Pico Detailing:</span>
                  <span>FREE</span>
                </div>
                <div className="flex justify-between text-emerald-800 font-medium">
                  <span>Express Insured Shipping:</span>
                  <span>FREE</span>
                </div>
                <div className="pt-2 border-t border-stone-200 flex justify-between font-bold text-stone-900 text-sm">
                  <span>Total Payable:</span>
                  <span className="text-emerald-950 font-serif text-base">{formatPrice(finalPayable)}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handlePlaceOrder}
                className="w-full py-4 bg-emerald-900 hover:bg-emerald-950 text-gold-300 rounded-2xl font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-emerald-950/20 transition-all"
              >
                <Zap className="w-4 h-4 text-gold-400 fill-current" />
                <span>Place Order &bull; Pay {formatPrice(finalPayable)}</span>
              </button>
            </div>
          )}

          {/* STEP 4: Success Confetti View */}
          {step === 'success' && (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-emerald-950">
                Order Placed Successfully!
              </h3>
              <p className="text-xs text-stone-600 max-w-sm mx-auto">
                Thank you, <strong>{fullName}</strong>. Your saree order <strong>#{orderId}</strong> has been received by our Chandigarh boutique.
              </p>

              <div className="p-4 rounded-2xl bg-cream-50 border border-stone-200 text-left text-xs space-y-1.5">
                <p><strong>Shipping Address:</strong> {address}, {city} - {pincode}</p>
                <p><strong>Mobile:</strong> +91 {phoneNumber}</p>
                <p><strong>Status:</strong> Preparing for Fall &amp; Pico Finishing</p>
                <p className="text-emerald-800 font-semibold pt-1">Estimated Delivery: 2 - 4 Business Days</p>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <a
                  href={`https://wa.me/917876719360?text=Hi%20SilkWorm%20Creation,%20I%20just%20placed%20order%20%23${orderId}.%20Please%20share%20dispatch%20updates.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2"
                >
                  <span>Get Live Updates on WhatsApp</span>
                </a>

                <button
                  onClick={closeCheckout}
                  className="py-2.5 text-xs font-semibold text-stone-600 hover:text-stone-900"
                >
                  Continue Browsing Sarees
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
