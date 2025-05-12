
import React, { useState, useRef, useEffect } from 'react';
import { getOptimizedImageUrl, getOptimalImageWidth, hasPerformanceLimitations } from '@/utils/performance-utils';

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
  sizes?: string;
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
  onError,
  sizes = '100vw'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Get the container width for responsive images
  const [containerWidth, setContainerWidth] = useState<number | undefined>(undefined);
  
  // Check performance limitations
  const hasLimitations = hasPerformanceLimitations();
  
  useEffect(() => {
    // Get container width on mount and on resize
    const updateContainerWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    
    // Initial measurement
    updateContainerWidth();
    
    // Create a throttled resize handler
    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        updateContainerWidth();
      }, 100);
    };
    
    // Listen for resize events
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimeout) clearTimeout(resizeTimeout);
    };
  }, []);
  
  // Determine dimensions to use for responsive image
  const responsiveWidth = width || (containerWidth ? getOptimalImageWidth(containerWidth) : undefined);
  
  // Generate different size variants for responsive loading
  const generateSrcSet = () => {
    if (!src) return undefined;
    
    // Skip for data URLs, already optimized images or if limitations are detected
    if (src.startsWith('data:') || hasLimitations) return undefined;
    
    const breakpoints = [320, 640, 768, 1024, 1280, 1536];
    return breakpoints
      .map(bp => `${getOptimizedImageUrl(src, bp)} ${bp}w`)
      .join(', ');
  };
  
  // Get optimized image URL for the main src
  const optimizedSrc = getOptimizedImageUrl(src, responsiveWidth);
  const srcSet = generateSrcSet();
  
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
      className={`relative overflow-hidden ${containerClassName}`}
      style={{ 
        height: height ? `${height}px` : 'auto',
        aspectRatio: !height && width ? `${width} / ${Math.floor(width * 0.75)}` : undefined 
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
        srcSet={srcSet}
        sizes={sizes}
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
