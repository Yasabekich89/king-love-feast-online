
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Tables } from '@/integrations/supabase/types';
import { MeatTypeFormValues } from './MeatTypeForm';

// Type for meat types
type MeatType = Tables<'meat_types'>;

export const useMeatTypesAdmin = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  // Local state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingMeatType, setEditingMeatType] = useState<MeatType | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

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
    onSuccess: () => {
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

  // Open form for adding a new meat type
  const handleAddNew = () => {
    setEditingMeatType(null);
    setIsFormOpen(true);
  };

  // Open form for editing an existing meat type
  const handleEdit = (meatType: MeatType) => {
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

  const handleFormSubmit = (values: MeatTypeFormValues) => {
    saveMeatType(values);
  };

  return {
    meatTypes,
    isLoading,
    isFormOpen,
    setIsFormOpen,
    editingMeatType,
    isDeleting,
    showDeleteConfirm,
    setShowDeleteConfirm,
    handleAddNew,
    handleEdit,
    handleDeleteConfirm,
    handleDelete,
    handleFormSubmit,
  };
};
