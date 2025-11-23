/**
 * AppLayout Component
 *
 * @file AppLayout.js
 * @description Main application layout wrapper that provides consistent
 *              structure with navigation, footer, and dark mode support.
 *
 * @component
 * @param {Array} cart - Shopping cart items
 * @param {Function} setCart - Function to update cart state
 *
 * @returns {JSX.Element} Application layout with navigation and footer
 */

import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navigation from "./Navigation";
import PlaygroundSpeedDial from "./PlaygroundSpeedDial";

const AppLayout = ({ cart, setCart }) => {
  // Initialize dark mode from localStorage or default to false
  const [dark, setDark] = useState(() => {
    const savedTheme = localStorage.getItem("darkMode");
    return savedTheme === "true";
  });

  /**
   * Toggles dark mode and persists preference to localStorage
   */
  const darkModeHandler = () => {
    setDark((prevDark) => {
      const newDark = !prevDark;
      localStorage.setItem("darkMode", newDark.toString());
      return newDark;
    });
  };

  /**
   * Apply dark mode class to document body on mount and when dark state changes
   */
  useEffect(() => {
    if (dark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [dark]);

  return (
    <div className="bg-gradient-to-br from-yellow-50 via-green-50 to-blue-50 dark:from-gray-900 dark:via-blue-900 dark:to-gray-900 min-h-screen transition-colors duration-300">
      {/* Navigation Bar */}
      <Navigation
        toggleDarkMode={darkModeHandler}
        dark={dark}
        cart={cart}
        setCart={setCart}
      />

      {/* Main Content Area - Outlet renders child routes */}
      <main className="min-h-[calc(100vh-16rem)]">
        <Outlet />
      </main>

      {/* Floating Speed Dial for Quick Actions */}
      <PlaygroundSpeedDial />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AppLayout;

