
"use client";
import React from "react";
import { Gravity, MatterBody } from "@/components/ui/gravity";

export function BackgroundBoxesDemo() {
  return (
    <div className="h-96 relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg">
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      <div className="w-full h-full min-h-[500px] flex flex-col relative z-20">
        <div className="pt-20 text-6xl sm:text-7xl md:text-8xl text-white w-full text-center font-serif italic">
          Kings Love Meat
        </div>
        <p className="pt-4 text-base sm:text-xl md:text-2xl text-neutral-300 w-full text-center">
          Experience exceptional dining at our restaurant
        </p>
        <Gravity gravity={{ x: 0, y: 1 }} className="w-full h-full">
          <MatterBody
            matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
            x="30%"
            y="10%"
          >
            <div className="text-xl sm:text-2xl md:text-3xl bg-brand-gold text-white rounded-full hover:cursor-pointer px-8 py-4">
              Royal
            </div>
          </MatterBody>
          <MatterBody
            matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
            x="30%"
            y="30%"
          >
            <div className="text-xl sm:text-2xl md:text-3xl bg-brand-blue text-white rounded-full hover:cursor-grab px-8 py-4">
              Premium
            </div>
          </MatterBody>
          <MatterBody
            matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
            x="40%"
            y="20%"
            angle={10}
          >
            <div className="text-xl sm:text-2xl md:text-3xl bg-[#1f464d] text-white rounded-full hover:cursor-grab px-8 py-4">
              Exclusive
            </div>
          </MatterBody>
          <MatterBody
            matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
            x="75%"
            y="10%"
          >
            <div className="text-xl sm:text-2xl md:text-3xl bg-[#ff5941] text-white rounded-full hover:cursor-grab px-8 py-4">
              Quality
            </div>
          </MatterBody>
          {/* Removed the last two MatterBody components (Taste and Experience) */}
        </Gravity>
      </div>
    </div>
  );
}
