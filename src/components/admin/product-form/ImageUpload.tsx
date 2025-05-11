
import React, { useState } from 'react';
import { X, ImageIcon } from 'lucide-react';
import { useLanguage } from '@/contexts/language';
import { Button } from '@/components/ui/button';
import { FormDescription, FormLabel } from '@/components/ui/form';

interface ImageUploadProps {
  previewUrl: string | null;
  onImageChange: (file: File | null) => void;
  onRemoveImage: () => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ 
  previewUrl, 
  onImageChange, 
  onRemoveImage 
}) => {
  const { t } = useLanguage();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    // Check file type
    if (!file.type.startsWith('image/')) {
      console.error('Only images are allowed');
      return;
    }
    
    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      console.error('File is too large (max 2MB)');
      return;
    }
    
    onImageChange(file);
  };

  return (
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
              onClick={onRemoveImage}
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
  );
};

export default ImageUpload;
