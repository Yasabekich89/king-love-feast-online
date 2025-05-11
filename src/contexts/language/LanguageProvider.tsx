
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { translations } from './translations';
import { Language, LanguageContextType, MeatType } from './types';

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [meatTypes, setMeatTypes] = useState<MeatType[]>([]);
  const [isMeatTypesLoading, setIsMeatTypesLoading] = useState(true);

  // Fetch meat types from Supabase
  const fetchMeatTypes = async () => {
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
  };

  // Load meat types on component mount
  useEffect(() => {
    fetchMeatTypes();
  }, []);

  const t = (key: string): string => {
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
