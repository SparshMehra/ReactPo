/**
 * AnimatedSection Component
 *
 * @file AnimatedSection.js
 * @author Abdiaziz Muse (A00471783) - UI revamp, animation system
 * @description Reusable component for scroll-triggered animations with nature theme.
 *              Provides 8 different animation types for consistent scroll effects across pages.
 *
 * Features:
 * - 8 animation types: fadeUp, fadeDown, slideLeft, slideRight, scale, rotate, blur, bounce
 * - Configurable delay for staggered animations
 * - Once-only animation option for performance
 * - Viewport-based triggering with margin control
 * - GPU-accelerated transforms
 * - Smooth easing functions
 *
 * @component
 * @param {React.ReactNode} children - Content to animate
 * @param {string} animation - Type of animation (fadeUp, slideLeft, slideRight, scale, etc.)
 * @param {number} delay - Animation delay in seconds
 * @param {string} className - Additional CSS classes
 * @param {boolean} once - Whether animation triggers only once (default: true)
 *
 * @returns {JSX.Element} Animated section wrapper with Framer Motion
 */

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const AnimatedSection = ({
  children,
  animation = "fadeUp",
  delay = 0,
  className = "",
  once = true
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once,
    margin: "-100px",
    amount: 0.3
  });

  // Animation variants library
  const animations = {
    fadeUp: {
      hidden: { opacity: 0, y: 60 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.8,
          delay,
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      }
    },
    fadeDown: {
      hidden: { opacity: 0, y: -60 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, delay, ease: "easeOut" }
      }
    },
    slideLeft: {
      hidden: { opacity: 0, x: -80 },
      visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.8, delay, ease: "easeOut" }
      }
    },
    slideRight: {
      hidden: { opacity: 0, x: 80 },
      visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.8, delay, ease: "easeOut" }
      }
    },
    scale: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.6, delay, ease: "easeOut" }
      }
    },
    rotate: {
      hidden: { opacity: 0, rotate: -10, scale: 0.9 },
      visible: {
        opacity: 1,
        rotate: 0,
        scale: 1,
        transition: { duration: 0.7, delay, ease: "easeOut" }
      }
    },
    blur: {
      hidden: { opacity: 0, filter: "blur(10px)" },
      visible: {
        opacity: 1,
        filter: "blur(0px)",
        transition: { duration: 0.8, delay, ease: "easeOut" }
      }
    },
    bounce: {
      hidden: { opacity: 0, y: -50 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.8,
          delay,
          type: "spring",
          bounce: 0.4
        }
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={animations[animation] || animations.fadeUp}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;

