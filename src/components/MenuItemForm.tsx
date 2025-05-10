
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Upload, Trash2 } from 'lucide-react';

// Define schema for menu item
const menuItemSchema = z.object({
  id: z.string().min(3),
  category: z.string().min(1),
  meatType: z.array(z.string()).min(1),
  spiceLevel: z.number().min(0).max(3),
  imageSrc: z.string().min(1),
  isPopular: z.boolean(),
  
  title_en: z.string().min(1),
  title_am: z.string().optional(),
  title_ru: z.string().optional(),
  
  description_en: z.string().min(1),
  description_am: z.string().optional(),
  description_ru: z.string().optional(),
  
  price_en: z.string().min(1),
  price_am: z.string().optional(),
  price_ru: z.string().optional(),
});

export type MenuItemFormValues = z.infer<typeof menuItemSchema>;

interface MenuItemFormProps {
  initialValues?: Partial<MenuItemFormValues>;
  onSubmit: (values: MenuItemFormValues) => void;
  buttonText: string;
}

const MenuItemForm: React.FC<MenuItemFormProps> = ({ 
  initialValues, 
  onSubmit,
  buttonText,
}) => {
  const { t } = useLanguage();
  const [imagePreview, setImagePreview] = useState<string | null>(initialValues?.imageSrc || null);
  const [fileUploading, setFileUploading] = useState<boolean>(false);
  
  const defaultValues: Partial<MenuItemFormValues> = {
    id: '',
    category: '',
    meatType: ['beef'],
    spiceLevel: 0,
    imageSrc: '',
    isPopular: false,
    title_en: '',
    description_en: '',
    price_en: '',
    ...initialValues,
  };

  const form = useForm<MenuItemFormValues>({
    resolver: zodResolver(menuItemSchema),
    defaultValues,
    mode: 'onChange',
  });

  // Categories for the form
  const categories = [
    { value: 'steaks', label: t('menu.category.steaks') },
    { value: 'burgers', label: t('menu.category.burgers') },
    { value: 'specialties', label: t('menu.category.specialties') },
    { value: 'poultry', label: t('menu.category.poultry') },
    { value: 'platters', label: t('menu.category.platters') },
    { value: 'sides', label: t('menu.category.sides') },
  ];
  
  // Meat types for the form
  const meatTypes = [
    { value: 'beef', label: t('menu.meatType.beef') },
    { value: 'chicken', label: t('menu.meatType.chicken') },
    { value: 'pork', label: t('menu.meatType.pork') },
    { value: 'lamb', label: t('menu.meatType.lamb') },
    { value: 'vegetarian', label: t('menu.meatType.vegetarian') },
  ];

  // Spice levels for the form
  const spiceLevels = [
    { value: 0, label: t('menu.spiceLevel.0') },
    { value: 1, label: t('menu.spiceLevel.1') },
    { value: 2, label: t('menu.spiceLevel.2') },
    { value: 3, label: t('menu.spiceLevel.3') },
  ];

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }
    
    const file = event.target.files[0];
    const fileSizeInMB = file.size / (1024 * 1024);
    
    if (fileSizeInMB > 5) {
      toast({
        title: t('admin.uploadError'),
        description: t('admin.fileSizeError'),
        variant: 'destructive',
      });
      return;
    }
    
    setFileUploading(true);
    
    try {
      // For now, we'll just create a URL for preview
      // In a real app, this would upload to Supabase storage
      const objectUrl = URL.createObjectURL(file);
      setImagePreview(objectUrl);
      form.setValue('imageSrc', objectUrl);
      
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: t('admin.uploadSuccess'),
        description: t('admin.imageUploaded'),
      });
    } catch (error) {
      toast({
        title: t('admin.uploadError'),
        description: t('admin.uploadErrorMessage'),
        variant: 'destructive',
      });
    } finally {
      setFileUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    form.setValue('imageSrc', '');
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left column */}
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <h3 className="text-lg font-medium text-brand-blue mb-4">
                {t('admin.basicInfo')}
              </h3>
              
              <FormField
                control={form.control}
                name="id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('admin.itemId')}</FormLabel>
                    <FormControl>
                      <Input 
                        {...field}
                        className="border-brand-gold/30"
                        placeholder="kings-ribeye"
                      />
                    </FormControl>
                    <FormDescription>
                      {t('admin.itemIdDescription')}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="mt-4">
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
                          <SelectTrigger className="border-brand-gold/30">
                            <SelectValue placeholder={t('admin.selectCategory')} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.value} value={category.value}>
                              {category.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="mt-4">
                <FormField
                  control={form.control}
                  name="spiceLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('admin.spiceLevel')}</FormLabel>
                      <Select 
                        onValueChange={(value) => field.onChange(parseInt(value))} 
                        defaultValue={field.value.toString()}
                      >
                        <FormControl>
                          <SelectTrigger className="border-brand-gold/30">
                            <SelectValue placeholder={t('admin.selectSpiceLevel')} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {spiceLevels.map((level) => (
                            <SelectItem key={level.value} value={level.value.toString()}>
                              {level.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="mt-4">
                <FormField
                  control={form.control}
                  name="isPopular"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
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
                        <FormDescription>
                          {t('admin.popularDescription')}
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            {/* Image Upload */}
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <h3 className="text-lg font-medium text-brand-blue mb-4">
                {t('admin.itemImage')}
              </h3>
              
              <FormField
                control={form.control}
                name="imageSrc"
                render={({ field }) => (
                  <FormItem>
                    {imagePreview ? (
                      <div className="mb-4">
                        <div className="relative w-full h-48 rounded-md overflow-hidden border">
                          <img 
                            src={imagePreview} 
                            alt={t('admin.preview')} 
                            className="w-full h-full object-cover"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2"
                            onClick={handleRemoveImage}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center w-full">
                        <label
                          htmlFor="dropzone-file"
                          className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed rounded-lg cursor-pointer border-brand-gold/30 hover:bg-gray-50"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-10 h-10 mb-3 text-gray-400" />
                            <p className="mb-2 text-sm text-gray-500">
                              <span className="font-semibold">{t('admin.clickToUpload')}</span>
                            </p>
                            <p className="text-xs text-gray-500">
                              {t('admin.imageRequirements')}
                            </p>
                          </div>
                          <input
                            id="dropzone-file"
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileUpload}
                            disabled={fileUploading}
                          />
                        </label>
                      </div>
                    )}
                    <FormControl>
                      <Input
                        type="hidden"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      {t('admin.imageDescription')}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          {/* Right column - Multilingual content */}
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <h3 className="text-lg font-medium text-brand-blue mb-4">
              {t('admin.menuItemDetails')}
            </h3>
            
            <Tabs defaultValue="en" className="w-full">
              <TabsList className="w-full mb-4 bg-gray-100">
                <TabsTrigger value="en" className="flex-1 data-[state=active]:bg-brand-gold data-[state=active]:text-white">
                  {t('language.english')}
                </TabsTrigger>
                <TabsTrigger value="am" className="flex-1 data-[state=active]:bg-brand-gold data-[state=active]:text-white">
                  {t('language.armenian')}
                </TabsTrigger>
                <TabsTrigger value="ru" className="flex-1 data-[state=active]:bg-brand-gold data-[state=active]:text-white">
                  {t('language.russian')}
                </TabsTrigger>
              </TabsList>
              
              {/* English Content */}
              <TabsContent value="en" className="space-y-4">
                <FormField
                  control={form.control}
                  name="title_en"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('admin.itemName')}</FormLabel>
                      <FormControl>
                        <Input 
                          {...field}
                          className="border-brand-gold/30"
                          placeholder="King's Ribeye Steak"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description_en"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('admin.description')}</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field}
                          className="border-brand-gold/30 min-h-[100px]"
                          placeholder="Premium aged ribeye, perfectly marbled and grilled to your liking"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="price_en"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('admin.price')}</FormLabel>
                      <FormControl>
                        <Input 
                          {...field}
                          className="border-brand-gold/30"
                          placeholder="$45"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
              
              {/* Armenian Content */}
              <TabsContent value="am" className="space-y-4">
                <FormField
                  control={form.control}
                  name="title_am"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('admin.itemName')}</FormLabel>
                      <FormControl>
                        <Input 
                          {...field}
                          className="border-brand-gold/30"
                          placeholder="Թագավորական Ռիբայ Սթեյք"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description_am"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('admin.description')}</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field}
                          className="border-brand-gold/30 min-h-[100px]"
                          placeholder="Պրեմիում հնեցված ռիբայ, կատարյալ մարմարված և գրիլված ձեր նախասիրությամբ"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="price_am"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('admin.price')}</FormLabel>
                      <FormControl>
                        <Input 
                          {...field}
                          className="border-brand-gold/30"
                          placeholder="18000֏"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
              
              {/* Russian Content */}
              <TabsContent value="ru" className="space-y-4">
                <FormField
                  control={form.control}
                  name="title_ru"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('admin.itemName')}</FormLabel>
                      <FormControl>
                        <Input 
                          {...field}
                          className="border-brand-gold/30"
                          placeholder="Королевский Рибай Стейк"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description_ru"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('admin.description')}</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field}
                          className="border-brand-gold/30 min-h-[100px]"
                          placeholder="Премиальный выдержанный рибай, идеально мраморный и приготовленный на гриле по вашему вкусу"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="price_ru"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('admin.price')}</FormLabel>
                      <FormControl>
                        <Input 
                          {...field}
                          className="border-brand-gold/30"
                          placeholder="4500₽"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg border flex justify-end">
          <Button
            type="submit"
            className="bg-brand-blue hover:bg-brand-blue/90 text-white"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? t('admin.saving') : buttonText}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default MenuItemForm;
