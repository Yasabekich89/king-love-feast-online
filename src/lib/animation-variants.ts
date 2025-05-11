
import { Variants } from "framer-motion";

// Staggered entrance for list items
export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    }
  }
};

export const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 }
  }
};

// Fade in animation with more vibrant transform
export const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

// Zoom and fade animation with more bounce
export const zoomIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { type: "spring", stiffness: 100, delay: 0.2 }
  }
};

// Slide in from right with enhanced spring
export const slideInRight: Variants = {
  hidden: { x: 100, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 14 }
  }
};

// Slide in from left with enhanced spring
export const slideInLeft: Variants = {
  hidden: { x: -100, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 14 }
  }
};

// Text reveal character by character
export const textReveal: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03
    }
  }
};

export const letterVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 150 }
  }
};

// Magnetic button hover effect
export const magneticHover = (e: React.MouseEvent<HTMLElement>, ref: React.RefObject<HTMLElement>) => {
  if (!ref.current) return;
  
  const { clientX, clientY } = e;
  const { left, top, width, height } = ref.current.getBoundingClientRect();
  
  const x = clientX - (left + width / 2);
  const y = clientY - (top + height / 2);
  
  ref.current.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
};

export const magneticExit = (ref: React.RefObject<HTMLElement>) => {
  if (!ref.current) return;
  ref.current.style.transform = `translate(0px, 0px)`;
};

// New colorful animations
export const pulseAnimation: Variants = {
  hidden: { opacity: 0.8, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.5,
      repeat: Infinity,
      repeatType: "reverse"
    }
  }
};

export const colorShift: Variants = {
  hidden: { backgroundColor: "#1E293B" },
  visible: {
    backgroundColor: ["#1E293B", "#9b87f5", "#D946EF", "#0EA5E9", "#1E293B"],
    transition: { 
      duration: 5, 
      repeat: Infinity,
      repeatType: "reverse" 
    }
  }
};

export const rotateIn: Variants = {
  hidden: { opacity: 0, rotate: -15, scale: 0.95 },
  visible: {
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: { type: "spring", damping: 10, stiffness: 100 }
  }
};

export const floatAnimation: Variants = {
  hidden: { y: 0 },
  visible: {
    y: [-5, 5, -5],
    transition: { 
      duration: 3, 
      repeat: Infinity,
      ease: "easeInOut" 
    }
  }
};
