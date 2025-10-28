//Author: Marko Ostrovitsa (A00448932)
//Purpose: The purpose of this file is to create a navigation bar that is flexible between desktop and mobile versions

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { IoMoon, IoSunny } from 'react-icons/io5';

const Navigation = ({ toggleDarkMode, dark }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleNav = () => setIsOpen(v => !v);

  // Lock body scroll when menu is open (prevents background scroll/jiggle)
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = isOpen ? 'hidden' : prev || '';
    return () => { document.body.style.overflow = prev || ''; };
  }, [isOpen]);

  return (
    <div className="relative overflow-x-hidden">
      {/* Top bar */}
      <div className={`flex items-center justify-between transition-colors duration-300 ${dark ? 'bg-darkerBlue' : 'bg-darkBrown'} text-white h-16 p-4`}>
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-16 w-16 mr-2" />
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center justify-center flex-1 space-x-4 text-xl">
          <Link to="/" className="py-2 px-4 transition-colors duration-300 hover:bg-yellow-400 rounded-lg">Homepage</Link>
          <Link to="/about" className="py-2 px-4 transition-colors duration-300 hover:bg-yellow-400 rounded-lg">About</Link>
          <Link to="/sitemap" className="py-2 px-4 transition-colors duration-300 hover:bg-yellow-400 rounded-lg">Site Map</Link>
          <Link to="gallery" className="py-2 px-4 transition-colors duration-300 hover:bg-yellow-400 rounded-lg">Gallery</Link>
          <Link to="#ecosystem" className="py-2 px-4 transition-colors duration-300 hover:bg-yellow-400 rounded-lg">Ecosystem</Link>
          <Link to="flora" className="py-2 px-4 transition-colors duration-300 hover:bg-yellow-400 rounded-lg">Flora/Fauna/Fungi</Link>
          <Link to="#natural-burial" className="py-2 px-4 transition-colors duration-300 hover:bg-yellow-400 rounded-lg">Natural Burial</Link>
          <Link to="#ecommerce" className="py-2 px-4 transition-colors duration-300 hover:bg-yellow-400 rounded-lg">eCommerce</Link>
          <Link to="/contact" className="py-2 px-4 transition-colors duration-300 hover:bg-yellow-400 rounded-lg">Contact</Link>
        </div>

        {/* Desktop dark mode */}
        <div className="hidden md:flex items-center ml-4">
          <button
            onClick={toggleDarkMode}
            className="flex items-center justify-center w-12 h-12 bg-gray-200 dark:bg-gray-800 rounded-full text-2xl focus:outline-none"
            aria-label="Toggle dark mode"
          >
            {dark ? <IoSunny className="text-yellow-500" /> : <IoMoon className="text-yellow-500" />}
          </button>
        </div>

        {/* Mobile toggles */}
        <div className="flex items-center md:hidden z-50">
          <button
            onClick={toggleDarkMode}
            className="flex items-center justify-center w-12 h-12 bg-gray-200 dark:bg-gray-800 rounded-full text-2xl focus:outline-none mr-2"
            aria-label="Toggle dark mode"
          >
            {dark ? <IoSunny className="text-yellow-500" /> : <IoMoon className="text-yellow-500" />}
          </button>
          <button
            onClick={toggleNav}
            className="text-white focus:outline-none w-12 h-12 flex items-center justify-center rounded-md"
            aria-expanded={isOpen}
            aria-controls="mobile-drawer"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Overlay (click to close) */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-200 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={toggleNav}
        aria-hidden
      >
        <div className={`${dark ? 'bg-black/30' : 'bg-black/25'} w-full h-full backdrop-blur-[1px]`} />
      </div>

      {/* Off-canvas sidebar (fixed, off-screen, slides in) */}
      <aside
        id="mobile-drawer"
        className={`fixed top-0 right-0 z-50 h-screen w-64 ${dark ? 'bg-darkerBlue' : 'bg-darkBrown'} text-white transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        role="dialog"
        aria-modal="true"
      >
        <nav className="flex flex-col items-center mt-16 text-lg px-4">
          <Link onClick={toggleNav} to="/" className="py-2 w-full text-center rounded-lg transition-colors duration-300 hover:bg-yellow-400">Homepage</Link>
          <Link onClick={toggleNav} to="/about" className="py-2 w-full text-center rounded-lg transition-colors duration-300 hover:bg-yellow-400">About</Link>
          <Link onClick={toggleNav} to="/sitemap" className="py-2 w-full text-center rounded-lg transition-colors duration-300 hover:bg-yellow-400">Site Map</Link>
          <Link onClick={toggleNav} to="/gallery" className="py-2 w-full text-center rounded-lg transition-colors duration-300 hover:bg-yellow-400">Gallery</Link>
          <Link onClick={toggleNav} to="#ecosystem" className="py-2 w-full text-center rounded-lg transition-colors duration-300 hover:bg-yellow-400">Ecosystem</Link>
          <Link onClick={toggleNav} to="#flora" className="py-2 w-full text-center rounded-lg transition-colors duration-300 hover:bg-yellow-400">Flora/Fauna/Fungi</Link>
          <Link onClick={toggleNav} to="#natural-burial" className="py-2 w-full text-center rounded-lg transition-colors duration-300 hover:bg-yellow-400">Natural Burial</Link>
          <Link onClick={toggleNav} to="#ecommerce" className="py-2 w-full text-center rounded-lg transition-colors duration-300 hover:bg-yellow-400">eCommerce</Link>
          <Link onClick={toggleNav} to="/contact" className="py-2 w-full text-center rounded-lg transition-colors duration-300 hover:bg-yellow-400">Contact</Link>
        </nav>
      </aside>
    </div>
  );
};

export default Navigation;
