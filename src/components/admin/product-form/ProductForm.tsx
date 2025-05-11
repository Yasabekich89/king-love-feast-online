
import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Tables } from '@/integrations/supabase/types';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/language';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import ImageUpload from './ImageUpload';
import ProductFormFields from './ProductFormFields';
import { uploadImageToStorage, createFilePreview } from './utils';

type Product = Tables<'products'>;
type Props = {
  product?: Product;
  onSuccess: () => void;
  onCancel: () => void;
};

const formSchema = z.object({
  title_key: z.string().min(2, {
    message: "Title key must be at least 2 characters.",
  }),
  description_key: z.string().min(2, {
    message: "Description key must be at least 2 characters.",
  }),
  price_key: z.string().min(2, {
    message: "Price key must be at least 2 characters.",
  }),
  category: z.string().min(1, {
    message: "Category is required.",
  }),
  meat_type: z.array(z.string()).nonempty({
    message: "At least one meat type is required.",
  }),
  spice_level: z.number().min(0).max(5),
  is_popular: z.boolean(),
  image_src: z.string().nullable(),
});

const ProductForm: React.FC<Props> = ({ product, onSuccess, onCancel }) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(product?.image_src || null);
  const [isUploading, setIsUploading] = useState(false);
  
  // Form setup with default values
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title_key: product?.title_key || "",
      description_key: product?.description_key || "",
      price_key: product?.price_key || "",
      category: product?.category || "steaks",
      meat_type: product?.meat_type || [],
      spice_level: product?.spice_level || 0,
      is_popular: product?.is_popular || false,
      image_src: product?.image_src || null,
    },
  });

  // Handle image change
  const handleImageChange = async (file: File | null) => {
    if (!file) return;
    
    setUploadedImage(file);
    const preview = await createFilePreview(file);
    setPreviewUrl(preview);
  };

  // Handle removing image
  const handleRemoveImage = () => {
    setUploadedImage(null);
    setPreviewUrl(null);
    form.setValue('image_src', null);
  };
  
  // Submit handler
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!user) {
      toast({
        title: t('admin.error'),
        description: t('admin.authRequired'),
        variant: 'destructive',
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // First upload image if there's a new one
      let imageSrc = values.image_src;
      
      if (uploadedImage) {
        setIsUploading(true);
        console.log('Uploading image...');
        const uploadedUrl = await uploadImageToStorage(uploadedImage, user.id);
        setIsUploading(false);
        
        if (uploadedUrl) {
          console.log('Image uploaded successfully:', uploadedUrl);
          imageSrc = uploadedUrl;
        } else {
          console.error('Failed to upload image');
          toast({
            title: t('admin.warning'),
            description: t('admin.imageUploadFailed'),
            variant: 'destructive',
          });
        }
      }
      
      const productData = {
        title_key: values.title_key,
        description_key: values.description_key,
        price_key: values.price_key,
        category: values.category,
        meat_type: values.meat_type,
        spice_level: values.spice_level,
        is_popular: values.is_popular,
        image_src: imageSrc,
      };
      
      if (product) {
        // Update existing product
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', product.id);
          
        if (error) throw error;
      } else {
        // Create new product
        const { error } = await supabase
          .from('products')
          .insert(productData);
          
        if (error) throw error;
      }
      
      toast({
        title: product ? t('admin.productUpdated') : t('admin.productCreated'),
        description: product 
          ? t('admin.productUpdatedDesc') 
          : t('admin.productCreatedDesc'),
      });
      
      onSuccess();
    } catch (error: any) {
      console.error('Error saving product:', error);
      toast({
        title: t('admin.error'),
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
      setIsUploading(false);
    }
  };
  
  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <ImageUpload 
            previewUrl={previewUrl}
            onImageChange={handleImageChange}
            onRemoveImage={handleRemoveImage}
          />
          
          <ProductFormFields />
          
          <div className="flex justify-end gap-3">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
              disabled={isSubmitting || isUploading}
            >
              {t('admin.cancel')}
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting || isUploading}
              className="bg-brand-gold hover:bg-brand-gold/90"
            >
              {isSubmitting || isUploading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <>{product ? t('admin.updateProduct') : t('admin.createProduct')}</>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </FormProvider>
  );
};

export default ProductForm;
