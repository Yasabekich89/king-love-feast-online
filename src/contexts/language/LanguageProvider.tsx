
import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { translations } from './translations';
import { Language, LanguageContextType, MeatType } from './types';

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [meatTypes, setMeatTypes] = useState<MeatType[]>([]);
  const [isMeatTypesLoading, setIsMeatTypesLoading] = useState(true);

  // Fetch meat types from Supabase
  const fetchMeatTypes = useCallback(async () => {
    try {
      setIsMeatTypesLoading(true);
      const { data, error } = await supabase
        .from('meat_types')
        .select('*')
        .order('key');
        
      if (error) {
        console.error('Error fetching meat types:', error);
        return;
      }
      
      setMeatTypes(data || []);
    } catch (error) {
      console.error('Error fetching meat types:', error);
    } finally {
      setIsMeatTypesLoading(false);
    }
  }, []);

  // Load meat types on component mount
  useEffect(() => {
    fetchMeatTypes();
  }, [fetchMeatTypes]);

  const t = (key: string): string => {
    // Check if this is a meat type translation key
    if (key.startsWith('menu.meatType.')) {
      const meatTypeKey = key.replace('menu.meatType.', '');
      
      // Find the meat type in our database-fetched meat types
      const meatType = meatTypes.find(type => type.key === meatTypeKey);
      
      // If found and has a translation for the current language, use it
      if (meatType && meatType[language]) {
        return meatType[language];
      }
      
      // Fallback to English translation from meat type if available
      if (meatType && meatType.en) {
        return meatType.en;
      }
      
      // If not found in our data, just use the key as a last resort
      return meatTypeKey;
    }
    
    // Otherwise use the standard translations
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage, 
      t, 
      meatTypes, 
      isMeatTypesLoading, 
      refreshMeatTypes: fetchMeatTypes 
    }}>
      {children}
    </LanguageContext.Provider>
  );
};
