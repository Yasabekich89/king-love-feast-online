
import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';
import { ProductsTable, ProductForm } from '@/components/admin';
import { Button } from '@/components/ui/button';
import { Plus, Filter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';

// Type for products
type Product = Tables<'products'>;

const AdminProducts = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const isMobile = useIsMobile();
  
  // Local state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Fetch products with auth
  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      // Make sure we have authentication before fetching
      if (!user) {
        throw new Error('Authentication required');
      }
      
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      return data as Product[];
    },
  });
  
  // If there's an error loading the products
  if (error) {
    console.error('Error loading products:', error);
  }
  
  // Filter products by category
  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(product => product.category === selectedCategory);
  
  // Unique categories for filter dropdown
  const categories = Array.from(new Set(products.map(product => product.category)));
  
  // Handle edit product
  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsFormOpen(true);
  };
  
  // Handle add new product
  const handleAddNew = () => {
    setSelectedProduct(null);
    setIsFormOpen(true);
  };
  
  // Handle form success
  const handleFormSuccess = () => {
    setIsFormOpen(false);
    setSelectedProduct(null);
    queryClient.invalidateQueries({ queryKey: ['products'] });
  };
  
  // Handle delete product
  const handleDelete = async (id: string) => {
    if (!user) {
      toast({
        title: t('admin.error'),
        description: t('admin.authRequired'),
        variant: 'destructive',
      });
      return;
    }
    
    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      toast({
        title: t('admin.success'),
        description: t('admin.productDeleted'),
      });
      
      queryClient.invalidateQueries({ queryKey: ['products'] });
    } catch (error: any) {
      toast({
        title: t('admin.error'),
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsDeleting(false);
    }
  };

  // Form component to be used in both Dialog and Drawer
  const FormComponent = (
    <ProductForm 
      product={selectedProduct || undefined}
      onSuccess={handleFormSuccess}
      onCancel={() => setIsFormOpen(false)}
    />
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
        <h1 className="text-2xl font-bold">{t('admin.manageProducts')}</h1>
        <Button 
          className="bg-brand-gold hover:bg-brand-gold/90 w-full sm:w-auto" 
          onClick={handleAddNew}
        >
          <Plus className="mr-2 h-4 w-4" />
          {t('admin.addProduct')}
        </Button>
      </div>
      
      {error ? (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md">
          <h3 className="text-red-800 font-medium">Error loading products</h3>
          <p className="text-red-600">{error.toString()}</p>
        </div>
      ) : (
        <>
          <div className="flex items-center space-x-4 bg-white p-4 rounded-md shadow-sm mb-4 overflow-x-auto">
            <Filter className="h-5 w-5 text-gray-400 shrink-0" />
            <div className="min-w-[200px] w-full">
              <select 
                className="block w-full py-2 pl-3 pr-10 text-base border-gray-300 rounded-md focus:outline-none focus:ring-brand-blue focus:border-brand-blue sm:text-sm"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">{t('menu.all')}</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {t(`menu.category.${category}`)}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="w-full overflow-x-auto pb-4">
            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-blue"></div>
              </div>
            ) : (
              <ProductsTable 
                products={filteredProducts}
                onEdit={handleEdit}
                onDelete={handleDelete}
                isDeleting={isDeleting}
                isMobile={isMobile}
              />
            )}
          </div>
        </>
      )}
      
      {isMobile ? (
        <Drawer open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DrawerContent className="h-[90vh] max-h-[90vh]">
            <DrawerHeader>
              <DrawerTitle>
                {selectedProduct ? t('admin.editProduct') : t('admin.newProduct')}
              </DrawerTitle>
            </DrawerHeader>
            <div className="px-4 pb-4 overflow-y-auto">
              {FormComponent}
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {selectedProduct ? t('admin.editProduct') : t('admin.newProduct')}
              </DialogTitle>
            </DialogHeader>
            {FormComponent}
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default AdminProducts;
