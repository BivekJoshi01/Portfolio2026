import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const NavAppBar = ({ scrolled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
<nav
  className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 rounded-xl w-[90%] sm:w-[70%] md:w-[60%] px-6 py-3 ${
    scrolled
      ? "bg-gray-900/90 backdrop-blur-md shadow-lg"
      : "bg-transparent"
  }`}
>
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div
          className={`text-2xl font-bold tracking-wide transition-all duration-500 ${
            scrolled ? "text-white" : "text-gray-900"
          }`}
        >
          Bivek<span className="text-indigo-500">.</span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-10 text-lg font-medium ">
          {["Home", "About", "Projects", "Contact"].map((item) => (
            <li
              key={item}
              className="relative cursor-pointer transition-all duration-300 hover:text-indigo-400"
            >
              {item}
              {/* Underline animation */}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-indigo-400 transition-all duration-300 hover:w-full"></span>
            </li>
          ))}
        </ul>

        {/* Desktop Button */}
        <div className="hidden md:block">
          <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-md">
            Hire Me
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden transition-colors duration-300 ${
            scrolled ? "text-white" : "text-gray-900"
          }`}
          onClick={toggleMenu}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown with smooth animation */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ${
          isOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-gray-800/95 backdrop-blur-md rounded-xl px-6 py-4 flex flex-col gap-4">
          {["Home", "About", "Projects", "Contact"].map((item) => (
            <li
              key={item}
              className="list-none text-lg font-medium text-white cursor-pointer hover:text-indigo-400 transition-all duration-300"
            >
              {item}
            </li>
          ))}
          <button className="w-full mt-2 px-5 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-md">
            Hire Me
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavAppBar;
