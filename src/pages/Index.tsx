
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InstagramFeed from '@/components/InstagramFeed';
import WelcomeSection from '@/components/sections/WelcomeSection';
import HeroSection from '@/components/sections/HeroSection';
import FeaturedMenuSection from '@/components/sections/FeaturedMenuSection';
import GravitySection from '@/components/sections/GravitySection';
import ReservationSection from '@/components/sections/ReservationSection';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Welcome message with gravity physics demo */}
      <WelcomeSection />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Featured Menu Section */}
      <FeaturedMenuSection />
      
      {/* About Section - Gravity animation */}
      <GravitySection />
      
      {/* Instagram Feed Section */}
      <InstagramFeed />
      
      {/* Reservation Section */}
      <ReservationSection />
      
      <Footer />
    </div>
  );
};

export default Index;
