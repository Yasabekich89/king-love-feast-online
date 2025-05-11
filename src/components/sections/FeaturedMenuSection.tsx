import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Crown, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import MenuCard from '@/components/MenuCard';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel';
import { AspectRatio } from "@/components/ui/aspect-ratio";

const FeaturedMenuSection: React.FC = () => {
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
    <section className="py-20 crown-pattern overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <Crown className="mx-auto text-brand-gold mb-4" size={40} />
          <h2 className="text-3xl md:text-5xl font-bold mb-4">{t('menu.title')}</h2>
          <div className="gold-divider"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">{t('menu.subtitle')}</p>
        </div>
        
        {isMobile ? (
          <div className="relative mt-16 w-full overflow-hidden">
            <Carousel className="w-full">
              <CarouselContent>
                {!loading && featuredProducts.length > 0 ? (
                  featuredProducts.map((product) => (
                    <CarouselItem key={product.id} className="w-full">
                      <div className="px-2 w-full">
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
                    <CarouselItem key={item.id} className="w-full">
                      <div className="px-2 w-full">
                        <Card className="menu-card overflow-hidden rounded-lg w-full">
                          <div className="p-4">
                            <AspectRatio ratio={4/3} className="bg-gray-50 rounded-lg overflow-hidden">
                              <img 
                                src={item.image} 
                                alt={item.name} 
                                className="w-full h-full object-contain p-2" 
                              />
                            </AspectRatio>
                          </div>
                          <CardContent className="p-6 pt-2">
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
                  <div className="p-4">
                    <AspectRatio ratio={4/3} className="bg-gray-50 rounded-lg overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-contain p-2" 
                      />
                    </AspectRatio>
                  </div>
                  <CardContent className="p-6 pt-2">
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
  );
};

export default FeaturedMenuSection;
