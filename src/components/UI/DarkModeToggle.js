import { useState } from "react";
import { IoMoon, IoSunny } from "react-icons/io5";
const DarkModeToggle = ({ toggleDarkMode, dark }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => setIsOpen(!isOpen);
  return (
    <div className="ml-4">
      {" "}
      <button
        onClick={toggleDarkMode}
        className="flex items-center justify-center w-12 h-12 bg-gray-200 dark:bg-gray-800 rounded-full text-2xl focus:outline-none"
      >
        {dark ? (
          <IoSunny className="text-yellow-500" />
        ) : (
          <IoMoon className="text-yellow-500" />
        )}
      </button>
    </div>
  );
};
export default DarkModeToggle;
