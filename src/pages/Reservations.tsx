
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Footer from '@/components/Footer';
import ReservationForm from '@/components/ReservationForm';
import { BackgroundBoxesDemo } from '@/components/ui/demo';
import { Crown } from 'lucide-react';

const Reservations: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Background Boxes Demo Section with Reservation Title */}
      <BackgroundBoxesDemo />
      
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
