import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import SocialProofStrip from '@/components/home/SocialProofStrip';
import ExperiencePreview from '@/components/home/ExperiencePreview';
import BookingWidget from '@/components/home/BookingWidget';
import EventsStrip from '@/components/home/EventsStrip';
import MenuHighlights from '@/components/home/MenuHighlights';
import GalleryTeaser from '@/components/home/GalleryTeaser';
import ReviewsCarousel from '@/components/home/ReviewsCarousel';
import PrivateEventsCTA from '@/components/home/PrivateEventsCTA';
import LocationSection from '@/components/home/LocationSection';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SocialProofStrip />
        <ExperiencePreview />
        <BookingWidget />
        <EventsStrip />
        <MenuHighlights />
        <GalleryTeaser />
        <ReviewsCarousel />
        <PrivateEventsCTA />
        <LocationSection />
      </main>
      <Footer />
    </>
  );
}
