
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
  
  // Check for battery saving mode if available
  const isBatterySaving = 'getBattery' in navigator && 
    (navigator as any).getBattery && 
    (navigator as any).getBattery().then((battery: any) => battery.charging === false && battery.level <= 0.2);
  
  return isMobile || prefersReducedMotion || hasLimitedCPU || isDataSaverOn || isBatterySaving;
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
  
  // Use container width, viewport width, or a sensible default
  const width = containerWidth || window.innerWidth || 640;
  
  // Calculate optimal width based on container/viewport and pixel ratio
  let optimalWidth = Math.round(width * pixelRatio);
  
  // Check if device is low-end
  const isLowEnd = hasPerformanceLimitations();
  
  // For lower-end devices, consider scaling down images to reduce memory usage
  if (isLowEnd) {
    optimalWidth = Math.min(optimalWidth, 1280); // Cap for low-end devices
  }
  
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
  // Skip optimization for data URLs, null or relative URLs
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
      
      // Add quality parameter if not already present - use lower quality for mobile
      if (!searchParams.has('q')) {
        const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
        searchParams.set('q', isMobile ? '75' : '80');
      }
      
      // Add auto format parameter for modern image formats
      if (!searchParams.has('auto')) {
        searchParams.set('auto', 'format,compress');
      }
      
      return parsedUrl.toString();
    }
    
    // For Cloudinary URLs
    if (parsedUrl.hostname.includes('cloudinary.com')) {
      // Extract path parts
      const pathParts = parsedUrl.pathname.split('/');
      
      // Check if there's already a transformation
      const uploadIndex = pathParts.findIndex(part => part === 'upload');
      if (uploadIndex !== -1) {
        const optimalWidth = width || getOptimalImageWidth();
        const transformations = `w_${optimalWidth},c_limit,q_auto,f_auto`;
        
        // Check if there's already a transformation segment after 'upload'
        if (pathParts[uploadIndex + 1]?.includes('w_') || pathParts[uploadIndex + 1]?.includes('c_')) {
          // Replace existing transformation
          pathParts[uploadIndex + 1] = transformations;
        } else {
          // Insert new transformation
          pathParts.splice(uploadIndex + 1, 0, transformations);
        }
        
        // Reconstruct URL
        parsedUrl.pathname = pathParts.join('/');
        return parsedUrl.toString();
      }
    }
    
    // For Supabase Storage URLs, we could implement resize parameters if Supabase supports it
    // This would require configuration of image resizing on the Supabase project
    
    // Return the original URL for other image sources
    return url;
  } catch (error) {
    // If there's any error in processing, return the original URL
    console.error('Error optimizing image URL:', error);
    return url;
  }
};
