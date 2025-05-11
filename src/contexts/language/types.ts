
import { Tables } from '@/integrations/supabase/types';

export type Language = 'en' | 'am' | 'ru';
export type MeatType = Tables<'meat_types'>;

export interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
  meatTypes: MeatType[];
  isMeatTypesLoading: boolean;
  refreshMeatTypes: () => Promise<void>;
}
