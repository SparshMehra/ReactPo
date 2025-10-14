//Author: Marko Ostrovitsa(A00448932)
//Purpose of the file is to diplay all the components together in the website

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/UI/Navigation";
import Homepage from "./components/pages/Homepage";
import About from "./components/pages/About";
import SiteMap from "./components/pages/Sitemap";
import Contact from "./components/pages/Contact"; // Importing Contact component
import Gallery from "./components/pages/gallery";
import Flora from "./components/pages/flora";
import AppLayout from "./components/UI/AppLayout";

// App component definition
function App() {
  return (
    // Router component to handle navigation
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          {" "}
          <Route index element={<Homepage />} />
          <Route path="about" element={<About />} />{" "}
          <Route path="sitemap" element={<SiteMap />} />{" "}
          <Route path="contact" element={<Contact />} />{" "}
          <Route path="gallery" element={<Gallery />} />
          <Route path="flora" element={<Flora />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App; // Exporting the App component as default
