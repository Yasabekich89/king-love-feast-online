
import React from "react";
import { motion } from "framer-motion";
import { containerVariants, slideInLeft, slideInRight } from "@/lib/animation-variants";
import { CommitsGridDemo } from "@/components/ui/commits-grid-demo";

const StorySection = () => {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <motion.div 
          className="flex flex-col md:flex-row items-center gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.div 
            className="w-full md:w-1/2"
            variants={slideInLeft}
          >
            <h2 className="text-4xl font-serif text-brand-blue mb-6">Our Beginning</h2>
            <p className="text-gray-700 mb-4">
              Kings Love Meat was founded in 2018 with a simple mission: to provide an exceptional dining experience 
              centered around premium quality meats prepared to perfection.
            </p>
            <p className="text-gray-700 mb-4">
              Starting as a small family restaurant with a passion for the perfect steak, we've grown into 
              a destination for meat lovers seeking royal treatment and unforgettable flavors.
            </p>
            <p className="text-gray-700">
              Our commitment to sourcing the finest cuts, employing skilled chefs, and creating an elegant 
              atmosphere has earned us recognition as one of the premier steakhouses in the region.
            </p>
          </motion.div>
          <motion.div 
            className="w-full md:w-1/2"
            variants={slideInRight}
          >
            <div className="rounded-lg overflow-hidden shadow-2xl">
              <CommitsGridDemo />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default StorySection;
