
"use client";
import React from "react";
import { motion } from "framer-motion";
import { LampContainer } from "./lamp";
import { useLanguage } from "@/contexts/language";
import { Utensils } from "lucide-react";

export function MenuLampDemo() {
  const { t } = useLanguage();
  
  return (
    <LampContainer>
      <Utensils className="text-brand-gold mb-4" size={32} />
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-8 bg-gradient-to-br from-white to-brand-gold/80 py-4 bg-clip-text text-center text-4xl font-serif tracking-tight text-transparent md:text-7xl"
      >
        {t('menu.title')}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.5,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-4 text-white text-center max-w-md"
      >
        {t('menu.subtitle')}
      </motion.p>
    </LampContainer>
  );
}
