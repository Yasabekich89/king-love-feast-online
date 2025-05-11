import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Footer from '@/components/Footer';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact = () => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-brand-blue crown-pattern">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-serif">
              {t('contact.title')}
            </h1>
            <div className="gold-divider"></div>
            <p className="text-gray-200 max-w-2xl mx-auto mt-4">
              {t('contact.subtitle')}
            </p>
          </div>
        </div>
      </div>
      
      {/* Contact Information Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-10">
            <div>
              <h2 className="text-3xl font-serif font-bold text-brand-blue mb-6">
                {t('contact.infoTitle')}
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-brand-gold p-3 rounded-full text-white mr-4">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif text-brand-blue mb-1">{t('contact.phone')}</h3>
                    <a 
                      href="tel:+37433647007" 
                      className="text-gray-700 hover:text-brand-gold transition-colors"
                    >
                      +374 33 647007
                    </a>
                    <p className="mt-1 text-sm text-gray-500">{t('contact.phoneDesc')}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-brand-gold p-3 rounded-full text-white mr-4">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif text-brand-blue mb-1">{t('contact.address')}</h3>
                    <p className="text-gray-700">
                      38 Tumanyan St, Yerevan, Armenia
                    </p>
                    <p className="mt-1 text-sm text-gray-500">{t('contact.findUs')}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-brand-gold p-3 rounded-full text-white mr-4">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif text-brand-blue mb-1">{t('contact.hours')}</h3>
                    <p className="text-gray-700">{t('contact.hoursDetails')}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-serif font-bold text-brand-blue mb-6">
                {t('contact.socialTitle')}
              </h2>
              
              <div className="flex space-x-4">
                <a 
                  href="https://www.facebook.com/profile.php?id=61575575482533"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-blue hover:bg-brand-gold text-white p-3 rounded-full transition-colors"
                  aria-label="Facebook"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a 
                  href="https://www.instagram.com/kingslovemeat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-blue hover:bg-brand-gold text-white p-3 rounded-full transition-colors"
                  aria-label="Instagram"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                  </svg>
                </a>
                <a 
                  href="https://www.tiktok.com/@kings.love.meat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-blue hover:bg-brand-gold text-white p-3 rounded-full transition-colors"
                  aria-label="TikTok"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M9 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"></path>
                    <path d="M19 8v9a5 5 0 0 1-5 5H8"></path>
                    <path d="M17 10V8h-2"></path>
                    <path d="M17 15V8a5 5 0 0 0-5-5H9"></path>
                  </svg>
                </a>
              </div>
              <p className="mt-4 text-gray-600">{t('contact.socialFollow')}</p>
            </div>
          </div>
          
          {/* Google Maps Section */}
          <div className="h-full">
            <h2 className="text-3xl font-serif font-bold text-brand-blue mb-6">
              {t('contact.findUsMap')}
            </h2>
            <div className="border-4 border-brand-gold rounded-lg overflow-hidden shadow-lg h-[450px]">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d486.53541687328294!2d44.5124933849079!3d40.18602114361229!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406abd1d889a6f85%3A0xbe74b7a9ca6cb1a5!2s38%20Tumanyan%20St!5e0!3m2!1sen!2sam!4v1746916749476!5m2!1sen!2sam" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps - Kings Love Meat"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex-grow"></div>
      <Footer />
    </div>
  );
};

export default Contact;
