import React from "react";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import "./i18n";

const App = () => {
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
