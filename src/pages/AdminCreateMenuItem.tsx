
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import AdminLayout from '@/components/AdminLayout';
import MenuItemForm, { MenuItemFormValues } from '@/components/MenuItemForm';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

const AdminCreateMenuItem: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        navigate('/admin/login');
      }
    };
    
    checkAuth();
  }, [navigate]);
  
  const handleSubmit = async (values: MenuItemFormValues) => {
    try {
      // In a real application, this would create a new item in Supabase
      // await supabase.from('menu_items').insert({ ...values });
      
      console.log('Creating menu item:', values);
      
      toast({
        title: t('admin.itemCreated'),
        description: t('admin.itemCreatedMessage'),
      });
      
      navigate('/admin/menu');
    } catch (error) {
      toast({
        title: t('admin.createError'),
        description: t('admin.createErrorMessage'),
        variant: 'destructive',
      });
    }
  };

  return (
    <AdminLayout title={t('admin.createMenuItem')}>
      <div className="mb-6">
        <h2 className="text-xl font-serif text-brand-blue">
          {t('admin.createMenuItem')}
        </h2>
        <p className="text-gray-500 text-sm">
          {t('admin.createMenuItemDescription')}
        </p>
      </div>
      
      <MenuItemForm
        onSubmit={handleSubmit}
        buttonText={t('admin.createItem')}
      />
    </AdminLayout>
  );
};

export default AdminCreateMenuItem;
