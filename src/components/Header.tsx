import { motion } from "framer-motion";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { BsBookFill } from "react-icons/bs";
import { FiMenu, FiMoon, FiShoppingCart, FiSun, FiX } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import { useBasketStore } from "store/basket-store";
import { useSettingsStore } from "store/settings-store";
import LanguageSwitcher from "./LanguageSwitcher";
import SearchInput from "./SearchInput";

const Header: React.FC = () => {
  const isDarkMode = useSettingsStore((state) => state.isDarkMode);
  const toggleDarkMode = useSettingsStore((state) => state.toggleDarkMode);
  const basketItems = useBasketStore((state) => state.items);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const handleMenuToggle = useCallback(() => {
    setIsMenuOpen(!isMenuOpen);
  }, [isMenuOpen]);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen, handleClickOutside]);

  const getTotalItemCount = () => {
    return basketItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <nav className="bg-[var(--color-secondary)] text-white p-4 fixed w-full top-0 z-50 shadow-md transition duration-300">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="mr-2 lg:mr-0">
          <Link to="/">
            <motion.div whileHover={{ scale: 1.2 }}>
              <BsBookFill size={32} className="text-[var(--color-primary)]" />
            </motion.div>
          </Link>
        </div>

        {/* Web and Tablet view */}
        <div className="hidden md:flex flex-1 justify-center">
          <SearchInput />
        </div>

        {/* Web view */}
        <div className="hidden lg:flex items-center space-x-4">
          <LanguageSwitcher />
          <motion.button
            whileHover={{ scale: 1.2 }}
            onClick={toggleDarkMode}
            className="focus:outline-none p-2 rounded-full text-[var(--color-accent)]"
          >
            {isDarkMode ? <FiSun size={24} /> : <FiMoon size={24} />}
          </motion.button>
          <Link to="/cart" className="relative">
            <motion.div whileHover={{ scale: 1.2 }}>
              <FiShoppingCart
                size={24}
                className="text-[var(--color-accent)]"
              />
              {getTotalItemCount() > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                  {getTotalItemCount()}
                </span>
              )}
            </motion.div>
          </Link>
        </div>

        {/* Mobile view */}
        <div className="flex md:hidden items-center w-full justify-between">
          {location.pathname !== "/cart" && <SearchInput />}
          <button
            onClick={handleMenuToggle}
            className="focus:outline-none p-2 rounded-full text-[var(--color-accent)] transition duration-300"
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Tablet view */}
        <div className="hidden md:flex lg:hidden items-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.2 }}
            onClick={toggleDarkMode}
            className="focus:outline-none p-2 rounded-full text-[var(--color-accent)]"
          >
            {isDarkMode ? <FiSun size={24} /> : <FiMoon size={24} />}
          </motion.button>
          <Link to="/cart" className="relative">
            <motion.div whileHover={{ scale: 1.2 }}>
              <FiShoppingCart
                size={24}
                className="text-[var(--color-accent)]"
              />
              {getTotalItemCount() > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                  {getTotalItemCount()}
                </span>
              )}
            </motion.div>
          </Link>
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
        } md:hidden`}
      >
        <div className="flex flex-col h-full">
          <ul className="flex flex-col">
            {["Home", "Cart"].map((tab, index) => (
              <li key={index} className="relative group">
                <div className="w-full h-full dark:text-secondary text-secondary-dark">
                  <Link
                    to={
                      tab === "Home"
                        ? "/"
                        : `/${tab.toLowerCase().replace(" ", "-")}`
                    }
                    className="block w-full h-full transition duration-300 p-3 group-hover:bg-[var(--color-accent)]"
                    onClick={handleMenuToggle}
                  >
                    {tab}
                    {tab === "Cart" && getTotalItemCount() > 0 && (
                      <span className="absolute top-3 right-3 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                        {getTotalItemCount()}
                      </span>
                    )}
                  </Link>
                </div>
              </li>
            ))}
          </ul>
          <div className="border-t border-[var(--color-accent)] my-4"></div>
          <div className="flex justify-center mb-10">
            <motion.div
              className="text-[var(--color-accent)]"
              onClick={toggleDarkMode}
              whileHover={{ scale: 1.2 }}
            >
              {isDarkMode ? <FiSun size={24} /> : <FiMoon size={24} />}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </nav>
  );
};

export default Header;
