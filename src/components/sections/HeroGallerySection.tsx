
import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Crown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { letterVariants, fadeIn } from '@/lib/animation-variants';
import { supabase } from '@/integrations/supabase/client';
import { useIsMobile } from '@/hooks/use-mobile';
import OptimizedImage from '@/components/OptimizedImage';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getOptimizedImageUrl } from '@/utils/performance-utils';

// Fallback premium meat images if database is empty
const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?q=80&w=1280&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?q=80&w=1280&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1?q=80&w=1280&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1602632032171-5cd51d27d50e?q=80&w=1280&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?q=80&w=1280&auto=format&fit=crop"
];

const HeroGallerySection: React.FC = () => {
  const { t, language } = useLanguage();
  const [productImages, setProductImages] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const isMobile = useIsMobile();
  
  // Create particles for the background effect
  const particles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    size: Math.random() * 8 + 4,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 5
  }));

  // Fetch product images on component mount
  useEffect(() => {
    const fetchProductImages = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('image_src')
        .not('image_src', 'is', null);
      
      if (error) {
        console.error('Error fetching product images:', error);
        setProductImages(FALLBACK_IMAGES);
        return;
      }

      // Extract image URLs from the data and filter out any nullish values
      const images = data.map(item => item.image_src).filter(Boolean) as string[];

      // If we have at least 5 images, randomly select 5
      if (images.length >= 5) {
        // Shuffle array and take the first 5
        const shuffled = [...images].sort(() => 0.5 - Math.random());
        // Generate optimized URLs for these images
        const optimizedImages = shuffled.slice(0, 5).map(img => 
          getOptimizedImageUrl(img, isMobile ? 640 : 1280));
        setProductImages(optimizedImages);
      } else if (images.length > 0) {
        // If we have fewer than 5 images but more than 0, use what we have
        const optimizedImages = images.map(img => 
          getOptimizedImageUrl(img, isMobile ? 640 : 1280));
        setProductImages(optimizedImages);
      } else {
        // Use fallback images if no results
        setProductImages(FALLBACK_IMAGES);
      }
    };
    fetchProductImages();
  }, [isMobile]);

  // Auto-advance carousel
  useEffect(() => {
    if (!autoplay || productImages.length === 0) return;
    
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % productImages.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [autoplay, productImages.length]);

  // Pause autoplay when user interacts with carousel
  const handleManualNavigation = () => {
    setAutoplay(false);
    // Resume autoplay after 10 seconds of inactivity
    setTimeout(() => setAutoplay(true), 10000);
  };

  // Handle Armenian title formatting
  const renderTitle = () => {
    const titleText = t('hero.title');
    
    if (language === 'am') {
      // Split Armenian title into words and display each on a new line
      const titleWords = titleText.split(" ");
      return (
        <h1 className="max-w-xl text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter text-white font-serif">
          {titleWords.map((word, wordIndex) => (
            <motion.div 
              key={wordIndex} 
              className="block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: wordIndex * 0.2 + 0.3 }}
            >
              {word.split('').map((letter, letterIndex) => (
                <motion.span 
                  key={letterIndex} 
                  variants={letterVariants} 
                  initial="hidden" 
                  animate="visible" 
                  className="inline-block" 
                  style={{
                    textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                    animationDelay: `${(wordIndex * word.length + letterIndex) * 0.05}s`
                  }}
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
              ))}
            </motion.div>
          ))}
        </h1>
      );
    } else {
      // For other languages, animate the entire title
      return (
        <motion.h1 
          className="max-w-xl text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter text-white font-serif"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          {titleText}
        </motion.h1>
      );
    }
  };

  return (
    <section className="relative min-h-[80vh] md:min-h-[90vh] flex items-center overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute inset-0 bg-black/80 z-10" />
        
        {/* Animated gold particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-brand-gold/30"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.2, 1]
            }}
            transition={{
              repeat: Infinity,
              duration: particle.duration,
              delay: particle.delay,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 relative z-20 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Image carousel */}
          <div className="order-2 lg:order-1">
            <div className="relative perspective-lg">
              {productImages.length > 0 ? (
                <Carousel 
                  className="w-full max-w-md mx-auto"
                  onMouseEnter={() => setAutoplay(false)}
                  onMouseLeave={() => setAutoplay(true)}
                >
                  <CarouselContent>
                    {productImages.map((imageUrl, index) => (
                      <CarouselItem key={index}>
                        <AnimatePresence mode="wait">
                          <motion.div 
                            className="aspect-[4/3] overflow-hidden rounded-xl border-2 border-brand-gold/30 shine-effect shadow-2xl"
                            initial={{ rotateY: 90, opacity: 0 }}
                            animate={{ rotateY: 0, opacity: 1 }}
                            exit={{ rotateY: -90, opacity: 0 }}
                            transition={{ duration: 0.6 }}
                          >
                            <OptimizedImage 
                              src={imageUrl} 
                              alt="Premium Dish" 
                              className="w-full h-full object-cover object-center transform transition-transform duration-700 hover:scale-110" 
                              priority={index < 2} 
                            />
                            <motion.div 
                              className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.3 }}
                            />
                          </motion.div>
                        </AnimatePresence>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious 
                    onClick={handleManualNavigation}
                    className="hidden sm:flex bg-brand-gold/20 text-white hover:bg-brand-gold/50 border-brand-gold/40"
                  />
                  <CarouselNext 
                    onClick={handleManualNavigation}
                    className="hidden sm:flex bg-brand-gold/20 text-white hover:bg-brand-gold/50 border-brand-gold/40"
                  />
                </Carousel>
              ) : (
                // Loading placeholder
                <div className="aspect-[4/3] max-w-md mx-auto bg-gray-800 animate-pulse rounded-xl"></div>
              )}
              
              {/* Decorative elements */}
              <motion.div
                className="absolute -bottom-4 -left-4 size-16 md:size-24 border-2 border-brand-gold/30 rounded-md z-[-1]"
                animate={{ rotate: 15, scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 5, repeat: Infinity }}
              />
              <motion.div
                className="absolute -top-4 -right-4 size-16 md:size-24 border-2 border-brand-gold/30 rounded-md z-[-1]"
                animate={{ rotate: -15, scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
              />
            </div>
          </div>
          
          {/* Text content */}
          <div className="order-1 lg:order-2 text-center lg:text-left">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            >
              <Crown className="mx-auto lg:mx-0 text-brand-gold mb-6" size={isMobile ? 40 : 60} />
            </motion.div>
            
            {renderTitle()}
            
            <motion.div 
              className="gold-divider mx-auto lg:mx-0" 
              initial={{ width: 0 }} 
              animate={{ width: 60 }} 
              transition={{ delay: 0.8, duration: 0.5 }} 
            />
            
            <motion.p 
              className="my-4 sm:my-6 max-w-xl mx-auto lg:mx-0 text-sm sm:text-base md:text-xl text-white opacity-90"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: 1.1 }}
            >
              {t('hero.subtitle')}
            </motion.p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, type: "spring", stiffness: 100 }}
                className="w-full sm:w-auto"
              >
                <Button 
                  asChild
                  className="royal-btn w-full sm:w-auto bg-brand-gold hover:bg-brand-blue text-white border-2 border-brand-gold hover:border-brand-blue transition-all duration-300 text-base sm:text-lg px-6 py-3 sm:py-4 rounded-md shadow-lg relative overflow-hidden group animate-pulse-gold"
                >
                  <Link to="/reservations">
                    <motion.span 
                      className="absolute inset-0 bg-white/20 transform origin-left" 
                      initial={{ scaleX: 0 }} 
                      whileHover={{ scaleX: 1 }} 
                      transition={{ duration: 0.6 }} 
                    />
                    <span className="relative z-10">{t('hero.cta')}</span>
                  </Link>
                </Button>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6 }}
              >
                <Button 
                  asChild 
                  variant="link" 
                  className="bg-transparent px-4 py-2 font-medium text-white hover:text-brand-gold"
                >
                  <Link to="/menu">
                    {t('nav.menu')}
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements floating in the background */}
      <motion.div
        className="absolute bottom-10 left-5 md:left-20 text-brand-gold/60"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1, 
          y: [0, -15, 0],
        }}
        transition={{ 
          delay: 1.8,
          duration: 3, 
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        <Crown size={30} />
      </motion.div>
      
      <motion.div
        className="absolute top-20 right-5 md:right-20 text-brand-gold/60"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1, 
          y: [0, 15, 0],
        }}
        transition={{ 
          delay: 2,
          duration: 4, 
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        <Crown size={20} />
      </motion.div>
    </section>
  );
};

export default HeroGallerySection;
