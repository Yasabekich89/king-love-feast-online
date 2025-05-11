
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Crown } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="relative h-[90vh] min-h-[600px] flex items-center">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9"
          alt="Premium Meat" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-overlay"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="max-w-3xl mx-auto text-white hero-content">
          <Crown className="mx-auto text-brand-gold mb-6" size={60} />
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white">
            {t('hero.title')}
          </h1>
          <div className="gold-divider"></div>
          <p className="text-xl md:text-2xl mb-10 opacity-90">{t('hero.subtitle')}</p>
          <Button 
            asChild
            className="royal-btn bg-brand-gold hover:bg-brand-blue text-white border-2 border-brand-gold hover:border-brand-blue transition-all duration-300 text-lg px-8 py-6 rounded-md shadow-lg"
          >
            <Link to="/reservations">
              <span>{t('hero.cta')}</span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
