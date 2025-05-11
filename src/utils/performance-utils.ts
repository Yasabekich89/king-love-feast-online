
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
  
  // Check for data saver mode
  const isDataSaverOn = navigator.connection && (navigator.connection as any).saveData === true;
  
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
