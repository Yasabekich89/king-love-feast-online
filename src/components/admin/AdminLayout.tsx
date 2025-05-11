
import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { HomeIcon, UtensilsIcon, UserIcon, LogOutIcon, Beef } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import ProtectedRoute from './ProtectedRoute';

const AdminLayout: React.FC = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

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
  
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <div className="w-64 bg-brand-blue text-white">
          <div className="p-6">
            <h1 className="text-2xl font-serif text-brand-gold">
              {t('admin.title')}
            </h1>
          </div>
          
          <nav className="mt-6">
            <ul>
              <li>
                <Link
                  to="/admin/products"
                  className={`flex items-center gap-2 px-6 py-3 hover:bg-brand-blue-dark ${
                    isActive('/admin/products') ? 'bg-brand-blue-dark border-l-4 border-brand-gold' : ''
                  }`}
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
                >
                  <Beef size={18} />
                  <span>{t('admin.meatTypes')}</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="flex items-center gap-2 px-6 py-3 hover:bg-brand-blue-dark"
                >
                  <HomeIcon size={18} />
                  <span>{t('admin.backToSite')}</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        
        {/* Main content */}
        <div className="flex-1">
          <header className="bg-white shadow">
            <div className="flex justify-between items-center px-6 py-4">
              <h2 className="text-xl font-medium">{t('admin.dashboard')}</h2>
              <div className="flex items-center gap-4">
                <UserIcon size={20} />
                <span>{user?.email || "Admin"}</span>
                <LogOutIcon 
                  size={20} 
                  className="text-gray-400 cursor-pointer hover:text-brand-blue" 
                  onClick={handleLogout}
                />
              </div>
            </div>
          </header>
          
          <main className="p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AdminLayout;
