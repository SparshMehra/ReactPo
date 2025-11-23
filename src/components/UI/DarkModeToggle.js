/**
 * DarkModeToggle Component
 *
 * @file DarkModeToggle.js
 * @description Toggle button for switching between light and dark mode themes.
 *              Features smooth transitions and animated icon changes.
 *
 * @component
 * @param {Function} toggleDarkMode - Function to toggle between light and dark modes
 * @param {boolean} dark - Current dark mode state
 *
 * @returns {JSX.Element} Dark mode toggle button
 */

import React from "react";
import { IoMoon, IoSunny } from "react-icons/io5";

const DarkModeToggle = ({ toggleDarkMode, dark }) => {
  return (
    <button
      onClick={toggleDarkMode}
      className="flex items-center justify-center w-12 h-12 bg-gray-200 dark:bg-gray-800 rounded-full text-2xl focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300 hover:scale-110 hover:shadow-lg transform"
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      title={dark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {/* Conditional rendering of sun/moon icons with smooth transition */}
      {dark ? (
        <IoSunny className="text-yellow-500 animate-spin-slow" aria-hidden="true" />
      ) : (
        <IoMoon className="text-blue-600" aria-hidden="true" />
      )}
    </button>
  );
};

export default DarkModeToggle;

