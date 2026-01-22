import React, { useRef, useState, useEffect } from "react";
import NavAppBar from "../components/NavAppBar/NavAppBar";
import { Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Mode from "./Mode";

const LandLayout = () => {
  const scrollContainerRef = useRef(null);
  const [showNav, setShowNav] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const handleScroll = () => {
      const current = el.scrollTop;

      // Hide when scrolling down
      if (current > lastScrollY.current && current > 60) {
        setShowNav(false);
      }
      // Show when scrolling up
      else {
        setShowNav(true);
      }

      lastScrollY.current = current;
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={scrollContainerRef}
      className="w-full h-screen max-w-7xl mx-auto px-2 overflow-y-scroll scrollbar-hide"
    >
      {/* Sticky animated navbar */}
      <div className="sticky top-0 z-50">
        <AnimatePresence mode="wait">
          {showNav && (
            <motion.div
              key="navbar"
              initial={{
                y: -120,
                opacity: 0,
                scale: 0.9,
                filter: "blur(6px)",
              }}
              animate={{
                y: 0,
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
              }}
              exit={{
                y: -80,
                opacity: 0,
                scale: 0.95,
                filter: "blur(4px)",
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 22,
                mass: 0.8,
              }}
              // className="bg-amber-300/80 p-1 mt-1 rounded-xl shadow-xl"
              className="p-1"
            >
              <NavAppBar />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Page Content */}
      <div className="min-h-screen flex items-center">
        <Outlet />
      </div>

      <div className="absolute bottom-10 right-10">
        <Mode />
      </div>
    </div>
  );
};

export default LandLayout;
