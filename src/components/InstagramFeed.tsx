
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Instagram } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

// Mock Instagram posts as we don't have real API integration yet
const mockInstagramPosts = [
  {
    id: 'post1',
    imageUrl: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9',
    caption: 'Our signature King\'s Ribeye steak, perfectly grilled to perfection. #KingsLoveMeat #PremiumSteaks',
    likes: 120,
    timestamp: '2023-05-08T14:35:00Z',
  },
  {
    id: 'post2',
    imageUrl: 'https://images.unsplash.com/photo-1493962853295-0fd70327578a',
    caption: 'Quality starts with the source. Premium beef from the finest farms. #Quality #PremiumMeat',
    likes: 97,
    timestamp: '2023-05-05T11:22:00Z',
  },
  {
    id: 'post3',
    imageUrl: 'https://images.unsplash.com/photo-1465379944081-7f47de8d74ac',
    caption: 'Royal dining experience awaits you. Book your table today! #DiningExperience #LuxuryDining',
    likes: 145,
    timestamp: '2023-05-02T18:15:00Z',
  },
];

const InstagramFeed: React.FC = () => {
  const { language, t } = useLanguage();
  const [posts, setPosts] = useState(mockInstagramPosts);
  
  // In a real implementation, you would fetch actual Instagram posts here
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('instagram.title')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{t('instagram.subtitle')}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Card key={post.id} className="overflow-hidden group">
              <div className="relative overflow-hidden">
                <img 
                  src={post.imageUrl} 
                  alt="Instagram post" 
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <a 
                    href="https://www.instagram.com/kingslovemeat" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white hover:text-brand-gold transition-colors"
                  >
                    <Instagram size={32} />
                  </a>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-600 text-sm line-clamp-2">{post.caption}</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xs text-gray-500">
                    {new Date(post.timestamp).toLocaleDateString(
                      language === 'en' ? 'en-US' : 
                      language === 'am' ? 'hy-AM' : 'ru-RU'
                    )}
                  </span>
                  <span className="text-xs text-gray-500">♥ {post.likes}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <a 
            href="https://www.instagram.com/kingslovemeat" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center text-brand-blue hover:text-brand-gold transition-colors"
          >
            <Instagram size={18} className="mr-2" />
            @kingslovemeat
          </a>
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;
