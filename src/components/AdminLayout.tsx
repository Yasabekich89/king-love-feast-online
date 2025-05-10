
import React from 'react';
import { Button } from '@/components/ui/button';
import { Crown, Menu, LogOut } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: t('admin.logoutSuccess'),
        description: t('admin.logoutMessage'),
      });
      navigate('/admin/login');
    } catch (error) {
      toast({
        title: t('admin.logoutError'),
        description: t('admin.logoutErrorMessage'),
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0 z-30 transition duration-300 ease-in-out bg-brand-blue text-white w-64 p-4 shadow-lg flex flex-col`}
      >
        <div className="flex items-center justify-center mb-8 pt-4">
          <Crown className="text-brand-gold mr-2" size={30} />
          <h2 className="text-2xl font-serif text-brand-gold">
            {t('admin.title')}
          </h2>
        </div>
        
        <nav className="flex-1">
          <ul className="space-y-2">
            <li>
              <Link
                to="/admin"
                className="block py-2 px-4 rounded hover:bg-brand-blue/70 transition-colors"
              >
                {t('admin.dashboard')}
              </Link>
            </li>
            <li>
              <Link
                to="/admin/menu"
                className="block py-2 px-4 rounded bg-brand-blue/60 hover:bg-brand-blue/70 transition-colors"
              >
                {t('admin.menuItems')}
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="block py-2 px-4 rounded hover:bg-brand-blue/70 transition-colors"
                target="_blank"
              >
                {t('admin.viewSite')}
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className="border-t border-brand-gold/30 pt-4">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-white hover:bg-brand-blue/70"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            {t('admin.logout')}
          </Button>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden mr-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Menu />
            </Button>
            <h1 className="text-xl font-serif text-brand-blue">{title}</h1>
          </div>
        </header>
        
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
      
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default AdminLayout;
