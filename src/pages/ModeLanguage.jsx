import React, { useState } from "react";
import { FiSun, FiMoon, FiGlobe } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/Reducer/themeSlice";
import { toggleLanguage } from "../redux/Reducer/languageSlice";

const ModeLanguage = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state) => {
    return state.theme.mode;
  });
  const lang = useSelector((state) => {
    return state.lang.lang;
  });

  return (
    <div
      className="
          flex items-center p-1.5 gap-1
          backdrop-blur-xl
        "
    >
      {/* Theme Button */}
      <button
        onClick={() => dispatch(toggleTheme())}
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
        {mode === "light" ? (
          <FiSun className="w-5 h-5 animate-[spin_3s_linear_infinite]" />
        ) : (
          <FiMoon className="w-5 h-5 transition-transform group-hover:-rotate-12" />
        )}
      </button>

      {/* Language Button */}
      <button
        onClick={() => dispatch(toggleLanguage())}
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
  );
};

export default ModeLanguage;
