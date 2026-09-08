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
  addItem: (product: SareeProduct, fallPico?: boolean, blouseStitching?: boolean, blouseSize?: string) => void;
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

  // Currency
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (inrAmount: number) => string;

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
      if (savedCur && CURRENCIES[savedCur]) setCurrencyState(savedCur);
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

  const addItem = (product: SareeProduct, fallPico = true, blouseStitching = false, blouseSize = 'Standard 38') => {
    setItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1, fallPico, blouseStitching, blouseSize }];
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
