import { Variants } from "framer-motion";

// Common animation variants for framer-motion
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.6
    }
  }
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6
    }
  }
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6
    }
  }
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.6
    }
  }
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.6
    }
  }
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.6
    }
  }
};

// Animation settings for react-awesome-reveal
export const revealConfig = {
  triggerOnce: true,
  cascade: true,
  damping: 0.5,
  duration: 1000
};

// Helper function to add delay to animations
export const withDelay = (variant: Variants, delay: number): Variants => {
  const newVariant = { ...variant };
  if (newVariant.visible && typeof newVariant.visible === 'object') {
    newVariant.visible = {
      ...newVariant.visible,
      transition: {
        ...(newVariant.visible as any).transition,
        delay
      }
    };
  }
  return newVariant;
};

// Helper function to create staggered animations
export const createStaggeredAnimation = (children: number, staggerDelay: number = 0.1): Variants => {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.2,
        duration: 0.5
      }
    }
  };
}; 