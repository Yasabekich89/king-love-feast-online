
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Crown } from 'lucide-react';
import ReservationForm from '@/components/ReservationForm';

const ReservationSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-gray-100 crown-pattern">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="text-center mb-10">
            <Crown className="mx-auto text-brand-gold mb-4" size={32} />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('reservation.title')}</h2>
            <div className="gold-divider"></div>
          </div>
          <div className="bg-white rounded-lg shadow-xl p-8 border border-gray-200">
            <ReservationForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReservationSection;
