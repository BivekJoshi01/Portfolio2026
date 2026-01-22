import React, { useEffect } from "react";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import i18n from "./i18n";
import { useSelector } from "react-redux";

const App = () => {
  const mode = useSelector((state) => {
    return state.theme.mode;
  });

  const lang = useSelector((state) => state.lang.lang);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode);
  }, [mode]);

  useEffect(() => {
    if (lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang]);

  return (
    <div className="app-root">
      {/* Floating spheres */}
      <div className="bg">
        <div className="sphere"></div>
        <div className="sphere"></div>
        <div className="sphere"></div>
        <div className="sphere"></div>
      </div>

      {/* Grid overlay */}
      <div className="grid-overlay"></div>

      {/* App content */}
      <div className="content">
        <AppRoutes />
      </div>
    </div>
  );
};

export default App;
