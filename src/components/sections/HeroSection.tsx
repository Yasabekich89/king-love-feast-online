
import React, { useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Crown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  fadeIn, 
  textReveal, 
  letterVariants, 
  magneticHover, 
  magneticExit 
} from '@/lib/animation-variants';

const HeroSection: React.FC = () => {
  const { t } = useLanguage();
  const buttonRef = useRef<HTMLDivElement>(null);
  
  // Create an array of letters for text animation
  const titleText = t('hero.title');
  const titleLetters = titleText.split("");

  return (
    <section className="relative h-[90vh] min-h-[600px] flex items-center overflow-hidden">
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <img 
          src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9"
          alt="Premium Meat" 
          className="w-full h-full object-cover"
        />
        <motion.div 
          className="absolute inset-0 hero-overlay"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 1 }}
        />
      </motion.div>
      
      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div 
          className="max-w-3xl mx-auto text-white hero-content"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
          >
            <Crown className="mx-auto text-brand-gold mb-6" size={60} />
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white"
            variants={textReveal}
            initial="hidden"
            animate="visible"
          >
            {titleLetters.map((letter, index) => (
              <motion.span 
                key={index} 
                variants={letterVariants}
                className="inline-block"
                style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </motion.span>
            ))}
          </motion.h1>
          
          <motion.div 
            className="gold-divider"
            initial={{ width: 0 }}
            animate={{ width: 60 }}
            transition={{ delay: 1, duration: 0.5 }}
          />
          
          <motion.p 
            className="text-xl md:text-2xl mb-10 opacity-90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            {t('hero.subtitle')}
          </motion.p>
          
          <motion.div
            ref={buttonRef}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, type: "spring", stiffness: 100 }}
            onMouseMove={(e) => magneticHover(e, buttonRef)}
            onMouseLeave={() => magneticExit(buttonRef)}
            className="inline-block"
          >
            <Button 
              asChild
              className="royal-btn bg-brand-gold hover:bg-brand-blue text-white border-2 border-brand-gold hover:border-brand-blue transition-all duration-300 text-lg px-8 py-6 rounded-md shadow-lg relative overflow-hidden group"
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
        </motion.div>
      </div>
      
      {/* Animated decorative elements */}
      <motion.div
        className="absolute bottom-5 left-5 md:left-20 text-brand-gold/60"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1, 
          y: [0, -15, 0],
        }}
        transition={{ 
          delay: 1.5,
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
          delay: 1.8,
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

export default HeroSection;
