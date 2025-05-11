
import React, { useEffect, useState, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { zoomIn, containerVariants, itemVariants } from '@/lib/animation-variants';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

const GravitySection: React.FC = () => {
  const { meatTypes, language, isMeatTypesLoading } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  
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

  // Animation for the bubble hover effect
  const bubbleHover = {
    scale: 1.1,
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
    transition: { type: "spring", stiffness: 400, damping: 10 }
  };

  // Define the floating animation directly instead of using the variant
  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    }
  };
  
  return (
    <motion.div 
      className="royal-bg text-white py-[50px] overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto">
        <motion.h2 
          className="text-3xl md:text-4xl font-serif text-center text-brand-gold mb-8 relative"
          variants={zoomIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <span className="relative inline-block">
            {language === 'en' ? 'Our Meat Selections' : 
             language === 'am' ? 'የስጋ ምርጫዎቻችን' : 
             'Наш Выбор Мяса'}
            <motion.span 
              className="absolute bottom-0 left-0 h-1 bg-brand-gold"
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
            />
          </span>
        </motion.h2>
        
        <div 
          ref={containerRef}
          className="w-full h-[400px] md:h-[500px] relative overflow-hidden border border-dashed border-brand-gold/30 rounded-lg bg-[#0A3D4F]/60 perspective-lg"
        >
          <motion.div
            className="absolute inset-0 opacity-20"
            initial={{ backgroundPosition: "0% 0%" }}
            animate={{ backgroundPosition: "100% 100%" }}
            transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
            style={{
              backgroundImage: "url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23C69214' d='M0.5,19 L19,0.5 L23.5,5 L5,23.5 L0.5,19 Z M17,4 L21,8 L8,21 L4,17 L17,4 Z'%3E%3C/path%3E%3C/svg%3E')",
              backgroundSize: "80px 80px",
            }}
          />
          
          {/* Animated meat type bubbles using framer-motion */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="w-full h-full relative"
          >
            {!isMeatTypesLoading && displayableMeatTypes.map((meatType, index) => {
              const position = initialPositions[index] || { 
                x: (index * 15) % 85, 
                y: (index * 20) % 65, 
                delay: 0.1 * index 
              };
              
              // Get the content in the current language or fall back to English
              const content = meatType[language] || meatType.en;
              
              return (
                <HoverCard key={meatType.id} openDelay={200} closeDelay={100}>
                  <HoverCardTrigger asChild>
                    <motion.div
                      className={`absolute text-2xl sm:text-3xl md:text-4xl ${bgColors[index % bgColors.length]} rounded-full px-8 py-6 font-serif shadow-lg cursor-grab select-none backdrop-blur-sm`}
                      initial={{ 
                        x: `${position.x}%`, 
                        y: `${position.y}%`, 
                        opacity: 0, 
                        scale: 0.8,
                        rotate: Math.random() * 10 - 5
                      }}
                      whileInView={{ 
                        opacity: 1, 
                        scale: 1,
                        x: `${position.x}%`, 
                        y: `${position.y}%` 
                      }}
                      viewport={{ once: true }}
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
                      dragTransition={{
                        bounceStiffness: 600,
                        bounceDamping: 20
                      }}
                      dragElastic={0.2}
                      whileHover={bubbleHover}
                      whileTap={{ scale: 0.95 }}
                      variants={itemVariants}
                      animate={floatingAnimation}
                    >
                      {content}
                      <motion.span
                        className="absolute -inset-1 rounded-full opacity-0 border-2 border-white/20"
                        whileHover={{ opacity: 1, scale: 1.05 }}
                      />
                    </motion.div>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-64 bg-white/90 backdrop-blur-md border-brand-gold/20">
                    <div className="space-y-1">
                      <h4 className="text-lg font-serif text-brand-blue">{content}</h4>
                      <p className="text-sm text-gray-600">
                        {language === 'en'
                          ? 'Click and drag to move the bubble around'
                          : language === 'am'
                          ? 'ባብሎኑን ለማንቀሳቀስ ጠቅ ያድርጉ እና ይጎትቱ'
                          : 'Нажмите и перетащите, чтобы перемещать пузырь'}
                      </p>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              );
            })}
          </motion.div>
          
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
                transition={{
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 1.5,
                }}
              >
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default GravitySection;
