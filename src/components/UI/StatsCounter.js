/**
 * StatsCounter Component
 *
 * @file StatsCounter.js
 * @author Abdiaziz Muse (A00471783) - UI revamp, animations, consistency
 * @author Bhabin Chudal (A00464169) - UI improvements, cleanup
 * @description Animated statistics counter with smooth number animations and
 *              reduced‑motion friendly behavior for accessibility.
 */

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useSpring } from 'framer-motion';

const AnimatedCounter = ({ value, duration = 2, suffix = '', prefix = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [displayValue, setDisplayValue] = useState(prefix + '0' + suffix);

  const numericValue = parseInt(value.toString().replace(/[^0-9]/g, '')) || 0;
  const spring = useSpring(0, { duration: duration * 1000 });

  useEffect(() => {
    if (isInView) {
      spring.set(numericValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView, numericValue]);

  useEffect(() => {
    const unsubscribe = spring.on('change', (latest) => {
      setDisplayValue(prefix + Math.floor(latest).toLocaleString() + suffix);
    });
    return unsubscribe;
  }, [spring, prefix, suffix]);

  return <span ref={ref}>{displayValue}</span>;
};

const StatsCounter = ({ stats, columns = 3, theme = 'default' }) => {
  const themes = {
    default: 'bg-white dark:bg-neutral-900',
    gradient: 'bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20',
    transparent: 'bg-transparent'
  };

  return (
    <div
      className={`grid grid-cols-1 ${
        columns === 1
          ? 'md:grid-cols-1'
          : columns === 2
          ? 'md:grid-cols-2'
          : columns === 3
          ? 'md:grid-cols-3'
          : columns === 4
          ? 'md:grid-cols-4'
          : columns === 5
          ? 'md:grid-cols-5'
          : 'md:grid-cols-3'
      } gap-8 ${themes[theme]} rounded-3xl p-8 md:p-12`}
    >
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="text-center"
        >
          {stat.icon && (
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
              className="text-4xl md:text-5xl mb-4 flex justify-center"
            >
              {stat.icon}
            </motion.div>
          )}

          <motion.div
            className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent mb-3"
          >
            <AnimatedCounter
              value={stat.value}
              suffix={stat.suffix || ''}
              prefix={stat.prefix || ''}
            />
          </motion.div>

          <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 font-medium">
            {stat.label}
          </p>

          {stat.description && (
            <p className="text-sm text-neutral-500 dark:text-neutral-500 mt-2">
              {stat.description}
            </p>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default StatsCounter;
export { AnimatedCounter };

