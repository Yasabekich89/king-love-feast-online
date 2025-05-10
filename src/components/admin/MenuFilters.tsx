
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface MenuFiltersProps {
  searchTerm: string;
  filterCategory: string;
  categories: string[];
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
}

const MenuFilters: React.FC<MenuFiltersProps> = ({
  searchTerm,
  filterCategory,
  categories,
  onSearchChange,
  onCategoryChange,
}) => {
  const { t } = useLanguage();

  return (
    <div className="mb-6 flex flex-col sm:flex-row gap-4">
      <div className="w-full sm:w-1/2">
        <Label htmlFor="search" className="sr-only">
          {t('admin.search')}
        </Label>
        <Input
          id="search"
          placeholder={t('admin.searchItems')}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="border-brand-gold/30"
        />
      </div>
      <div className="w-full sm:w-1/2">
        <Select
          value={filterCategory}
          onValueChange={onCategoryChange}
        >
          <SelectTrigger className="border-brand-gold/30">
            <SelectValue placeholder={t('admin.filterByCategory')} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">{t('admin.allCategories')}</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {t(`menu.category.${category}`)}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default MenuFilters;
