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
    <div
      ref={scrollContainerRef}
      className="w-full h-screen max-w-7xl px-2 overflow-y-scroll scrollbar-hide"
    >
      <div style={{ width: "100%" }}>
        {/* <div className="bg-amber-500 fixed"> */}
          <NavAppBar scrolled={scrolled} />
        {/* </div> */}
      </div>
      <div className="">
        <Outlet />
      </div>
    </div>
  );
};

export default LandLayout;
