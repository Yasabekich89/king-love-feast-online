
import React from 'react';
import { Plus } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { useMeatTypesAdmin } from './useMeatTypesAdmin';
import MeatTypesTable from './MeatTypesTable';
import MeatTypeForm from './MeatTypeForm';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';

const MeatTypesAdmin = () => {
  const { t } = useLanguage();
  const {
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
  } = useMeatTypesAdmin();

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

      <MeatTypesTable
        meatTypes={meatTypes}
        isLoading={isLoading}
        onEdit={handleEdit}
        onDelete={handleDeleteConfirm}
      />

      {/* Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <MeatTypeForm
          editingMeatType={editingMeatType}
          onSubmit={handleFormSubmit}
        />
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        isOpen={!!showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(null)}
        onConfirm={() => showDeleteConfirm && handleDelete(showDeleteConfirm)}
        isDeleting={isDeleting !== null}
      />
    </div>
  );
};

export default MeatTypesAdmin;
