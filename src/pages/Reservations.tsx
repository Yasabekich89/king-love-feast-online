
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReservationForm from '@/components/ReservationForm';
import { BackgroundBoxesDemo } from '@/components/ui/demo';
import { Crown, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeIn, slideInLeft, slideInRight } from '@/lib/animation-variants';

const Reservations: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Background Boxes Demo Section with Reservation Title */}
      <BackgroundBoxesDemo />
      
      {/* Reservation Form Section */}
      <section className="py-16 bg-gray-100 flex-grow relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-gold/5 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 -right-20 w-60 h-60 bg-brand-blue/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-brand-gold/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto">
            <motion.div 
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="bg-white/20 backdrop-blur-sm rounded-xl shadow-xl border border-gray-200/50 p-1 mb-12"
            >
              <ReservationForm />
            </motion.div>
            
            <motion.div 
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="mt-16 text-center"
            >
              <h3 className="text-xl font-bold mb-4">Prefer to call us?</h3>
              <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                <motion.div 
                  variants={slideInLeft}
                  initial="hidden"
                  animate="visible"
                  className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center shine-effect"
                >
                  <div className="w-12 h-12 rounded-full bg-brand-blue flex items-center justify-center mb-3">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <p className="text-gray-600 mb-2">You can also make reservations by phone:</p>
                  <a href="tel:+37433647007" className="text-xl font-bold text-brand-blue hover:text-brand-gold transition-colors">
                    +374 33 647007
                  </a>
                </motion.div>
                
                <motion.div 
                  variants={slideInRight}
                  initial="hidden"
                  animate="visible"
                  className="bg-white rounded-lg shadow-lg p-6 text-center shine-effect"
                >
                  <Crown className="mx-auto text-brand-gold mb-3" size={24} />
                  <h4 className="font-bold text-brand-blue mb-2">Opening Hours</h4>
                  <p className="text-gray-600">Monday - Friday: 12:00 - 22:00</p>
                  <p className="text-gray-600">Saturday - Sunday: 12:00 - 23:00</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Reservations;
