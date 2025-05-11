
import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/language";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CommitsGridDemo } from "@/components/ui/commits-grid-demo";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Boxes } from "@/components/ui/background-boxes";
import { fadeIn, containerVariants, itemVariants, zoomIn, slideInLeft, slideInRight } from "@/lib/animation-variants";

// Team member type
type TeamMember = {
  name: string;
  role: string;
  bio: string;
};

const About = () => {
  const { t } = useLanguage();
  
  // Team members data
  const teamMembers: TeamMember[] = [
    {
      name: "Alexander King",
      role: "Executive Chef",
      bio: "With over 15 years of experience in premium steakhouses across Europe, Alex brings exceptional culinary expertise to every dish."
    },
    {
      name: "Isabella Royal",
      role: "Restaurant Manager",
      bio: "Isabella ensures every guest receives the royal treatment with her impeccable attention to detail and hospitality expertise."
    },
    {
      name: "Michael Stone",
      role: "Head Butcher",
      bio: "A third-generation butcher, Michael selects only the finest cuts of meat, ensuring premium quality in every serving."
    }
  ];
  
  // Core values
  const values = [
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
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
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
      
      {/* Restaurant Story */}
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
      
      {/* Our Team */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <motion.h2 
            className="text-4xl font-serif text-center text-brand-blue mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            Meet Our Team
          </motion.h2>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            {teamMembers.map((member, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-brand-gold to-amber-600 mx-auto mb-4 flex items-center justify-center">
                      <span className="text-3xl text-white font-serif">{member.name.charAt(0)}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-center mb-1">{member.name}</h3>
                    <p className="text-brand-gold text-center mb-4">{member.role}</p>
                    <p className="text-gray-600 text-center">{member.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Our Values */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <motion.h2 
            className="text-4xl font-serif text-center text-brand-blue mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            Our Values
          </motion.h2>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            {values.map((value, index) => (
              <motion.div key={index} variants={itemVariants}>
                <div className="rounded-lg p-6 h-full bg-gradient-to-br text-white shadow-lg" 
                     style={{ backgroundImage: `linear-gradient(135deg, var(--tw-gradient-stops))` }}
                     className={`rounded-lg p-6 h-full bg-gradient-to-br ${value.color} text-white shadow-lg`}>
                  <h3 className="text-2xl font-serif mb-4">{value.title}</h3>
                  <p>{value.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Experience Section */}
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
      
      <Footer />
    </div>
  );
};

export default About;
