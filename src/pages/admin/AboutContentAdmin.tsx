import React, { useState } from 'react';
import { useLanguage } from '@/contexts/language';
import { useAboutContent, useUpdateAboutContent } from '@/hooks/use-about-content';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Language } from '@/contexts/language/types';
import { Flags } from '@/components/Flags';

import { HeroSectionEditor } from '@/components/admin/about/HeroSectionEditor';
import { StorySectionEditor } from '@/components/admin/about/StorySectionEditor';
import { TeamSectionEditor } from '@/components/admin/about/TeamSectionEditor';
import { ValuesSectionEditor } from '@/components/admin/about/ValuesSectionEditor';
import { ExperienceSectionEditor } from '@/components/admin/about/ExperienceSectionEditor';

const AboutContentAdmin = () => {
  const { t, language, setLanguage } = useLanguage();
  const [activeSection, setActiveSection] = useState<string>('hero');
  
  // Get about content data
  const { data: content, isLoading, error } = useAboutContent(language);
  const updateContent = useUpdateAboutContent();

  if (isLoading) {
    return (
      <div className="p-6 flex justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-brand-gold border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className="p-6">
        <p className="text-red-500">Error loading content: {error?.message}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-serif text-brand-blue">{t('admin.about.title')}</h1>
        
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button 
            variant="outline" 
            size="sm" 
            className={language === 'en' ? 'border-brand-gold' : ''}
            onClick={() => setLanguage('en')}
          >
            <Flags.en className="mr-2 h-4 w-4" />
            EN
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className={language === 'am' ? 'border-brand-gold' : ''}
            onClick={() => setLanguage('am')}
          >
            <Flags.am className="mr-2 h-4 w-4" />
            AM
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className={language === 'ru' ? 'border-brand-gold' : ''}
            onClick={() => setLanguage('ru')}
          >
            <Flags.ru className="mr-2 h-4 w-4" />
            RU
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Sidebar with section navigation */}
        <div className="md:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>{t('admin.about.sections')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                <Button 
                  variant={activeSection === 'hero' ? 'default' : 'outline'}
                  className="justify-start"
                  onClick={() => setActiveSection('hero')}
                >
                  {t('admin.about.hero')}
                </Button>
                <Button 
                  variant={activeSection === 'story' ? 'default' : 'outline'}
                  className="justify-start"
                  onClick={() => setActiveSection('story')}
                >
                  {t('admin.about.story')}
                </Button>
                <Button 
                  variant={activeSection === 'team' ? 'default' : 'outline'}
                  className="justify-start"
                  onClick={() => setActiveSection('team')}
                >
                  {t('admin.about.team')}
                </Button>
                <Button 
                  variant={activeSection === 'values' ? 'default' : 'outline'}
                  className="justify-start"
                  onClick={() => setActiveSection('values')}
                >
                  {t('admin.about.values')}
                </Button>
                <Button 
                  variant={activeSection === 'experience' ? 'default' : 'outline'}
                  className="justify-start"
                  onClick={() => setActiveSection('experience')}
                >
                  {t('admin.about.experience')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Content editing area */}
        <div className="md:col-span-9">
          <Card>
            <CardContent className="pt-6">
              {activeSection === 'hero' && (
                <HeroSectionEditor 
                  content={content.hero} 
                  language={language}
                />
              )}
              
              {activeSection === 'story' && (
                <StorySectionEditor 
                  content={content.story} 
                  language={language}
                />
              )}
              
              {activeSection === 'team' && (
                <TeamSectionEditor 
                  content={content.team} 
                  language={language}
                />
              )}
              
              {activeSection === 'values' && (
                <ValuesSectionEditor 
                  content={content.values} 
                  language={language}
                />
              )}
              
              {activeSection === 'experience' && (
                <ExperienceSectionEditor 
                  content={content.experience} 
                  language={language}
                />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AboutContentAdmin;
