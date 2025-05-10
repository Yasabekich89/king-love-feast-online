
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import AdminLayout from '@/components/AdminLayout';
import MenuItemForm, { MenuItemFormValues } from '@/components/MenuItemForm';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

const AdminEditMenuItem: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [menuItem, setMenuItem] = useState<MenuItemFormValues | null>(null);
  
  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        navigate('/admin/login');
      }
    };
    
    const fetchMenuItem = async () => {
      setLoading(true);
      
      // In a real application, this would fetch from Supabase
      // const { data, error } = await supabase.from('menu_items').select('*').eq('id', id).single();
      
      // For now, we'll use mock data
      const mockData = {
        id: 'kings-ribeye',
        category: 'steaks',
        meatType: ['beef'],
        spiceLevel: 1,
        imageSrc: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=1470&auto=format&fit=crop',
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
      };
      
      setMenuItem(mockData);
      setLoading(false);
    };
    
    checkAuth();
    
    if (id) {
      fetchMenuItem();
    }
  }, [id, navigate]);
  
  const handleSubmit = async (values: MenuItemFormValues) => {
    try {
      // In a real application, this would update an item in Supabase
      // await supabase.from('menu_items').update({ ...values }).eq('id', id);
      
      console.log('Updating menu item:', values);
      
      toast({
        title: t('admin.itemUpdated'),
        description: t('admin.itemUpdatedMessage'),
      });
      
      navigate('/admin/menu');
    } catch (error) {
      toast({
        title: t('admin.updateError'),
        description: t('admin.updateErrorMessage'),
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <AdminLayout title={t('admin.editMenuItem')}>
        <div className="flex items-center justify-center h-64">
          <p>{t('admin.loading')}</p>
        </div>
      </AdminLayout>
    );
  }

  if (!menuItem) {
    return (
      <AdminLayout title={t('admin.editMenuItem')}>
        <div className="flex items-center justify-center h-64">
          <p>{t('admin.itemNotFound')}</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title={t('admin.editMenuItem')}>
      <div className="mb-6">
        <h2 className="text-xl font-serif text-brand-blue">
          {t('admin.editMenuItem')}
        </h2>
        <p className="text-gray-500 text-sm">
          {t('admin.editMenuItemDescription')}
        </p>
      </div>
      
      <MenuItemForm
        initialValues={menuItem}
        onSubmit={handleSubmit}
        buttonText={t('admin.updateItem')}
      />
    </AdminLayout>
  );
};

export default AdminEditMenuItem;
