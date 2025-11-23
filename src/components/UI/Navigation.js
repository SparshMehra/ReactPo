// Author: Marko Ostrovitsa (A00448932)
// Purpose: Responsive navigation bar for desktop and mobile with dark mode toggle

import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import DarkModeToggle from "./DarkModeToggle";
import Homepage from "../pages/Homepage";

// ⬇️ NEW: MUI imports
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

const navLinks = [
  { to: "about", label: "About" },
  { to: "sitemap", label: "Site Map" },
  { to: "gallery", label: "Gallery" },
  { to: "events", label: "Events" },
  { to: "ecosystem", label: "Ecosystem" },
  { to: "flora", label: "Vegetation" },
  { to: "natural-burial", label: "Natural Burial" },
  { to: "contact", label: "Contact" },
  { to: "ecoveg", label: "Ecosystem & Vegetation" },
  { to: "ecommerce", label: "eCommerce" },
];

const Navigation = ({ toggleDarkMode, dark, cart = [] }) => {
  // ⬇️ replaced isOpen with drawerOpen for MUI
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const baseclass = `transition-colors duration-300 ${
    dark ? "bg-darkerBlue" : "bg-darkBrown"
  } text-white  p-4`;

  // ⬇️ Drawer content
  const drawerList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {navLinks.map((link) => (
          <ListItem key={link.to} disablePadding>
            <ListItemButton component={Link} to={link.to}>
              <ListItemText primary={link.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      {/* Optional: Dark mode & cart inside drawer too */}
      <Box sx={{ p: 2, display: "flex", justifyContent: "center", gap: 1 }}>
        <DarkModeToggle toggleDarkMode={toggleDarkMode} dark={dark} />
        <Link
          to="/cart"
          className="relative bg-yellow-500 text-black px-3 py-1 rounded-lg hover:bg-yellow-400 transition-colors"
        >
          🛒
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </Link>
      </Box>
    </Box>
  );

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
          <DarkModeToggle toggleDarkMode={toggleDarkMode} dark={dark} />
        </div>

        {/* 🛒 Cart Button (desktop & tablet) */}
        <div className="hidden md:block">
          <Link
            to="/cart"
            className="relative ml-4 bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-400 transition-colors"
          >
            🛒
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile menu & dark mode toggle */}
        <div className="flex items-center md:hidden">
          <DarkModeToggle toggleDarkMode={toggleDarkMode} dark={dark} />

          {/* Hamburger opens MUI Drawer */}
          <button
            onClick={toggleDrawer(true)}
            className="text-white focus:outline-none z-20 ml-2"
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
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* ⬇️ MUI Drawer that pops up from the right of the nav bar */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerList}
      </Drawer>
    </div>
  );
};

export default Navigation;
