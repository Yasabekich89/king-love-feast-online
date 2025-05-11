
import React from "react";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/animation-variants";
import { Boxes } from "@/components/ui/background-boxes";

const HeroSection = () => {
  return (
    <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Background animation */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-brand-blue/70 z-10" />
        <div className="absolute inset-0">
          <Boxes className="opacity-60" />
        </div>
      </div>
      
      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
        <motion.h1 
          className="text-5xl md:text-6xl lg:text-7xl font-serif text-white mb-6"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          Our Story
        </motion.h1>
        <motion.p 
          className="text-xl text-white/90 max-w-2xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ delay: 0.2 }}
        >
          Where passion for premium meat meets exceptional dining experience
        </motion.p>
      </div>
    </section>
  );
};

export default HeroSection;
