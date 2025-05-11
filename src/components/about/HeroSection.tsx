
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/animation-variants";
import { Boxes } from "@/components/ui/background-boxes";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLanguage } from "@/contexts/language";
import { useAboutContent } from "@/hooks/use-about-content";

const HeroSection = () => {
  const [isClient, setIsClient] = useState(false);
  const isMobile = useIsMobile();
  const { language } = useLanguage();
  const { data } = useAboutContent(language);
  
  // Avoid hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Get hero content or use fallback
  const heroContent = data?.hero || { 
    title: "Our Story", 
    subtitle: "Where passion for premium meat meets exceptional dining experience"
  };
  
  return (
    <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Background animation - only render on client and conditionally */}
      {isClient && (
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-brand-blue/70 z-10" />
          {!isMobile ? (
            <div className="absolute inset-0">
              <Boxes className="opacity-60" />
            </div>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-brand-blue"></div>
          )}
        </div>
      )}
      
      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
        <motion.h1 
          className="text-5xl md:text-6xl lg:text-7xl font-serif text-white mb-6"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          {heroContent.title}
        </motion.h1>
        <motion.p 
          className="text-xl text-white/90 max-w-2xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ delay: 0.2 }}
        >
          {heroContent.subtitle}
        </motion.p>
      </div>
    </section>
  );
};

export default HeroSection;
