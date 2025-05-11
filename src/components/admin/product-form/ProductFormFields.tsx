
import React from 'react';
import { useLanguage } from '@/contexts/language';
import { useIsMobile } from '@/hooks/use-mobile';
import { useFormContext } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import MeatTypeSelector from './MeatTypeSelector';

const ProductFormFields = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const form = useFormContext();

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

  return (
    <>
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
      
      <MeatTypeSelector />
      
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
    </>
  );
};

export default ProductFormFields;
