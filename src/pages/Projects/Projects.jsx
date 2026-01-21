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
    if (swiperRef.current) swiperRef.current.swiper.update();
  }, []);

  return (
    <div className="w-full flex justify-center px-4 sm:px-6">
      <div className="w-full max-w-7xl relative">
        {/* Header */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-4 sm:mb-6">
          My{" "}
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Projects
          </span>
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed mb-6 sm:mb-8 max-w-xl">
          Each Project is a unique piece of development.
        </p>

        {/* Navigation */}
        <div className="flex gap-2 sm:gap-3 mb-3">
          <button
            onClick={() => swiperRef.current.swiper.slidePrev()}
            className="bg-indigo-300 rounded-full p-1 sm:p-2 font-bold"
          >
            <ChevronLeft size={16} sm={20} />
          </button>
          <button
            onClick={() => swiperRef.current.swiper.slideNext()}
            className="bg-indigo-300 rounded-full p-1 sm:p-2 font-bold"
          >
            <ChevronRight size={16} sm={20} />
          </button>
        </div>

        {/* Swiper */}
        <Swiper
          ref={swiperRef}
          modules={[Navigation, Pagination, Mousewheel]}
          spaceBetween={15}
          slidesPerView={1} // default mobile
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 20 }, // sm
            768: { slidesPerView: 2, spaceBetween: 20 }, // md
            1024: { slidesPerView: 3, spaceBetween: 20 }, // lg
          }}
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

        {/* Hover/Description */}
        <AnimatePresence>
          {hoveredProject && (
            <div
              className="absolute top-0 right-0"
              key={hoveredProject.title}
            >
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.15 }}
              >
                <div className="h-[50px] sm:h-[60px] min-w-[100px] sm:min-w-[150px] w-[100px]">
                  <img
                    src={hoveredProject.companyLogo}
                    alt={hoveredProject.title}
                    className="w-full h-full object-contain"
                  />
                </div>
              </motion.div>

              <div className="relative bg-amber-300 border border-white/5 px-2 sm:px-4 py-0.5 sm:py-1 rounded-xl tracking-tight text-violet-500 text-xs sm:text-sm">
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
