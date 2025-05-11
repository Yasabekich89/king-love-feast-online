
import React from "react";
import { motion } from "framer-motion";
import { fadeIn, containerVariants, itemVariants } from "@/lib/animation-variants";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/language";
import { useAboutContent } from "@/hooks/use-about-content";
import { TeamMember } from "@/types/about-content";

const TeamSection = () => {
  const { language } = useLanguage();
  const { data } = useAboutContent(language);

  // Get team content or use fallback
  const teamContent = data?.team || {
    title: "Meet Our Team",
    members: [
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
    ]
  };

  // Use default members if none exist in the database
  const members = teamContent.members.length > 0 ? teamContent.members : [
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

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto">
        <motion.h2 
          className="text-4xl font-serif text-center text-brand-blue mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          {teamContent.title}
        </motion.h2>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          {members.map((member: TeamMember, index: number) => (
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
  );
};

export default TeamSection;
