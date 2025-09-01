import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const FadeIn = ({ 
  children, 
  direction = 'up', 
  delay = 0, 
  duration = 0.6,
  className = '',
  threshold = 0.1,
  triggerOnce = true,
  ...props 
}) => {
  const [ref, inView] = useInView({
    triggerOnce,
    threshold,
    rootMargin: '0px 0px -50px 0px'
  });

  const directions = {
    up: { y: 50, x: 0 },
    down: { y: -50, x: 0 },
    left: { x: -50, y: 0 },
    right: { x: 50, y: 0 },
    scale: { scale: 0.8, y: 0, x: 0 },
    rotate: { rotate: 5, y: 0, x: 0 }
  };

  const initial = directions[direction] || directions.up;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...initial }}
      animate={inView ? { opacity: 1, y: 0, x: 0, scale: 1, rotate: 0 } : {}}
      transition={{ 
        duration, 
        delay,
        ease: [0.25, 0.46, 0.45, 0.94] // Custom easing
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;
