/**
 * Contact Component
 *
 * @file Contact.js
 * @author Bhabin Chudal (A00464169) - Code cleanup, UI improvements
 * @author Abdiaziz Muse (A00471783) - UI revamp, scroll animations, dark mode fixes
 * @author Lakshay Bansal (A00467478)
 * @description Enhanced contact form with dark mode support, scroll-triggered animations,
 *              proper text field visibility, and information cards.
 *
 * Features:
 * - Scroll-triggered animations for form and info cards
 * - Dark mode support with visible text fields
 * - Form validation with React Hook Form
 * - Staggered card animations
 * - Nature-themed gradient backgrounds
 * - Responsive design
 *
 * @returns {JSX.Element} Contact page with animated form and info cards
 */

import React, { useRef } from "react";
import Speaker from "../UI/Speaker";
import { useForm } from "react-hook-form";
import FormError from "../UI/FormError";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { motion, useInView } from "framer-motion";
import { FaEnvelope, FaUser, FaCommentDots } from "react-icons/fa";

const Contact = () => {
  const { register, handleSubmit, formState, reset } = useForm();
  const { errors } = formState;

  // Refs for scroll-triggered animations
  const formRef = useRef(null);
  const infoCardsRef = useRef(null);

  // Track when elements are in view
  const isFormInView = useInView(formRef, { once: true, margin: "-100px" });
  const isInfoInView = useInView(infoCardsRef, { once: true, margin: "-50px" });

  /**
   * Handle form submission
   */
  function onSubmit(data) {
    console.log("Form submitted:", data);
    // Show success message
    alert("Thank you for your message! We'll get back to you soon.");
    reset();
  }

  // Create Material-UI theme that adapts to dark mode
  const theme = createTheme({
    palette: {
      mode: document.body.classList.contains('dark') ? 'dark' : 'light',
    },
  });

  // Animation variants
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const staggerContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div
        id="contact"
        className="body-text p-8 bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-gray-100 min-h-screen flex flex-col items-center transition-colors duration-300"
      >
        {/* Section Title with Animation */}
        <div className="text-center mb-12 animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Get in Touch
          </h1>
          <p className="text-lg text-center mb-4 max-w-2xl text-gray-700 dark:text-gray-300">
            Want to connect or say hello? We'd love to hear from you! Fill out the
            form below or connect with us through our social channels.
          </p>

          {/* Contact Info Cards */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <FaEnvelope className="text-green-600 dark:text-green-400 text-2xl mx-auto mb-2" />
              <p className="text-sm font-semibold">info@woodlandconservation.ca</p>
            </div>
          </div>
        </div>

        {/* Contact Form with Enhanced Styling and Scroll Animation */}
        <motion.div
          ref={formRef}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 md:p-12 max-w-4xl w-full transition-all duration-300 animate-slideIn border border-gray-200 dark:border-gray-700"
          variants={fadeInUpVariants}
          initial="hidden"
          animate={isFormInView ? "visible" : "hidden"}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Input */}
              <div className="group">
                <label htmlFor="name" className="form-label text-gray-900 dark:text-gray-100 flex items-center mb-2">
                  <FaUser className="mr-2 text-green-600 dark:text-green-400" />
                  Name
                  <Speaker content="please enter a name" />
                </label>
                <TextField
                  id="name"
                  label="Your Name"
                  variant="outlined"
                  fullWidth
                  {...register("name", { required: "Name field is mandatory" })}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      '& fieldset': {
                        borderColor: 'rgba(156, 163, 175, 0.3)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgb(34, 197, 94)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'rgb(34, 197, 94)',
                      },
                      '& input': {
                        color: document.body.classList.contains('dark') ? '#fff' : '#000',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: document.body.classList.contains('dark') ? '#9ca3af' : '#6b7280',
                      '&.Mui-focused': {
                        color: 'rgb(34, 197, 94)',
                      },
                    },
                  }}
                />
                {errors?.name?.message && (
                  <FormError>{errors.name.message}</FormError>
                )}
              </div>

              {/* Email Input */}
              <div className="group">
                <label htmlFor="email" className="form-label text-gray-900 dark:text-gray-100 flex items-center mb-2">
                  <FaEnvelope className="mr-2 text-green-600 dark:text-green-400" />
                  Email
                  <Speaker content="please enter an email" />
                </label>
                <TextField
                  id="email"
                  label="Email Address"
                  variant="outlined"
                  fullWidth
                  {...register("email", {
                    required: "Email field is mandatory",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Email is invalid",
                    },
                  })}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      '& fieldset': {
                        borderColor: 'rgba(156, 163, 175, 0.3)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgb(34, 197, 94)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'rgb(34, 197, 94)',
                      },
                      '& input': {
                        color: document.body.classList.contains('dark') ? '#fff' : '#000',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: document.body.classList.contains('dark') ? '#9ca3af' : '#6b7280',
                      '&.Mui-focused': {
                        color: 'rgb(34, 197, 94)',
                      },
                    },
                  }}
                />
                {errors?.email?.message && (
                  <FormError>{errors.email.message}</FormError>
                )}
              </div>
            </div>

            {/* Message Input */}
            <div className="group">
              <label htmlFor="message" className="form-label text-gray-900 dark:text-gray-100 flex items-center mb-2">
                <FaCommentDots className="mr-2 text-green-600 dark:text-green-400" />
                Message
                <Speaker content="please enter a message" />
              </label>
              <TextField
                id="message"
                label="Your Message"
                variant="outlined"
                fullWidth
                multiline
                rows={6}
                {...register("message", {
                  required: "Message field is mandatory",
                })}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    '& fieldset': {
                      borderColor: 'rgba(156, 163, 175, 0.3)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgb(34, 197, 94)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'rgb(34, 197, 94)',
                    },
                    '& textarea': {
                      color: document.body.classList.contains('dark') ? '#fff' : '#000',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: document.body.classList.contains('dark') ? '#9ca3af' : '#6b7280',
                    '&.Mui-focused': {
                      color: 'rgb(34, 197, 94)',
                    },
                  },
                }}
              />
              {errors?.message?.message && (
                <FormError>{errors.message.message}</FormError>
              )}
            </div>

            {/* Submit Button */}
            <div className="text-center md:text-right pt-4">
              <Button
                type="submit"
                variant="contained"
                size="large"
                className="transform hover:scale-105 transition-all duration-300"
                sx={{
                  bgcolor: 'rgb(22, 163, 74)',
                  '&:hover': {
                    bgcolor: 'rgb(21, 128, 61)',
                    boxShadow: '0 10px 25px rgba(22, 163, 74, 0.3)',
                  },
                  px: 6,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderRadius: '0.75rem',
                  textTransform: 'none',
                }}
              >
                Send Message ✉️
              </Button>
            </div>
          </form>
        </motion.div>

        {/* Additional Info Section with Scroll Animation */}
        <motion.div
          ref={infoCardsRef}
          className="mt-12 max-w-4xl w-full grid md:grid-cols-3 gap-6"
          variants={staggerContainerVariants}
          initial="hidden"
          animate={isInfoInView ? "visible" : "hidden"}
        >
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-200 dark:border-gray-700"
            variants={cardVariants}
          >
            <h3 className="text-xl font-bold mb-3 text-green-700 dark:text-green-400">📍 Visit Us</h3>
            <p className="text-gray-700 dark:text-gray-300">
              St. Margaret's Bay<br />
              Halifax, Nova Scotia<br />
              Canada
            </p>
          </motion.div>

          <motion.div
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-200 dark:border-gray-700"
            variants={cardVariants}
          >
            <h3 className="text-xl font-bold mb-3 text-green-700 dark:text-green-400">⏰ Hours</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Monday - Friday: 9am - 5pm<br />
              Saturday: 10am - 4pm<br />
              Sunday: Closed
            </p>
          </motion.div>

          <motion.div
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-200 dark:border-gray-700"
            variants={cardVariants}
          >
            <h3 className="text-xl font-bold mb-3 text-green-700 dark:text-green-400">💬 Response Time</h3>
            <p className="text-gray-700 dark:text-gray-300">
              We typically respond to inquiries within 24-48 hours during business days.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </ThemeProvider>
  );
};

export default Contact;

