import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { ContainerScroll, BentoGrid, BentoCell, ContainerScale } from "@/components/ui/hero-gallery-scroll-animation";
import { Button } from "@/components/ui/button";
import { Crown } from 'lucide-react';
import { motion } from 'framer-motion';
import { letterVariants } from '@/lib/animation-variants';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { getOptimizedImageUrl } from '@/utils/performance-utils';

// Premium meat images for the restaurant
const MEAT_IMAGES = ["https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?q=80&w=1280&auto=format&fit=crop", "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?q=80&w=1280&auto=format&fit=crop", "https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1?q=80&w=1280&auto=format&fit=crop", "https://images.unsplash.com/photo-1602632032171-5cd51d27d50e?q=80&w=1280&auto=format&fit=crop", "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?q=80&w=1280&auto=format&fit=crop"];
const HeroGallerySection: React.FC = () => {
  const {
    t,
    language
  } = useLanguage();
  const [productImages, setProductImages] = useState<string[]>([]);

  // Fetch product images on component mount
  useEffect(() => {
    const fetchProductImages = async () => {
      const {
        data,
        error
      } = await supabase.from('products').select('image_src').not('image_src', 'is', null);
      if (error) {
        console.error('Error fetching product images:', error);
        return;
      }

      // Extract image URLs from the data and filter out any nullish values
      const images = data.map(item => item.image_src).filter(Boolean) as string[];

      // If we have at least 5 images, randomly select 5
      if (images.length >= 5) {
        // Shuffle array and take the first 5
        const shuffled = [...images].sort(() => 0.5 - Math.random());
        // Generate optimized URLs for these images
        const optimizedImages = shuffled.slice(0, 5).map(img => getOptimizedImageUrl(img));
        setProductImages(optimizedImages);
      } else {
        // If we have fewer than 5 images, use what we have
        const optimizedImages = images.map(img => getOptimizedImageUrl(img));
        setProductImages(optimizedImages);
      }
    };
    fetchProductImages();
  }, []);

  // Create an array of letters for text animation
  const titleText = t('hero.title');

  // Handle Armenian title formatting
  const renderTitle = () => {
    if (language === 'am') {
      // Split Armenian title into words and display each on a new line
      const titleWords = titleText.split(" ");
      return <h1 className="max-w-xl text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter text-white font-serif">
          {titleWords.map((word, wordIndex) => <div key={wordIndex} className="block">
              {word.split('').map((letter, letterIndex) => <motion.span key={letterIndex} variants={letterVariants} initial="hidden" animate="visible" className="inline-block" style={{
            textShadow: '0 2px 10px rgba(0,0,0,0.5)',
            animationDelay: `${(wordIndex * word.length + letterIndex) * 0.05}s`
          }}>
                  {letter === ' ' ? '\u00A0' : letter}
                </motion.span>)}
            </div>)}
        </h1>;
    } else {
      // For other languages, keep the original implementation
      const titleLetters = titleText.split("");
      return <h1 className="max-w-xl text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter text-white font-serif">
          {titleLetters.map((letter, index) => <motion.span key={index} variants={letterVariants} initial="hidden" animate="visible" className="inline-block" style={{
          textShadow: '0 2px 10px rgba(0,0,0,0.5)',
          animationDelay: `${index * 0.05}s`
        }}>
              {letter === ' ' ? '\u00A0' : letter}
            </motion.span>)}
        </h1>;
    }
  };
  return <ContainerScroll className="h-[350vh]">
      <BentoGrid className="sticky left-0 top-0 z-0 h-screen w-full p-4 bg-state-950/50">
        {productImages.length > 0 ?
      // Display fetched product images
      productImages.map((imageUrl, index) => <BentoCell key={index} className="overflow-hidden rounded-xl shadow-xl border border-brand-gold/20">
              <div className="relative w-full h-full">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
                <img className="size-full object-cover object-center" src={imageUrl} alt="Premium Dish" loading={index < 2 ? 'eager' : 'lazy'} />
              </div>
            </BentoCell>) :
      // Fallback placeholders while images are loading
      Array(5).fill(0).map((_, index) => <BentoCell key={index} className="overflow-hidden rounded-xl shadow-xl border border-brand-gold/20 bg-gray-800">
              <div className="relative w-full h-full">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
              </div>
            </BentoCell>)}
      </BentoGrid>

      <ContainerScale className="relative z-10 text-center">
        <Crown className="mx-auto text-brand-gold mb-6" size={60} />
        
        {renderTitle()}
        
        <motion.div className="gold-divider mx-auto" initial={{
        width: 0
      }} animate={{
        width: 60
      }} transition={{
        delay: 1,
        duration: 0.5
      }} />
        
        <p className="my-6 max-w-xl text-xs sm:text-sm md:text-xl text-white opacity-90">
          {t('hero.subtitle')}
        </p>
        
        <div className="flex items-center justify-center gap-4">
          <Button asChild className="royal-btn bg-brand-gold hover:bg-brand-blue text-white border-2 border-brand-gold hover:border-brand-blue transition-all duration-300 text-lg px-6 sm:px-8 py-4 sm:py-6 rounded-md shadow-lg relative overflow-hidden group">
            <Link to="/reservations">
              <motion.span className="absolute inset-0 bg-white/20 transform origin-left" initial={{
              scaleX: 0
            }} whileHover={{
              scaleX: 1
            }} transition={{
              duration: 0.6
            }} />
              <span className="relative z-10">{t('hero.cta')}</span>
            </Link>
          </Button>
          
          <Button asChild variant="link" className="bg-transparent px-4 py-2 font-medium text-white hover:text-brand-gold">
            <Link to="/menu">
              {t('nav.menu')}
            </Link>
          </Button>
        </div>
      </ContainerScale>
    </ContainerScroll>;
};
export default HeroGallerySection;
