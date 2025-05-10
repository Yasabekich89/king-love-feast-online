
import React, { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';
import ProductsTable from '@/components/admin/ProductsTable';
import ProductForm from '@/components/admin/ProductForm';
import { Button } from '@/components/ui/button';
import { Plus, Filter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

// Type for products
type Product = Tables<'products'>;

const AdminProducts = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Local state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Fetch products
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      return data as Product[];
    },
  });
  
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{t('admin.manageProducts')}</h1>
        <Button 
          className="bg-brand-gold hover:bg-brand-gold/90" 
          onClick={handleAddNew}
        >
          <Plus className="mr-2 h-4 w-4" />
          {t('admin.addProduct')}
        </Button>
      </div>
      
      <div className="flex items-center space-x-4 bg-white p-4 rounded-md shadow-sm mb-4">
        <Filter className="h-5 w-5 text-gray-400" />
        <div>
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
        />
      )}
      
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[900px]">
          <DialogHeader>
            <DialogTitle>
              {selectedProduct ? t('admin.editProduct') : t('admin.newProduct')}
            </DialogTitle>
          </DialogHeader>
          <ProductForm 
            product={selectedProduct || undefined}
            onSuccess={handleFormSuccess}
            onCancel={() => setIsFormOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProducts;
