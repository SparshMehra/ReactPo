import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import Footer from "./Footer";
import { useState } from "react";
import Modal2 from "./Modal2";
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
      <Modal2>
        <Modal2.Open name="createForm">
          <button>click me</button>
        </Modal2.Open>
        <Modal2.Window name="createForm">
          <Footer />
        </Modal2.Window>
      </Modal2>
      <Footer />
    </div>
  );
};
export default AppLayout;
