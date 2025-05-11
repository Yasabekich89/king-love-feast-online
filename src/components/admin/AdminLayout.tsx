
import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { HomeIcon, UtensilsIcon, UserIcon, LogOutIcon, Beef, Menu, X, BookIcon } from 'lucide-react';
import { useLanguage } from '@/contexts/language';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import ProtectedRoute from './ProtectedRoute';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const AdminLayout: React.FC = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname === `/admin${path}`;
  };
  
  const handleLogout = async () => {
    await signOut();
    toast({
      title: t('admin.logoutSuccess'),
      description: t('admin.loggedOutMessage'),
    });
    navigate('/admin/login');
  };

  // Sidebar content
  const SidebarContent = () => (
    <div className="w-full h-full flex flex-col bg-brand-blue text-white">
      <div className="p-6">
        <h1 className="text-2xl font-serif text-brand-gold">
          {t('admin.title')}
        </h1>
      </div>
      
      <nav className="mt-6 flex-1">
        <ul>
          <li>
            <Link
              to="/admin/products"
              className={`flex items-center gap-2 px-6 py-3 hover:bg-brand-blue-dark ${
                isActive('/admin/products') ? 'bg-brand-blue-dark border-l-4 border-brand-gold' : ''
              }`}
              onClick={() => isMobile && setSidebarOpen(false)}
            >
              <UtensilsIcon size={18} />
              <span>{t('admin.products')}</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/meat-types"
              className={`flex items-center gap-2 px-6 py-3 hover:bg-brand-blue-dark ${
                isActive('/admin/meat-types') ? 'bg-brand-blue-dark border-l-4 border-brand-gold' : ''
              }`}
              onClick={() => isMobile && setSidebarOpen(false)}
            >
              <Beef size={18} />
              <span>{t('admin.meatTypes')}</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/about"
              className={`flex items-center gap-2 px-6 py-3 hover:bg-brand-blue-dark ${
                isActive('/admin/about') ? 'bg-brand-blue-dark border-l-4 border-brand-gold' : ''
              }`}
              onClick={() => isMobile && setSidebarOpen(false)}
            >
              <BookIcon size={18} />
              <span>{t('admin.about.title')}</span>
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="flex items-center gap-2 px-6 py-3 hover:bg-brand-blue-dark"
              onClick={() => isMobile && setSidebarOpen(false)}
            >
              <HomeIcon size={18} />
              <span>{t('admin.backToSite')}</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
  
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-gray-100">
        {/* Desktop Sidebar */}
        {!isMobile && (
          <div className="w-64 bg-brand-blue text-white">
            <SidebarContent />
          </div>
        )}
        
        {/* Mobile Sidebar */}
        {isMobile && (
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetContent side="left" className="p-0 w-64">
              <SidebarContent />
            </SheetContent>
          </Sheet>
        )}
        
        {/* Main content */}
        <div className="flex-1">
          <header className="bg-white shadow">
            <div className="flex justify-between items-center px-6 py-4">
              <div className="flex items-center gap-2">
                {isMobile && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setSidebarOpen(true)}
                    className="mr-2"
                  >
                    <Menu size={20} />
                    <span className="sr-only">Open menu</span>
                  </Button>
                )}
                <h2 className="text-xl font-medium">{t('admin.dashboard')}</h2>
              </div>
              <div className="flex items-center gap-4">
                <UserIcon size={20} className="hidden sm:block" />
                <span className="hidden sm:block">{user?.email || "Admin"}</span>
                <LogOutIcon 
                  size={20} 
                  className="text-gray-400 cursor-pointer hover:text-brand-blue" 
                  onClick={handleLogout}
                />
              </div>
            </div>
          </header>
          
          <main className="p-4 md:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AdminLayout;
