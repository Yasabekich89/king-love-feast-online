
import React from "react";
import { useLanguage } from "@/contexts/language";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { 
  HeroSection,
  StorySection,
  TeamSection,
  ValuesSection,
  ExperienceSection
} from "@/components/about";

const About = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Restaurant Story */}
      <StorySection />
      
      {/* Our Team */}
      <TeamSection />
      
      {/* Our Values */}
      <ValuesSection />
      
      {/* Experience Section */}
      <ExperienceSection />
      
      <Footer />
    </div>
  );
};

export default About;
