import React, { useState } from "react";
import { X, ChevronRight } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import BivekJoshi from "../../assets/BivekJoshi.svg";

const NavAppBar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "About Me", path: "/about-me" },
    { name: "Projects", path: "/projects" },
    { name: "Experience", path: "/experience" },
    { name: "Contact", path: "/contact-me" },
  ];

  return (
    <nav className="relative w-full px-6 py-6 flex items-center justify-between z-40">
      {/* Background Decorative Glow (Desktop Only) */}
      <div className="hidden md:block absolute -left-20 -top-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Logo */}
      <div
        className="cursor-pointer z-50 transition-transform active:scale-95"
        onClick={() => { navigate(`/`); setIsOpen(false); }}
      >
        <img src={BivekJoshi} className="w-32 sm:w-44" alt="Logo" />
      </div>

      {/* DESKTOP MENU: Modern Glassmorphism Pill */}
      <ul className="hidden md:flex items-center p-1.5 bg-white/40 backdrop-blur-xl border border-white/60 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
        {navItems.map(({ name, path }) => (
          <li key={name}>
            <NavLink
              to={path}
              className={({ isActive }) =>
                `px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                    : "text-gray-600 hover:text-indigo-600 hover:bg-white/50"
                }`
              }
            >
              {name}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* DESKTOP HIRE BUTTON */}
      <div className="hidden md:block">
        <button className="px-8 py-3 bg-gray-900 text-white rounded-full font-bold hover:bg-indigo-600 hover:shadow-xl hover:shadow-indigo-100 transition-all duration-300 active:scale-95">
          Hire Me
        </button>
      </div>

      {/* MOBILE ONLY: Edge-Stuck Menu Handle */}
      {/* md:hidden ensures this never shows on desktop */}
      {!isOpen && (
        <div 
          onClick={() => setIsOpen(true)}
          className="md:hidden fixed right-0 top-1/2 -translate-y-1/2 z-[60] flex items-center group cursor-pointer"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 -rotate-90 -mr-3 opacity-60 group-hover:opacity-100 transition-all duration-300">
            Menu
          </span>
          {/* The Vertical Handle Bar */}
          <div className="h-20 w-1.5 group-hover:w-3 bg-indigo-600 rounded-l-full transition-all duration-300 shadow-[-2px_0_10px_rgba(79,70,229,0.3)]" />
        </div>
      )}

      {/* MOBILE SIDEBAR OVERLAY */}
      <div
        className={`md:hidden fixed inset-0 bg-indigo-950/30 backdrop-blur-md z-[70] transition-opacity duration-500 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* MOBILE SIDEBAR */}
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-[80%] max-w-[320px] bg-white z-[80] shadow-[-20px_0_60px_rgba(0,0,0,0.1)] transform transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Top Area */}
          <div className="flex items-center justify-between p-8">
            <div className="h-1.5 w-12 bg-indigo-600 rounded-full" />
            <button
              onClick={() => setIsOpen(false)}
              className="p-3 bg-gray-100 rounded-full text-gray-900 active:scale-90 transition-transform"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Links */}
          <ul className="flex flex-col gap-3 px-6 mt-4">
            {navItems.map(({ name, path }) => (
              <li key={name}>
                <NavLink
                  to={path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between p-5 rounded-2xl text-xl font-bold transition-all ${
                      isActive
                        ? "bg-indigo-600 text-white shadow-xl shadow-indigo-100"
                        : "text-gray-800 active:bg-gray-50"
                    }`
                  }
                >
                  <span>{name}</span>
                  <ChevronRight size={20} className="opacity-30" />
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Bottom Call to Action */}
          <div className="mt-auto p-8 border-t border-gray-50">
            <button className="w-full py-5 bg-gray-900 text-white rounded-2xl font-black text-lg shadow-2xl active:scale-95 transition-all">
              HIRE ME
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavAppBar;