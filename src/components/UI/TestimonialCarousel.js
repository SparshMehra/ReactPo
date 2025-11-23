// Author: Frontend Enhancement - Testimonial Carousel
// Purpose: Beautiful animated testimonial slider with images

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaQuoteLeft, FaStar } from 'react-icons/fa';

const TestimonialCard = ({ testimonial }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <div className="max-w-4xl mx-auto">
        <div className="relative bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-900 dark:to-neutral-800 rounded-3xl p-8 md:p-12 shadow-2xl">
          {/* Quote Icon */}
          <div className="absolute top-6 left-6 text-6xl text-primary-200 dark:text-primary-900 opacity-50">
            <FaQuoteLeft />
          </div>

          {/* Content */}
          <div className="relative z-10">
            {/* Stars */}
            {testimonial.rating && (
              <div className="flex gap-1 mb-4 justify-center">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`text-2xl ${
                      i < testimonial.rating
                        ? 'text-yellow-400'
                        : 'text-neutral-300 dark:text-neutral-700'
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Quote */}
            <p className="text-xl md:text-2xl lg:text-3xl text-center text-neutral-700 dark:text-neutral-300 mb-8 font-medium leading-relaxed">
              "{testimonial.quote}"
            </p>

            {/* Author */}
            <div className="flex items-center justify-center gap-4">
              {testimonial.image && (
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="w-16 h-16 rounded-full object-cover border-4 border-primary-400 shadow-lg"
                />
              )}
              <div className="text-center md:text-left">
                <p className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                  {testimonial.author}
                </p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {testimonial.role}
                </p>
                {testimonial.location && (
                  <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-1">
                    📍 {testimonial.location}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-400 to-accent-400 opacity-10 rounded-tl-full blur-2xl" />
        </div>
      </div>
    </motion.div>
  );
};

const TestimonialCarousel = ({ testimonials, autoPlay = true, interval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleDotClick = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      handleNext();
    }, interval);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, autoPlay, interval]);

  return (
    <div className="relative py-12">
      {/* Testimonial */}
      <AnimatePresence mode="wait" custom={direction}>
        <TestimonialCard
          key={currentIndex}
          testimonial={testimonials[currentIndex]}
        />
      </AnimatePresence>

      {/* Navigation Arrows */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePrev}
          className="w-12 h-12 rounded-full bg-white dark:bg-neutral-800 shadow-lg flex items-center justify-center text-neutral-700 dark:text-neutral-300 hover:bg-primary-500 hover:text-white transition-colors duration-300"
        >
          <FaChevronLeft />
        </motion.button>

        {/* Dots */}
        <div className="flex gap-2">
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleDotClick(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? 'w-12 h-3 bg-gradient-to-r from-primary-500 to-accent-500'
                  : 'w-3 h-3 bg-neutral-300 dark:bg-neutral-700'
              }`}
            />
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNext}
          className="w-12 h-12 rounded-full bg-white dark:bg-neutral-800 shadow-lg flex items-center justify-center text-neutral-700 dark:text-neutral-300 hover:bg-primary-500 hover:text-white transition-colors duration-300"
        >
          <FaChevronRight />
        </motion.button>
      </div>

      {/* Progress Bar */}
      {autoPlay && (
        <div className="mt-6 max-w-md mx-auto h-1 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
          <motion.div
            key={currentIndex}
            className="h-full bg-gradient-to-r from-primary-500 to-accent-500"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: interval / 1000, ease: 'linear' }}
          />
        </div>
      )}
    </div>
  );
};

export default TestimonialCarousel;

