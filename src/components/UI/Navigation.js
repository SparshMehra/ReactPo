/**
 * Navigation Component
 *
 * @file Navigation.js
 * @author Marko Ostrovitsa (A00448932)
 * @description Responsive navigation bar with dark mode toggle and shopping cart.
 *              Includes desktop navigation with hover effects and mobile drawer menu.
 *
 * @component
 * @param {Function} toggleDarkMode - Function to toggle dark/light mode
 * @param {boolean} dark - Current dark mode state
 * @param {Array} cart - Array of cart items
 *
 * @returns {JSX.Element} Navigation bar component
 */

import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import DarkModeToggle from "./DarkModeToggle";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

/**
 * Navigation links configuration
 * @constant {Array<Object>} navLinks
 */
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

const Navigation = ({ toggleDarkMode, dark, cart = [] }) => {
  // State for mobile drawer menu
  const [drawerOpen, setDrawerOpen] = useState(false);

  /**
   * Toggles the mobile drawer menu
   * @param {boolean} open - Whether to open or close the drawer
   * @returns {Function} Event handler function
   */
  const toggleDrawer = (open) => (event) => {
    // Prevent toggle when using Tab or Shift keys
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  // Calculate total cart items including quantities
  const totalCartItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  // Dynamic navigation bar styling with nature theme
  const baseclass = `transition-colors duration-300 ${
    dark 
      ? "bg-gradient-to-r from-forest-800 via-forest-900 to-stone-900" 
      : "bg-gradient-to-r from-forest-600 via-forest-700 to-forest-800"
  } text-white p-4 shadow-lg`;

  /**
   * Mobile drawer content with navigation links
   */
  const drawerList = (
    <Box
      sx={{ width: 280 }}
      role="presentation"
      className="bg-white dark:bg-gray-800"
    >
      {/* Drawer Header with Close Button */}
      <Box
        sx={{
          p: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: 1,
          borderColor: 'divider'
        }}
      >
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Menu</h2>
        {/* X Close Button */}
        <button
          onClick={toggleDrawer(false)}
          className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
          aria-label="Close menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </Box>

      {/* Navigation Links */}
      <List>
        {navLinks.map((link) => (
          <ListItem key={link.to} disablePadding>
            <ListItemButton
              component={Link}
              to={link.to}
              onClick={toggleDrawer(false)}
              className="hover:bg-yellow-100 dark:hover:bg-gray-700 transition-colors"
            >
              <ListItemText
                primary={link.label}
                className="text-gray-800 dark:text-white"
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />

      {/* Mobile Drawer Actions: Dark Mode Toggle & Cart */}
      <Box sx={{ p: 3, display: "flex", justifyContent: "center", gap: 2, alignItems: "center" }}>
        <DarkModeToggle toggleDarkMode={toggleDarkMode} dark={dark} />

        {/* Mobile Cart Button */}
        <Link
          to="/cart"
          className="relative bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-4 py-2 rounded-lg hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
        >
          <span className="text-xl">🛒</span>
          {totalCartItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-md animate-pulse">
              {totalCartItems}
            </span>
          )}
        </Link>
      </Box>
    </Box>
  );

  return (
    <nav className="sticky top-0 z-50">
      {/* Main Navigation Bar */}
      <div className={`${baseclass} flex items-center justify-between h-16 px-6`}>

        {/* Logo Section */}
        <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
          <img
            src={logo}
            alt="Woodland Conservation Logo"
            className="h-12 w-12 md:h-14 md:w-14 object-contain"
          />
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center justify-center flex-1 space-x-2 lg:space-x-4">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="py-2 px-3 lg:px-4 text-base lg:text-lg font-medium transition-all duration-300 ease-in-out hover:bg-yellow-400 hover:text-black rounded-lg hover:shadow-md transform hover:scale-105"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Right Section: Cart & Dark Mode */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Dark Mode Toggle */}
          <DarkModeToggle toggleDarkMode={toggleDarkMode} dark={dark} />

          {/* Cart Button */}
          <Link
            to="/cart"
            className="relative bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-4 py-2 rounded-lg hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 font-medium"
            aria-label="Shopping Cart"
          >
            <span className="text-xl">🛒</span>
            {totalCartItems > 0 && (
              <span
                className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-md animate-pulse"
                aria-label={`${totalCartItems} items in cart`}
              >
                {totalCartItems}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Menu Section */}
        <div className="flex items-center space-x-3 md:hidden">
          {/* Mobile Dark Mode Toggle */}
          <DarkModeToggle toggleDarkMode={toggleDarkMode} dark={dark} />

          {/* Hamburger Menu Button */}
          <button
            onClick={toggleDrawer(true)}
            className="text-white focus:outline-none hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-all duration-300"
            aria-label="Toggle navigation menu"
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
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        className="md:hidden"
      >
        {drawerList}
      </Drawer>
    </nav>
  );
};

export default Navigation;

