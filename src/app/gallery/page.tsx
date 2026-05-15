import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import GalleryPageClient from '@/components/gallery/GalleryPage';

export const metadata: Metadata = {
  title: 'Gallery | The Big Tree Cafe',
  description: 'Browse the beautiful photography of The Big Tree Cafe — cabanas, fairy lights, live music, and memorable celebrations.',
};

export default function GalleryPage() {
  return (
    <>
      <Navbar />
      <GalleryPageClient />
      <Footer />
    </>
  );
}
