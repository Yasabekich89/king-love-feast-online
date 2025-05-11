
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/language';
import { useUpdateAboutContent } from '@/hooks/use-about-content';
import { TeamMember, TeamSectionContent } from '@/types/about-content';
import { Language } from '@/contexts/language/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { PlusIcon, TrashIcon } from 'lucide-react';

interface TeamSectionEditorProps {
  content: TeamSectionContent;
  language: Language;
}

export const TeamSectionEditor: React.FC<TeamSectionEditorProps> = ({ content, language }) => {
  const { t } = useLanguage();
  const updateContent = useUpdateAboutContent();
  
  const [title, setTitle] = useState(content.title || '');
  const [members, setMembers] = useState<TeamMember[]>(content.members || []);
  
  const handleSave = () => {
    updateContent.mutate({
      section: 'team',
      content: { title, members },
      language,
    });
  };
  
  const addMember = () => {
    setMembers([...members, { name: '', role: '', bio: '' }]);
  };
  
  const updateMember = (index: number, field: keyof TeamMember, value: string) => {
    const updatedMembers = [...members];
    updatedMembers[index] = { ...updatedMembers[index], [field]: value };
    setMembers(updatedMembers);
  };
  
  const removeMember = (index: number) => {
    const updatedMembers = [...members];
    updatedMembers.splice(index, 1);
    setMembers(updatedMembers);
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">{t('admin.about.team')}</h2>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="team-title">{t('admin.about.teamTitle')}</Label>
          <Input
            id="team-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1"
          />
        </div>
        
        <Separator className="my-6" />
        
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">{t('admin.about.teamMembers')}</h3>
            <Button onClick={addMember} variant="outline" size="sm">
              <PlusIcon className="mr-1 h-4 w-4" />
              {t('admin.about.addMember')}
            </Button>
          </div>
          
          {members.length === 0 ? (
            <div className="text-center py-6 text-gray-500">
              <p>No team members yet. Add some using the button above.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {members.map((member, index) => (
                <Card key={index} className="border border-gray-200">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-medium">Member #{index + 1}</h4>
                      <Button 
                        onClick={() => removeMember(index)} 
                        variant="ghost" 
                        size="sm"
                        className="text-red-600 hover:text-red-800 hover:bg-red-100"
                      >
                        <TrashIcon className="h-4 w-4 mr-1" />
                        {t('admin.about.removeMember')}
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor={`member-${index}-name`}>{t('admin.about.memberName')}</Label>
                        <Input
                          id={`member-${index}-name`}
                          value={member.name}
                          onChange={(e) => updateMember(index, 'name', e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor={`member-${index}-role`}>{t('admin.about.memberRole')}</Label>
                        <Input
                          id={`member-${index}-role`}
                          value={member.role}
                          onChange={(e) => updateMember(index, 'role', e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor={`member-${index}-bio`}>{t('admin.about.memberBio')}</Label>
                        <Textarea
                          id={`member-${index}-bio`}
                          value={member.bio}
                          onChange={(e) => updateMember(index, 'bio', e.target.value)}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
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
