
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Crown, Menu, X } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { FlagUS, FlagRU, FlagAM } from './Flags';

const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <img 
            src="/lovable-uploads/310ac2a1-3c6b-4705-bf17-e72727b92a23.png" 
            alt="Kings Love Meat" 
            className="h-12 md:h-16"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="font-medium text-brand-blue hover:text-brand-gold transition-colors">
            {t('nav.home')}
          </Link>
          <Link to="/menu" className="font-medium text-brand-blue hover:text-brand-gold transition-colors">
            {t('nav.menu')}
          </Link>
          <Link to="/reservations" className="font-medium text-brand-blue hover:text-brand-gold transition-colors">
            {t('nav.reservations')}
          </Link>
          <Link to="/about" className="font-medium text-brand-blue hover:text-brand-gold transition-colors">
            {t('nav.about')}
          </Link>
          <Link to="/contact" className="font-medium text-brand-blue hover:text-brand-gold transition-colors">
            {t('nav.contact')}
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          {/* Language switcher dropdown */}
          <div className="hidden md:block border-l border-gray-200 pl-4">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center">
                {language === 'en' && <FlagUS className="w-5 h-5 mr-2" />}
                {language === 'am' && <FlagAM className="w-5 h-5 mr-2" />}
                {language === 'ru' && <FlagRU className="w-5 h-5 mr-2" />}
                <span className="text-sm font-medium">
                  {language === 'en' ? 'EN' : language === 'am' ? 'AM' : 'RU'}
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage('en')} className="flex items-center">
                  <FlagUS className="w-5 h-5 mr-2" />
                  <span>English</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('am')} className="flex items-center">
                  <FlagAM className="w-5 h-5 mr-2" />
                  <span>Հայերեն</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('ru')} className="flex items-center">
                  <FlagRU className="w-5 h-5 mr-2" />
                  <span>Русский</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden text-brand-blue hover:text-brand-gold"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-4 z-50">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            <Link 
              to="/" 
              className="font-medium text-brand-blue hover:text-brand-gold transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.home')}
            </Link>
            <Link 
              to="/menu" 
              className="font-medium text-brand-blue hover:text-brand-gold transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.menu')}
            </Link>
            <Link 
              to="/reservations" 
              className="font-medium text-brand-blue hover:text-brand-gold transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.reservations')}
            </Link>
            <Link 
              to="/about" 
              className="font-medium text-brand-blue hover:text-brand-gold transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.about')}
            </Link>
            <Link 
              to="/contact" 
              className="font-medium text-brand-blue hover:text-brand-gold transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.contact')}
            </Link>
            
            {/* Mobile language switcher */}
            <div className="flex flex-col border-t border-gray-200 pt-4 mt-2 space-y-2">
              <div className="font-medium text-gray-500 pb-2">Language / Язык / Լեզու</div>
              <button 
                className={`flex items-center text-sm ${language === 'en' ? 'text-brand-gold' : 'text-gray-500'}`}
                onClick={() => setLanguage('en')}
              >
                <FlagUS className="w-5 h-5 mr-2" />
                English
              </button>
              <button 
                className={`flex items-center text-sm ${language === 'am' ? 'text-brand-gold' : 'text-gray-500'}`}
                onClick={() => setLanguage('am')}
              >
                <FlagAM className="w-5 h-5 mr-2" />
                Հայերեն
              </button>
              <button 
                className={`flex items-center text-sm ${language === 'ru' ? 'text-brand-gold' : 'text-gray-500'}`}
                onClick={() => setLanguage('ru')}
              >
                <FlagRU className="w-5 h-5 mr-2" />
                Русский
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
