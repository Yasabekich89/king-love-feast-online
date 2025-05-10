
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InstagramFeed from '@/components/InstagramFeed';
import ReservationForm from '@/components/ReservationForm';
import { Button } from '@/components/ui/button';
import { ArrowRight, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index: React.FC = () => {
  const { t } = useLanguage();
  
  const featuredMenuItems = [
    {
      id: 1,
      name: t('menu.kingRibeye.title'),
      description: t('menu.kingRibeye.description'),
      price: t('menu.kingRibeye.price'),
      image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9',
      icon: <Crown className="text-brand-gold" />,
    },
    {
      id: 2,
      name: t('menu.crownBurger.title'),
      description: t('menu.crownBurger.description'),
      price: t('menu.crownBurger.price'),
      image: 'https://images.unsplash.com/photo-1493962853295-0fd70327578a',
      icon: <Crown className="text-brand-gold" />,
    },
    {
      id: 3,
      name: t('menu.royalRack.title'),
      description: t('menu.royalRack.description'),
      price: t('menu.royalRack.price'),
      image: 'https://images.unsplash.com/photo-1465379944081-7f47de8d74ac',
      icon: <Crown className="text-brand-gold" />,
    },
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[500px] flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9"
            alt="Premium Meat" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 hero-overlay"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl mb-8">{t('hero.subtitle')}</p>
            <Button 
              asChild
              className="bg-brand-gold hover:bg-brand-blue text-white border-2 border-brand-gold hover:border-brand-blue transition-all duration-300 text-lg px-8 py-6"
            >
              <Link to="/reservations">
                {t('hero.cta')}
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Featured Menu Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Crown className="mx-auto text-brand-gold mb-4" size={32} />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('menu.title')}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{t('menu.subtitle')}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredMenuItems.map((item) => (
              <div key={item.id} className="menu-item bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover menu-item-image"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    {item.icon}
                    <h3 className="text-xl font-bold ml-2 text-brand-blue">{item.name}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-brand-gold">{item.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Button 
              asChild
              variant="outline" 
              className="border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white"
            >
              <Link to="/menu" className="inline-flex items-center">
                {t('menu.viewAll')}
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section className="py-16 royal-bg text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <img 
                src="https://images.unsplash.com/photo-1465379944081-7f47de8d74ac" 
                alt="About Kings Love Meat" 
                className="w-full h-[400px] object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-1/2 md:pl-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-brand-gold">{t('about.title')}</h2>
              <p className="text-lg mb-6">{t('about.content')}</p>
              <Button 
                asChild
                className="bg-brand-gold hover:bg-white hover:text-brand-blue text-white transition-colors"
              >
                <Link to="/about" className="inline-flex items-center">
                  {t('about.more')}
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Instagram Feed Section */}
      <InstagramFeed />
      
      {/* Reservation Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <ReservationForm />
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
