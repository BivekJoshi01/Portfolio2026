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
      <div className="grid-overlay"></div>

      {/* App content */}
      <div className="content">
        <AppRoutes />
      </div>
    </div>
  );
};

export default App;
