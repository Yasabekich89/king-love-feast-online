
import React, { useEffect } from 'react';
import { useLanguage } from '@/contexts/language';
import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useFormContext } from 'react-hook-form';

const MeatTypeSelector = () => {
  const { meatTypes, language, refreshMeatTypes, isMeatTypesLoading } = useLanguage();
  const form = useFormContext();

  // Refresh meat types when component mounts to ensure we have the latest data
  useEffect(() => {
    refreshMeatTypes();
  }, [refreshMeatTypes]);

  if (isMeatTypesLoading) {
    return (
      <div className="flex items-center justify-center py-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-brand-gold"></div>
      </div>
    );
  }

  if (meatTypes.length === 0) {
    return (
      <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-md">
        <p className="text-yellow-700">No meat types available. Please add meat types in the admin panel first.</p>
      </div>
    );
  }

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
                        {type[language] || type.en || type.key}
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
