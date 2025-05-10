
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ChevronDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface MenuFiltersProps {
  categories: string[];
  meatTypes: string[];
  selectedCategory: string;
  selectedMeatTypes: string[];
  selectedSpiceLevels: number[];
  onCategoryChange: (category: string) => void;
  onMeatTypeChange: (meatType: string) => void;
  onSpiceLevelChange: (level: number) => void;
  onClearFilters: () => void;
}

const MenuFilters: React.FC<MenuFiltersProps> = ({
  categories,
  meatTypes,
  selectedCategory,
  selectedMeatTypes,
  selectedSpiceLevels,
  onCategoryChange,
  onMeatTypeChange,
  onSpiceLevelChange,
  onClearFilters,
}) => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="mb-8">
      {/* Desktop filters */}
      <div className="hidden md:block">
        <div className="mb-6">
          <h3 className="text-lg font-serif text-brand-blue mb-3">{t('menu.categories')}</h3>
          <ToggleGroup type="single" value={selectedCategory} onValueChange={onCategoryChange} className="flex flex-wrap gap-2">
            <ToggleGroupItem value="all" className="border-brand-gold text-brand-blue hover:bg-brand-gold/10 data-[state=on]:bg-brand-gold data-[state=on]:text-white">
              {t('menu.all')}
            </ToggleGroupItem>
            {categories.map((category) => (
              <ToggleGroupItem 
                key={category} 
                value={category}
                className="border-brand-gold text-brand-blue hover:bg-brand-gold/10 data-[state=on]:bg-brand-gold data-[state=on]:text-white"
              >
                {t(`menu.category.${category}`)}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        <div className="flex flex-col gap-6 md:flex-row md:gap-10">
          <div>
            <h3 className="text-lg font-serif text-brand-blue mb-3">{t('menu.meatTypes')}</h3>
            <div className="space-y-2">
              {meatTypes.map((type) => (
                <div key={type} className="flex items-center gap-2">
                  <Checkbox 
                    id={`meat-${type}`} 
                    checked={selectedMeatTypes.includes(type)}
                    onCheckedChange={() => onMeatTypeChange(type)}
                    className="border-brand-gold text-brand-gold"
                  />
                  <label htmlFor={`meat-${type}`} className="text-sm cursor-pointer">
                    {t(`menu.meatType.${type}`)}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-serif text-brand-blue mb-3">{t('menu.spiceLevel')}</h3>
            <div className="space-y-2">
              {[1, 2, 3].map((level) => (
                <div key={level} className="flex items-center gap-2">
                  <Checkbox 
                    id={`spice-${level}`} 
                    checked={selectedSpiceLevels.includes(level)}
                    onCheckedChange={() => onSpiceLevelChange(level)}
                    className="border-brand-gold text-brand-gold"
                  />
                  <label htmlFor={`spice-${level}`} className="flex items-center gap-1 cursor-pointer">
                    {Array(level).fill('🔥').map((emoji, i) => (
                      <span key={i} className="text-red-600 text-sm">{emoji}</span>
                    ))}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {(selectedMeatTypes.length > 0 || selectedSpiceLevels.length > 0) && (
          <div className="mt-4">
            <button 
              onClick={onClearFilters}
              className="text-sm text-brand-blue underline hover:text-brand-gold transition-colors"
            >
              {t('menu.clearFilters')}
            </button>
          </div>
        )}
      </div>

      {/* Mobile filters */}
      <div className="md:hidden">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <div className="flex items-center justify-between bg-white p-3 rounded-lg shadow mb-4">
            <h3 className="font-serif text-brand-blue">{t('menu.filters')}</h3>
            <CollapsibleTrigger className="flex items-center gap-1 text-sm text-brand-gold">
              {t('menu.filterOptions')} <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </CollapsibleTrigger>
          </div>
          
          <CollapsibleContent className="bg-white p-4 rounded-lg shadow-lg mb-4">
            <div className="mb-4">
              <h3 className="text-md font-serif text-brand-blue mb-2">{t('menu.categories')}</h3>
              <div className="flex flex-wrap gap-2">
                <Badge 
                  className={`cursor-pointer ${selectedCategory === 'all' ? 'bg-brand-gold text-white' : 'bg-white text-brand-blue border-brand-gold'}`}
                  onClick={() => onCategoryChange('all')}
                >
                  {t('menu.all')}
                </Badge>
                {categories.map((category) => (
                  <Badge 
                    key={category}
                    className={`cursor-pointer ${selectedCategory === category ? 'bg-brand-gold text-white' : 'bg-white text-brand-blue border-brand-gold'}`}
                    onClick={() => onCategoryChange(category)}
                  >
                    {t(`menu.category.${category}`)}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-md font-serif text-brand-blue mb-2">{t('menu.meatTypes')}</h3>
              <div className="flex flex-wrap gap-2">
                {meatTypes.map((type) => (
                  <Badge 
                    key={type}
                    variant="outline"
                    className={`cursor-pointer ${selectedMeatTypes.includes(type) ? 'bg-brand-gold text-white' : 'bg-white text-brand-blue border-brand-gold'}`}
                    onClick={() => onMeatTypeChange(type)}
                  >
                    {t(`menu.meatType.${type}`)}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-md font-serif text-brand-blue mb-2">{t('menu.spiceLevel')}</h3>
              <div className="flex gap-3">
                {[1, 2, 3].map((level) => (
                  <Badge 
                    key={level}
                    variant="outline"
                    className={`cursor-pointer ${selectedSpiceLevels.includes(level) ? 'bg-brand-gold text-white' : 'bg-white text-brand-blue border-brand-gold'}`}
                    onClick={() => onSpiceLevelChange(level)}
                  >
                    {Array(level).fill('🔥').map((emoji, i) => (
                      <span key={i}>{emoji}</span>
                    ))}
                  </Badge>
                ))}
              </div>
            </div>

            {(selectedMeatTypes.length > 0 || selectedSpiceLevels.length > 0) && (
              <button 
                onClick={onClearFilters}
                className="text-sm text-brand-blue underline hover:text-brand-gold transition-colors"
              >
                {t('menu.clearFilters')}
              </button>
            )}
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Category pills on mobile */}
      <div className="md:hidden overflow-x-auto flex gap-2 pb-2 mb-4">
        <Badge 
          className={`whitespace-nowrap cursor-pointer ${selectedCategory === 'all' ? 'bg-brand-gold text-white' : 'bg-white text-brand-blue border-brand-gold'}`}
          onClick={() => onCategoryChange('all')}
        >
          {t('menu.all')}
        </Badge>
        {categories.map((category) => (
          <Badge 
            key={category}
            className={`whitespace-nowrap cursor-pointer ${selectedCategory === category ? 'bg-brand-gold text-white' : 'bg-white text-brand-blue border-brand-gold'}`}
            onClick={() => onCategoryChange(category)}
          >
            {t(`menu.category.${category}`)}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default MenuFilters;
