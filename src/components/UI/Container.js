import React from 'react';
import { motion } from 'framer-motion';

const Container = ({
  children,
  className = '',
  size = 'default',
  ...props
}) => {
  const sizes = {
    sm: 'max-w-4xl',
    default: 'max-w-7xl',
    lg: 'max-w-screen-xl',
    full: 'max-w-full',
  };

  return (
    <div className={`${sizes[size]} mx-auto px-6 md:px-8 ${className}`} {...props}>
      {children}
    </div>
  );
};

export const Section = ({
  children,
  className = '',
  background = 'default',
  padding = 'default',
  ...props
}) => {
  const backgrounds = {
    default: 'bg-white dark:bg-neutral-950',
    neutral: 'bg-neutral-50 dark:bg-neutral-900',
    primary: 'bg-primary-50 dark:bg-primary-950',
    gradient: 'bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-950',
  };

  const paddings = {
    none: '',
    sm: 'py-12 md:py-16',
    default: 'py-20 md:py-32',
    lg: 'py-32 md:py-40',
  };

  return (
    <motion.section
      className={`${backgrounds[background]} ${paddings[padding]} ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      {...props}
    >
      {children}
    </motion.section>
  );
};

export default Container;

