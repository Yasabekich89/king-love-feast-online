
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/language';
import { useUpdateAboutContent } from '@/hooks/use-about-content';
import { HeroSectionContent } from '@/types/about-content';
import { Language } from '@/contexts/language/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface HeroSectionEditorProps {
  content: HeroSectionContent;
  language: Language;
}

export const HeroSectionEditor: React.FC<HeroSectionEditorProps> = ({ content, language }) => {
  const { t } = useLanguage();
  const updateContent = useUpdateAboutContent();
  
  const [title, setTitle] = useState(content.title || '');
  const [subtitle, setSubtitle] = useState(content.subtitle || '');
  
  const handleSave = () => {
    updateContent.mutate({
      section: 'hero',
      content: { title, subtitle },
      language,
    });
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">{t('admin.about.hero')}</h2>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="hero-title">{t('admin.about.heroTitle')}</Label>
          <Input
            id="hero-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="hero-subtitle">{t('admin.about.heroSubtitle')}</Label>
          <Input
            id="hero-subtitle"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="mt-1"
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
