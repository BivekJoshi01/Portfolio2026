import React, { useState } from "react";
import { FiSun, FiMoon, FiGlobe } from "react-icons/fi";

const ModeLanguage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [lang, setLang] = useState("en");

  const toggleTheme = () => setDarkMode(!darkMode);
  const toggleLang = () => setLang(lang === "en" ? "np" : "en");

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Container with Glassmorphism */}
      <div
        className="
          flex flex-col items-center p-1.5 gap-1
          bg-violet-800/60
          backdrop-blur-xl
          border border-white/20 dark:border-slate-700/50
          rounded-2xl shadow-2xl
          transition-all duration-500 ease-in-out
        "
      >
        {/* Theme Button */}
        <button
          onClick={toggleTheme}
          title="Toggle Theme"
          className="
            group relative
            w-12 h-12 rounded-xl
            flex items-center justify-center
            transition-all duration-300 active:scale-90
            hover:bg-white/50 dark:hover:bg-slate-800/60
            text-slate-700 dark:text-yellow-400
          "
        >
          {darkMode ? (
            <FiSun className="w-5 h-5 animate-[spin_3s_linear_infinite]" />
          ) : (
            <FiMoon className="w-5 h-5 transition-transform group-hover:-rotate-12" />
          )}
        </button>

        {/* Subtle Divider */}
        <div className="w-8 h-[1px] bg-slate-400/20 dark:bg-slate-600/30" />

        {/* Language Button */}
        <button
          onClick={toggleLang}
          title="Switch Language"
          className="
            group
            w-12 h-12 rounded-xl
            flex flex-col items-center justify-center gap-0.5
            transition-all duration-300 active:scale-90
          "
        >
          <FiGlobe className="w-4 h-4 group-hover:text-blue-500 transition-colors" />
          <span className="text-[10px] font-bold tracking-tighter uppercase">
            {lang === "en" ? "EN" : "ने"}
          </span>
        </button>
      </div>
    </div>
  );
};

export default ModeLanguage;