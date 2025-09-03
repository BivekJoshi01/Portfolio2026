import React, { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Projects = () => {
  const swiperRef = useRef(null);

  const projectCards = [
    {
      title: "Project One",
      description: "This is the first project card description.",
      img: "https://via.placeholder.com/400x250",
    },
    {
      title: "Project Two",
      description: "This is the second project card description.",
      img: "https://via.placeholder.com/400x250",
    },
    {
      title: "Project Three",
      description: "This is the third project card description.",
      img: "https://via.placeholder.com/400x250",
    },
    {
      title: "Project Four",
      description: "This is the fourth project card description.",
      img: "https://via.placeholder.com/400x250",
    },
    {
      title: "Project Five",
      description: "This is the fifth project card description.",
      img: "https://via.placeholder.com/400x250",
    },
  ];

  useEffect(() => {
    if (swiperRef.current) {
      // Ensure swiper updates on mount
      swiperRef.current.swiper.update();
    }
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto py-12 px-4 relative">
      <h2 className="text-3xl font-bold text-center mb-8">🚀 My Projects</h2>

      <div className="flex gap-3 mb-3">
        <button
          onClick={() => swiperRef.current.swiper.slidePrev()}
          className="bg-amber-400 rounded-full p-2 font-bold"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={() => swiperRef.current.swiper.slideNext()}
          className="bg-amber-400 rounded-full p-2 font-bold"
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
        {projectCards.map((project, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
              <img
                src={project.img}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-800">
                  {project.title}
                </h3>
                <p className="text-gray-600 mt-2 text-sm">
                  {project.description}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Projects;
