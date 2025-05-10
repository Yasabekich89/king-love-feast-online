
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Crown } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const AdminLogin: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });
      
      if (error) {
        toast({
          title: t('admin.loginFailed'),
          description: error.message,
          variant: 'destructive',
        });
        return;
      }
      
      toast({
        title: t('admin.loginSuccess'),
        description: t('admin.welcomeBack'),
      });
      
      navigate('/admin');
    } catch (error) {
      toast({
        title: t('admin.loginFailed'),
        description: t('admin.loginErrorMessage'),
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-6">
          <div className="flex justify-center">
            <Crown className="text-brand-gold h-12 w-12" />
          </div>
          <h1 className="text-2xl font-serif text-brand-blue mt-4">
            {t('admin.loginTitle')}
          </h1>
          <p className="text-gray-500 mt-1">
            {t('admin.loginSubtitle')}
          </p>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('admin.email')}</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      type="email" 
                      placeholder="admin@example.com" 
                      className="border-brand-gold/30 focus-visible:ring-brand-gold"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('admin.password')}</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      type="password" 
                      className="border-brand-gold/30 focus-visible:ring-brand-gold"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting 
                ? t('admin.loggingIn') 
                : t('admin.login')
              }
            </Button>
          </form>
        </Form>
        
        <div className="mt-6 pt-4 border-t border-gray-200 text-center text-sm">
          <a 
            href="/" 
            className="text-brand-blue hover:text-brand-gold transition-colors"
          >
            {t('admin.backToWebsite')}
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
