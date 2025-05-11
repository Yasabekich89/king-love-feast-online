
import React, { useEffect, useState } from 'react';
import { Gravity, MatterBody } from '@/components/ui/gravity';
import { useLanguage } from '@/contexts/LanguageContext';

const GravitySection: React.FC = () => {
  const { meatTypes, language, isMeatTypesLoading } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  
  // Use only a subset of meat types for display
  const displayableMeatTypes = meatTypes.slice(0, 6);
  
  // Add debugging effect to check data loading
  useEffect(() => {
    if (meatTypes.length > 0) {
      console.log("Meat types loaded:", meatTypes);
      console.log("Current language:", language);
    }
    
    // Small delay to ensure gravity component initializes properly
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [meatTypes, language]);
  
  const bgColors = [
    "bg-brand-gold text-white",
    "bg-white text-brand-blue",
    "bg-[#1f464d] text-white",
    "bg-[#ff5941] text-white",
    "bg-orange-500 text-white",
    "bg-[#ffd726] text-black",
  ];
  
  return (
    <div className="royal-bg text-white py-[50px]">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-serif text-center text-brand-gold mb-8">
          {language === 'en' ? 'Our Meat Selections' : 
           language === 'am' ? 'የስጋ ምርጫዎቻችን' : 
           'Наш Выбор Мяса'}
        </h2>
        
        <div className="w-full h-[400px] md:h-[500px] relative overflow-hidden border border-dashed border-brand-gold/30 rounded-lg">
          {isVisible && (
            <Gravity 
              gravity={{
                x: 0,
                y: 1
              }} 
              className="w-full h-full"
              debug={false}
              autoStart={true}
            >
              {!isMeatTypesLoading && displayableMeatTypes.map((meatType, index) => {
                // Calculate positions based on index
                const positions = [
                  { x: "20%", y: "10%" },
                  { x: "40%", y: "30%" },
                  { x: "70%", y: "15%", angle: 10 },
                  { x: "30%", y: "50%" },
                  { x: "65%", y: "40%" },
                  { x: "80%", y: "60%" },
                ];
                
                // Get current position based on index or default if index out of range
                const position = positions[index] || { x: `${(index * 15) % 85}%`, y: `${(index * 20) % 65}%` };
                
                // Get the content in the current language or fall back to English
                const content = meatType[language] || meatType.en;
                
                return (
                  <MatterBody 
                    key={meatType.id}
                    matterBodyOptions={{
                      friction: 0.5,
                      restitution: 0.2,
                      density: 0.002
                    }}
                    x={position.x}
                    y={position.y}
                    angle={position.angle || 0}
                  >
                    <div className={`text-2xl sm:text-3xl md:text-4xl ${bgColors[index % bgColors.length]} rounded-full hover:cursor-grab px-8 py-6 font-serif shadow-lg`}>
                      {content}
                    </div>
                  </MatterBody>
                );
              })}
              
              {/* Show loading placeholder bubbles if meat types are still loading */}
              {isMeatTypesLoading && Array(6).fill(0).map((_, index) => {
                const positions = [
                  { x: "20%", y: "10%" },
                  { x: "40%", y: "30%" },
                  { x: "70%", y: "15%", angle: 10 },
                  { x: "30%", y: "50%" },
                  { x: "65%", y: "40%" },
                  { x: "80%", y: "60%" },
                ];
                
                const position = positions[index];
                
                return (
                  <MatterBody 
                    key={`loading-${index}`}
                    matterBodyOptions={{
                      friction: 0.5,
                      restitution: 0.2,
                      density: 0.002
                    }}
                    x={position.x}
                    y={position.y}
                    angle={position.angle || 0}
                  >
                    <div className={`text-2xl sm:text-3xl md:text-4xl ${bgColors[index]} rounded-full hover:cursor-grab px-8 py-6 font-serif animate-pulse shadow-lg`}>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </div>
                  </MatterBody>
                );
              })}
            </Gravity>
          )}
          
          {/* Fallback display in case Gravity component doesn't initialize properly */}
          {!isVisible && !isMeatTypesLoading && displayableMeatTypes.length > 0 && (
            <div className="w-full h-full flex flex-wrap justify-center items-center gap-4 p-4">
              {displayableMeatTypes.map((meatType, index) => {
                const content = meatType[language] || meatType.en;
                return (
                  <div 
                    key={meatType.id}
                    className={`text-2xl sm:text-3xl md:text-4xl ${bgColors[index % bgColors.length]} rounded-full px-8 py-6 font-serif shadow-lg`}
                  >
                    {content}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GravitySection;
