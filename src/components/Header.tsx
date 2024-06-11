import logo from "assets/images/logo.png";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { FiMenu, FiMoon, FiSun, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useSettingsStore } from "store/settings-store";
import SearchInput from "./SearchInput";

const Header: React.FC = () => {
  const isDarkMode = useSettingsStore((state) => state.isDarkMode);
  const toggleDarkMode = useSettingsStore((state) => state.toggleDarkMode);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <nav className="bg-[var(--color-secondary)] text-white p-4 fixed w-full top-0 z-50 shadow-md transition duration-300">
      <div className="container mx-auto flex justify-between items-center">
        {/* Web view */}
        <div className="hidden lg:flex">
          <img src={logo} width={80} height={80} alt="logo" />
        </div>

        <div className="hidden lg:block">
          <SearchInput />
        </div>
        <motion.button
          whileHover={{ rotate: 360 }}
          onClick={toggleDarkMode}
          className="focus:outline-none p-2 rounded-full text-[var(--color-accent)] hidden lg:block transition duration-300"
        >
          {isDarkMode ? <FiSun size={24} /> : <FiMoon size={24} />}
        </motion.button>
        {/* Mobile view */}
        <div className="flex lg:hidden items-center w-full justify-between">
          <SearchInput />
          <button
            onClick={handleMenuToggle}
            className="focus:outline-none p-2 rounded-full text-[var(--color-accent)] transition duration-300"
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>
      {/* Mobile menu */}
      <motion.div
        ref={menuRef}
        initial={{ x: "100%" }}
        animate={{ x: isMenuOpen ? 0 : "100%" }}
        transition={{ type: "tween" }}
        className={`fixed top-0 right-0 w-3/4 h-full bg-[var(--color-secondary)] text-white p-4 shadow-md transition-transform duration-300 ${
          isMenuOpen ? "block" : "hidden"
        } lg:hidden`}
      >
        <div className="flex flex-col h-full">
          <ul className="flex flex-col space-y-4 flex-grow">
            {["Home", "Cart"].map((tab, index) => (
              <li key={index} className="relative group">
                <div className="w-full h-full">
                  <Link
                    to={
                      tab === "Home"
                        ? "/"
                        : `/${tab.toLowerCase().replace(" ", "-")}`
                    }
                    className="block w-full h-full transition duration-300 group-hover:text-[var(--color-accent)]"
                    onClick={handleMenuToggle}
                  >
                    {tab}
                  </Link>
                </div>
              </li>
            ))}
          </ul>
          <div className="border-t border-[var(--color-accent)] my-4"></div>
          <div className="flex justify-center">
            <motion.button
              whileHover={{ rotate: 360 }}
              onClick={toggleDarkMode}
              className="focus:outline-none p-2 rounded-full text-[var(--color-accent)] transition duration-300"
            >
              {isDarkMode ? <FiSun size={24} /> : <FiMoon size={24} />}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </nav>
  );
};

export default Header;
