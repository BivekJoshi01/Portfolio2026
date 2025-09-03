import React, { useRef, useState, useEffect } from "react";
import MyProfile from "./MyProfile/MyProfile";
import AboutMe from "./AboutMe/AboutMe";
import TechnologyUsed from "./TechnologyUsed/TechnologyUsed";
import NavAppBar from "../components/NavAppBar/NavAppBar";
import Projects from "./Projects/Projects";

const LandLayout = () => {
  const scrollContainerRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const container = scrollContainerRef.current;
    const handleScroll = () => {
      setScrolled(container.scrollTop > 10);
    };
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={scrollContainerRef} className="w-full h-screen overflow-y-scroll">
      <NavAppBar scrolled={scrolled} />

      <div className="flex flex-col items-center justify-center max-w-6xl mx-auto gap-24 px-4">
        <div className="w-full">
          <MyProfile />
        </div>

            <div
          style={{
            display: "flex",
            minHeight: "100vh",
            alignItems: "center",
          }}
        >
          <AboutMe />
        </div>

        <div className="w-[350px] h-[350px] sm:w-[400px] sm:h-[400px] flex items-center justify-center">
          <TechnologyUsed />
        </div>

        <div
          style={{
            display: "flex",
            minHeight: "100vh",
            alignItems: "center",
          }}
        >
          <Projects />
        </div>
      </div>
    </div>
  );
};

export default LandLayout;
