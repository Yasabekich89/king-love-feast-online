
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Tables } from '@/integrations/supabase/types';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/language';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

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

const STORAGE_BUCKET = 'products';

const ProductForm: React.FC<Props> = ({ product, onSuccess, onCancel }) => {
  const { t, meatTypes, language } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const isMobile = useIsMobile();
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
  
  // Available categories
  const categories = [
    "steaks",
    "burgers",
    "specialties",
    "poultry",
    "platters",
    "sides",
  ];
  
  // Spice level options
  const spiceLevels = [0, 1, 2, 3, 4, 5];

  // Handle file upload
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    // Check file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: t('admin.error'),
        description: t('admin.onlyImagesAllowed'),
        variant: 'destructive',
      });
      return;
    }
    
    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: t('admin.error'),
        description: t('admin.fileTooLarge'),
        variant: 'destructive',
      });
      return;
    }
    
    setUploadedImage(file);
    
    // Create local preview
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Upload image to Supabase Storage
  const uploadImageToStorage = async (file: File): Promise<string | null> => {
    if (!user) return null;
    
    setIsUploading(true);
    try {
      // First, check if storage bucket exists, if not create it
      const { data: buckets } = await supabase.storage.listBuckets();
      const bucketExists = buckets?.some(bucket => bucket.name === STORAGE_BUCKET);
      
      if (!bucketExists) {
        const { error: createError } = await supabase.storage.createBucket(
          STORAGE_BUCKET, 
          { public: true }
        );
        if (createError) throw createError;
      }
      
      // Generate a unique filename with timestamp
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `${fileName}`;
      
      // Upload file
      const { error: uploadError } = await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(filePath, file);
        
      if (uploadError) throw uploadError;
      
      // Get public URL
      const { data } = supabase.storage
        .from(STORAGE_BUCKET)
        .getPublicUrl(filePath);
        
      return data.publicUrl;
    } catch (error: any) {
      console.error('Error uploading image:', error);
      toast({
        title: t('admin.error'),
        description: error.message,
        variant: 'destructive',
      });
      return null;
    } finally {
      setIsUploading(false);
    }
  };
  
  // Remove image
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
        const uploadedUrl = await uploadImageToStorage(uploadedImage);
        if (uploadedUrl) {
          imageSrc = uploadedUrl;
        }
      }
      
      if (product) {
        // Update existing product
        const { error } = await supabase
          .from('products')
          .update({
            title_key: values.title_key,
            description_key: values.description_key,
            price_key: values.price_key,
            category: values.category,
            meat_type: values.meat_type,
            spice_level: values.spice_level,
            is_popular: values.is_popular,
            image_src: imageSrc,
          })
          .eq('id', product.id);
          
        if (error) throw error;
      } else {
        // Create new product
        const { error } = await supabase
          .from('products')
          .insert({
            title_key: values.title_key,
            description_key: values.description_key,
            price_key: values.price_key,
            category: values.category,
            meat_type: values.meat_type,
            spice_level: values.spice_level,
            is_popular: values.is_popular,
            image_src: imageSrc,
          });
          
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
      toast({
        title: t('admin.error'),
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Image upload section */}
        <div className="space-y-2">
          <FormLabel>Product Image</FormLabel>
          <div className="grid grid-cols-1 gap-4">
            {previewUrl ? (
              <div className="relative rounded-md overflow-hidden border border-gray-200">
                <img 
                  src={previewUrl} 
                  alt="Product preview" 
                  className="w-full h-60 object-cover"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 rounded-full opacity-80 hover:opacity-100"
                  onClick={handleRemoveImage}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div 
                className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => document.getElementById('image-upload')?.click()}
              >
                <ImageIcon className="mb-2 h-10 w-10" />
                <p className="mb-1">{t('admin.clickToUpload')}</p>
                <p className="text-xs">{t('admin.maxFileSize')}</p>
                
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
            )}
          </div>
          <FormDescription>
            Upload a product image (optional)
          </FormDescription>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="title_key"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title Key</FormLabel>
                <FormControl>
                  <Input placeholder="menu.itemName.title" {...field} />
                </FormControl>
                <FormDescription>
                  The translation key for the product title
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="price_key"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price Key</FormLabel>
                <FormControl>
                  <Input placeholder="menu.itemName.price" {...field} />
                </FormControl>
                <FormDescription>
                  The translation key for the product price
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="description_key"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description Key</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="menu.itemName.description" 
                  {...field} 
                  rows={3}
                />
              </FormControl>
              <FormDescription>
                The translation key for the product description
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent position={isMobile ? "popper" : "item-aligned"}>
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
                <FormLabel>Spice Level (0-5)</FormLabel>
                <Select 
                  onValueChange={(value) => field.onChange(parseInt(value))} 
                  defaultValue={String(field.value)}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select spice level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent position={isMobile ? "popper" : "item-aligned"}>
                    {spiceLevels.map((level) => (
                      <SelectItem key={level} value={String(level)}>
                        {level} {level > 0 ? '🌶️'.repeat(level) : 'Not Spicy'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="meat_type"
          render={() => (
            <FormItem>
              <FormLabel>Meat Types</FormLabel>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {meatTypes.map((type) => (
                  <FormField
                    key={type.key}
                    control={form.control}
                    name="meat_type"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={type.key}
                          className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(type.key)}
                              onCheckedChange={(checked) => {
                                const updatedValue = checked
                                  ? [...field.value, type.key]
                                  : field.value?.filter(
                                      (value) => value !== type.key
                                    );
                                field.onChange(updatedValue);
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal cursor-pointer">
                            {type[language] || type.en}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="is_popular"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Popular Product</FormLabel>
                <FormDescription>
                  Mark this product as popular to highlight it
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        
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
  );
};

export default ProductForm;
