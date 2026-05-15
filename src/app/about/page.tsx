import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AboutPageClient from '@/components/about/AboutPage';

export const metadata: Metadata = {
  title: 'About | The Big Tree Cafe',
  description: "The story behind The Big Tree Cafe — Gurgaon's most beloved outdoor dining experience on Golf Course Road.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <AboutPageClient />
      <Footer />
    </>
  );
}
