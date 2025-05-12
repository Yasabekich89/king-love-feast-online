
import React, { lazy, Suspense, useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroGallerySection from '@/components/sections/HeroGallerySection';
import { motion, useScroll, useSpring } from 'framer-motion';
import PerformanceMonitor from '@/components/PerformanceMonitor';
import { hasPerformanceLimitations } from '@/utils/performance-utils';

// Lazy load non-critical components
const InstagramFeed = lazy(() => import('@/components/InstagramFeed'));
const FeaturedMenuSection = lazy(() => import('@/components/sections/FeaturedMenuSection'));
const ReservationSection = lazy(() => import('@/components/sections/ReservationSection'));

const Index: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  // Check for performance limitations to conditionally render heavy animations
  const [hasLimitations, setHasLimitations] = useState(true); // Default to true as a safety
  
  useEffect(() => {
    // Set after client-side rendering to get accurate measurement
    setHasLimitations(hasPerformanceLimitations());
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden">
      <PerformanceMonitor />
      
      {/* Scroll progress indicator - don't animate on limited devices */}
      {!hasLimitations && (
        <motion.div 
          className="fixed top-0 left-0 right-0 h-1 bg-brand-gold z-50"
          style={{ scaleX }}
        />
      )}
      
      <Header />
      
      {/* Hero Gallery Section - Critical for first render */}
      <HeroGallerySection />
      
      {/* Lazy load non-critical sections with better loading indicators */}
      <Suspense fallback={
        <div className="py-10 sm:py-16 flex justify-center items-center">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-brand-gold"></div>
            <span className="mt-2 text-sm text-gray-500">Loading...</span>
          </div>
        </div>
      }>
        <FeaturedMenuSection />
      </Suspense>
      
      <Suspense fallback={
        <div className="py-10 sm:py-16 flex justify-center items-center">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-brand-gold"></div>
            <span className="mt-2 text-sm text-gray-500">Loading...</span>
          </div>
        </div>
      }>
        <InstagramFeed />
      </Suspense>
      
      <Suspense fallback={
        <div className="py-10 sm:py-16 flex justify-center items-center">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-brand-gold"></div>
            <span className="mt-2 text-sm text-gray-500">Loading...</span>
          </div>
        </div>
      }>
        <ReservationSection />
      </Suspense>
      
      <Footer />
    </div>
  );
};

export default Index;
