import React from "react";

const AboutMe = () => {
  return (
    <section
      id="about"
      className="mt-20 min-h-[90vh] flex items-center justify-center px-6 md:px-20"
    >
      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-12 items-center">
        {/* Profile Image */}
        <div className="flex justify-center">
          <img
            src="https://via.placeholder.com/300" // replace with your image
            alt="Profile"
            className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-2xl shadow-lg border-4 border-indigo-500 hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* About Content */}
        <div className="text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">Me</span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            Hi, I’m <span className="font-semibold text-indigo-600">[Your Name]</span>, 
            a passionate frontend developer who loves building beautiful, 
            responsive, and user-friendly web applications. I enjoy bringing ideas 
            to life through code and constantly learning new technologies to 
            improve my craft.
          </p>

          {/* Skills / Highlights */}
          <div className="grid grid-cols-2 gap-4 text-gray-700 text-base">
            <div className="flex items-center gap-2">
              <span className="text-indigo-500 text-xl">⚡</span> React & Tailwind
            </div>
            <div className="flex items-center gap-2">
              <span className="text-indigo-500 text-xl">⚡</span> JavaScript / TypeScript
            </div>
            <div className="flex items-center gap-2">
              <span className="text-indigo-500 text-xl">⚡</span> UI/UX Design
            </div>
            <div className="flex items-center gap-2">
              <span className="text-indigo-500 text-xl">⚡</span> API Integration
            </div>
          </div>

          {/* CTA Button */}
          <div className="mt-8">
            <a
              href="#projects"
              className="px-6 py-3 bg-indigo-600 text-white rounded-xl shadow-md hover:bg-indigo-700 transition-all duration-300"
            >
              View My Work
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
