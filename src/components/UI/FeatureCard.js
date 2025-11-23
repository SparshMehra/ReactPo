// Author: Frontend Enhancement - Feature Card Component
// Purpose: Beautiful animated feature cards with icons and hover effects

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const FeatureCard = ({
  icon,
  title,
  description,
  link,
  color = 'primary',
  imageUrl,
  size = 'default'
}) => {
  const colorClasses = {
    primary: {
      bg: 'from-primary-500 to-primary-600',
      iconBg: 'bg-primary-100 dark:bg-primary-900',
      iconText: 'text-primary-600 dark:text-primary-400',
      button: 'bg-primary-600 hover:bg-primary-700'
    },
    success: {
      bg: 'from-green-500 to-green-600',
      iconBg: 'bg-green-100 dark:bg-green-900',
      iconText: 'text-green-600 dark:text-green-400',
      button: 'bg-green-600 hover:bg-green-700'
    },
    accent: {
      bg: 'from-accent-500 to-accent-600',
      iconBg: 'bg-accent-100 dark:bg-accent-900',
      iconText: 'text-accent-600 dark:text-accent-400',
      button: 'bg-accent-600 hover:bg-accent-700'
    }
  };

  const colors = colorClasses[color] || colorClasses.primary;

  const cardContent = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
      className="card group h-full relative overflow-hidden cursor-pointer"
    >
      {/* Background Image */}
      {imageUrl && (
        <div className="absolute inset-0 z-0">
          <motion.div
            className="w-full h-full bg-cover bg-center opacity-10 dark:opacity-5"
            style={{ backgroundImage: `url(${imageUrl})` }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6 }}
          />
        </div>
      )}

      {/* Gradient Overlay */}
      <motion.div
        className={`absolute top-0 right-0 w-32 h-32 rounded-full bg-gradient-to-br ${colors.bg} opacity-10 blur-3xl`}
        whileHover={{ scale: 1.5 }}
        transition={{ duration: 0.6 }}
      />

      <div className="relative z-10">
        {/* Icon */}
        <motion.div
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.6 }}
          className={`w-16 h-16 ${colors.iconBg} ${colors.iconText} rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-soft`}
        >
          {icon}
        </motion.div>

        {/* Title */}
        <h3 className={`${size === 'large' ? 'heading-md' : 'heading-sm'} mb-4 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors`}>
          {title}
        </h3>

        {/* Description */}
        <p className="body-base text-neutral-600 dark:text-neutral-400 mb-6">
          {description}
        </p>

        {/* Arrow */}
        {link && (
          <motion.div
            className="flex items-center gap-2 text-primary-600 dark:text-primary-400 font-semibold"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            <span>Learn More</span>
            <FaArrowRight />
          </motion.div>
        )}
      </div>

      {/* Hover Effect Border */}
      <motion.div
        className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${colors.bg}`}
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );

  return link ? (
    <Link to={link} className="block h-full">
      {cardContent}
    </Link>
  ) : (
    cardContent
  );
};

export default FeatureCard;

