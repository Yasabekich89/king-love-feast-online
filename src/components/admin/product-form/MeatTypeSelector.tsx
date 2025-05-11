
import React from 'react';
import { useLanguage } from '@/contexts/language';
import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useFormContext } from 'react-hook-form';

const MeatTypeSelector = () => {
  const { meatTypes, language } = useLanguage();
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name="meat_type"
      render={() => (
        <FormItem>
          <FormLabel>Meat Types</FormLabel>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {meatTypes.map((type) => (
              <FormField
                key={type.key}
                control={form.control}
                name="meat_type"
                render={({ field }) => {
                  return (
                    <FormItem
                      key={type.key}
                      className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3"
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(type.key)}
                          onCheckedChange={(checked) => {
                            const updatedValue = checked
                              ? [...field.value, type.key]
                              : field.value?.filter(
                                  (value: string) => value !== type.key
                                );
                            field.onChange(updatedValue);
                          }}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal cursor-pointer">
                        {type[language] || type.en}
                      </FormLabel>
                    </FormItem>
                  );
                }}
              />
            ))}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default MeatTypeSelector;
