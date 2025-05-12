
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Crown } from 'lucide-react';
import ReservationForm from '@/components/ReservationForm';
import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/animation-variants';
import { useIsMobile } from '@/hooks/use-mobile';

const ReservationSection: React.FC = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();

  return (
    <section className="py-16 sm:py-20 bg-gray-100 crown-pattern relative overflow-hidden z-0">
      {/* Decorative background elements with mobile optimizations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        {/* Reduced number and size of balloons on mobile for better performance */}
        <div className="absolute -top-20 -left-20 w-48 sm:w-64 h-48 sm:h-64 bg-brand-gold/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -right-32 w-60 sm:w-80 h-60 sm:h-80 bg-brand-blue/5 rounded-full blur-3xl"></div>
        
        {/* Show fewer decorative elements on mobile */}
        {!isMobile && (
          <>
            <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 right-1/4 w-72 h-72 bg-brand-blue/5 rounded-full blur-3xl"></div>
            
            {/* Additional balloons only shown on desktop */}
            <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl"></div>
            <div className="absolute top-2/3 left-10 w-56 h-56 bg-brand-blue/4 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-32 right-1/3 w-64 h-64 bg-brand-gold/4 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-48 left-10 w-80 h-80 bg-purple-600/4 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-10 w-60 h-60 bg-brand-gold/3 rounded-full blur-3xl"></div>
            <div className="absolute -top-10 right-1/3 w-52 h-52 bg-brand-blue/4 rounded-full blur-3xl"></div>
            
            {/* Even more balloons - second set with deeper positioning - desktop only */}
            <div className="absolute -bottom-60 center w-100 h-100 bg-purple-500/4 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-80 right-1/4 w-120 h-120 bg-brand-gold/3 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-70 left-1/5 w-90 h-90 bg-brand-blue/4 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/3 left-1/6 w-70 h-70 bg-purple-600/3 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-50 right-10 w-75 h-75 bg-brand-gold/4 rounded-full blur-3xl"></div>
          </>
        )}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-6 sm:mb-10">
            <Crown className="mx-auto text-brand-gold mb-3 sm:mb-4" size={isMobile ? 24 : 32} />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4">{t('reservation.title')}</h2>
            <div className="gold-divider"></div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl shadow-xl border border-gray-200/50 p-1">
            <ReservationForm />
          </div>
        </motion.div>
      </div>
      
      {/* Add smaller bottom padding on mobile */}
      <div className={`${isMobile ? 'h-32' : 'h-60'}`}></div>
    </section>
  );
};

export default ReservationSection;
