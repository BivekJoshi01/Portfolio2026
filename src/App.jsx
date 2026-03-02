import React, { useEffect } from "react";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import i18n from "./i18n";
import { useSelector } from "react-redux";
import GridAnimation from "./pages/GridAnimation";
import { applyTheme } from "./applyTheme";
import { themes } from "./theme";

const App = () => {
  const mode = useSelector((state) => state.theme.mode);
  const lang = useSelector((state) => state.lang.lang);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode);
    const themeObj = themes[mode] ?? themes.light;
    applyTheme(themeObj);
  }, [mode]);

  useEffect(() => {
    if (lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang]);

  useEffect(() => {
    // Disable right click
    const handleContextMenu = (e) => {
      e.preventDefault();
    };

    // Disable inspect shortcuts
    const handleKeyDown = (e) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && e.key === "I") ||
        (e.ctrlKey && e.shiftKey && e.key === "C") ||
        (e.ctrlKey && e.key === "U")
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      className={`app-root ${mode === "dark" ? "text-white" : "text-black"}`}
    >
      {/* Floating spheres */}
      <div className="bg">
        <div className="sphere"></div>
        <div className="sphere"></div>
        <div className="sphere"></div>
        <div className="sphere"></div>
      </div>

      {/* Grid overlay */}
      <GridAnimation mode={mode} />

      {/* App content */}
      <div className="content">
        <AppRoutes />
      </div>
    </div>
  );
};

export default App;
