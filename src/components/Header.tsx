
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Crown, X, Beef } from 'lucide-react';
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
  const location = useLocation();
  const [pulseMenu, setPulseMenu] = useState(false);

  // Add pulsing effect to menu button to draw attention
  useEffect(() => {
    const pulseTiming = setTimeout(() => {
      setPulseMenu(true);
      
      const stopPulseTiming = setTimeout(() => {
        setPulseMenu(false);
      }, 2000);
      
      return () => clearTimeout(stopPulseTiming);
    }, 3000);
    
    return () => clearTimeout(pulseTiming);
  }, []);

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
          {/* Language switcher dropdown - Updated to show only flags */}
          <div className="hidden md:block border-l border-gray-200 pl-4">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center">
                {language === 'en' && <FlagUS className="w-6 h-6" />}
                {language === 'am' && <FlagAM className="w-6 h-6" />}
                {language === 'ru' && <FlagRU className="w-6 h-6" />}
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

          {/* Mobile menu button with Beef icon and pulse animation */}
          <button 
            className={`md:hidden text-brand-blue hover:text-brand-gold relative ${pulseMenu ? 'animate-pulse-gold' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Beef size={24} />}
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-brand-gold rounded-full hidden"></span>
          </button>
        </div>
      </div>

      {/* Enhanced Mobile Menu with Emojis and Animations */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[72px] bg-black/50 z-40 animate-fade-in">
          <div className="h-full w-4/5 max-w-xs bg-gradient-to-br from-white to-gray-50 shadow-lg transform translate-x-0 animate-slide-in-right">
            <div className="py-4 px-6 flex flex-col h-full">
              {/* Royal crown decoration */}
              <div className="absolute top-4 right-4 opacity-10">
                <Crown size={80} className="text-brand-gold" />
              </div>
              
              {/* Menu items with emojis */}
              <div className="flex flex-col space-y-1 mt-3">
                <Link 
                  to="/menu" 
                  className="menu-item-fancy"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="menu-emoji">🍖</span>
                  <span className="menu-text">{t('nav.menu')}</span>
                </Link>
                <Link 
                  to="/reservations" 
                  className="menu-item-fancy"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="menu-emoji">📅</span>
                  <span className="menu-text">{t('nav.reservations')}</span>
                </Link>
                <Link 
                  to="/about" 
                  className="menu-item-fancy"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="menu-emoji">👑</span>
                  <span className="menu-text">{t('nav.about')}</span>
                </Link>
                <Link 
                  to="/contact" 
                  className="menu-item-fancy"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="menu-emoji">📞</span>
                  <span className="menu-text">{t('nav.contact')}</span>
                </Link>
              </div>
              
              {/* Decorative separator */}
              <div className="my-4 border-t border-gray-200 relative">
                <div className="absolute left-1/2 top-0 -mt-2 -ml-2 w-4 h-4 rounded-full bg-brand-gold opacity-20"></div>
              </div>
              
              {/* Enhanced Mobile language switcher with removed title text */}
              <div className="mt-auto mb-8">
                <div className="flex justify-between space-x-2">
                  <button 
                    className={`language-button-fancy ${language === 'en' ? 'active' : ''}`}
                    onClick={() => setLanguage('en')}
                  >
                    <FlagUS className="w-8 h-8" />
                    <span className="language-name">English</span>
                  </button>
                  <button 
                    className={`language-button-fancy ${language === 'am' ? 'active' : ''}`}
                    onClick={() => setLanguage('am')}
                  >
                    <FlagAM className="w-8 h-8" />
                    <span className="language-name">Հայերեն</span>
                  </button>
                  <button 
                    className={`language-button-fancy ${language === 'ru' ? 'active' : ''}`}
                    onClick={() => setLanguage('ru')}
                  >
                    <FlagRU className="w-8 h-8" />
                    <span className="language-name">Русский</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
