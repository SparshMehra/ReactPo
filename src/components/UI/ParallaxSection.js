/**
 * ParallaxSection Component
 *
 * @file ParallaxSection.js
 * @author Abdiaziz Muse (A00471783) - UI revamp, animations, consistency
 * @author Bhabin Chudal (A00464169) - UI improvements, cleanup
 * @description Create immersive parallax scrolling effects with background images.
 */

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ParallaxSection = ({
  imageUrl,
  children,
  height = '60vh',
  overlay = true,
  overlayOpacity = 0.5,
  speed = 0.5
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 100}%`]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);

  return (
    <div
      ref={ref}
      className="relative overflow-hidden"
      style={{ height }}
    >
      <motion.div
        className="absolute inset-0 w-full h-[120%]"
        style={{ y }}
      >
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
      </motion.div>

      {overlay && (
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"
          style={{ opacity: overlayOpacity }}
        />
      )}

      <motion.div
        className="relative z-10 h-full flex items-center justify-center"
        style={{ opacity }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ParallaxSection;

