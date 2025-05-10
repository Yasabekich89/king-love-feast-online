import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import AdminLayout from '@/components/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Plus, Edit, Trash2, MoreHorizontal } from 'lucide-react';

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

const AdminMenu: React.FC = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  // Mock categories for the filter dropdown
  const categories = ['steaks', 'burgers', 'specialties', 'poultry', 'platters', 'sides'];

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        navigate('/admin/login');
      }
    };
    
    const fetchMenuItems = async () => {
      setLoading(true);
      
      // For now, we'll use the static data from Menu.tsx
      // In a real application, this would come from Supabase
      const menuData = [
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
          title_en: "King's Ribeye Steak",
          title_am: "Թագավորական Ռիբայ Սթեյք",
          title_ru: "Королевский Рибай Стейк",
          description_en: "Premium aged ribeye, perfectly marbled and grilled to your liking",
          description_am: "Պրեմիում հնեցված ռիբայ, կատարյալ մարմարված և գրիլված ձեր նախասիրությամբ",
          description_ru: "Премиальный выдержанный рибай, идеально мраморный и приготовленный на гриле по вашему вкусу",
          price_en: "$45",
          price_am: "18000֏",
          price_ru: "4500₽",
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
          title_en: "Crown Burger",
          title_am: "Թագի Բուրգեր",
          title_ru: "Корона Бургер",
          description_en: "Half-pound Angus beef patty topped with caramelized onions, aged cheddar, and our special sauce",
          description_am: "Կես ֆունտ Անգուս տավարի կոտլետ՝ կարամելացված սոխով, հասունացած չեդարով և մեր հատուկ սոուսով",
          description_ru: "Полфунта говяжьей котлеты Ангус с карамелизированным луком, выдержанным чеддером и нашим фирменным соусом",
          price_en: "$18",
          price_am: "7200֏",
          price_ru: "1800₽",
        },
        // Add other items from Menu.tsx as needed
      ];
      
      setMenuItems(menuData);
      setLoading(false);
    };
    
    checkAuth();
    fetchMenuItems();
  }, [navigate]);

  const handleCreateItem = () => {
    navigate('/admin/menu/create');
  };

  const handleEditItem = (item: MenuItem) => {
    navigate(`/admin/menu/edit/${item.id}`);
  };

  const handleDeleteClick = (item: MenuItem) => {
    setSelectedItem(item);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedItem) return;
    
    try {
      // In a real application, this would be a Supabase delete operation
      // await supabase.from('menu_items').delete().eq('id', selectedItem.id);
      
      setMenuItems((currentItems) => 
        currentItems.filter(item => item.id !== selectedItem.id)
      );
      
      toast({
        title: t('admin.itemDeleted'),
        description: t('admin.itemDeletedMessage'),
      });
    } catch (error) {
      toast({
        title: t('admin.deleteError'),
        description: t('admin.deleteErrorMessage'),
        variant: 'destructive',
      });
    } finally {
      setIsDeleteDialogOpen(false);
      setSelectedItem(null);
    }
  };

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item[`title_${language}` as keyof MenuItem]?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <AdminLayout title={t('admin.menuItemsTitle')}>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-xl font-serif text-brand-blue">
            {t('admin.menuItems')}
          </h2>
          <p className="text-gray-500 text-sm">
            {t('admin.menuItemsDescription')}
          </p>
        </div>
        <Button 
          onClick={handleCreateItem}
          className="bg-brand-gold hover:bg-brand-gold/90 text-white"
        >
          <Plus className="mr-2 h-4 w-4" />
          {t('admin.addMenuItem')}
        </Button>
      </div>
      
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:w-1/2">
          <Label htmlFor="search" className="sr-only">
            {t('admin.search')}
          </Label>
          <Input
            id="search"
            placeholder={t('admin.searchItems')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-brand-gold/30"
          />
        </div>
        <div className="w-full sm:w-1/2">
          <Select
            value={filterCategory}
            onValueChange={setFilterCategory}
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
            ) : filteredItems.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  {t('admin.noItemsFound')}
                </TableCell>
              </TableRow>
            ) : (
              filteredItems.map((item) => (
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
                        <DropdownMenuItem onClick={() => handleEditItem(item)}>
                          <Edit className="mr-2 h-4 w-4" />
                          {t('admin.edit')}
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDeleteClick(item)}
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
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('admin.confirmDelete')}</DialogTitle>
            <DialogDescription>
              {t('admin.deleteConfirmMessage', { 
                item: selectedItem?.[`title_${language}` as keyof MenuItem]?.toString() || '' 
              })}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              {t('admin.cancel')}
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
            >
              {t('admin.delete')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminMenu;
