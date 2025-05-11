
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReservationForm from '@/components/ReservationForm';
import { BackgroundBoxesDemo } from '@/components/ui/demo';
import { Crown } from 'lucide-react';

const Reservations: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Background Boxes Demo Section */}
      <BackgroundBoxesDemo />
      
      {/* Hero Section */}
      <section className="relative py-16 bg-brand-blue">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <Crown className="mx-auto text-brand-gold mb-4" size={40} />
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            {t('reservation.title')}
          </h1>
          <div className="w-24 h-1 bg-brand-gold mx-auto"></div>
        </div>
      </section>
      
      {/* Reservation Form Section */}
      <section className="py-16 bg-gray-100 flex-grow">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <ReservationForm />
            
            <div className="mt-12 text-center">
              <h3 className="text-xl font-bold mb-4">Prefer to call us?</h3>
              <p className="text-gray-600 mb-2">You can also make reservations by phone:</p>
              <a href="tel:+37433647007" className="text-xl font-bold text-brand-blue hover:text-brand-gold transition-colors">
                +374 33 647007
              </a>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Reservations;
