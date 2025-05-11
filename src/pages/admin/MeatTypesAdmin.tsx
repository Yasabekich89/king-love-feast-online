
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Tables } from '@/integrations/supabase/types';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Edit, Save } from 'lucide-react';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

// Type for meat types
type MeatType = Tables<'meat_types'>;

// Form validation schema
const meatTypeSchema = z.object({
  key: z.string().min(1, { message: "Key is required" }),
  en: z.string().min(1, { message: "English translation is required" }),
  am: z.string().min(1, { message: "Armenian translation is required" }),
  ru: z.string().min(1, { message: "Russian translation is required" }),
});

type MeatTypeFormValues = z.infer<typeof meatTypeSchema>;

const MeatTypesAdmin = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  // Local state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingMeatType, setEditingMeatType] = useState<MeatType | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  // Form
  const form = useForm<MeatTypeFormValues>({
    resolver: zodResolver(meatTypeSchema),
    defaultValues: {
      key: '',
      en: '',
      am: '',
      ru: '',
    },
  });

  // Fetch meat types
  const { data: meatTypes = [], isLoading } = useQuery({
    queryKey: ['meat-types'],
    queryFn: async () => {
      if (!user) {
        throw new Error('Authentication required');
      }

      const { data, error } = await supabase
        .from('meat_types')
        .select('*')
        .order('key');

      if (error) throw error;
      return data as MeatType[];
    },
  });

  // Create or update meat type
  const { mutate: saveMeatType } = useMutation({
    mutationFn: async (values: MeatTypeFormValues) => {
      if (!user) {
        throw new Error('Authentication required');
      }

      if (editingMeatType) {
        // Update existing meat type
        const { error } = await supabase
          .from('meat_types')
          .update({
            key: values.key,
            en: values.en,
            am: values.am,
            ru: values.ru,
          })
          .eq('id', editingMeatType.id);

        if (error) throw error;
        return { ...values, id: editingMeatType.id };
      } else {
        // Create new meat type
        const { data, error } = await supabase
          .from('meat_types')
          .insert({
            key: values.key,
            en: values.en,
            am: values.am,
            ru: values.ru,
          })
          .select()
          .single();

        if (error) throw error;
        return data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meat-types'] });
      setIsFormOpen(false);
      setEditingMeatType(null);
      toast({
        title: editingMeatType 
          ? t('admin.meatType.updateSuccess') 
          : t('admin.meatType.createSuccess'),
        description: editingMeatType
          ? t('admin.meatType.updateSuccessDescription')
          : t('admin.meatType.createSuccessDescription'),
      });
    },
    onError: (error) => {
      toast({
        title: t('admin.meatType.error'),
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Delete meat type
  const { mutate: deleteMeatType } = useMutation({
    mutationFn: async (id: string) => {
      if (!user) {
        throw new Error('Authentication required');
      }

      const { error } = await supabase
        .from('meat_types')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return id;
    },
    onSuccess: (id) => {
      queryClient.invalidateQueries({ queryKey: ['meat-types'] });
      setShowDeleteConfirm(null);
      toast({
        title: t('admin.meatType.deleteSuccess'),
        description: t('admin.meatType.deleteSuccessDescription'),
      });
    },
    onError: (error) => {
      toast({
        title: t('admin.meatType.error'),
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Handle form submission
  const onSubmit = (values: MeatTypeFormValues) => {
    saveMeatType(values);
  };

  // Open form for adding a new meat type
  const handleAddNew = () => {
    form.reset({
      key: '',
      en: '',
      am: '',
      ru: '',
    });
    setEditingMeatType(null);
    setIsFormOpen(true);
  };

  // Open form for editing an existing meat type
  const handleEdit = (meatType: MeatType) => {
    form.reset({
      key: meatType.key,
      en: meatType.en,
      am: meatType.am,
      ru: meatType.ru,
    });
    setEditingMeatType(meatType);
    setIsFormOpen(true);
  };

  // Handle deletion confirmation
  const handleDeleteConfirm = (id: string) => {
    setShowDeleteConfirm(id);
  };

  // Execute deletion
  const handleDelete = (id: string) => {
    setIsDeleting(id);
    deleteMeatType(id);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{t('admin.meatType.title')}</h1>
        <Button
          className="bg-brand-gold hover:bg-brand-gold/90"
          onClick={handleAddNew}
        >
          <Plus className="mr-2 h-4 w-4" />
          {t('admin.meatType.addNew')}
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-blue"></div>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('admin.meatType.key')}</TableHead>
              <TableHead>{t('admin.meatType.english')}</TableHead>
              <TableHead>{t('admin.meatType.armenian')}</TableHead>
              <TableHead>{t('admin.meatType.russian')}</TableHead>
              <TableHead className="w-24 text-right">{t('admin.actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {meatTypes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6">
                  {t('admin.meatType.noMeatTypes')}
                </TableCell>
              </TableRow>
            ) : (
              meatTypes.map((meatType) => (
                <TableRow key={meatType.id}>
                  <TableCell className="font-medium">{meatType.key}</TableCell>
                  <TableCell>{meatType.en}</TableCell>
                  <TableCell>{meatType.am}</TableCell>
                  <TableCell>{meatType.ru}</TableCell>
                  <TableCell className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(meatType)}
                    >
                      <Edit size={16} />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteConfirm(meatType.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )}

      {/* Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
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
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!showDeleteConfirm} onOpenChange={() => setShowDeleteConfirm(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('admin.meatType.confirmDelete')}</DialogTitle>
          </DialogHeader>
          <p>
            {t('admin.meatType.confirmDeleteMessage')}
          </p>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">
                {t('admin.cancel')}
              </Button>
            </DialogClose>
            <Button 
              variant="destructive" 
              onClick={() => showDeleteConfirm && handleDelete(showDeleteConfirm)}
              disabled={isDeleting !== null}
            >
              {isDeleting === showDeleteConfirm ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <>{t('admin.delete')}</>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MeatTypesAdmin;
