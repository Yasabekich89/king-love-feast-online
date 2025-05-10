
import React from 'react';
import { InfiniteSlider } from '@/components/ui/infinite-slider';
import MenuCard from '@/components/MenuCard';
import { useLanguage } from '@/contexts/LanguageContext';

// Sample menu items for demo purposes
const popularMenuItems = [
  {
    id: 'item1',
    category: 'steak',
    meatType: 'beef',
    spiceLevel: 2,
    imageSrc: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9',
    titleKey: 'menu.kingRibeye.title',
    descriptionKey: 'menu.kingRibeye.description',
    priceKey: 'menu.kingRibeye.price',
    isPopular: true,
  },
  {
    id: 'item2',
    category: 'burger',
    meatType: 'beef',
    spiceLevel: 1,
    imageSrc: 'https://images.unsplash.com/photo-1493962853295-0fd70327578a',
    titleKey: 'menu.crownBurger.title',
    descriptionKey: 'menu.crownBurger.description',
    priceKey: 'menu.crownBurger.price',
    isPopular: true,
  },
  {
    id: 'item3',
    category: 'ribs',
    meatType: 'pork',
    spiceLevel: 3,
    imageSrc: 'https://images.unsplash.com/photo-1465379944081-7f47de8d74ac',
    titleKey: 'menu.royalRack.title',
    descriptionKey: 'menu.royalRack.description',
    priceKey: 'menu.royalRack.price',
    isPopular: true,
  },
  {
    id: 'item4',
    category: 'steak',
    meatType: 'beef',
    spiceLevel: 1,
    imageSrc: 'https://images.unsplash.com/photo-1544025162-d76694265947',
    titleKey: 'menu.filetMignon.title',
    descriptionKey: 'menu.filetMignon.description',
    priceKey: 'menu.filetMignon.price',
    isPopular: false,
  },
  {
    id: 'item5',
    category: 'sides',
    meatType: ['chicken', 'beef'],
    spiceLevel: 4,
    imageSrc: 'https://images.unsplash.com/photo-1625167171750-fa3c29aa4929',
    titleKey: 'menu.spicyWings.title',
    descriptionKey: 'menu.spicyWings.description',
    priceKey: 'menu.spicyWings.price',
    isPopular: false,
  },
  {
    id: 'item6',
    category: 'special',
    meatType: 'lamb',
    spiceLevel: 2,
    imageSrc: 'https://images.unsplash.com/photo-1544025162-d76694265947',
    titleKey: 'menu.lambChops.title',
    descriptionKey: 'menu.lambChops.description',
    priceKey: 'menu.lambChops.price',
    isPopular: true,
  },
];

const RandomMenuItems: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-blue mb-2">
            {t('homepage.featuredItems')}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('homepage.featuredDescription')}
          </p>
          <div className="gold-divider"></div>
        </div>

        <div className="mt-10 overflow-hidden">
          <InfiniteSlider 
            duration={30} 
            gap={24} 
            className="pb-6"
            durationOnHover={100}
          >
            {popularMenuItems.map((item) => (
              <div key={item.id} className="min-w-[280px] sm:min-w-[320px]">
                <MenuCard {...item} />
              </div>
            ))}
          </InfiniteSlider>
          
          <InfiniteSlider 
            duration={35} 
            gap={24} 
            reverse={true}
            className="pt-6"
            durationOnHover={100}
          >
            {popularMenuItems.slice().reverse().map((item) => (
              <div key={`rev-${item.id}`} className="min-w-[280px] sm:min-w-[320px]">
                <MenuCard {...item} />
              </div>
            ))}
          </InfiniteSlider>
        </div>
      </div>
    </section>
  );
};

export default RandomMenuItems;
