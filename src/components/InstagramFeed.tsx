
import React, { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Instagram } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel';

// Function to load Instagram embed script
const loadInstagramEmbedScript = () => {
  // Check if script is already loaded
  if (document.getElementById('instagram-embed-script')) {
    // If already loaded, just run the embed.js function to process any new embeds
    if (window.instgrm) {
      window.instgrm.Embeds.process();
    }
    return;
  }
  
  // Create script
  const script = document.createElement('script');
  script.id = 'instagram-embed-script';
  script.src = '//www.instagram.com/embed.js';
  script.async = true;
  document.body.appendChild(script);
};

const InstagramFeed: React.FC = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();

  useEffect(() => {
    // Load Instagram embed script when component mounts
    loadInstagramEmbedScript();
  }, []);

  // Instagram post data
  const instagramPosts = [
    {
      id: 1,
      permalink: "https://www.instagram.com/reel/DJcV8QtMvsA/",
    },
    {
      id: 2,
      permalink: "https://www.instagram.com/reel/DJYdSxHshNP/",
    },
    {
      id: 3,
      permalink: "https://www.instagram.com/reel/DJUGrhvMBbL/",
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('instagram.title')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{t('instagram.subtitle')}</p>
          <div className="gold-divider mt-4"></div>
        </div>
        
        {isMobile ? (
          <div className="relative">
            <Carousel className="w-full">
              <CarouselContent>
                {instagramPosts.map((post) => (
                  <CarouselItem key={post.id}>
                    <div className="px-2">
                      <div className="instagram-post-container transform transition-all duration-300 hover:translate-y-[-5px] h-full">
                        <blockquote 
                          className="instagram-media rounded-lg overflow-hidden shadow-lg border-2 border-brand-gold" 
                          data-instgrm-permalink={post.permalink}
                          data-instgrm-version="14"
                          style={{ background: '#FFF', maxWidth: '100%', width: '100%' }}
                        ></blockquote>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2 lg:left-4" />
              <CarouselNext className="right-2 lg:right-4" />
            </Carousel>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Instagram Posts Container - Using the provided embed codes but with custom styling */}
            <div className="instagram-post-container transform transition-all duration-300 hover:translate-y-[-5px]">
              <blockquote 
                className="instagram-media rounded-lg overflow-hidden shadow-lg border-2 border-brand-gold" 
                data-instgrm-permalink="https://www.instagram.com/reel/DJcV8QtMvsA/"
                data-instgrm-version="14"
                style={{ background: '#FFF', maxWidth: '100%', width: '100%' }}
              ></blockquote>
            </div>
            
            <div className="instagram-post-container transform transition-all duration-300 hover:translate-y-[-5px]">
              <blockquote 
                className="instagram-media rounded-lg overflow-hidden shadow-lg border-2 border-brand-gold" 
                data-instgrm-permalink="https://www.instagram.com/reel/DJYdSxHshNP/"
                data-instgrm-version="14"
                style={{ background: '#FFF', maxWidth: '100%', width: '100%' }}
              ></blockquote>
            </div>
            
            <div className="instagram-post-container transform transition-all duration-300 hover:translate-y-[-5px]">
              <blockquote 
                className="instagram-media rounded-lg overflow-hidden shadow-lg border-2 border-brand-gold" 
                data-instgrm-permalink="https://www.instagram.com/reel/DJUGrhvMBbL/"
                data-instgrm-version="14"
                style={{ background: '#FFF', maxWidth: '100%', width: '100%' }}
              ></blockquote>
            </div>
          </div>
        )}
        
        <div className="text-center mt-10">
          <a 
            href="https://www.instagram.com/kingslovemeat" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 rounded-md bg-brand-gold text-white hover:bg-brand-blue transition-colors duration-300"
          >
            <Instagram size={18} className="mr-2" />
            {t('instagram.followUs')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;
