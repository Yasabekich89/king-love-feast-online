
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Edit, MoreHorizontal, Trash2 } from 'lucide-react';

// Define the type for menu items
interface MenuItem {
  id: string;
  category: string;
  meatType: string[] | string;
  spiceLevel: number;
  imageSrc: string;
  titleKey: string;
  descriptionKey: string;
  priceKey: string;
  isPopular: boolean;
  title_en: string;
  title_am?: string;
  title_ru?: string;
  description_en: string;
  description_am?: string;
  description_ru?: string;
  price_en: string;
  price_am?: string;
  price_ru?: string;
}

interface MenuItemsTableProps {
  items: MenuItem[];
  loading: boolean;
  language: string;
  onEdit: (item: MenuItem) => void;
  onDelete: (item: MenuItem) => void;
}

const MenuItemsTable: React.FC<MenuItemsTableProps> = ({
  items,
  loading,
  language,
  onEdit,
  onDelete,
}) => {
  const { t } = useLanguage();
  
  return (
    <div className="border rounded-md overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">{t('admin.image')}</TableHead>
            <TableHead>{t('admin.name')}</TableHead>
            <TableHead>{t('admin.category')}</TableHead>
            <TableHead>{t('admin.price')}</TableHead>
            <TableHead>{t('admin.status')}</TableHead>
            <TableHead className="w-[100px]">{t('admin.actions')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                {t('admin.loading')}
              </TableCell>
            </TableRow>
          ) : items.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                {t('admin.noItemsFound')}
              </TableCell>
            </TableRow>
          ) : (
            items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="w-12 h-12 rounded-md overflow-hidden">
                    <img 
                      src={item.imageSrc} 
                      alt={item[`title_${language}` as keyof MenuItem]?.toString() || ''} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </TableCell>
                <TableCell className="font-medium">
                  {item[`title_${language}` as keyof MenuItem]?.toString() || ''}
                </TableCell>
                <TableCell>
                  {t(`menu.category.${item.category}`)}
                </TableCell>
                <TableCell>
                  {item[`price_${language}` as keyof MenuItem]?.toString() || ''}
                </TableCell>
                <TableCell>
                  {item.isPopular ? (
                    <Badge className="bg-brand-gold hover:bg-brand-gold/80">
                      {t('admin.popular')}
                    </Badge>
                  ) : (
                    <Badge variant="outline">
                      {t('admin.regular')}
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">{t('admin.openMenu')}</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEdit(item)}>
                        <Edit className="mr-2 h-4 w-4" />
                        {t('admin.edit')}
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => onDelete(item)}
                        className="text-red-600 focus:text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        {t('admin.delete')}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default MenuItemsTable;
