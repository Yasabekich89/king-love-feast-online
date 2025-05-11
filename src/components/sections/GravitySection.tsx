
import React from 'react';
import { Gravity, MatterBody } from '@/components/ui/gravity';
import { useLanguage } from '@/contexts/LanguageContext';

const GravitySection: React.FC = () => {
  const { meatTypes, language, isMeatTypesLoading } = useLanguage();

  // Use only a subset of meat types for display
  const displayableMeatTypes = meatTypes.slice(0, 6);
  
  return (
    <div className="royal-bg text-white py-[50px]">
      <div className="w-full h-[300px] relative overflow-hidden">
        <Gravity 
          gravity={{
            x: 0,
            y: 1
          }} 
          className="w-full h-full"
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
            
            // Determine background color based on index
            const bgColors = [
              "bg-brand-gold",
              "bg-white text-brand-blue",
              "bg-[#1f464d]",
              "bg-[#ff5941]",
              "bg-orange-500",
              "bg-[#ffd726] text-black",
            ];
            
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
                <div className={`text-2xl sm:text-3xl md:text-4xl ${bgColors[index % bgColors.length]} rounded-full hover:cursor-grab px-8 py-6 font-serif`}>
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
            const bgColors = [
              "bg-brand-gold",
              "bg-white text-brand-blue",
              "bg-[#1f464d]",
              "bg-[#ff5941]",
              "bg-orange-500",
              "bg-[#ffd726] text-black",
            ];
            
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
                <div className={`text-2xl sm:text-3xl md:text-4xl ${bgColors[index]} rounded-full hover:cursor-grab px-8 py-6 font-serif animate-pulse`}>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </div>
              </MatterBody>
            );
          })}
        </Gravity>
      </div>
    </div>
  );
};

export default GravitySection;
