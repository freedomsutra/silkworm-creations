'use client';

import React, { useState } from 'react';
import { PRODUCTS } from '@/data/products';
import { SareeProduct } from '@/types';
import AnnouncementBar from '@/components/AnnouncementBar';
import Navbar from '@/components/Navbar';
import HeroBanner from '@/components/HeroBanner';
import TrustBadges from '@/components/TrustBadges';
import CatalogSection from '@/components/CatalogSection';
import ProductDetailModal from '@/components/ProductDetailModal';
import FastCheckoutModal from '@/components/FastCheckoutModal';
import CartDrawer from '@/components/CartDrawer';
import DrapeVideoModal from '@/components/DrapeVideoModal';
import WhatsAppVideoModal from '@/components/WhatsAppVideoModal';
import ShopTheGram from '@/components/ShopTheGram';
import ReviewsSection from '@/components/ReviewsSection';
import ShowroomSection from '@/components/ShowroomSection';
import WhatsAppFloatingButton from '@/components/WhatsAppFloatingButton';
import Footer from '@/components/Footer';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeProductForModal, setActiveProductForModal] = useState<SareeProduct | null>(null);
  const [activeProductForDrape, setActiveProductForDrape] = useState<SareeProduct | null>(null);
  const [videoConsultationOpen, setVideoConsultationOpen] = useState(false);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    const el = document.getElementById('catalog-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreClick = () => {
    const el = document.getElementById('catalog-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-cream-50">
      {/* Top Announcement Bar */}
      <AnnouncementBar />

      {/* Header & Sticky Navigation */}
      <Navbar 
        onCategorySelect={handleCategorySelect}
        selectedCategory={selectedCategory}
      />

      {/* Hero Visual Section */}
      <HeroBanner 
        onExploreClick={handleExploreClick}
        onBookVideoCall={() => setVideoConsultationOpen(true)}
      />

      {/* Trust & Guarantee Badges */}
      <TrustBadges />

      {/* Main Saree Catalog with Search, Filters & Quick Actions */}
      <CatalogSection 
        products={PRODUCTS}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        onQuickView={(p) => setActiveProductForModal(p)}
        onWatchDrape={(p) => setActiveProductForDrape(p)}
      />

      {/* Instagram Social Commerce ("Shop The 'Gram") */}
      <ShopTheGram 
        products={PRODUCTS}
        onSelectProduct={(p) => setActiveProductForModal(p)}
      />

      {/* Verified Client Reviews */}
      <ReviewsSection />

      {/* Physical Showroom & Boutique Location */}
      <ShowroomSection />

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Concierge Widget */}
      <WhatsAppFloatingButton />

      {/* Interactive Modals */}
      <ProductDetailModal 
        product={activeProductForModal}
        onClose={() => setActiveProductForModal(null)}
        onWatchDrape={(p) => {
          setActiveProductForModal(null);
          setActiveProductForDrape(p);
        }}
      />

      <DrapeVideoModal 
        product={activeProductForDrape}
        onClose={() => setActiveProductForDrape(null)}
        onBookCall={() => {
          setActiveProductForDrape(null);
          setVideoConsultationOpen(true);
        }}
      />

      <WhatsAppVideoModal 
        isOpen={videoConsultationOpen}
        onClose={() => setVideoConsultationOpen(false)}
      />

      {/* Fast 1-Click Checkout Modal (GoKwik / Fastrr inspired) */}
      <FastCheckoutModal />

      {/* Slide-in Cart Drawer */}
      <CartDrawer />
    </main>
  );
}
