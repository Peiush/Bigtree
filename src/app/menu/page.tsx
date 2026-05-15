import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MenuPageClient from '@/components/menu/MenuPage';

export const metadata: Metadata = {
  title: 'Menu | The Big Tree Cafe',
  description: 'Explore The Big Tree Cafe menu. Continental, North Indian & Italian cuisine crafted fresh, served under the stars.',
};

export default function MenuPage() {
  return (
    <>
      <Navbar />
      <MenuPageClient />
      <Footer />
    </>
  );
}
