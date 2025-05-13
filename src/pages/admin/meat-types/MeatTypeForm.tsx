
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Save } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Tables } from '@/integrations/supabase/types';
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
import { 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

// Type for meat types
type MeatType = Tables<'meat_types'>;

// Form validation schema
const meatTypeSchema = z.object({
  key: z.string().min(1, { message: "Key is required" }),
  en: z.string().min(1, { message: "English translation is required" }),
  am: z.string().min(1, { message: "Armenian translation is required" }),
  ru: z.string().min(1, { message: "Russian translation is required" }),
});

export type MeatTypeFormValues = z.infer<typeof meatTypeSchema>;

type MeatTypeFormProps = {
  editingMeatType: MeatType | null;
  onSubmit: (values: MeatTypeFormValues) => void;
};

const MeatTypeForm: React.FC<MeatTypeFormProps> = ({ editingMeatType, onSubmit }) => {
  const { t } = useLanguage();
  
  // Form
  const form = useForm<MeatTypeFormValues>({
    resolver: zodResolver(meatTypeSchema),
    defaultValues: {
      key: editingMeatType?.key || '',
      en: editingMeatType?.en || '',
      am: editingMeatType?.am || '',
      ru: editingMeatType?.ru || '',
    },
  });

  return (
    <DialogContent className="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>
          {editingMeatType ? t('admin.meatType.editMeatType') : t('admin.meatType.newMeatType')}
        </DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="key"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('admin.meatType.key')}</FormLabel>
                <FormControl>
                  <Input {...field} disabled={!!editingMeatType} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="en"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('admin.meatType.english')}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="am"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('admin.meatType.armenian')}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ru"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('admin.meatType.russian')}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter>
            <Button type="submit" className="bg-brand-gold hover:bg-brand-gold/90">
              <Save className="mr-2 h-4 w-4" />
              {t('admin.save')}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};

export default MeatTypeForm;
