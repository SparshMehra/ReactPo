/**
 * AnimatedSection Component
 *
 * @file AnimatedSection.js
 * @author Abdiaziz Muse (A00471783) - UI revamp, scroll animations, accessibility
 * @description Reusable section wrapper that reveals content on scroll with
 *              subtle motion. Respects prefers-reduced-motion.
 */
import React from 'react';
import { motion, useInView } from 'framer-motion';

const AnimatedSection = ({
  children,
  className = '',
  as: Tag = 'div',
  delay = 0,
  y = 24,
  duration = 0.6,
}) => {
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const prefersReduced = typeof window !== 'undefined' &&
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const variants = prefersReduced
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : { hidden: { opacity: 0, y }, visible: { opacity: 1, y: 0 } };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{ duration, delay, ease: 'easeOut' }}
      className={className}
      as={Tag}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
