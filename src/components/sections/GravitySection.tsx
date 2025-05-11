
import React from 'react';
import { Gravity, MatterBody } from '@/components/ui/gravity';

const GravitySection: React.FC = () => {
  return (
    <div className="py-20 royal-bg text-white">
      <div className="w-full h-[600px] relative overflow-hidden">
        <Gravity gravity={{ x: 0, y: 1 }} className="w-full h-full">
          <MatterBody
            matterBodyOptions={{ friction: 0.5, restitution: 0.2, density: 0.002 }}
            x="20%"
            y="10%"
          >
            <div className="text-2xl sm:text-3xl md:text-4xl bg-brand-gold text-white rounded-full hover:cursor-pointer px-8 py-6 font-serif">
              Royal
            </div>
          </MatterBody>
          <MatterBody
            matterBodyOptions={{ friction: 0.5, restitution: 0.2, density: 0.002 }}
            x="40%"
            y="30%"
          >
            <div className="text-2xl sm:text-3xl md:text-4xl bg-white text-brand-blue rounded-full hover:cursor-grab px-8 py-6 font-serif">
              Premium
            </div>
          </MatterBody>
          <MatterBody
            matterBodyOptions={{ friction: 0.5, restitution: 0.2, density: 0.002 }}
            x="70%"
            y="15%"
            angle={10}
          >
            <div className="text-2xl sm:text-3xl md:text-4xl bg-[#1f464d] text-white rounded-full hover:cursor-grab px-8 py-6 font-serif">
              Quality
            </div>
          </MatterBody>
          <MatterBody
            matterBodyOptions={{ friction: 0.5, restitution: 0.2, density: 0.002 }}
            x="30%"
            y="50%"
          >
            <div className="text-2xl sm:text-3xl md:text-4xl bg-[#ff5941] text-white rounded-full hover:cursor-grab px-8 py-6 font-serif">
              Flavor
            </div>
          </MatterBody>
          <MatterBody
            matterBodyOptions={{ friction: 0.5, restitution: 0.2, density: 0.002 }}
            x="65%"
            y="40%"
          >
            <div className="text-2xl sm:text-3xl md:text-4xl bg-orange-500 text-white rounded-full hover:cursor-grab px-8 py-6 font-serif">
              Experience
            </div>
          </MatterBody>
          <MatterBody
            matterBodyOptions={{ friction: 0.5, restitution: 0.2, density: 0.002 }}
            x="80%"
            y="60%"
          >
            <div className="text-2xl sm:text-3xl md:text-4xl bg-[#ffd726] text-black rounded-full hover:cursor-grab px-8 py-6 font-serif">
              Kings Love Meat
            </div>
          </MatterBody>
        </Gravity>
      </div>
    </div>
  );
};

export default GravitySection;
