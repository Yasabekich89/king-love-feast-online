
import React from "react";
import { motion } from "framer-motion";
import { fadeIn, containerVariants, itemVariants } from "@/lib/animation-variants";
import { useLanguage } from "@/contexts/language";
import { useAboutContent } from "@/hooks/use-about-content";
import { ValueItem } from "@/types/about-content";

const ValuesSection = () => {
  const { language } = useLanguage();
  const { data } = useAboutContent(language);

  // Get values content or use fallback
  const valuesContent = data?.values || {
    title: "Our Values",
    values: [
      {
        title: "Premium Quality",
        description: "We source only the finest meats from trusted suppliers who share our commitment to quality.",
        color: "from-purple-500 to-purple-800"
      },
      {
        title: "Royal Experience",
        description: "Every guest deserves to dine like royalty, with impeccable service and an elegant atmosphere.",
        color: "from-amber-500 to-amber-800"
      },
      {
        title: "Culinary Excellence",
        description: "Our chefs combine traditional techniques with innovative approaches to create unforgettable flavors.",
        color: "from-blue-500 to-blue-800"
      },
      {
        title: "Community Connection",
        description: "We're proud to be part of the local community, supporting regional producers and initiatives.",
        color: "from-emerald-500 to-emerald-800"
      }
    ]
  };

  // Use default values if none exist in the database
  const values = valuesContent.values.length > 0 ? valuesContent.values : [
    {
      title: "Premium Quality",
      description: "We source only the finest meats from trusted suppliers who share our commitment to quality.",
      color: "from-purple-500 to-purple-800"
    },
    {
      title: "Royal Experience",
      description: "Every guest deserves to dine like royalty, with impeccable service and an elegant atmosphere.",
      color: "from-amber-500 to-amber-800"
    },
    {
      title: "Culinary Excellence",
      description: "Our chefs combine traditional techniques with innovative approaches to create unforgettable flavors.",
      color: "from-blue-500 to-blue-800"
    },
    {
      title: "Community Connection",
      description: "We're proud to be part of the local community, supporting regional producers and initiatives.",
      color: "from-emerald-500 to-emerald-800"
    }
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <motion.h2 
          className="text-4xl font-serif text-center text-brand-blue mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          {valuesContent.title}
        </motion.h2>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          {values.map((value: ValueItem, index: number) => (
            <motion.div key={index} variants={itemVariants}>
              <div className={`rounded-lg p-6 h-full bg-gradient-to-br ${value.color} text-white shadow-lg`}>
                <h3 className="text-2xl font-serif mb-4">{value.title}</h3>
                <p>{value.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ValuesSection;
