
/**
 * Check if the device has limitations that would affect animation performance
 * @returns boolean
 */
export const hasPerformanceLimitations = (): boolean => {
  // Check if we're in a browser environment
  if (typeof window === 'undefined') return true;
  
  // Check for mobile device
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
  
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // Check for low-end devices (approximation)
  const hasLimitedCPU = navigator.hardwareConcurrency !== undefined && navigator.hardwareConcurrency <= 4;
  
  // Check for data saver mode - safely access connection API
  const isDataSaverOn = 
    'connection' in navigator && 
    (navigator as any).connection?.saveData === true;
  
  return isMobile || prefersReducedMotion || hasLimitedCPU || isDataSaverOn;
};

/**
 * Check if the browser supports the Intersection Observer API
 * @returns boolean
 */
export const supportsIntersectionObserver = (): boolean => {
  return typeof IntersectionObserver !== 'undefined';
};

/**
 * Log performance metrics to console in development mode
 * @param metricName The name of the metric
 * @param value The metric value
 */
export const logPerformanceMetric = (metricName: string, value: number): void => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`Performance metric - ${metricName}: ${value}`);
  }
};

/**
 * Calculate the appropriate image size based on viewport and device pixel ratio
 * @param containerWidth Width of the container (default: viewport width)
 * @returns The optimal image width to request
 */
export const getOptimalImageWidth = (containerWidth?: number): number => {
  if (typeof window === 'undefined') return 1200; // Fallback for SSR

  // Get device pixel ratio (default to 1 if not available)
  const pixelRatio = window.devicePixelRatio || 1;
  
  // Use container width or viewport width
  const width = containerWidth || window.innerWidth;
  
  // Calculate optimal width based on container/viewport and pixel ratio
  let optimalWidth = Math.round(width * pixelRatio);
  
  // Cap at reasonable sizes to prevent unnecessarily large images
  const breakpoints = [320, 640, 768, 1024, 1280, 1536, 2048, 3840];
  
  // Find the smallest breakpoint that is larger than our calculated width
  for (const breakpoint of breakpoints) {
    if (breakpoint >= optimalWidth) {
      return breakpoint;
    }
  }
  
  // If we didn't find a suitable breakpoint, use the largest one
  return breakpoints[breakpoints.length - 1];
};

/**
 * Generate a responsive image URL with width parameter
 * @param url Original image URL
 * @param width Target width
 * @returns Optimized image URL
 */
export const getOptimizedImageUrl = (url: string, width?: number): string => {
  // Skip optimization for data URLs or relative URLs
  if (!url || url.startsWith('data:') || url.startsWith('/')) {
    return url;
  }
  
  try {
    // Parse the URL
    const parsedUrl = new URL(url);
    
    // Check if URL is from common CDNs that support on-the-fly resizing
    if (parsedUrl.hostname.includes('unsplash.com')) {
      // Unsplash already has a built-in optimization API
      const optimalWidth = width || getOptimalImageWidth();
      const searchParams = parsedUrl.searchParams;
      
      // Update or add width parameter for Unsplash images
      if (!searchParams.has('w')) {
        searchParams.set('w', optimalWidth.toString());
      }
      
      // Add quality parameter if not already present
      if (!searchParams.has('q')) {
        searchParams.set('q', '80');
      }
      
      // Add auto format parameter for better format selection
      if (!searchParams.has('auto')) {
        searchParams.set('auto', 'format,compress');
      }
      
      return parsedUrl.toString();
    }
    
    // For Supabase Storage URLs
    if (parsedUrl.hostname.includes('supabase.co') || 
        parsedUrl.pathname.includes('storage/v1')) {
      
      // Check if the URL already has a transform parameter
      if (!parsedUrl.pathname.includes('transform') && 
          (parsedUrl.pathname.includes('.jpg') || 
           parsedUrl.pathname.includes('.jpeg') || 
           parsedUrl.pathname.includes('.png') || 
           parsedUrl.pathname.includes('.webp'))) {
        
        // Add width parameter if Supabase image transformations are enabled
        // Note: This requires image transformations to be enabled in the Supabase project
        const optimalWidth = width || getOptimalImageWidth();
        
        // Some Supabase projects support transform parameter
        // Format: /storage/v1/transform/width=500,quality=80/object/...
        const transformPath = `/storage/v1/transform/width=${optimalWidth},quality=80`;
        const objectPath = parsedUrl.pathname.replace('/storage/v1/object', '');
        
        // Only try to apply transform if the URL looks like a storage URL
        if (objectPath !== parsedUrl.pathname) {
          // Create a new URL with the transform path
          parsedUrl.pathname = `${transformPath}/object${objectPath}`;
          return parsedUrl.toString();
        }
      }
    }
    
    // Return the original URL for other image sources
    return url;
  } catch (error) {
    // If there's any error in processing, return the original URL
    console.error('Error optimizing image URL:', error);
    return url;
  }
};
