import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ProjectList } from "./ProjectList";
import ProjectCard from "./ProjectCard";
import { AnimatePresence, motion } from "framer-motion";
import TypeWriter from "../../components/TypeWriter/TypeWriter";

const Projects = () => {
  const swiperRef = useRef(null);
  const [hoveredProject, setHoveredProject] = useState(null);

  useEffect(() => {
    if (swiperRef.current) {
      // Ensure swiper updates on mount
      swiperRef.current.swiper.update();
    }
  }, []);

  return (
    <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
      <div className="w-full mx-auto relative ">
        <h2 className="text-5xl font-extrabold leading-tight mb-6">
          My{" "}
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Projects
          </span>
        </h2>
        <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-xl">
          Each Projects is a unique piece of development.
        </p>

        <div className="flex gap-3 mb-3">
          <button
            onClick={() => swiperRef.current.swiper.slidePrev()}
            className="bg-indigo-300 rounded-full p-1 font-bold"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={() => swiperRef.current.swiper.slideNext()}
            className="bg-indigo-300 rounded-full p-1 font-bold"
          >
            <ChevronRight size={20} />
          </button>
        </div>
        {/* Swiper */}
        <Swiper
          ref={swiperRef}
          modules={[Navigation, Pagination, Mousewheel]}
          spaceBetween={20}
          slidesPerView={3}
          // pagination={{ clickable: true }}
          mousewheel={{ forceToAxis: true }}
          loop={true}
          grabCursor={true}
          className="pb-10"
        >
          {ProjectList?.map((project, index) => (
            <SwiperSlide key={index}>
              <ProjectCard
                project={project}
                onHover={() => setHoveredProject(project)}
                onLeave={() => setHoveredProject(null)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <AnimatePresence>
          {hoveredProject && (
            <div
              className="absolute top-0 right-0 flex flex-col items-end gap-2"
              key={hoveredProject.title}
            >
              <motion.div
                // important for smooth switching
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{
                  duration: 0.4,
                  ease: "easeOut",
                  delay: 0.15,
                }}
              >
                <div className="h-[60px] min-w-[150px] w-[100px]">
                  <img
                    src={hoveredProject.companyLogo}
                    alt={hoveredProject.title}
                    className="w-full h-full object-contain"
                  />
                </div>
              </motion.div>
              <div className="relative bg-amber-300 border border-white/5  px-4 py-0.4 rounded-xl tracking-tight text-violet-500">
                <TypeWriter
                  text={[hoveredProject?.description]}
                  typingSpeed={75}
                  pauseDuration={1500}
                  showCursor={true}
                  textColors={"blue"}
                />
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Projects;
