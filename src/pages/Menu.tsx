
import React, { useState, useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MenuCard from '@/components/MenuCard';
import MenuFilters from '@/components/MenuFilters';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// Menu data - would ideally come from a database
const menuItems = [
  {
    id: 'kings-ribeye',
    category: 'steaks',
    meatType: ['beef'],
    spiceLevel: 1,
    imageSrc: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=1470&auto=format&fit=crop',
    titleKey: 'menu.kingRibeye.title',
    descriptionKey: 'menu.kingRibeye.description',
    priceKey: 'menu.kingRibeye.price',
    isPopular: true,
  },
  {
    id: 'crown-burger',
    category: 'burgers',
    meatType: ['beef'],
    spiceLevel: 2,
    imageSrc: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1299&auto=format&fit=crop',
    titleKey: 'menu.crownBurger.title',
    descriptionKey: 'menu.crownBurger.description',
    priceKey: 'menu.crownBurger.price',
    isPopular: true,
  },
  {
    id: 'royal-rack',
    category: 'specialties',
    meatType: ['lamb'],
    spiceLevel: 2,
    imageSrc: 'https://images.unsplash.com/photo-1609183580312-0ca2d4f1df090?q=80&w=1287&auto=format&fit=crop',
    titleKey: 'menu.royalRack.title',
    descriptionKey: 'menu.royalRack.description',
    priceKey: 'menu.royalRack.price',
    isPopular: true,
  },
  {
    id: 'kingly-t-bone',
    category: 'steaks',
    meatType: ['beef'],
    spiceLevel: 1,
    imageSrc: 'https://images.unsplash.com/photo-1613454320435-1dfba4cdae5f?q=80&w=1470&auto=format&fit=crop',
    titleKey: 'menu.kinglyTbone.title',
    descriptionKey: 'menu.kinglyTbone.description',
    priceKey: 'menu.kinglyTbone.price',
  },
  {
    id: 'queenly-chicken',
    category: 'poultry',
    meatType: ['chicken'],
    spiceLevel: 2,
    imageSrc: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?q=80&w=1470&auto=format&fit=crop',
    titleKey: 'menu.queenlyChicken.title',
    descriptionKey: 'menu.queenlyChicken.description',
    priceKey: 'menu.queenlyChicken.price',
  },
  {
    id: 'royal-bbq-platter',
    category: 'platters',
    meatType: ['beef', 'chicken', 'pork'],
    spiceLevel: 3,
    imageSrc: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1287&auto=format&fit=crop',
    titleKey: 'menu.royalBbq.title',
    descriptionKey: 'menu.royalBbq.description',
    priceKey: 'menu.royalBbq.price',
  },
  {
    id: 'truffle-fries',
    category: 'sides',
    meatType: ['vegetarian'],
    spiceLevel: 0,
    imageSrc: 'https://images.unsplash.com/photo-1654920106257-58693883316d?q=80&w=1528&auto=format&fit=crop',
    titleKey: 'menu.truffleFries.title',
    descriptionKey: 'menu.truffleFries.description',
    priceKey: 'menu.truffleFries.price',
  },
  {
    id: 'loaded-mashed-potatoes',
    category: 'sides',
    meatType: ['vegetarian'],
    spiceLevel: 1,
    imageSrc: 'https://images.unsplash.com/photo-1577906096429-f73c2c312435?q=80&w=1470&auto=format&fit=crop',
    titleKey: 'menu.mashedPotatoes.title',
    descriptionKey: 'menu.mashedPotatoes.description',
    priceKey: 'menu.mashedPotatoes.price',
  },
];

const Menu: React.FC = () => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMeatTypes, setSelectedMeatTypes] = useState<string[]>([]);
  const [selectedSpiceLevels, setSelectedSpiceLevels] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState('popular');

  // Extract unique categories and meat types
  const categories = useMemo(() => {
    return [...new Set(menuItems.map(item => item.category))];
  }, []);

  const meatTypes = useMemo(() => {
    const types = new Set<string>();
    menuItems.forEach(item => {
      if (Array.isArray(item.meatType)) {
        item.meatType.forEach(type => types.add(type));
      } else {
        types.add(item.meatType as string);
      }
    });
    return [...types];
  }, []);

  // Filter menu items
  const filteredItems = useMemo(() => {
    return menuItems.filter(item => {
      // Filter by category
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      
      // Filter by meat type
      if (selectedMeatTypes.length > 0) {
        if (Array.isArray(item.meatType)) {
          if (!item.meatType.some(type => selectedMeatTypes.includes(type))) {
            return false;
          }
        } else if (!selectedMeatTypes.includes(item.meatType as string)) {
          return false;
        }
      }
      
      // Filter by spice level
      if (selectedSpiceLevels.length > 0 && !selectedSpiceLevels.includes(item.spiceLevel)) {
        return false;
      }
      
      return true;
    });
  }, [selectedCategory, selectedMeatTypes, selectedSpiceLevels]);

  // Sort menu items
  const sortedItems = useMemo(() => {
    switch (sortBy) {
      case 'popular':
        return [...filteredItems].sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0));
      case 'spicy-high':
        return [...filteredItems].sort((a, b) => b.spiceLevel - a.spiceLevel);
      case 'spicy-low':
        return [...filteredItems].sort((a, b) => a.spiceLevel - b.spiceLevel);
      default:
        return filteredItems;
    }
  }, [filteredItems, sortBy]);

  // Handle filter changes
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleMeatTypeChange = (meatType: string) => {
    setSelectedMeatTypes(prev => {
      if (prev.includes(meatType)) {
        return prev.filter(type => type !== meatType);
      } else {
        return [...prev, meatType];
      }
    });
  };

  const handleSpiceLevelChange = (level: number) => {
    setSelectedSpiceLevels(prev => {
      if (prev.includes(level)) {
        return prev.filter(l => l !== level);
      } else {
        return [...prev, level];
      }
    });
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedMeatTypes([]);
    setSelectedSpiceLevels([]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <div className="relative bg-brand-blue py-16">
        <div className="crown-pattern absolute inset-0 opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-serif text-brand-gold mb-4">{t('menu.title')}</h1>
          <p className="text-white text-lg max-w-2xl mx-auto">{t('menu.subtitle')}</p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12 flex-grow">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-serif text-brand-blue">{t('menu.discover')}</h2>
          
          <div className="flex items-center">
            <span className="mr-2 text-sm text-gray-600">{t('menu.sortBy')}</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px] border-brand-gold focus:ring-brand-gold">
                <SelectValue placeholder={t('menu.sortBy')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">{t('menu.sortPopular')}</SelectItem>
                <SelectItem value="spicy-high">{t('menu.sortSpicyHigh')}</SelectItem>
                <SelectItem value="spicy-low">{t('menu.sortSpicyLow')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <MenuFilters 
          categories={categories}
          meatTypes={meatTypes}
          selectedCategory={selectedCategory}
          selectedMeatTypes={selectedMeatTypes}
          selectedSpiceLevels={selectedSpiceLevels}
          onCategoryChange={handleCategoryChange}
          onMeatTypeChange={handleMeatTypeChange}
          onSpiceLevelChange={handleSpiceLevelChange}
          onClearFilters={clearFilters}
        />
        
        {sortedItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">{t('menu.noResults')}</p>
            <button 
              onClick={clearFilters}
              className="mt-4 text-brand-blue underline hover:text-brand-gold transition-colors"
            >
              {t('menu.clearFilters')}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedItems.map((item) => (
              <MenuCard
                key={item.id}
                id={item.id}
                category={item.category}
                meatType={item.meatType}
                spiceLevel={item.spiceLevel}
                imageSrc={item.imageSrc}
                titleKey={item.titleKey}
                descriptionKey={item.descriptionKey}
                priceKey={item.priceKey}
                isPopular={item.isPopular}
              />
            ))}
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Menu;
