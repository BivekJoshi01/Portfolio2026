import React, { useState, useEffect } from "react";
import { motion, useMotionValue, animate } from "framer-motion";

// Main Component
const MyAboutInfo = () => {
  return (
    <div>
      <h2 className="text-5xl font-extrabold leading-tight mb-6">
        About{" "}
        <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Me
        </span>
      </h2>

      <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-xl">
        Hi, I'm{" "}
        <span className="font-semibold text-indigo-600">
          Bivek Prasad Joshi
        </span>
        , a frontend developer who crafts modern, fast, and beautiful web
        experiences. I specialize in turning complex ideas into elegant,
        high-performance user interfaces.
      </p>

      <p className="mb-8">
        “I care deeply about clean code, smooth UX, and products people love
        using.”
      </p>

      {/* Skill Pills */}
      <div className="flex flex-wrap gap-4 mb-10">
        {[
          "React",
          "Tailwind CSS",
          "TypeScript",
          "UI / UX",
          "REST APIs",
          "Performance",
        ].map((skill) => (
          <span
            key={skill}
            className="px-5 py-2 rounded-full bg-white/80 backdrop-blur shadow border text-sm font-medium text-indigo-600 hover:scale-105 transition"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Stats Strip */}
      <div className="flex gap-8 mb-12 bg-white/60 backdrop-blur rounded-2xl px-8 py-5 shadow max-w-lg">
        <Stat value={3} suffix="+" label="Years Experience" />
        <Divider />
        <Stat value={10} suffix="+" label="Projects" />
        <Divider />
        <Stat value={10000} suffix="+" label="Users Impacted" isLarge />
      </div>

      {/* CTA Buttons */}
      <div className="flex gap-4">
        <a
          href="#projects"
          className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl shadow-lg hover:scale-105 transition-transform"
        >
          View My Work →
        </a>

        <a
          href="#contact"
          className="px-8 py-4 border-2 border-indigo-600 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition"
        >
          Contact Me
        </a>
      </div>
    </div>
  );
};

// Animated Stat Component
const Stat = ({ value, suffix = "", label, isLarge = false }) => {
  const count = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(count, value, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (latest) => {
        if (isLarge) {
          // For large numbers, format like 10K
          const formatted =
            latest >= 1000
              ? `${Math.floor(latest / 1000)}K`
              : Math.floor(latest);
          setDisplay(formatted);
        } else {
          setDisplay(Math.floor(latest));
        }
      },
    });

    return () => controls.stop();
  }, [count, value, isLarge]);

  return (
    <div className="text-center">
      <motion.div className="text-2xl font-bold text-indigo-600">
        {display} {suffix}
      </motion.div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );
};

// Divider Component
const Divider = () => <div className="w-px bg-gray-300/50" />;

export default MyAboutInfo;
