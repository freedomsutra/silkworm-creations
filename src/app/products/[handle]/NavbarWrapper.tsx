'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/navigation';

export default function NavbarWrapper() {
  const router = useRouter();
  return (
    <Navbar
      selectedCategory="All"
      onCategorySelect={(cat) => {
        router.push(`/?category=${encodeURIComponent(cat)}`);
      }}
    />
  );
}
