// Authors: Lakshay Bansal (A00467478), Marko Ostrovitsa (A00448932)
// Purpose: Modern homepage with hero section, features, and smooth animations
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
import forestImage from "../../assets/forest.jpg";
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
    { value: "500+", label: "Acres of Protected Land" },
    { value: "200+", label: "Wildlife Species" },
    { value: "1000+", label: "Annual Visitors" },
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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative min-h-[90vh] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${
            dark ? nightBackground : dayBackground
          })`,
        }}
      >
        <Container className="text-center text-white relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge variant="success" size="lg" className="mb-6">
              🌿 Protecting Nature Since 1995
            </Badge>
            <h1 className="heading-xl mb-6 text-white drop-shadow-2xl">
              Woodland Conservation Area
            </h1>
            <p className="body-large text-white/90 max-w-3xl mx-auto mb-10 drop-shadow-lg">
              Immerse yourself in nature's wonders. Discover pristine trails, protect biodiversity,
              and connect with the environment like never before.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/events">
                <Button size="lg" variant="primary" icon={<FaCalendarAlt />}>
                  Explore Events
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="secondary">
                  Learn More
                </Button>
              </Link>
            </div>
          </motion.div>
        </Container>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2" />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <Section background="neutral">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge variant="success" size="md" className="mb-4">
              ✨ Our Offerings
            </Badge>
            <h2 className="heading-md mb-4">Why Visit Us</h2>
            <p className="body-large max-w-2xl mx-auto">
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
      </Section>

      {/* Parallax Section */}
      <ParallaxSection
        imageUrl={forestImage}
        height="70vh"
        speed={0.5}
      >
        <Container className="text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-2xl">
              Immerse Yourself in Nature
            </h2>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8 drop-shadow-lg">
              Every trail tells a story. Every tree holds a memory.
            </p>
            <Link to="/gallery">
              <Button size="lg" variant="primary">
                View Gallery
              </Button>
            </Link>
          </motion.div>
        </Container>
      </ParallaxSection>

      {/* Stats Section - Enhanced */}
      <Section background="default">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="accent" size="md" className="mb-4">
              📊 By The Numbers
            </Badge>
            <h2 className="heading-md mb-4">Our Impact</h2>
            <p className="body-large max-w-2xl mx-auto">
              Protecting and preserving nature for future generations
            </p>
          </motion.div>

          <StatsCounter
            stats={[
              {
                value: '500+',
                label: 'Acres Protected',
                icon: <FaTree className="text-green-600" />,
                description: 'Of pristine woodland'
              },
              {
                value: '200+',
                label: 'Wildlife Species',
                icon: <FaLeaf className="text-primary-600" />,
                description: 'Documented and protected'
              },
              {
                value: '1000+',
                label: 'Annual Visitors',
                icon: <FaUsers className="text-accent-600" />,
                description: 'And growing every year'
              },
            ]}
            columns={3}
            theme="gradient"
          />
        </Container>
      </Section>

      {/* Testimonials Section */}
      <Section background="default">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading-md mb-4">What Visitors Say</h2>
            <p className="body-large">Hear from those who've experienced our conservation area</p>
          </motion.div>

          <TestimonialCarousel testimonials={testimonials} />
        </Container>
      </Section>

      {/* CTA Section */}
      <Section background="gradient">
        <Container className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="max-w-3xl mx-auto">
              <h2 className="heading-md mb-6">Become a Conservation Partner</h2>
              <p className="body-large mb-8">
                Help us protect the environment. Become a member today and make a lasting difference.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/contact">
                  <Button size="lg" variant="primary" icon={<FaUsers />}>
                    Join Us Today
                  </Button>
                </Link>
                <Link to="/events">
                  <Button size="lg" variant="secondary" icon={<FaMapMarkedAlt />}>
                    View Events
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </Container>
      </Section>
    </div>
  );
};

export default Homepage;