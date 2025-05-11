import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Instagram, MapPin, Clock, Phone, Facebook } from 'lucide-react';

const TikTokIcon = ({ size = 24, className = '' }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"></path>
    <path d="M19 8v9a5 5 0 0 1-5 5H8"></path>
    <path d="M17 10V8h-2"></path>
    <path d="M17 15V8a5 5 0 0 0-5-5H9"></path>
  </svg>
);

const Footer: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-brand-blue text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <p className="text-gray-300 max-w-xs">
              Premium meat restaurant serving royal flavors and exceptional dining experiences.
            </p>
            <div className="mt-4 flex space-x-3">
              <a 
                href="https://www.facebook.com/profile.php?id=61575575482533" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block text-brand-gold hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={24} />
              </a>
              <a 
                href="https://www.instagram.com/kingslovemeat" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block text-brand-gold hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
              <a 
                href="https://www.tiktok.com/@kings.love.meat" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block text-brand-gold hover:text-white transition-colors"
                aria-label="TikTok"
              >
                <TikTokIcon size={24} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-xl text-brand-gold mb-4 font-serif">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin size={18} className="mr-2 text-brand-gold flex-shrink-0 mt-1" />
                <span>{t('footer.address')}</span>
              </div>
              <div className="flex items-start">
                <Clock size={18} className="mr-2 text-brand-gold flex-shrink-0 mt-1" />
                <span>{t('footer.hours')}</span>
              </div>
              <div className="flex items-start">
                <Phone size={18} className="mr-2 text-brand-gold flex-shrink-0 mt-1" />
                <a href="tel:+37433647007" className="hover:text-brand-gold transition-colors">
                  +374 33 647007
                </a>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-xl text-brand-gold mb-4 font-serif">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:text-brand-gold transition-colors">
                  {t('nav.home')}
                </a>
              </li>
              <li>
                <a href="/menu" className="hover:text-brand-gold transition-colors">
                  {t('nav.menu')}
                </a>
              </li>
              <li>
                <a href="/reservations" className="hover:text-brand-gold transition-colors">
                  {t('nav.reservations')}
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-brand-gold transition-colors">
                  {t('nav.about')}
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-brand-gold transition-colors">
                  {t('nav.contact')}
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Kings Love Meat. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
