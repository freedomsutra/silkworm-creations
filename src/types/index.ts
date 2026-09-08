export interface SareeProduct {
  id: number;
  title: string;
  handle: string;
  price: number;
  originalPrice: number;
  fabric: string;
  length: string;
  blousePiece: string;
  washCare: string;
  tags: string[];
  description: string;
  images: string[];
  inStock: boolean;
  rating: number;
  reviewsCount: number;
  occasion: 'Wedding' | 'Festive' | 'Office Wear' | 'Casual & Daily';
  primaryColor: string;
  fallPicoComplimentary: boolean;
  blouseStitchingAvailable: boolean;
  videoAvailable?: boolean;
}

export interface CartItem {
  product: SareeProduct;
  quantity: number;
  fallPico: boolean;
  blouseStitching: boolean;
  blouseSize?: string;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  productName: string;
  clientPhoto: string;
  source: string;
  socialTag: string;
}

export type Currency = 'INR' | 'USD' | 'CAD' | 'GBP' | 'AED';

export interface CurrencyRate {
  code: Currency;
  symbol: string;
  rate: number; // relative to INR
}
