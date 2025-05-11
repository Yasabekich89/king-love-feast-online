
import React, { useState, useRef, useEffect } from 'react';
import { getOptimizedImageUrl, getOptimalImageWidth } from '@/utils/performance-utils';

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
  
  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden optimized-image-container ${containerClassName}`}
      style={{ 
        height: height ? `${height}px` : 'auto',
        maxWidth: '100%'
      }}
    >
      {/* Show a loading placeholder until the image loads */}
      {!isLoaded && !error && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      
      {/* Show error placeholder if the image fails to load */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-500">
          <span>Image not available</span>
        </div>
      )}
      
      <img
        ref={imgRef}
        src={optimizedSrc}
        alt={alt}
        className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 max-w-full`}
        loading={priority ? 'eager' : 'lazy'} 
        onLoad={handleLoad}
        onError={handleError}
        width={width}
        height={height}
        style={{ maxWidth: '100%' }}
      />
    </div>
  );
};

export default OptimizedImage;
