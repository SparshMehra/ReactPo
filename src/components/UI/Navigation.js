// Author: Marko Ostrovitsa (A00448932)
// Purpose: Responsive navigation bar for desktop and mobile with dark mode toggle

import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import DarkModeToggle from "./DarkModeToggle";
import Homepage from "../pages/Homepage";

const navLinks = [
  { to: "about", label: "About" },
  { to: "sitemap", label: "Site Map" },
  { to: "gallery", label: "Gallery" },
  { to: "events", label: "Events" },
  { to: "natural-burial", label: "Natural Burial" },
  { to: "contact", label: "Contact" },
  { to: "ecoveg", label: "Ecosystem/Vegetation" },
  { to: "ecommerce", label: "Ecommerce" }

];

const Navigation = ({ toggleDarkMode, dark, cart, setCart }) => {
  console.log("NAV CART =", cart);



  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => setIsOpen(!isOpen);

  const baseclass = `transition-colors duration-300 ${dark ? "bg-darkerBlue" : "bg-darkBrown"
    } text-white  p-4`;

  return (
    <div>
      {/* Main navigation bar */}
      <div className={`${baseclass} flex items-center justify-between h-16`}>
        {/* Logo */}
        <Link to="/" element={<Homepage />}>
          <img
            src={logo}
            alt="Logo"
            className="h-10 w-10 mr-2 md:h-14 md:w-14"
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center justify-center flex-1 space-x-4 text-xl">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="py-2 px-4 transition-colors duration-500 ease-in-out hover:bg-yellow-400 rounded-lg"
            >
              {link.label}
            </Link>
          ))}

          {/* 🛒 Cart FIRST with nice spacing */}
          <div className="flex items-center mr-24">
            <Link
              to="/cart"
              className="relative bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-400 transition-colors"
            >
              🛒
              {cart && cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.reduce((sum, item) => sum + (item.quantity || 1), 0)}
                </span>
              )}
            </Link>
          </div>

          {/* 🌙 Dark Mode SECOND */}
          <DarkModeToggle toggleDarkMode={toggleDarkMode} dark={dark} />
        </div>


        {/* Mobile menu & dark mode toggle */}
        <div className="flex items-center md:hidden">
          <DarkModeToggle toggleDarkMode={toggleDarkMode} dark={dark} />

          <button
            onClick={toggleNav}
            className="text-white focus:outline-none z-20"
            aria-label="Toggle menu"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile navigation menu */}
      <div
        className={`md:hidden absolute top-0 right-0  bg-opacity-50 backdrop-blur-md ${baseclass} w-64 h-screen p-4 z-10 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <nav className="flex flex-col items-center mt-10 text-lg z-[200] ">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="py-2 transition-colors duration-500 ease-in-out hover:bg-yellow-400 w-full text-center rounded-lg hover:rounded-xl"
              onClick={() => setIsOpen(false)} // close menu when link is clicked
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Navigation;
