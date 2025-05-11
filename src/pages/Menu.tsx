
import React, { useState, useMemo, Suspense, lazy } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Tables } from '@/integrations/supabase/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Lazy load components that are not immediately visible
const MenuFilters = lazy(() => import('@/components/MenuFilters'));
const MenuCard = lazy(() => import('@/components/MenuCard'));

// Type for products
type Product = Tables<'products'>;

const Menu: React.FC = () => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMeatTypes, setSelectedMeatTypes] = useState<string[]>([]);
  const [selectedSpiceLevels, setSelectedSpiceLevels] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState('popular');

  // Fetch products from Supabase with optimized query and stale time
  const { data: menuItems = [], isLoading } = useQuery({
    queryKey: ['menu-products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*');
        
      if (error) throw error;
      return data as Product[];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes (previously cacheTime)
  });

  // Extract unique categories and meat types - memoized
  const categories = useMemo(() => {
    return [...new Set(menuItems.map(item => item.category))];
  }, [menuItems]);

  const meatTypes = useMemo(() => {
    const types = new Set<string>();
    menuItems.forEach(item => {
      if (Array.isArray(item.meat_type)) {
        item.meat_type.forEach(type => types.add(type));
      } else if (item.meat_type) {
        types.add(item.meat_type as string);
      }
    });
    return [...types];
  }, [menuItems]);

  // Filter menu items - memoized
  const filteredItems = useMemo(() => {
    return menuItems.filter(item => {
      // Filter by category
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      
      // Filter by meat type
      if (selectedMeatTypes.length > 0) {
        if (Array.isArray(item.meat_type)) {
          if (!item.meat_type.some(type => selectedMeatTypes.includes(type))) {
            return false;
          }
        } else if (!selectedMeatTypes.includes(item.meat_type as string)) {
          return false;
        }
      }
      
      // Filter by spice level
      if (selectedSpiceLevels.length > 0 && !selectedSpiceLevels.includes(item.spice_level)) {
        return false;
      }
      
      return true;
    });
  }, [menuItems, selectedCategory, selectedMeatTypes, selectedSpiceLevels]);

  // Sort menu items - memoized
  const sortedItems = useMemo(() => {
    switch (sortBy) {
      case 'popular':
        return [...filteredItems].sort((a, b) => (b.is_popular ? 1 : 0) - (a.is_popular ? 1 : 0));
      case 'spicy-high':
        return [...filteredItems].sort((a, b) => b.spice_level - a.spice_level);
      case 'spicy-low':
        return [...filteredItems].sort((a, b) => a.spice_level - b.spice_level);
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
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-blue"></div>
          </div>
        ) : (
          <>
            <Suspense fallback={<div className="py-4 flex justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-brand-gold"></div>
            </div>}>
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
            </Suspense>
            
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
                <Suspense fallback={<div className="col-span-full py-8 flex justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-gold"></div>
                </div>}>
                  {sortedItems.map((item) => (
                    <MenuCard
                      key={item.id}
                      id={item.id}
                      category={item.category}
                      meatType={item.meat_type}
                      spiceLevel={item.spice_level}
                      imageSrc={item.image_src || ''}
                      titleKey={item.title_key}
                      descriptionKey={item.description_key}
                      priceKey={item.price_key}
                      isPopular={item.is_popular}
                    />
                  ))}
                </Suspense>
              </div>
            )}
          </>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Menu;
