
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import AdminLayout from '@/components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const AdminDashboard: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        navigate('/admin/login');
      }
    };
    
    checkAuth();
  }, [navigate]);

  return (
    <AdminLayout title={t('admin.dashboardTitle')}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="border-t-4 border-t-brand-gold transition-all duration-200 hover:shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-brand-blue text-lg">
              {t('admin.menuManagement')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 mb-4">
              {t('admin.menuManagementDescription')}
            </p>
            <Button 
              variant="outline" 
              className="border-brand-gold text-brand-blue hover:bg-brand-blue hover:text-white transition-colors"
              onClick={() => navigate('/admin/menu')}
            >
              {t('admin.manageMenu')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
        
        <Card className="border-t-4 border-t-brand-blue transition-all duration-200 hover:shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-brand-blue text-lg">
              {t('admin.websitePreview')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 mb-4">
              {t('admin.websitePreviewDescription')}
            </p>
            <Button 
              variant="outline"
              className="border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white transition-colors"
              asChild
            >
              <a href="/" target="_blank" rel="noopener noreferrer">
                {t('admin.viewWebsite')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
