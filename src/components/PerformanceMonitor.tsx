
import React, { useEffect } from 'react';

// Simple Web Vitals monitoring
const PerformanceMonitor: React.FC = () => {
  useEffect(() => {
    // Only run in production and only for a sample of users
    if (process.env.NODE_ENV !== 'production') {
      console.log('Performance monitoring active in development mode');
      
      // Log First Contentful Paint
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const metric = entry as PerformanceEntry;
          console.log(`FCP: ${metric.startTime}`);
        }
      });
      observer.observe({ type: 'paint', buffered: true });
      
      // Log Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log(`LCP: ${lastEntry.startTime}`);
      });
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
      
      // Log Cumulative Layout Shift
      const clsObserver = new PerformanceObserver((list) => {
        let clsScore = 0;
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsScore += (entry as any).value;
          }
        }
        console.log(`CLS: ${clsScore}`);
      });
      clsObserver.observe({ type: 'layout-shift', buffered: true });
      
      return () => {
        observer.disconnect();
        lcpObserver.disconnect();
        clsObserver.disconnect();
      };
    }
  }, []);

  // This is a utility component that doesn't render anything
  return null;
};

export default PerformanceMonitor;
