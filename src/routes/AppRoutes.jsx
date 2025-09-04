import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import LandLayout from "../pages/LandLayout";
import AboutMe from "../pages/AboutMe/AboutMe";
import Home from "../pages/Home";
import ContactMe from "../pages/ContactMe/ContactMe";
import Projects from "../pages/Projects/Projects";
import Experience from "../pages/Expericence/Expericence";
import VSLayout from "../pages/VSClone/VSLayout";
// import Experience from "../pages/Experience/Experience";
// import AboutMe from "../pages/AboutMe/AboutMe";
// import Education from "../pages/Education/Education";
// import Home from "../pages/Home/Home";

const AppRoutes = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LandLayout />}>
          <Route index element={<Home />} />
          <Route path="about-me" element={<AboutMe />} />
          <Route path="projects" element={<Projects />} />
          <Route path="experience" element={<Experience />} />
          <Route path="contact-me" element={<ContactMe />} />
          {/* <Route path="education" element={<Education />} /> */}
        </Route>

        <Route path="/vs-profile" element={<VSLayout />}>
          <Route index element={<p>xaxsaxs</p>} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default AppRoutes;
