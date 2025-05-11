
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Tables } from '@/integrations/supabase/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Edit, Trash2 } from 'lucide-react';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

type Product = Tables<'products'>;

interface ProductsTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  isDeleting: boolean;
  isMobile: boolean;
}

const ProductsTable: React.FC<ProductsTableProps> = ({
  products,
  onEdit,
  onDelete,
  isDeleting,
  isMobile,
}) => {
  const { t } = useLanguage();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (deleteId) {
      onDelete(deleteId);
    }
  };

  // Generate spice indicators
  const renderSpiceLevel = (level: number) => {
    const levels = [];
    for (let i = 0; i < level; i++) {
      levels.push(
        <span key={i} className="text-red-600">🔥</span>
      );
    }
    return levels;
  };

  // Mobile card view
  if (isMobile) {
    return (
      <>
        <div className="grid grid-cols-1 gap-4">
          {products.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {t('admin.noProducts')}
            </div>
          ) : (
            products.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <CardHeader className="p-4 pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg font-medium">
                      {t(product.title_key)}
                    </CardTitle>
                    {product.is_popular && (
                      <Badge variant="destructive" className="bg-brand-gold border-none">
                        {t('menu.popular')}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="grid grid-cols-1 gap-2">
                    {product.image_src && (
                      <div className="w-full h-40 overflow-hidden rounded">
                        <img 
                          src={product.image_src} 
                          alt={t(product.title_key)} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <span className="font-medium">{t('admin.category')}: </span>
                      {t(`menu.category.${product.category}`)}
                    </div>
                    <div>
                      <span className="font-medium">{t('admin.meatType')}: </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {product.meat_type?.map((type, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {t(`menu.meatType.${type}`)}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    {product.spice_level > 0 && (
                      <div>
                        <span className="font-medium">{t('admin.spiceLevel')}: </span>
                        <div className="flex">{renderSpiceLevel(product.spice_level)}</div>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-end gap-2 border-t">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(product)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    {t('admin.edit')}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteClick(product.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    {t('admin.delete')}
                  </Button>
                </CardFooter>
              </Card>
            ))
          )}
        </div>

        <DeleteConfirmationDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          onConfirm={confirmDelete}
          title={t('admin.deleteProductTitle')}
          description={t('admin.deleteProductDescription')}
          isDeleting={isDeleting}
        />
      </>
    );
  }

  // Desktop table view
  return (
    <>
      <div className="rounded-md border overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('admin.name')}</TableHead>
                <TableHead>{t('admin.category')}</TableHead>
                <TableHead>{t('admin.meatType')}</TableHead>
                <TableHead>{t('admin.spiceLevel')}</TableHead>
                <TableHead>{t('admin.popular')}</TableHead>
                <TableHead className="w-24">{t('admin.actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    {t('admin.noProducts')}
                  </TableCell>
                </TableRow>
              ) : (
                products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        {product.image_src && (
                          <img 
                            src={product.image_src} 
                            alt={t(product.title_key)} 
                            className="h-10 w-10 rounded object-cover"
                          />
                        )}
                        {t(product.title_key)}
                      </div>
                    </TableCell>
                    <TableCell>
                      {t(`menu.category.${product.category}`)}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {product.meat_type?.map((type, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {t(`menu.meatType.${type}`)}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex">
                        {renderSpiceLevel(product.spice_level)}
                      </div>
                    </TableCell>
                    <TableCell>
                      {product.is_popular && (
                        <Badge variant="destructive" className="bg-brand-gold border-none">
                          {t('menu.popular')}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onEdit(product)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteClick(product.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <DeleteConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={confirmDelete}
        title={t('admin.deleteProductTitle')}
        description={t('admin.deleteProductDescription')}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default ProductsTable;
