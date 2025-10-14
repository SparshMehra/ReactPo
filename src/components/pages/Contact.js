// Author: Lakshay Bansal (A00467478)
// Purpose: To display the Contact section of the Woodland Conservation website.

import React, { useState, useEffect } from "react";
import Speaker from "../UI/Speaker";
import { IoVolumeHigh } from "react-icons/io5";

const Contact = () => {
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
        <form>
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
                placeholder="Your Name"
                className="form-input"
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
                placeholder="Your Email"
                className="form-input"
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
              placeholder="Your Message"
              className="form-input"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white text-lg font-bold py-3 px-6 rounded-md transition-all duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};
export default Contact;
