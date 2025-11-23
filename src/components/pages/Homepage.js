/**
 * Homepage Component
 *
 * @file Homepage.js
 * @author Bhabin Chudal (A00464169) - Code cleanup, UI improvements
 * @author Abdiaziz Muse (A00471783) - UI revamp, nature theme integration, animations
 * @author Lakshay Bansal (A00467478)
 * @author Marko Ostrovitsa (A00448932)
 * @description Modern homepage with hero section, features, parallax effects,
 *              animated statistics, and call-to-action sections.
 *
 * Features:
 * - Responsive hero section with animated scroll indicator
 * - Nature-themed gradient backgrounds throughout
 * - Parallax scrolling effects
 * - Animated statistics with large gradient numbers
 * - Feature cards with hover animations
 * - Testimonial carousel
 * - Dark mode support with adaptive gradients
 *
 * @param {boolean} dark - Current dark mode state
 * @returns {JSX.Element} Homepage with comprehensive animations and modern UI
 */
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import dayBackground from "../../assets/forest1.png";
import nightBackground from "../../assets/nightforest.png";
import { FaTree, FaLeaf, FaSeedling, FaMapMarkedAlt, FaCalendarAlt, FaUsers } from "react-icons/fa";
import { BsArrowRightCircle } from "react-icons/bs";
import Button from "../UI/Button";
import Card from "../UI/Card";
import Container, { Section } from "../UI/Container";
import Badge from "../UI/Badge";
import ParallaxSection from "../UI/ParallaxSection";
import StatsCounter from "../UI/StatsCounter";
import FeatureCard from "../UI/FeatureCard";
import TestimonialCarousel from "../UI/TestimonialCarousel";
import forestImage from "../../assets/forest1.png"; // Using forest1.png instead of deleted forest.jpg
import hikingImage from "../../assets/hiking.png";
import birchImage from "../../assets/birch.png";
import outlookImage from "../../assets/outlook.jpg";


