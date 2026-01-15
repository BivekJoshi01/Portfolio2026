import React from "react";
import MyProfile from "./MyProfile/MyProfile";
import AboutMe from "./AboutMe/AboutMe";
import TechnologyUsed from "./TechnologyUsed/TechnologyUsed";
import Projects from "./Projects/Projects";

const Home = () => {
  return (
    <div
      style={{
        scrollSnapType: "y mandatory",
        height: "99vh",
      }}
      className="overflow-y-scroll scrollbar-hide"
    >
      <section
        style={{
          minHeight: "99vh",
          scrollSnapAlign: "start",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <MyProfile />
      </section>

      <section
        style={{
          minHeight: "99vh",
          scrollSnapAlign: "start",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <AboutMe />
      </section>

      <section
        style={{
          minHeight: "99vh",
          scrollSnapAlign: "start",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TechnologyUsed />
      </section>

      <section
        style={{
          minHeight: "99vh",
          scrollSnapAlign: "start",
          // display: "flex",
          // alignItems: "center",
          // justifyContent: "center",
        }}
      >
        <Projects />
      </section>
    </div>
  );
};

export default Home;
