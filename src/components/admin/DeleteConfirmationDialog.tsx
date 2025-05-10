
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface DeleteConfirmationDialogProps {
  isOpen: boolean;
  itemName: string;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({
  isOpen,
  itemName,
  onClose,
  onConfirm,
}) => {
  const { t } = useLanguage();

  // Handle the Dialog's onOpenChange event
  // This function expects a single boolean parameter from the Dialog component
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('admin.confirmDelete')}</DialogTitle>
          <DialogDescription>
            {t('admin.deleteConfirmMessage', { item: itemName })}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
          >
            {t('admin.cancel')}
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
          >
            {t('admin.delete')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
