
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Crown } from 'lucide-react';
import ReservationForm from '@/components/ReservationForm';
import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/animation-variants';

const ReservationSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-gray-100 crown-pattern relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-gold/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -right-20 w-60 h-60 bg-brand-blue/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-brand-gold/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-10">
            <Crown className="mx-auto text-brand-gold mb-4" size={32} />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('reservation.title')}</h2>
            <div className="gold-divider"></div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl shadow-xl border border-gray-200/50 p-1">
            <ReservationForm />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ReservationSection;
