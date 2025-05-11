
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Badge } from "@/components/ui/badge";
import OptimizedImage from './OptimizedImage';

interface MenuItemProps {
  id: string;
  category: string;
  meatType: string[] | string;
  spiceLevel: number;
  imageSrc: string;
  titleKey: string;
  descriptionKey: string;
  priceKey: string;
  isPopular?: boolean;
}

const MenuCard: React.FC<MenuItemProps> = ({
  id,
  category,
  meatType,
  spiceLevel,
  imageSrc,
  titleKey,
  descriptionKey,
  priceKey,
  isPopular = false,
}) => {
  const { t } = useLanguage();
  
  // Generate spice indicators
  const renderSpiceLevel = () => {
    const levels = [];
    for (let i = 0; i < spiceLevel; i++) {
      levels.push(
        <span key={i} className="text-red-600">🔥</span>
      );
    }
    return levels;
  };

  return (
    <div 
      id={id}
      className="menu-card overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 h-full flex flex-col"
    >
      <div className="relative overflow-hidden h-48">
        <OptimizedImage 
          src={imageSrc} 
          alt={t(titleKey)} 
          className="w-full h-full object-contain" // Changed from object-cover to object-contain
          containerClassName="bg-gray-50" // Added light background for the image container
        />
        {isPopular && (
          <div className="absolute top-4 right-4">
            <Badge variant="destructive" className="bg-brand-gold text-white border-none font-serif">
              {t('menu.popular')}
            </Badge>
          </div>
        )}
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-serif text-brand-blue">{t(titleKey)}</h3>
          <span className="text-lg font-bold text-brand-gold">{t(priceKey)}</span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 flex-grow">{t(descriptionKey)}</p>
        
        <div className="flex items-center justify-between mt-auto">
          <div className="flex space-x-1">
            {renderSpiceLevel()}
          </div>
          <div className="flex flex-wrap gap-1">
            {Array.isArray(meatType) ? (
              meatType.map((type, index) => (
                <Badge key={index} variant="outline" className="text-xs border-brand-gold text-brand-blue">
                  {t(`menu.meatType.${type}`)}
                </Badge>
              ))
            ) : (
              <Badge variant="outline" className="text-xs border-brand-gold text-brand-blue">
                {t(`menu.meatType.${meatType}`)}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
