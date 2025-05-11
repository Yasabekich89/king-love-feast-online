
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/language';
import { useUpdateAboutContent } from '@/hooks/use-about-content';
import { StorySectionContent } from '@/types/about-content';
import { Language } from '@/contexts/language/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface StorySectionEditorProps {
  content: StorySectionContent;
  language: Language;
}

export const StorySectionEditor: React.FC<StorySectionEditorProps> = ({ content, language }) => {
  const { t } = useLanguage();
  const updateContent = useUpdateAboutContent();
  
  const [title, setTitle] = useState(content.title || '');
  const [storyContent, setStoryContent] = useState(content.content || '');
  
  const handleSave = () => {
    updateContent.mutate({
      section: 'story',
      content: { title, content: storyContent },
      language,
    });
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">{t('admin.about.story')}</h2>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="story-title">{t('admin.about.storyTitle')}</Label>
          <Input
            id="story-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="story-content">{t('admin.about.storyContent')}</Label>
          <Textarea
            id="story-content"
            value={storyContent}
            onChange={(e) => setStoryContent(e.target.value)}
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
