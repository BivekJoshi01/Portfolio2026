import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import BivekJoshi from "../../assets/BivekJoshi.svg";

const NavAppBar = ({ scrolled }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("");
  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = [
    // { name: "Home", path: "/" },
    { name: "About Me", path: "/about-me" },
    { name: "Projects", path: "/projects" },
    { name: "Experience", path: "/experience" },
    { name: "Contact", path: "/contact-me" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between relative">
        {/* Floating Blob Behind Logo */}
        <span className="absolute -left-12 -top-5 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl animate-pulse-slow pointer-events-none"></span>

        {/* Logo */}
        <div
          style={{ width: "200px" }}
          onClick={() => {
            navigate(`/`);
            setActive("");
          }}
        >
          <img src={BivekJoshi} style={{ width: "100%", height: "100%" }} />
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-10 text-lg font-medium relative z-10">
          {navItems.map(({ name, path }) => (
            <li key={name}>
              <NavLink
                to={path}
                onClick={() => setActive(name)}
                className={({ isActive }) =>
                  `relative cursor-pointer px-4 py-1 rounded-2xl transition-all duration-300 ease-in-out ${
                    isActive || active === name
                      ? "text-white bg-indigo-500 shadow-lg scale-105"
                      : scrolled
                      ? "text-gray-200 hover:text-indigo-400 hover:scale-105"
                      : "text-gray-800 hover:text-indigo-400 hover:scale-105"
                  }`
                }
              >
                {name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Desktop Button */}
        <div className="hidden md:block relative z-10">
          <button className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg text-white">
            Hire Me
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden relative z-10 transition-colors duration-300 ${
            scrolled ? "text-white" : "text-gray-900"
          }`}
          onClick={toggleMenu}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 mt-4 ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-gray-900/70 backdrop-blur-xl border border-white/10 rounded-xl px-6 py-4 flex flex-col gap-4 shadow-lg relative">
          {navItems.map(({ name, path }) => (
            <NavLink
              key={name}
              to={path}
              onClick={() => {
                setActive(name);
                setIsOpen(false);
              }}
              className={({ isActive }) =>
                `list-none text-lg font-medium cursor-pointer transition-all duration-300 hover:scale-105 ${
                  isActive || active === name
                    ? "text-indigo-400"
                    : "text-gray-200 hover:text-indigo-400"
                }`
              }
            >
              {name}
            </NavLink>
          ))}
          <button className="w-full mt-2 px-5 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-md text-white">
            Github
          </button>
          {/* Mobile Background Blob */}
          <span className="absolute -top-10 -right-10 w-24 h-24 bg-purple-500/20 rounded-full blur-2xl animate-pulse-slow pointer-events-none"></span>
        </div>
      </div>
    </div>
  );
};

export default NavAppBar;
