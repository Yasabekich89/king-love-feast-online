
import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

const GravitySection: React.FC = () => {
  const { meatTypes, language, isMeatTypesLoading } = useLanguage();
  
  // Use only a subset of meat types for display
  const displayableMeatTypes = meatTypes.slice(0, 6);
  
  // Add debugging effect to check data loading
  useEffect(() => {
    if (meatTypes.length > 0) {
      console.log("Meat types loaded:", meatTypes);
      console.log("Current language:", language);
    }
  }, [meatTypes, language]);
  
  const bgColors = [
    "bg-brand-gold text-white",
    "bg-white text-brand-blue",
    "bg-[#1f464d] text-white",
    "bg-[#ff5941] text-white",
    "bg-orange-500 text-white",
    "bg-[#ffd726] text-black",
  ];
  
  const initialPositions = [
    { x: 20, y: 10, delay: 0.2 },
    { x: 40, y: 30, delay: 0.3 },
    { x: 70, y: 15, delay: 0.1 },
    { x: 30, y: 50, delay: 0.4 },
    { x: 65, y: 40, delay: 0.2 },
    { x: 80, y: 60, delay: 0.5 },
  ];
  
  return (
    <div className="royal-bg text-white py-[50px]">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-serif text-center text-brand-gold mb-8">
          {language === 'en' ? 'Our Meat Selections' : 
           language === 'am' ? 'የስጋ ምርጫዎቻችን' : 
           'Наш Выбор Мяса'}
        </h2>
        
        <div className="w-full h-[400px] md:h-[500px] relative overflow-hidden border border-dashed border-brand-gold/30 rounded-lg bg-[#0A3D4F]/60">
          {/* Animated meat type bubbles using framer-motion */}
          {!isMeatTypesLoading && displayableMeatTypes.map((meatType, index) => {
            const position = initialPositions[index] || { 
              x: (index * 15) % 85, 
              y: (index * 20) % 65, 
              delay: 0.1 * index 
            };
            
            // Get the content in the current language or fall back to English
            const content = meatType[language] || meatType.en;
            
            return (
              <motion.div
                key={meatType.id}
                className={`absolute text-2xl sm:text-3xl md:text-4xl ${bgColors[index % bgColors.length]} rounded-full px-8 py-6 font-serif shadow-lg cursor-grab select-none`}
                initial={{ 
                  x: `${position.x}%`, 
                  y: `${position.y}%`, 
                  opacity: 0, 
                  scale: 0.8 
                }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  x: `${position.x}%`, 
                  y: `${position.y}%` 
                }}
                transition={{
                  delay: position.delay,
                  duration: 0.5,
                  type: "spring",
                  damping: 10
                }}
                drag
                dragConstraints={{
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0
                }}
                dragElastic={0.2}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {content}
              </motion.div>
            );
          })}
          
          {/* Show loading placeholder bubbles if meat types are still loading */}
          {isMeatTypesLoading && Array(6).fill(0).map((_, index) => {
            const position = initialPositions[index];
            
            return (
              <motion.div
                key={`loading-${index}`}
                className={`absolute text-2xl sm:text-3xl md:text-4xl ${bgColors[index]} rounded-full px-8 py-6 font-serif animate-pulse shadow-lg`}
                initial={{ 
                  x: `${position.x}%`, 
                  y: `${position.y}%`, 
                  opacity: 0 
                }}
                animate={{ 
                  opacity: 0.7,
                  x: `${position.x}%`, 
                  y: `${position.y}%` 
                }}
              >
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GravitySection;
