import React from "react";
import "./NamePlate.css";

const NamePlate = () => {
  return (
    <div className="relative inline-block px-14 py-2 bg-gray-900 border border-gray-600 rounded-xl overflow-hidden group max-w-fit">
      <h3 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight z-10 relative">
        Bivek Joshi
      </h3>

      {/* Corner stars */}
      <span className="corner-star top-0 left-0 animate-shooting-star" />
      <span className="corner-star top-0 right-0 animate-shooting-star-delayed" />
      <span className="corner-star bottom-0 left-0 animate-shooting-star-slow" />
      <span className="corner-star bottom-0 right-0 animate-shooting-star-fast" />

      {/* Background starfield (optional) */}
      <div className="absolute inset-0 bg-stars opacity-40 group-hover:opacity-70 transition duration-700"></div>
    </div>
  );
};

export default NamePlate;
