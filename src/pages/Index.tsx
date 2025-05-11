
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InstagramFeed from '@/components/InstagramFeed';
import HeroSection from '@/components/sections/HeroSection';
import FeaturedMenuSection from '@/components/sections/FeaturedMenuSection';
import ReservationSection from '@/components/sections/ReservationSection';
import { motion, useScroll, useSpring } from 'framer-motion';

const Index: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Scroll progress indicator */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-brand-gold z-50"
        style={{ scaleX }}
      />
      
      <Header />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Featured Menu Section */}
      <FeaturedMenuSection />
      
      {/* Instagram Feed Section */}
      <InstagramFeed />
      
      {/* Reservation Section */}
      <ReservationSection />
      
      <Footer />
    </div>
  );
};

export default Index;
