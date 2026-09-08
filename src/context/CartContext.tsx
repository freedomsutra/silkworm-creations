'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { SareeProduct, CartItem } from '@/types';

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
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [selectedProductForCheckout, setSelectedProductForCheckout] = useState<SareeProduct | undefined>(undefined);

  // Load from local storage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('silkworm_cart');
      if (saved) setItems(jsonParse(saved));
    } catch (e) {
      // ignore
    }
  }, []);

  const jsonParse = (val: string) => {
    try { return JSON.parse(val); } catch { return []; }
  };

  useEffect(() => {
    try {
      localStorage.setItem('silkworm_cart', JSON.stringify(items));
    } catch (e) {
      // ignore
    }
  }, [items]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const addItem = (product: SareeProduct, fallPico = true, blouseStitching = false, blouseSize = 'Standard 36-38') => {
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
