
import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InstagramFeed from '@/components/InstagramFeed';
import ReservationForm from '@/components/ReservationForm';
import { Button } from '@/components/ui/button';
import { ArrowRight, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import MenuCard from '@/components/MenuCard';
import { useIsMobile } from '@/hooks/use-mobile';
import { CommitsGridDemo } from '@/components/ui/commits-grid-demo';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel';

const Index: React.FC = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('is_popular', { ascending: false });
          
        if (error) {
          console.error('Error fetching products:', error);
          return;
        }
        
        // Get all popular items first, then fill in with non-popular items if needed
        const popularItems = data.filter(item => item.is_popular);
        const otherItems = data.filter(item => !item.is_popular);
        
        // Shuffle both arrays
        const shuffledPopular = popularItems.sort(() => 0.5 - Math.random());
        const shuffledOther = otherItems.sort(() => 0.5 - Math.random());
        
        // Take up to 3 popular items, fill the rest with other items if needed
        let selectedItems = shuffledPopular.slice(0, 3);
        if (selectedItems.length < 3) {
          selectedItems = [
            ...selectedItems,
            ...shuffledOther.slice(0, 3 - selectedItems.length)
          ];
        }
        
        setFeaturedProducts(selectedItems);
      } catch (error) {
        console.error('Error in fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  // In case we don't have data yet or are waiting for the API, use the static items
  const staticMenuItems = [
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
      
      {/* Welcome message with CommitsGrid */}
      <div className="w-full py-12 bg-white flex flex-col items-center justify-center">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-blue mb-6">Welcome to</h2>
        <div className="w-full max-w-3xl mx-auto px-4">
          <CommitsGridDemo />
        </div>
      </div>
      
      {/* Hero Section */}
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
      
      {/* Featured Menu Section */}
      <section className="py-20 crown-pattern">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <Crown className="mx-auto text-brand-gold mb-4" size={40} />
            <h2 className="text-3xl md:text-5xl font-bold mb-4">{t('menu.title')}</h2>
            <div className="gold-divider"></div>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">{t('menu.subtitle')}</p>
          </div>
          
          {isMobile ? (
            <div className="relative mt-16">
              <Carousel className="w-full">
                <CarouselContent>
                  {!loading && featuredProducts.length > 0 ? (
                    featuredProducts.map((product) => (
                      <CarouselItem key={product.id}>
                        <div className="px-2">
                          <MenuCard
                            id={product.id}
                            category={product.category}
                            meatType={product.meat_type}
                            spiceLevel={product.spice_level}
                            imageSrc={product.image_src || "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9"}
                            titleKey={product.title_key}
                            descriptionKey={product.description_key}
                            priceKey={product.price_key}
                            isPopular={product.is_popular}
                          />
                        </div>
                      </CarouselItem>
                    ))
                  ) : (
                    staticMenuItems.map((item) => (
                      <CarouselItem key={item.id}>
                        <div className="px-2">
                          <Card className="menu-card overflow-hidden rounded-lg">
                            <div className="h-60 overflow-hidden">
                              <img 
                                src={item.image} 
                                alt={item.name} 
                                className="w-full h-full object-cover menu-item-image"
                              />
                            </div>
                            <CardContent className="p-6">
                              <div className="flex items-center mb-3">
                                {item.icon}
                                <h3 className="text-2xl font-bold ml-2 text-brand-blue">{item.name}</h3>
                              </div>
                              <p className="text-gray-600 mb-4 text-base">{item.description}</p>
                              <div className="flex items-center justify-between">
                                <span className="text-2xl font-bold text-brand-gold">{item.price}</span>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </CarouselItem>
                    ))
                  )}
                </CarouselContent>
                <CarouselPrevious className="left-2 lg:left-4" />
                <CarouselNext className="right-2 lg:right-4" />
              </Carousel>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              {!loading && featuredProducts.length > 0 ? (
                featuredProducts.map((product) => (
                  <MenuCard
                    key={product.id}
                    id={product.id}
                    category={product.category}
                    meatType={product.meat_type}
                    spiceLevel={product.spice_level}
                    imageSrc={product.image_src || "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9"}
                    titleKey={product.title_key}
                    descriptionKey={product.description_key}
                    priceKey={product.price_key}
                    isPopular={product.is_popular}
                  />
                ))
              ) : (
                staticMenuItems.map((item) => (
                  <Card key={item.id} className="menu-card overflow-hidden rounded-lg">
                    <div className="h-60 overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover menu-item-image"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center mb-3">
                        {item.icon}
                        <h3 className="text-2xl font-bold ml-2 text-brand-blue">{item.name}</h3>
                      </div>
                      <p className="text-gray-600 mb-4 text-base">{item.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-brand-gold">{item.price}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          )}
          
          <div className="text-center mt-12">
            <Button 
              asChild
              variant="outline" 
              className="royal-btn border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white px-6 py-3 rounded-md text-lg"
            >
              <Link to="/menu" className="inline-flex items-center">
                <span>{t('menu.viewAll')}</span>
                <ArrowRight size={20} className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section className="py-20 royal-bg text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
              <img 
                src="https://images.unsplash.com/photo-1465379944081-7f47de8d74ac" 
                alt="About Kings Love Meat" 
                className="w-full h-[450px] object-cover rounded-lg shadow-2xl"
              />
            </div>
            <div className="md:w-1/2 md:pl-10">
              <Crown className="text-brand-gold mb-4" size={36} />
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-brand-gold">{t('about.title')}</h2>
              <div className="h-1 w-20 bg-brand-gold mb-6"></div>
              <p className="text-lg mb-8 leading-relaxed">{t('about.content')}</p>
              <Button 
                asChild
                className="royal-btn bg-brand-gold hover:bg-white hover:text-brand-blue text-white transition-colors px-8 py-3 rounded-md text-lg"
              >
                <Link to="/about" className="inline-flex items-center">
                  <span>{t('about.more')}</span>
                  <ArrowRight size={20} className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Instagram Feed Section */}
      <InstagramFeed />
      
      {/* Reservation Section */}
      <section className="py-20 bg-gray-100 crown-pattern">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto relative z-10">
            <div className="text-center mb-10">
              <Crown className="mx-auto text-brand-gold mb-4" size={32} />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('reservation.title')}</h2>
              <div className="gold-divider"></div>
            </div>
            <div className="bg-white rounded-lg shadow-xl p-8 border border-gray-200">
              <ReservationForm />
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
