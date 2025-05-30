
"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

export const BoxesCore = ({ className, ...rest }: { className?: string }) => {
  const [isClient, setIsClient] = useState(false);
  const isMobile = useIsMobile();
  
  // Only render component after client-side hydration
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Reduce the number of rows and columns based on device
  const rows = new Array(isMobile ? 60 : 120).fill(1);
  const cols = new Array(isMobile ? 40 : 80).fill(1);
  
  // Using a more colorful and vibrant palette
  const colors = [
    "rgb(30, 41, 59)", // slate-800
    "rgb(15, 23, 42)", // slate-900
    "rgb(17, 24, 39)", // gray-900
    "#9b87f5", // Primary Purple
    "#7E69AB", // Secondary Purple
    "#D946EF", // Magenta Pink
    "#F97316", // Bright Orange
    "#0EA5E9", // Ocean Blue
    "rgb(198, 146, 20, 0.6)", // brand-gold with higher opacity
    "rgb(10, 61, 79, 0.7)", // brand-blue with higher opacity
    "rgb(209, 213, 219)", // gray-300 - adding lighter color for contrast
  ];

  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };
  
  if (!isClient) return null; // Don't render during SSR
  
  // Don't animate all cells, just a subset
  const shouldAnimate = (i: number, j: number) => {
    return (j % 6 === 0 && i % 6 === 0);
  };

  return (
    <div
      style={{
        transform: `translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)`,
      }}
      className={cn(
        "absolute left-1/4 p-4 -top-1/4 flex -translate-x-1/2 -translate-y-1/2 w-full h-full z-0",
        className
      )}
      {...rest}
    >
      {rows.map((_, i) => (
        <motion.div
          key={`row` + i}
          className="w-16 h-8 border-l border-slate-700 relative"
          initial={false}
        >
          {cols.map((_, j) => (
            <motion.div
              key={`col` + j}
              className="w-16 h-8 border-r border-t border-slate-700 relative"
              animate={shouldAnimate(i, j) ? {
                backgroundColor: j % 6 === 0 && i % 6 === 0 ? getRandomColor() : "transparent",
              } : undefined}
              transition={shouldAnimate(i, j) ? { 
                duration: 1.5, 
                repeat: Infinity, 
                repeatType: "reverse",
                repeatDelay: 0.5 
              } : undefined}
            >
              {j % 8 === 0 && i % 8 === 0 && !isMobile ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="absolute h-6 w-10 -top-[14px] -left-[22px] text-slate-700 stroke-[1px] pointer-events-none"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m6-6H6"
                  />
                </svg>
              ) : null}
            </motion.div>
          ))}
        </motion.div>
      ))}
    </div>
  );
};

export const Boxes = React.memo(BoxesCore);
