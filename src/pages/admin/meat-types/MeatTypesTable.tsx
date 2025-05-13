
import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Tables } from '@/integrations/supabase/types';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

// Type for meat types
type MeatType = Tables<'meat_types'>;

type MeatTypesTableProps = {
  meatTypes: MeatType[];
  isLoading: boolean;
  onEdit: (meatType: MeatType) => void;
  onDelete: (id: string) => void;
};

const MeatTypesTable: React.FC<MeatTypesTableProps> = ({ 
  meatTypes, 
  isLoading, 
  onEdit, 
  onDelete 
}) => {
  const { t } = useLanguage();

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-blue"></div>
      </div>
    );
  }

  return (
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
                  onClick={() => onEdit(meatType)}
                >
                  <Edit size={16} />
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onDelete(meatType.id)}
                >
                  <Trash2 size={16} />
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default MeatTypesTable;
