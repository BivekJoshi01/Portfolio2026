import React from "react";
import MyProfile from "./MyProfile/MyProfile";
import AboutMe from "./AboutMe/AboutMe";
import TechnologyUsed from "./TechnologyUsed/TechnologyUsed";
import Projects from "./Projects/Projects";

const Home = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className="min-h-lvh">
        <MyProfile />
      </div>
      <div className="min-h-lvh">
        <AboutMe />
      </div>

      <div className="min-h-lvh">
        <TechnologyUsed />
      </div>
      <Projects />
    </div>
  );
};

export default Home;
