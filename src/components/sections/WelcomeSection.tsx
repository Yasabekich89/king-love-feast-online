
import React from 'react';
import { BackgroundBoxesDemo } from '@/components/ui/demo';

const WelcomeSection: React.FC = () => {
  return (
    <div className="w-full py-12 bg-white flex flex-col items-center justify-center">
      <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-blue mb-6">Welcome to</h2>
      <div className="w-full max-w-3xl mx-auto px-4">
        <BackgroundBoxesDemo />
      </div>
    </div>
  );
};

export default WelcomeSection;
