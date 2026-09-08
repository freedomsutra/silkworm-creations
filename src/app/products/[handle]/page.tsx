import React from 'react';
import { notFound } from 'next/navigation';
import { PRODUCTS } from '@/data/products';
import { SareeProduct } from '@/types';
import AnnouncementBar from '@/components/AnnouncementBar';
import NavbarWrapper from './NavbarWrapper';
import ProductDetailClient from './ProductDetailClient';
import Footer from '@/components/Footer';
import WhatsAppFloatingButton from '@/components/WhatsAppFloatingButton';
import FastCheckoutModal from '@/components/FastCheckoutModal';
import CartDrawer from '@/components/CartDrawer';
import WishlistDrawer from '@/components/WishlistDrawer';
import TrackOrderModal from '@/components/TrackOrderModal';
import type { Metadata } from 'next';

interface Props {
  params: { handle: string };
}

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({
    handle: p.handle,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = PRODUCTS.find((p) => p.handle === params.handle);
  if (!product) return {};

  return {
    title: `${product.title} | SilkWorm Creation Chandigarh`,
    description: product.description.slice(0, 160),
    openGraph: {
      title: `${product.title} - ₹${product.price}`,
      description: product.description.slice(0, 160),
      images: [
        {
          url: product.images[0],
          alt: product.title,
        },
      ],
    },
  };
}

export default function ProductPage({ params }: Props) {
  const product = PRODUCTS.find((p) => p.handle === params.handle);
  if (!product) notFound();

  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.fabric === product.fabric || p.occasion === product.occasion)
  ).slice(0, 4);

  return (
    <main className="min-h-screen flex flex-col bg-cream-50">
      <AnnouncementBar />
      <NavbarWrapper />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
        <ProductDetailClient product={product} relatedProducts={relatedProducts} />
      </div>
      <Footer />
      <WhatsAppFloatingButton />
      <FastCheckoutModal />
      <CartDrawer />
      <WishlistDrawer />
      <TrackOrderModal />
    </main>
  );
}
