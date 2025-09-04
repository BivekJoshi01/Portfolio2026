import React, { useRef, useState, useEffect } from "react";
import NavAppBar from "../components/NavAppBar/NavAppBar";
import { Outlet } from "react-router-dom";

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

      <div className="w-full flex flex-col items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
};

export default LandLayout;
