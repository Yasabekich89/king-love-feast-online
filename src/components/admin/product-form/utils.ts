
import { supabase } from '@/integrations/supabase/client';

const STORAGE_BUCKET = 'products';
const MAX_IMAGE_SIZE = 1600; // Maximum size for uploaded images

/**
 * Resize image before upload to reduce file size
 */
export const resizeImage = async (file: File, maxWidth = MAX_IMAGE_SIZE): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      // Get the original dimensions
      let width = img.width;
      let height = img.height;
      
      // Only resize if the image is larger than maxWidth
      if (width > maxWidth || height > maxWidth) {
        if (width > height) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        } else {
          width = Math.round((width * maxWidth) / height);
          height = maxWidth;
        }
      }
      
      // Create canvas for the resizing
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      
      // Draw resized image
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }
      
      ctx.drawImage(img, 0, 0, width, height);
      
      // Convert to blob with reduced quality
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('Could not create blob'));
            return;
          }
          resolve(blob);
        },
        file.type,
        0.85 // 85% quality, which usually gives good results with smaller file size
      );
    };
    
    img.onerror = () => reject(new Error('Failed to load image'));
    
    // Load the image
    img.src = URL.createObjectURL(file);
  });
};

/**
 * Uploads an image to Supabase storage
 */
export const uploadImageToStorage = async (file: File, userId: string | undefined): Promise<string | null> => {
  if (!userId) return null;
  
  try {
    // Generate a unique filename with timestamp
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    const filePath = `${fileName}`;
    
    // Resize image before upload
    const resizedImage = await resizeImage(file);
    
    // Upload resized file
    const { error: uploadError, data } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(filePath, resizedImage);
      
    if (uploadError) throw uploadError;
    
    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from(STORAGE_BUCKET)
      .getPublicUrl(filePath);
      
    return publicUrlData.publicUrl;
  } catch (error: any) {
    console.error('Error uploading image:', error);
    return null;
  }
};

/**
 * Creates a local preview URL for an image file
 */
export const createFilePreview = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.readAsDataURL(file);
  });
};
