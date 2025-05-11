
import { supabase } from '@/integrations/supabase/client';

const STORAGE_BUCKET = 'products';

/**
 * Uploads an image to Supabase storage
 */
export const uploadImageToStorage = async (file: File, userId: string | undefined): Promise<string | null> => {
  if (!userId) return null;
  
  try {
    // First, check if storage bucket exists, if not create it
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some(bucket => bucket.name === STORAGE_BUCKET);
    
    if (!bucketExists) {
      const { error: createError } = await supabase.storage.createBucket(
        STORAGE_BUCKET, 
        { public: true }
      );
      if (createError) throw createError;
    }
    
    // Generate a unique filename with timestamp
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    const filePath = `${fileName}`;
    
    // Upload file
    const { error: uploadError } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(filePath, file);
      
    if (uploadError) throw uploadError;
    
    // Get public URL
    const { data } = supabase.storage
      .from(STORAGE_BUCKET)
      .getPublicUrl(filePath);
      
    return data.publicUrl;
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
