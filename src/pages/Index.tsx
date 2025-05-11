
import React, { lazy, Suspense } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroGallerySection from '@/components/sections/HeroGallerySection';
import { motion, useScroll, useSpring } from 'framer-motion';
import PerformanceMonitor from '@/components/PerformanceMonitor';

// Lazy load non-critical components
const FeaturedMenuSection = lazy(() => import('@/components/sections/FeaturedMenuSection'));
const ReservationSection = lazy(() => import('@/components/sections/ReservationSection'));

const Index: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden">
      <PerformanceMonitor />
      
      {/* Scroll progress indicator */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-brand-gold z-50"
        style={{ scaleX }}
      />
      
      <Header />
      
      {/* Hero Gallery Section - Critical for first render */}
      <HeroGallerySection />
      
      {/* Lazy load non-critical sections */}
      <Suspense fallback={<div className="py-16 flex justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-gold"></div>
      </div>}>
        <FeaturedMenuSection />
      </Suspense>
      
      <Suspense fallback={<div className="py-16 flex justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-gold"></div>
      </div>}>
        <ReservationSection />
      </Suspense>
      
      <Footer />
    </div>
  );
};

export default Index;
