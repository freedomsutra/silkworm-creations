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
import WishlistDrawer from '@/components/WishlistDrawer';
import TrackOrderModal from '@/components/TrackOrderModal';
import DrapeVideoModal from '@/components/DrapeVideoModal';
import WhatsAppVideoModal from '@/components/WhatsAppVideoModal';
import ShopTheGram from '@/components/ShopTheGram';
import ReviewsSection from '@/components/ReviewsSection';
import FAQSection from '@/components/FAQSection';
import ShowroomSection from '@/components/ShowroomSection';
import WhatsAppFloatingButton from '@/components/WhatsAppFloatingButton';
import StickyMobileBar from '@/components/StickyMobileBar';
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
    <main className="min-h-screen flex flex-col bg-cream-50 pb-28 md:pb-0 w-full max-w-full overflow-x-clip min-w-0">
      <AnnouncementBar />


      <Navbar 
        onCategorySelect={handleCategorySelect}
        selectedCategory={selectedCategory}
      />

      <HeroBanner 
        onExploreClick={handleExploreClick}
        onBookVideoCall={() => setVideoConsultationOpen(true)}
      />

      <TrustBadges />

      <CatalogSection 
        products={PRODUCTS}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        onQuickView={(p) => setActiveProductForModal(p)}
        onWatchDrape={(p) => setActiveProductForDrape(p)}
      />

      <ShopTheGram 
        products={PRODUCTS}
        onSelectProduct={(p) => setActiveProductForModal(p)}
      />

      <ReviewsSection />

      <FAQSection />

      <ShowroomSection />

      <Footer />

      <WhatsAppFloatingButton />
      <StickyMobileBar onBookVideoCall={() => setVideoConsultationOpen(true)} />

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

      <FastCheckoutModal />

      <CartDrawer />

      <WishlistDrawer onQuickView={(p) => setActiveProductForModal(p)} />

      <TrackOrderModal />
    </main>
  );
}
