import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  icon,
  iconPosition = 'left',
  onClick,
  disabled = false,
  type = 'button',
  ...props 
}) => {
  const variants = {
    primary: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl',
    secondary: 'bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-sm',
    outline: 'border-2 border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white',
    ghost: 'text-white hover:bg-white/10 backdrop-blur-sm',
    danger: 'bg-gradient-to-r from-red-600 to-pink-600 text-white hover:from-red-700 hover:to-pink-700'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-7 h-7'
  };

  const baseClasses = `inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${variants[variant]} ${sizes[size]} ${className}`;

  const renderIcon = () => {
    if (!icon) return null;
    
    const iconClasses = `${iconSizes[size]} ${iconPosition === 'right' ? 'ml-2' : 'mr-2'}`;
    
    return (
      <span className={iconClasses}>
        {icon}
      </span>
    );
  };

  return (
    <motion.button
      className={baseClasses}
      onClick={onClick}
      disabled={disabled}
      type={type}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {iconPosition === 'left' && renderIcon()}
      {children}
      {iconPosition === 'right' && renderIcon()}
    </motion.button>
  );
};

export default Button;
