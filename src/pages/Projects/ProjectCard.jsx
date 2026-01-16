import React from "react";
import { FiExternalLink } from "react-icons/fi";

const ProjectCard = ({ project, onHover, onLeave }) => {
  const openProject = () => {
    if (project?.redirect_url) {
      window.open(project.redirect_url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div
      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Image wrapper */}
      <div className="relative h-80 overflow-hidden">
        <img
          src={project.img}
          alt={project.title}
          className="
            absolute top-0 left-0 w-full
            transition-transform duration-[9000ms] ease-linear
            group-hover:-translate-y-[40%]
          "
        />
        {project?.redirect_url && (
          <button
            onClick={openProject}
            className="
            absolute bottom-4 right-4
            flex items-center gap-2
            bg-amber-300 text-violet-700
            px-4 py-2 rounded-2xl
            font-semibold text-sm
            shadow-md
            hover:bg-amber-400
            hover:scale-105
            transition-all duration-300
          "
          >
            View
            <FiExternalLink className="text-base" />
          </button>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-800">{project?.title}</h3>
        <p className="text-gray-600 mt-2 text-sm">{project?.info}</p>
      </div>
    </div>
  );
};

export default ProjectCard;
