
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/language';
import { useUpdateAboutContent } from '@/hooks/use-about-content';
import { ValueItem, ValuesSectionContent } from '@/types/about-content';
import { Language } from '@/contexts/language/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { PlusIcon, TrashIcon } from 'lucide-react';

interface ValuesSectionEditorProps {
  content: ValuesSectionContent;
  language: Language;
}

// Available color options
const COLOR_OPTIONS = [
  { label: 'Purple', value: 'from-purple-500 to-purple-800' },
  { label: 'Blue', value: 'from-blue-500 to-blue-800' },
  { label: 'Green', value: 'from-emerald-500 to-emerald-800' },
  { label: 'Gold', value: 'from-amber-500 to-amber-800' },
  { label: 'Red', value: 'from-red-500 to-red-800' },
  { label: 'Pink', value: 'from-pink-500 to-pink-800' },
];

export const ValuesSectionEditor: React.FC<ValuesSectionEditorProps> = ({ content, language }) => {
  const { t } = useLanguage();
  const updateContent = useUpdateAboutContent();
  
  const [title, setTitle] = useState(content.title || '');
  const [values, setValues] = useState<ValueItem[]>(content.values || []);
  
  const handleSave = () => {
    updateContent.mutate({
      section: 'values',
      content: { title, values },
      language,
    });
  };
  
  const addValue = () => {
    setValues([...values, { 
      title: '', 
      description: '', 
      color: COLOR_OPTIONS[0].value 
    }]);
  };
  
  const updateValue = (index: number, field: keyof ValueItem, value: string) => {
    const updatedValues = [...values];
    updatedValues[index] = { ...updatedValues[index], [field]: value };
    setValues(updatedValues);
  };
  
  const removeValue = (index: number) => {
    const updatedValues = [...values];
    updatedValues.splice(index, 1);
    setValues(updatedValues);
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">{t('admin.about.values')}</h2>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="values-title">{t('admin.about.valuesTitle')}</Label>
          <Input
            id="values-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1"
          />
        </div>
        
        <Separator className="my-6" />
        
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">{t('admin.about.valuesList')}</h3>
            <Button onClick={addValue} variant="outline" size="sm">
              <PlusIcon className="mr-1 h-4 w-4" />
              {t('admin.about.addValue')}
            </Button>
          </div>
          
          {values.length === 0 ? (
            <div className="text-center py-6 text-gray-500">
              <p>No values yet. Add some using the button above.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {values.map((value, index) => (
                <Card key={index} className="border border-gray-200">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-medium">Value #{index + 1}</h4>
                      <Button 
                        onClick={() => removeValue(index)} 
                        variant="ghost" 
                        size="sm"
                        className="text-red-600 hover:text-red-800 hover:bg-red-100"
                      >
                        <TrashIcon className="h-4 w-4 mr-1" />
                        {t('admin.about.removeValue')}
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor={`value-${index}-title`}>{t('admin.about.valueTitle')}</Label>
                        <Input
                          id={`value-${index}-title`}
                          value={value.title}
                          onChange={(e) => updateValue(index, 'title', e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor={`value-${index}-description`}>{t('admin.about.valueDescription')}</Label>
                        <Textarea
                          id={`value-${index}-description`}
                          value={value.description}
                          onChange={(e) => updateValue(index, 'description', e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor={`value-${index}-color`}>{t('admin.about.valueColor')}</Label>
                        <div className="grid grid-cols-3 gap-2 mt-1">
                          {COLOR_OPTIONS.map((option) => (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => updateValue(index, 'color', option.value)}
                              className={`h-10 rounded-md bg-gradient-to-br ${option.value} text-white text-xs flex items-center justify-center ${
                                value.color === option.value ? 'ring-2 ring-offset-2 ring-brand-gold' : ''
                              }`}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
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
