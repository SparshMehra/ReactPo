import { useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navigation from "./Navigation";
import PlaygroundSpeedDial from "./PlaygroundSpeedDial";

const AppLayout = ({ cart, setCart }) => {

  const [dark, setDark] = useState(false); // State to manage dark mode

  // Function to toggle dark mode
  const darkModeHandler = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  };

  return (
    <div className="bg-yellow-100 dark:bg-blue-900 min-h-screen">
      <Navigation
        toggleDarkMode={darkModeHandler}
        dark={dark}
        cart={cart}
        setCart={setCart}
      />

      <Outlet />
      <PlaygroundSpeedDial />
      <Footer />
    </div>
  );
};
export default AppLayout;
