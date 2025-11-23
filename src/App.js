/**
 * App Component
 *
 * @file App.js
 * @author Marko Ostrovitsa (A00448932)
 * @description Main application component that sets up routing, state management,
 *              and provides the application layout structure.
 *
 * @component
 * @returns {JSX.Element} Main application with routing configuration
 */

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

// Page Components
import Homepage from "./components/pages/Homepage";
import About from "./components/pages/About";
import SiteMap from "./components/pages/Sitemap";
import Contact from "./components/pages/Contact";
import Gallery from "./components/pages/gallery";
import Flora from "./components/pages/flora";
import Events from "./components/pages/Events";
import NaturalBurial from "./components/pages/NaturalBurial";
import Ecommerce from "./components/pages/Ecommerce";
import EcoVeg from "./components/pages/EcoVeg";
import Cart from "./components/pages/Cart";

// Layout Components
import AppLayout from "./components/UI/AppLayout";

/**
 * Main App Component
 * Manages global state for shopping cart and provides routing configuration
 */
function App() {
  // Initialize React Query client for server state management
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes
        cacheTime: 10 * 60 * 1000, // 10 minutes
        refetchOnWindowFocus: false,
      },
    },
  });

  // Initialize cart state from localStorage or empty array
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  /**
   * Persist cart to localStorage whenever it changes
   */
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <QueryClientProvider client={queryClient}>
      {/* Toast notifications for user feedback */}
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#4ade80',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />

      {/* Application Router */}
      <Router>
        <Routes>
          {/* Main layout wrapper for all pages */}
          <Route path="/" element={<AppLayout cart={cart} setCart={setCart} />}>
            {/* Homepage */}
            <Route index element={<Homepage />} />

            {/* Information Pages */}
            <Route path="about" element={<About />} />
            <Route path="sitemap" element={<SiteMap />} />
            <Route path="contact" element={<Contact />} />

            {/* Event & Booking Pages */}
            <Route path="events" element={<Events />} />
            <Route path="natural-burial" element={<NaturalBurial />} />

            {/* Gallery & Nature Pages */}
            <Route path="gallery" element={<Gallery />} />
            <Route path="flora" element={<Flora />} />
            <Route path="ecoveg" element={<EcoVeg />} />

            {/* E-commerce Pages */}
            <Route
              path="ecommerce"
              element={<Ecommerce cart={cart} setCart={setCart} />}
            />
            <Route
              path="cart"
              element={<Cart cart={cart} setCart={setCart} />}
            />
          </Route>
        </Routes>
      </Router>

      {/* React Query DevTools (only in development) */}
      {/*<ReactQueryDevtools initialIsOpen={false} />*/}
    </QueryClientProvider>
  );
}

export default App;

