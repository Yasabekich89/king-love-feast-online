
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Language } from '@/contexts/language/types';
import { AboutContent, SectionKey } from '@/types/about-content';
import { useToast } from './use-toast';

const QUERY_KEY = 'about-content';

// Helper function to parse content based on language
const parseContent = (data: any, language: Language): AboutContent => {
  const content: AboutContent = {
    hero: { title: '', subtitle: '' },
    story: { title: '', content: '' },
    team: { title: '', members: [] },
    values: { title: '', values: [] },
    experience: { title: '', content: '' },
  };

  // Process each section's content
  data?.forEach((item: any) => {
    const section = item.section as SectionKey;
    const langContent = item[`content_${language}`] || {};
    
    if (section && langContent) {
      content[section] = langContent;
    }
  });

  return content;
};

export const useAboutContent = (language: Language) => {
  return useQuery({
    queryKey: [QUERY_KEY, language],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('about_content')
        .select('*');
      
      if (error) throw error;
      
      return parseContent(data, language);
    }
  });
};

export const useUpdateAboutContent = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async ({ 
      section, 
      content, 
      language 
    }: { 
      section: SectionKey; 
      content: any; 
      language: Language 
    }) => {
      const contentKey = `content_${language}`;
      
      const { error } = await supabase
        .from('about_content')
        .update({ [contentKey]: content })
        .eq('section', section);
      
      if (error) throw error;
      
      return { success: true };
    },
    onSuccess: (_, variables) => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, variables.language] });
      
      toast({
        title: 'Success',
        description: 'About content updated successfully',
      });
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: `Failed to update content: ${error.message}`,
      });
    }
  });
};
