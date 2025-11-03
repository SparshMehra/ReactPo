// Author: Lakshay Bansal (A00467478)
// Purpose: To display the Contact section of the Woodland Conservation website.

import React, { useState } from "react";
import Speaker from "../UI/Speaker";
import { toast } from 'react-toastify';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all fields');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post('http://localhost:5001/api/contact', formData);

      if (response.data.success) {
        toast.success('Message sent successfully! We\'ll get back to you soon.');
        // Reset form
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      } else {
        toast.error('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      if (error.response?.data?.error) {
        toast.error(`Error: ${error.response.data.error}`);
      } else {
        toast.error('Failed to send message. Please ensure the server is running.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      id="contact"
      className="p-8 bg-gradient-to-br from-green-300 to-green-500 dark:from-green-800 dark:to-green-900 text-gray-900 dark:text-gray-100 min-h-screen flex flex-col items-center"
    >
      {/* Section Title */}
      <h1 className="text-5xl font-bold mb-6 text-center">Get in Touch</h1>
      <p className="text-lg text-center mb-8 max-w-2xl">
        Have questions, feedback, or just want to say hello? We'd love to hear
        from you! Fill out the form below or connect with us through our social
        channels.
      </p>

      {/* Contact Form */}
      <div className="bg-white dark:bg-darkerBlue rounded-lg shadow-lg p-6 md:p-10 max-w-4xl w-full">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="form-label">
                Name
                <Speaker content="please enter a name"></Speaker>
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="form-input"
                required
              />
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="form-label">
                Email
                <Speaker content="please enter an email"></Speaker>
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="form-input"
                required
              />
            </div>
          </div>

          {/* Message Input */}
          <div className="mb-6">
            <label htmlFor="message" className="form-label">
              Message
              <Speaker content="please enter a message"></Speaker>
            </label>
            <textarea
              id="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              className="form-input"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white text-lg font-bold py-3 px-6 rounded-md transition-all duration-300"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
};
export default Contact;
