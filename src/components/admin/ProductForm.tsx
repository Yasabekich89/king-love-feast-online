import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { Tables } from '@/integrations/supabase/types';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

type Product = Tables<'products'>;

interface ProductFormProps {
  product?: Product;
  onSuccess: () => void;
  onCancel: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ 
  product, 
  onSuccess, 
  onCancel 
}) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMeatTypes, setSelectedMeatTypes] = useState<string[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(product?.image_src || null);

  const form = useForm({
    defaultValues: {
      title_key: product?.title_key || '',
      description_key: product?.description_key || '',
      price_key: product?.price_key || '',
      category: product?.category || '',
      spice_level: product?.spice_level?.toString() || '0',
      is_popular: product?.is_popular || false,
    },
  });

  // Initialize meat types from product if available
  useEffect(() => {
    if (product?.meat_type) {
      setSelectedMeatTypes(Array.isArray(product.meat_type) ? product.meat_type : []);
    }
  }, [product]);

  const handleMeatTypeChange = (type: string) => {
    setSelectedMeatTypes(prev => {
      if (prev.includes(type)) {
        return prev.filter(item => item !== type);
      } else {
        return [...prev, type];
      }
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const onSubmit = async (data: any) => {
    if (selectedMeatTypes.length === 0) {
      toast({
        title: t('admin.error'),
        description: t('admin.selectMeatType'),
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    let imagePath = product?.image_src || null;

    // Upload image if there's a new file
    if (imageFile) {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError, data: uploadData } = await supabase
        .storage
        .from('products')
        .upload(filePath, imageFile);

      if (uploadError) {
        toast({
          title: t('admin.error'),
          description: uploadError.message,
          variant: 'destructive',
        });
        setIsLoading(false);
        return;
      }

      const { data: { publicUrl } } = supabase
        .storage
        .from('products')
        .getPublicUrl(filePath);

      imagePath = publicUrl;
    }

    const productData = {
      title_key: data.title_key,
      description_key: data.description_key,
      price_key: data.price_key,
      category: data.category,
      meat_type: selectedMeatTypes,
      spice_level: parseInt(data.spice_level),
      is_popular: data.is_popular,
      image_src: imagePath,
    };

    try {
      if (product?.id) {
        // Update existing product
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', product.id);

        if (error) throw error;

        toast({
          title: t('admin.success'),
          description: t('admin.productUpdated'),
        });
      } else {
        // Create new product
        const { error } = await supabase
          .from('products')
          .insert(productData);

        if (error) throw error;

        toast({
          title: t('admin.success'),
          description: t('admin.productCreated'),
        });
      }
      
      onSuccess();
    } catch (error: any) {
      toast({
        title: t('admin.error'),
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const categories = [
    'steaks', 
    'burgers', 
    'specialties', 
    'poultry', 
    'platters', 
    'sides'
  ];

  const meatTypes = [
    'beef',
    'chicken',
    'pork',
    'lamb',
    'vegetarian'
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="title_key"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('admin.titleKey')}</FormLabel>
                  <FormControl>
                    <Input placeholder="menu.product.title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description_key"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('admin.descriptionKey')}</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="menu.product.description" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="price_key"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('admin.priceKey')}</FormLabel>
                  <FormControl>
                    <Input placeholder="menu.product.price" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('admin.category')}</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t('admin.selectCategory')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {t(`menu.category.${category}`)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="spice_level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('admin.spiceLevel')}</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t('admin.selectSpiceLevel')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="0">None</SelectItem>
                      <SelectItem value="1">🔥</SelectItem>
                      <SelectItem value="2">🔥🔥</SelectItem>
                      <SelectItem value="3">🔥🔥🔥</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="is_popular"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      {t('admin.markAsPopular')}
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4">
            <div>
              <Label>{t('admin.meatTypes')}</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {meatTypes.map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`meat-${type}`}
                      checked={selectedMeatTypes.includes(type)}
                      onCheckedChange={() => handleMeatTypeChange(type)}
                    />
                    <Label htmlFor={`meat-${type}`}>
                      {t(`menu.meatType.${type}`)}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>{t('admin.productImage')}</Label>
              <div className="border rounded-md p-4">
                {imagePreview ? (
                  <div className="relative">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-full h-40 object-cover rounded-md" 
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="absolute top-2 right-2 h-6 w-6 rounded-full bg-white"
                      onClick={clearImage}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-40 bg-muted rounded-md">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="max-w-sm"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
            disabled={isLoading}
          >
            {t('admin.cancel')}
          </Button>
          <Button 
            type="submit" 
            disabled={isLoading}
            className="bg-brand-gold hover:bg-brand-gold/90"
          >
            {isLoading 
              ? t('admin.saving') 
              : product 
                ? t('admin.updateProduct') 
                : t('admin.createProduct')
            }
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProductForm;
