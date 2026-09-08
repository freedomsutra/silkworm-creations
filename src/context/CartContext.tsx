'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { SareeProduct, CartItem, Currency, CurrencyRate } from '@/types';

export const CURRENCIES: Record<Currency, CurrencyRate> = {
  INR: { code: 'INR', symbol: '₹', rate: 1 },
  USD: { code: 'USD', symbol: '$', rate: 0.012 },
  CAD: { code: 'CAD', symbol: 'CA$', rate: 0.016 },
  GBP: { code: 'GBP', symbol: '£', rate: 0.0094 },
  AED: { code: 'AED', symbol: 'AED ', rate: 0.044 },
};

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (
    product: SareeProduct, 
    fallPico?: boolean, 
    blouseStitching?: boolean, 
    blouseSize?: string,
    readyToWearPleating?: boolean
  ) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, delta: number) => void;
  totalItems: number;
  subtotal: number;
  checkoutModalOpen: boolean;
  openCheckout: () => void;
  closeCheckout: () => void;
  selectedProductForCheckout?: SareeProduct;
  triggerInstantCheckout: (product: SareeProduct) => void;
  
  // Wishlist
  wishlist: number[];
  toggleWishlist: (productId: number) => void;
  isWishlisted: (productId: number) => boolean;
  wishlistDrawerOpen: boolean;
  openWishlist: () => void;
  closeWishlist: () => void;

  // Currency & Personalization
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (inrAmount: number) => string;
  isDomestic: boolean;
  destinationCountry: string;
  shippingCarrier: string;
  shippingTimeline: string;
  shippingPromise: string;

  // Order Tracking
  trackModalOpen: boolean;
  openTrackModal: () => void;
  closeTrackModal: () => void;
}


