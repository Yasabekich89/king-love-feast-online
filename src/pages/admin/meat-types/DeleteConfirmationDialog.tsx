
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

type DeleteConfirmationDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
};

const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  isDeleting 
}) => {
  const { t } = useLanguage();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
            onClick={onConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              <>{t('admin.delete')}</>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
