import type { Metadata, Viewport } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';

export const viewport: Viewport = {
  themeColor: '#1B3B2B',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'SilkWorm Creation | Luxury Handloom & Heritage Sarees | Atelier Chandigarh',
  description: 'Handcrafted in the Heritage Weaving Guilds of India • Atelier Chandigarh. Explore pure linen, banarasi tissue, and handloom cotton sarees with 1-on-1 video drape salon & worldwide express delivery.',
  keywords: 'SilkWorm Creation, Luxury Sarees, Atelier Chandigarh, Pure Linen Saree, Banarasi Tissue Saree, Handloom Sarees India, Handcrafted Heritage Weaves',
  openGraph: {
    title: 'SilkWorm Creation | Handcrafted Luxury Sarees',
    description: 'Handcrafted in the Heritage Weaving Guilds of India • Atelier Chandigarh. Pure linen, tissue silk, and handloom cotton sarees with 1-on-1 WhatsApp video shopping.',
    url: 'https://silkWormcreation.com',
    siteName: 'SilkWorm Creation',
    images: [
      {
        url: 'https://silkWormcreation.com/cdn/shop/files/logo_f8198345-0573-4a95-9cc8-826faac7a1ca.jpg',
        width: 800,
        height: 800,
        alt: 'SilkWorm Creation Logo',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SilkWorm Creation | Handcrafted Sarees',
    description: 'Handcrafted in the Heritage Weaving Guilds of India • Atelier Chandigarh. Luxury handloom sarees with worldwide express delivery.',
  },
  alternates: {
    canonical: 'https://silkwormcreation.com',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ClothingStore',
    'name': 'SilkWorm Creation',
    'image': 'https://silkwormcreation.com/cdn/shop/files/logo_f8198345-0573-4a95-9cc8-826faac7a1ca.jpg',
    'telephone': '+917876719360',
    'email': 'silkwormcreation@gmail.com',
    'url': 'https://silkwormcreation.com',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'SCO 2, 1st Floor, Reliance Square, Opp. City Plaza, Near D-Mart, Peer Muchalla',
      'addressLocality': 'Zirakpur',
      'addressRegion': 'Punjab',
      'postalCode': '160104',
      'addressCountry': 'IN'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 30.6682,
      'longitude': 76.8488
    },
    'openingHoursSpecification': [
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        'opens': '11:00',
        'closes': '20:00'
      }
    ],
    'priceRange': '₹₹₹',
    'sameAs': [
      'https://www.instagram.com/silkwormcreation/',
      'https://www.facebook.com/silkwormcreation'
    ]
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..800;1,400..800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased selection:bg-gold-500 selection:text-white">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