const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [selectedProductForCheckout, setSelectedProductForCheckout] = useState<SareeProduct | undefined>(undefined);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [wishlistDrawerOpen, setWishlistDrawerOpen] = useState(false);
  const [currency, setCurrencyState] = useState<Currency>('INR');
  const [trackModalOpen, setTrackModalOpen] = useState(false);

  // Load from localStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('silkworm_cart');
      if (savedCart) setItems(JSON.parse(savedCart));

      const savedWish = localStorage.getItem('silkworm_wishlist');
      if (savedWish) setWishlist(JSON.parse(savedWish));

      const savedCur = localStorage.getItem('silkworm_currency') as Currency;
      if (savedCur && CURRENCIES[savedCur]) {
        setCurrencyState(savedCur);
      } else {
        // Auto-detect based on user's timezone locale
        try {
          const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
          if (tz.includes('Calcutta') || tz.includes('Kolkata') || tz.includes('India')) {
            setCurrencyState('INR');
          } else if (tz.includes('London') || tz.includes('Europe/Belfast') || tz.includes('Dublin')) {
            setCurrencyState('GBP');
          } else if (tz.includes('Toronto') || tz.includes('Vancouver') || tz.includes('Montreal') || tz.includes('Canada') || tz.includes('Edmonton') || tz.includes('Winnipeg') || tz.includes('Halifax')) {
            setCurrencyState('CAD');
          } else if (tz.includes('Dubai') || tz.includes('Muscat') || tz.includes('Riyadh') || tz.includes('Qatar') || tz.includes('Kuwait')) {
            setCurrencyState('AED');
          } else if (tz.includes('America') || tz.includes('New_York') || tz.includes('Los_Angeles') || tz.includes('Chicago')) {
            setCurrencyState('USD');
          }
        } catch (e) {}
      }
    } catch (e) {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('silkworm_cart', JSON.stringify(items));
    } catch (e) {}
  }, [items]);

  useEffect(() => {
    try {
      localStorage.setItem('silkworm_wishlist', JSON.stringify(wishlist));
    } catch (e) {}
  }, [wishlist]);

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    try { localStorage.setItem('silkworm_currency', c); } catch (e) {}
  };

  const isDomestic = currency === 'INR';

  const destinationCountry = {
    INR: 'India',
    USD: 'United States',
    CAD: 'Canada',
    GBP: 'United Kingdom',
    AED: 'United Arab Emirates'
  }[currency];

  const shippingCarrier = isDomestic 
    ? 'BlueDart Express / Delhivery' 
    : 'DHL Express Worldwide Air';

  const shippingTimeline = isDomestic 
    ? '2–3 Business Days (Same-day dispatch in Tricity)' 
    : '4–6 Business Days Tracked Doorstep Delivery';

  const shippingPromise = isDomestic 
    ? 'Free Insured Express Across India • Fall & Pico Pre-Done' 
    : `Express to ${destinationCountry} • All Import Duties Pre-Cleared`;

  const formatPrice = (inrAmount: number): string => {
    const cur = CURRENCIES[currency];
    if (currency === 'INR') {
      return `₹${Math.round(inrAmount).toLocaleString('en-IN')}`;
    }
    const converted = Math.round(inrAmount * cur.rate);
    return `${cur.symbol}${converted.toLocaleString()}`;
  };

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const toggleWishlist = (productId: number) => {
    setWishlist(prev => 
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const isWishlisted = (productId: number) => wishlist.includes(productId);

  const openWishlist = () => setWishlistDrawerOpen(true);
  const closeWishlist = () => setWishlistDrawerOpen(false);

  const openTrackModal = () => setTrackModalOpen(true);
  const closeTrackModal = () => setTrackModalOpen(false);

  const addItem = (
    product: SareeProduct, 
    fallPico = true, 
    blouseStitching = false, 
    blouseSize = 'Standard 38',
    readyToWearPleating = false
  ) => {
    setItems(prev => {
      const existing = prev.find(item => 
        item.product.id === product.id && 
        item.blouseStitching === blouseStitching &&
        item.readyToWearPleating === readyToWearPleating
      );
      if (existing) {
        return prev.map(item =>
          item === existing
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1, fallPico, blouseStitching, blouseSize, readyToWearPleating }];
    });
    setIsOpen(true);
  };


  const removeItem = (productId: number) => {
    setItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, delta: number) => {
    setItems(prev => prev.map(item => {
      if (item.product.id === productId) {
        const newQ = item.quantity + delta;
        return newQ > 0 ? { ...item, quantity: newQ } : null;
      }
      return item;
    }).filter(Boolean) as CartItem[]);
  };

  const triggerInstantCheckout = (product: SareeProduct) => {
    setSelectedProductForCheckout(product);
    setCheckoutModalOpen(true);
  };

  const openCheckout = () => {
    setSelectedProductForCheckout(undefined);
    setCheckoutModalOpen(true);
    setIsOpen(false);
  };

  const closeCheckout = () => {
    setCheckoutModalOpen(false);
    setSelectedProductForCheckout(undefined);
  };

  const totalItems = items.reduce((acc, cur) => acc + cur.quantity, 0);
  const subtotal = items.reduce((acc, cur) => {
    let itemPrice = cur.product.price;
    if (cur.blouseStitching) itemPrice += 1200;
    if (cur.readyToWearPleating) itemPrice += 750;
    return acc + (itemPrice * cur.quantity);
  }, 0);

  return (
    <CartContext.Provider value={{
      items,
      isOpen,
      openCart,
      closeCart,
      addItem,
      removeItem,
      updateQuantity,
      totalItems,
      subtotal,
      checkoutModalOpen,
      openCheckout,
      closeCheckout,
      selectedProductForCheckout,
      triggerInstantCheckout,
      wishlist,
      toggleWishlist,
      isWishlisted,
      wishlistDrawerOpen,
      openWishlist,
      closeWishlist,
      currency,
      setCurrency,
      formatPrice,
      isDomestic,
      destinationCountry,
      shippingCarrier,
      shippingTimeline,
      shippingPromise,
      trackModalOpen,
      openTrackModal,
      closeTrackModal,
    }}>
      {children}
    </CartContext.Provider>
  );

}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
