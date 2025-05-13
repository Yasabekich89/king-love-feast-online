
import React from 'react';
import { useLanguage } from '@/contexts/language';
import { Badge } from "@/components/ui/badge";
import OptimizedImage from './OptimizedImage';
import { AspectRatio } from "@/components/ui/aspect-ratio";

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
  const { t, meatTypes, language } = useLanguage();
  
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

  // Helper function to get the translated meat type
  const getMeatTypeTranslation = (typeKey: string) => {
    // First try to find the meat type in our database
    const meatType = meatTypes.find(type => type.key === typeKey);
    
    if (meatType) {
      // Use the translation for the current language, fallback to English or key
      return meatType[language] || meatType.en || typeKey;
    }
    
    // If not found in our meatTypes, fallback to the translation system
    return t(`menu.meatType.${typeKey}`);
  };

  return (
    <div 
      id={id}
      className="menu-card overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 h-full flex flex-col"
    >
      <div className="p-4 pb-0">
        <div className="relative bg-gray-50 rounded-lg overflow-hidden">
          <AspectRatio ratio={4/3} className="w-full">
            <OptimizedImage 
              src={imageSrc} 
              alt={t(titleKey)} 
              className="w-full h-full object-contain p-2" 
              containerClassName="flex items-center justify-center" 
            />
            {isPopular && (
              <div className="absolute top-4 right-4">
                <Badge variant="destructive" className="bg-brand-gold text-white border-none font-serif">
                  {t('menu.popular')}
                </Badge>
              </div>
            )}
          </AspectRatio>
        </div>
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
                  {getMeatTypeTranslation(type)}
                </Badge>
              ))
            ) : (
              <Badge variant="outline" className="text-xs border-brand-gold text-brand-blue">
                {getMeatTypeTranslation(meatType as string)}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
