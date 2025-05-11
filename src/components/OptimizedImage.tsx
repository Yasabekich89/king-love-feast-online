
import React, { useState, useRef, useEffect } from 'react';
import { getOptimizedImageUrl, getOptimalImageWidth } from '@/utils/performance-utils';
import { Skeleton } from '@/components/ui/skeleton';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  containerClassName?: string;
  onLoad?: () => void;
  onError?: () => void;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  containerClassName = '',
  onLoad,
  onError
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Get the container width for responsive images
  const [containerWidth, setContainerWidth] = useState<number | undefined>(undefined);
  
  useEffect(() => {
    // Get container width on mount and on resize
    const updateContainerWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    
    // Initial measurement
    updateContainerWidth();
    
    // Listen for resize events
    window.addEventListener('resize', updateContainerWidth);
    return () => window.removeEventListener('resize', updateContainerWidth);
  }, []);
  
  // Get optimized image URL
  const optimizedSrc = getOptimizedImageUrl(src, width || (containerWidth ? getOptimalImageWidth(containerWidth) : undefined));
  
  const handleLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };
  
  const handleError = () => {
    setError(true);
    if (onError) onError();
  };

  // Determine image category (for fallback)
  const getImageCategory = () => {
    if (!src) return 'generic';
    if (src.toLowerCase().includes('burger') || src.toLowerCase().includes('sandwich')) return 'burger';
    if (src.toLowerCase().includes('steak') || src.toLowerCase().includes('meat')) return 'steak';
    if (src.toLowerCase().includes('dessert') || src.toLowerCase().includes('cake')) return 'dessert';
    return 'generic';
  };

  // Fallback images by category
  const getFallbackImage = () => {
    const category = getImageCategory();
    switch(category) {
      case 'burger': return 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80';
      case 'steak': return 'https://images.unsplash.com/photo-1504973960431-1c467e159aa4?w=800&q=80';
      case 'dessert': return 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=80';
      default: return 'https://images.unsplash.com/photo-1546241072-48010ad2862c?w=800&q=80';
    }
  };
  
  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden ${containerClassName}`}
      style={{ height: height ? `${height}px` : 'auto' }}
    >
      {/* Show a loading skeleton until the image loads */}
      {!isLoaded && !error && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Skeleton className="w-full h-full" />
        </div>
      )}
      
      {/* Show error placeholder if the image fails to load */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500">
          <img 
            src={getFallbackImage()} 
            alt="Fallback" 
            className={className}
            onLoad={() => setIsLoaded(true)}
          />
        </div>
      )}
      
      <img
        ref={imgRef}
        src={optimizedSrc}
        alt={alt}
        className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        loading={priority ? 'eager' : 'lazy'} 
        onLoad={handleLoad}
        onError={handleError}
        width={width}
        height={height}
      />
    </div>
  );
};

export default OptimizedImage;
