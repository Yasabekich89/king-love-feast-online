
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { 
  ContainerScroll, 
  BentoGrid, 
  BentoCell, 
  ContainerScale 
} from "@/components/ui/hero-gallery-scroll-animation";
import { Button } from "@/components/ui/button";
import { Crown } from 'lucide-react';
import { motion } from 'framer-motion';
import { letterVariants } from '@/lib/animation-variants';

// Premium meat images for the restaurant
const MEAT_IMAGES = [
  "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1602632032171-5cd51d27d50e?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?q=80&w=2000&auto=format&fit=crop",
];

const HeroGallerySection: React.FC = () => {
  const { t } = useLanguage();
  
  // Create an array of letters for text animation
  const titleText = t('hero.title');
  const titleLetters = titleText.split("");

  return (
    <ContainerScroll className="h-[350vh]">
      <BentoGrid className="sticky left-0 top-0 z-0 h-screen w-full p-4 bg-slate-900/50">
        {MEAT_IMAGES.map((imageUrl, index) => (
          <BentoCell
            key={index}
            className="overflow-hidden rounded-xl shadow-xl border border-brand-gold/20"
          >
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
              <img
                className="size-full object-cover object-center"
                src={imageUrl}
                alt="Premium Meat Dish"
              />
            </div>
          </BentoCell>
        ))}
      </BentoGrid>

      <ContainerScale className="relative z-10 text-center">
        <Crown className="mx-auto text-brand-gold mb-6" size={60} />
        
        <h1 className="max-w-xl text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter text-white font-serif">
          {titleLetters.map((letter, index) => (
            <motion.span 
              key={index} 
              variants={letterVariants}
              initial="hidden"
              animate="visible"
              className="inline-block"
              style={{ 
                textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                animationDelay: `${index * 0.05}s`
              }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </motion.span>
          ))}
        </h1>
        
        <motion.div 
          className="gold-divider mx-auto"
          initial={{ width: 0 }}
          animate={{ width: 60 }}
          transition={{ delay: 1, duration: 0.5 }}
        />
        
        <p className="my-6 max-w-xl text-xs sm:text-sm md:text-xl text-white opacity-90">
          {t('hero.subtitle')}
        </p>
        
        <div className="flex items-center justify-center gap-4">
          <Button 
            asChild
            className="royal-btn bg-brand-gold hover:bg-brand-blue text-white border-2 border-brand-gold hover:border-brand-blue transition-all duration-300 text-lg px-6 sm:px-8 py-4 sm:py-6 rounded-md shadow-lg relative overflow-hidden group"
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
          
          <Button
            asChild
            variant="link"
            className="bg-transparent px-4 py-2 font-medium text-white hover:text-brand-gold"
          >
            <Link to="/menu">
              {t('nav.menu')}
            </Link>
          </Button>
        </div>
      </ContainerScale>
    </ContainerScroll>
  );
};

export default HeroGallerySection;
