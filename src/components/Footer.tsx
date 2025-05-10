
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Instagram, MapPin, Clock, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-brand-blue text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <img 
              src="/lovable-uploads/310ac2a1-3c6b-4705-bf17-e72727b92a23.png" 
              alt="Kings Love Meat" 
              className="h-20 mb-4"
            />
            <p className="text-gray-300 max-w-xs">
              Premium meat restaurant serving royal flavors and exceptional dining experiences.
            </p>
            <div className="mt-4">
              <a 
                href="https://www.instagram.com/kingslovemeat" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block text-brand-gold hover:text-white transition-colors"
              >
                <Instagram size={24} />
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
