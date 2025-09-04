import React from "react";
import MyProfile from "./MyProfile/MyProfile";
import AboutMe from "./AboutMe/AboutMe";
import TechnologyUsed from "./TechnologyUsed/TechnologyUsed";
import Projects from "./Projects/Projects";

const Home = () => {
  return (
    <div
      className="mt-20"
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <MyProfile />
      <AboutMe />
      <div className="w-[350px] h-[350px] sm:w-[400px] sm:h-[400px] flex items-center justify-center">
        <TechnologyUsed />
      </div>
      <Projects />
    </div>
    // <div className="flex flex-col items-center justify-center max-w-6xl mx-auto gap-24 px-4">

    //   <div className="w-[350px] h-[350px] sm:w-[400px] sm:h-[400px] flex items-center justify-center">
    //     <TechnologyUsed />
    //   </div>
    // </div>
  );
};

export default Home;
