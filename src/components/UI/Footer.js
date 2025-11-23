/**
 * Footer Component
 *
 * @file Footer.js
 * @description Site footer with contact information, social media links,
 *              and copyright information. Responsive design for all screen sizes.
 *
 * @component
 * @returns {JSX.Element} Footer section with contact and social media
 */

import React from "react";
import { Link } from "react-router-dom";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLeaf,
} from "react-icons/fa";

const Footer = () => {
  // Quick navigation links
  const quickLinks = [
    { to: "/about", label: "About Us" },
    { to: "/events", label: "Events" },
    { to: "/ecommerce", label: "Shop" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <footer className="bg-gradient-to-br from-green-900 via-green-800 to-blue-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">

          {/* About Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <FaLeaf className="text-3xl text-green-400" aria-hidden="true" />
              <h3 className="text-2xl font-bold">Woodland Conservation</h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Dedicated to preserving and protecting our natural woodland ecosystems
              for future generations. Join us in making a difference.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4 border-b-2 border-green-400 pb-2 inline-block">
              Quick Links
            </h3>
            <nav className="flex flex-col space-y-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-gray-300 hover:text-green-400 transition-colors duration-300 hover:translate-x-2 transform inline-block"
                >
                  → {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4 border-b-2 border-green-400 pb-2 inline-block">
              Contact Us
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-start gap-3 hover:text-green-400 transition-colors">
                <FaPhone className="text-xl mt-1 flex-shrink-0" aria-hidden="true" />
                <a href="tel:+11234567890" className="hover:underline">
                  +1 (123) 456-7890
                </a>
              </div>
              <div className="flex items-start gap-3 hover:text-green-400 transition-colors">
                <FaEnvelope className="text-xl mt-1 flex-shrink-0" aria-hidden="true" />
                <a href="mailto:info@woodlandconservation.ca" className="hover:underline break-all">
                  info@woodlandconservation.ca
                </a>
              </div>
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-xl mt-1 flex-shrink-0" aria-hidden="true" />
                <address className="not-italic">
                  Halifax, Nova Scotia<br />
                  Canada
                </address>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4 border-b-2 border-green-400 pb-2 inline-block">
              Follow Us
            </h3>
            <p className="text-gray-300 text-sm mb-4">
              Stay connected and get the latest updates on conservation efforts.
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-green-500 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 transform hover:shadow-lg"
                aria-label="Visit our Facebook page"
              >
                <FaFacebook className="text-2xl" aria-hidden="true" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-pink-500 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 transform hover:shadow-lg"
                aria-label="Visit our Instagram profile"
              >
                <FaInstagram className="text-2xl" aria-hidden="true" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-blue-400 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 transform hover:shadow-lg"
                aria-label="Visit our Twitter profile"
              >
                <FaTwitter className="text-2xl" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-300">
            {/* Copyright */}
            <p>
              © {new Date().getFullYear()} Woodland Conservation Area. All Rights Reserved.
            </p>

            {/* Legal Links */}
            <div className="flex gap-4">
              <Link to="/sitemap" className="hover:text-green-400 transition-colors">
                Site Map
              </Link>
              <span className="text-gray-500">|</span>
              <button className="hover:text-green-400 transition-colors">
                Privacy Policy
              </button>
              <span className="text-gray-500">|</span>
              <button className="hover:text-green-400 transition-colors">
                Terms of Service
              </button>
            </div>
          </div>
        </div>

        {/* Eco Badge */}
        <div className="mt-6 text-center">
          <p className="text-green-400 text-xs flex items-center justify-center gap-2">
            <FaLeaf aria-hidden="true" />
            <span>Carbon Neutral Website • Powered by Renewable Energy</span>
            <FaLeaf aria-hidden="true" />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

