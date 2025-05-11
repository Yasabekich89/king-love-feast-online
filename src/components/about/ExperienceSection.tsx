
import React from "react";
import { motion } from "framer-motion";
import { zoomIn, fadeIn } from "@/lib/animation-variants";
import { Button } from "@/components/ui/button";

const ExperienceSection = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-brand-blue to-slate-900 text-white">
      <div className="container mx-auto text-center max-w-4xl">
        <motion.h2 
          className="text-4xl font-serif mb-8 text-brand-gold"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={zoomIn}
        >
          The Royal Experience
        </motion.h2>
        
        <motion.p 
          className="text-xl mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          transition={{ delay: 0.2 }}
        >
          At Kings Love Meat, every visit is a celebration of exceptional flavors and premium service. 
          From the moment you step through our doors until your last delightful bite, 
          we ensure an unforgettable dining experience fit for royalty.
        </motion.p>
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          transition={{ delay: 0.4 }}
        >
          <Button size="lg" className="bg-brand-gold hover:bg-amber-600 text-white" asChild>
            <a href="/reservations">Make a Reservation</a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
