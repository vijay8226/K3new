import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Stats from './components/Stats';
import ServicesCatalog from './components/ServicesCatalog';
import AboutSection from './components/AboutSection';
import BranchInfo from './components/BranchInfo';
import Testimonials from './components/Testimonials';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import FloatingWhatsApp from './components/FloatingWhatsApp';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [heroSearchQuery, setHeroSearchQuery] = useState('');

  const handleOpenBooking = (service = null) => {
    setSelectedService(service);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    setSelectedService(null);
  };

  const handleHeroSearch = (query) => {
    setHeroSearchQuery(query);
  };

  return (
    <div className="app-root">
      <Header onOpenBooking={() => handleOpenBooking()} />

      <main>
        <Hero
          onOpenBooking={() => handleOpenBooking()}
          onSearch={handleHeroSearch}
        />
        <Stats />
        <ServicesCatalog
          onSelectService={(service) => handleOpenBooking(service)}
          initialQuery={heroSearchQuery}
        />
        <AboutSection />
        <BranchInfo />
        <Testimonials />
        <ContactSection />
      </main>

      <Footer />

      <FloatingWhatsApp onOpenBooking={() => handleOpenBooking()} />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        selectedService={selectedService}
      />
    </div>
  );
}
