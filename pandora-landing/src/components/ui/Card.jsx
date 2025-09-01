import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  className = '', 
  hover = true,
  glow = false,
  border = true,
  padding = 'p-6',
  onClick,
  ...props 
}) => {
  const baseClasses = `
    bg-white/5 backdrop-blur-sm rounded-2xl transition-all duration-300
    ${border ? 'border border-white/10' : ''}
    ${padding}
    ${hover ? 'hover:border-purple-500/30 hover:bg-white/10' : ''}
    ${glow ? 'hover:shadow-lg hover:shadow-purple-500/20' : ''}
    ${className}
  `;

  const MotionComponent = hover ? motion.div : 'div';

  return (
    <MotionComponent
      className={baseClasses}
      onClick={onClick}
      whileHover={hover ? { 
        y: -5, 
        scale: 1.02,
        transition: { duration: 0.2 }
      } : {}}
      whileTap={onClick ? { scale: 0.98 } : {}}
      {...props}
    >
      {children}
    </MotionComponent>
  );
};

export default Card;
