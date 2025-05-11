
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/language';
import { useUpdateAboutContent } from '@/hooks/use-about-content';
import { ExperienceSectionContent } from '@/types/about-content';
import { Language } from '@/contexts/language/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface ExperienceSectionEditorProps {
  content: ExperienceSectionContent;
  language: Language;
}

export const ExperienceSectionEditor: React.FC<ExperienceSectionEditorProps> = ({ content, language }) => {
  const { t } = useLanguage();
  const updateContent = useUpdateAboutContent();
  
  const [title, setTitle] = useState(content.title || '');
  const [experienceContent, setExperienceContent] = useState(content.content || '');
  
  const handleSave = () => {
    updateContent.mutate({
      section: 'experience',
      content: { title, content: experienceContent },
      language,
    });
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">{t('admin.about.experience')}</h2>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="experience-title">{t('admin.about.experienceTitle')}</Label>
          <Input
            id="experience-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="experience-content">{t('admin.about.experienceContent')}</Label>
          <Textarea
            id="experience-content"
            value={experienceContent}
            onChange={(e) => setExperienceContent(e.target.value)}
            className="mt-1 min-h-[200px]"
          />
        </div>
      </div>
      
      <Button 
        onClick={handleSave} 
        disabled={updateContent.isPending}
        className="mt-6"
      >
        {updateContent.isPending ? (
          <span className="flex items-center">
            <span className="animate-spin h-4 w-4 mr-2 border-2 border-b-transparent rounded-full"></span>
            {t('admin.about.save')}
          </span>
        ) : t('admin.about.save')}
      </Button>
    </div>
  );
};
