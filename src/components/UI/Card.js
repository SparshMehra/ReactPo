/**
 * Card Component
 *
 * @file Card.js
 * @author Abdiaziz Muse (A00471783) - UI revamp, animations, consistency
 * @author Bhabin Chudal (A00464169) - UI improvements, cleanup
 * @description Reusable animated card with padding options and hover effects.
 */
import React from 'react';
import { motion } from 'framer-motion';

const Card = ({
  children,
  className = '',
  interactive = false,
  hoverable = true,
  padding = 'default',
  ...props
}) => {
  const baseStyles = 'bg-white dark:bg-neutral-900 rounded-2xl shadow-soft border border-neutral-200 dark:border-neutral-800 transition-all duration-300 ease-out';

  const interactiveStyles = interactive
    ? 'cursor-pointer hover:border-primary-300 dark:hover:border-primary-700'
    : '';

  const hoverStyles = hoverable
    ? 'hover:shadow-soft-lg hover:-translate-y-1'
    : '';

  const paddingStyles = {
    none: '',
    sm: 'p-4',
    default: 'p-6',
    lg: 'p-8',
    xl: 'p-10',
  };

  return (
    <motion.div
      className={`${baseStyles} ${interactiveStyles} ${hoverStyles} ${paddingStyles[padding]} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;