const Homepage = ({ dark }) => {
  const features = [
    {
      icon: <FaTree />,
      title: "Explore Nature",
      description: "Discover trails, wildlife, and serene spots for relaxation and connection with nature.",
      color: "primary",
      link: "/gallery",
    },
    {
      icon: <FaLeaf />,
      title: "Conservation Education",
      description: "Attend workshops on sustainability, biodiversity, and environmental protection.",
      color: "success",
      link: "/about",
    },
    {
      icon: <FaSeedling />,
      title: "Volunteer & Support",
      description: "Join tree-planting events or contribute to conservation efforts in your community.",
      color: "accent",
      link: "/events",
    },
  ];

  const stats = [
    {
      value: "500+",
      label: "Acres Protected",
      icon: <FaTree className="text-5xl" />,
      description: "Of pristine woodland"
    },
    {
      value: "200+",
      label: "Wildlife Species",
      icon: <FaLeaf className="text-5xl" />,
      description: "Documented and protected"
    },
    {
      value: "1000+",
      label: "Annual Visitors",
      icon: <FaUsers className="text-5xl" />,
      description: "And growing every year"
    },
  ];

  const testimonials = [
    {
      quote: "A serene and beautiful place to connect with nature. My kids loved the guided tour!",
      author: "Sarah Johnson",
      role: "Nature Enthusiast",
    },
    {
      quote: "The workshops on conservation were enlightening and engaging. Highly recommend!",
      author: "Michael Chen",
      role: "Environmental Educator",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-earth-50 via-white to-forest-50 dark:from-stone-900 dark:via-stone-800 dark:to-forest-900">
      {/* Hero Section */}
      <section
        className="relative min-h-[92vh] flex items-center justify-center bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.65)), url(${
            dark ? nightBackground : dayBackground
          })`,
        }}
      >
        {/* Overlay gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40 pointer-events-none"></div>

        <Container className="text-center text-white relative z-10 px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Badge variant="success" size="lg" className="mb-6 shadow-2xl backdrop-blur-sm bg-forest-600/90 border-2 border-forest-400/50">
                🌿 Protecting Nature Since 1995
              </Badge>
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white drop-shadow-2xl leading-tight">
              Woodland Conservation Area
            </h1>

            <p className="text-lg md:text-xl lg:text-2xl text-white/95 max-w-4xl mx-auto mb-10 drop-shadow-lg leading-relaxed font-medium">
              Immerse yourself in nature's wonders. Discover pristine trails, protect biodiversity,
              and connect with the environment like never before.
            </p>

            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Link to="/events">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" variant="primary" icon={<FaCalendarAlt />} className="shadow-2xl">
                    Explore Events
                  </Button>
                </motion.div>
              </Link>
              <Link to="/about">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" variant="secondary" className="shadow-2xl backdrop-blur-md bg-white/95 dark:bg-stone-800/95">
                    Learn More
                  </Button>
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </Container>

        {/* Enhanced Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-6 h-10 border-2 border-white/70 rounded-full flex justify-center shadow-lg backdrop-blur-sm bg-white/10">
            <motion.div
              className="w-1.5 h-3 bg-white/80 rounded-full mt-2"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-white to-earth-50 dark:from-stone-900 dark:to-stone-800">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge variant="success" size="md" className="mb-4 shadow-lg">
              ✨ Our Offerings
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-forest-700 to-forest-500 dark:from-forest-400 dark:to-forest-300 bg-clip-text text-transparent">
              Why Visit Us
            </h2>
            <p className="text-lg md:text-xl text-stone-600 dark:text-stone-300 max-w-2xl mx-auto">
              Experience the perfect blend of education, recreation, and conservation
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                link={feature.link}
                color={feature.color}
                imageUrl={index === 0 ? forestImage : index === 1 ? hikingImage : birchImage}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* Parallax Section */}
      <ParallaxSection
        imageUrl={forestImage}
        height="75vh"
        speed={0.5}
        overlayOpacity={0.6}
      >
        <Container className="text-center text-white px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-2xl leading-tight">
              Immerse Yourself in Nature
            </h2>
            <p className="text-xl md:text-2xl text-white/95 max-w-3xl mx-auto mb-8 drop-shadow-lg font-medium">
              Every trail tells a story. Every tree holds a memory.
            </p>
            <Link to="/gallery">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" variant="primary" className="shadow-2xl backdrop-blur-sm">
                  View Gallery
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </Container>
      </ParallaxSection>

      {/* Stats Section - Enhanced with better backgrounds and display */}
      <section className="py-24 bg-gradient-to-br from-forest-50 via-earth-50 to-peaceful-50 dark:from-stone-900 dark:via-forest-900/50 dark:to-stone-800 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-forest-500 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-peaceful-500 rounded-full filter blur-3xl"></div>
        </div>

        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge variant="accent" size="md" className="mb-4 shadow-lg">
              📊 By The Numbers
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-forest-700 to-peaceful-600 dark:from-forest-400 dark:to-peaceful-300 bg-clip-text text-transparent">
              Our Impact
            </h2>
            <p className="text-lg md:text-xl text-stone-600 dark:text-stone-300 max-w-2xl mx-auto">
              Protecting and preserving nature for future generations
            </p>
          </motion.div>

          {/* Enhanced Stats Display */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -8 }}
                className="bg-white dark:bg-stone-800 rounded-3xl shadow-2xl p-8 md:p-10 border-2 border-forest-200 dark:border-forest-700/50 hover:border-forest-400 dark:hover:border-forest-500 transition-all duration-300 hover:shadow-glow"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2, type: "spring" }}
                  className="text-forest-600 dark:text-forest-400 mb-6 flex justify-center"
                >
                  {stat.icon}
                </motion.div>

                <motion.div
                  className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 bg-gradient-to-br from-forest-600 via-forest-500 to-peaceful-600 dark:from-forest-400 dark:via-forest-300 dark:to-peaceful-400 bg-clip-text text-transparent"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 + 0.4 }}
                >
                  {stat.value}
                </motion.div>

                <p className="text-xl md:text-2xl font-bold text-stone-800 dark:text-stone-200 mb-3">
                  {stat.label}
                </p>

                <p className="text-sm md:text-base text-stone-600 dark:text-stone-400">
                  {stat.description}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-white to-earth-50 dark:from-stone-900 dark:to-stone-800">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge variant="success" size="md" className="mb-4 shadow-lg">
              💬 Testimonials
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-forest-700 to-forest-500 dark:from-forest-400 dark:to-forest-300 bg-clip-text text-transparent">
              What Visitors Say
            </h2>
            <p className="text-lg md:text-xl text-stone-600 dark:text-stone-300">
              Hear from those who've experienced our conservation area
            </p>
          </motion.div>

          <TestimonialCarousel testimonials={testimonials} />
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-forest-600 via-forest-700 to-forest-800 dark:from-forest-800 dark:via-forest-900 dark:to-stone-900 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-peaceful-400 rounded-full filter blur-3xl"></div>
        </div>

        <Container className="text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="max-w-4xl mx-auto px-4">
              <motion.div
                initial={{ scale: 0.9 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white drop-shadow-2xl">
                  Become a Conservation Partner
                </h2>
              </motion.div>

              <p className="text-xl md:text-2xl text-white/95 mb-10 drop-shadow-lg font-medium">
                Help us protect the environment. Become a member today and make a lasting difference.
              </p>

              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/contact">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button size="lg" variant="primary" icon={<FaUsers />} className="shadow-2xl backdrop-blur-sm bg-gradient-to-r from-memorial-500 to-memorial-600 text-white hover:from-memorial-400 hover:to-memorial-500 border-2 border-white/30">
                      Join Us Today
                    </Button>
                  </motion.div>
                </Link>
                <Link to="/events">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button size="lg" variant="secondary" icon={<FaMapMarkedAlt />} className="shadow-2xl backdrop-blur-md bg-white/10 border-2 border-white/70 text-white hover:bg-white/20 hover:border-white">
                      View Events
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
};

export default Homepage;
