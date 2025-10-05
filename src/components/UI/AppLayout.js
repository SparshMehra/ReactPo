import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import Footer from "./Footer";
import { useState } from "react";
const AppLayout = () => {
  const [dark, setDark] = useState(false); // State to manage dark mode

  // Function to toggle dark mode
  const darkModeHandler = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  };

  return (
    <div className="bg-yellow-100 dark:bg-blue-900 min-h-screen">
      <Navigation toggleDarkMode={darkModeHandler} dark={dark} />
      <Outlet />
      <Footer />
    </div>
  );
};
export default AppLayout;
