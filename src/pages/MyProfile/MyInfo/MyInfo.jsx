import React from "react";
import { motion } from "framer-motion";
import TypeWriter from "../../../components/TypeWriter/TypeWriter";
import NamePlate from "../../../components/NamePlate/NamePlate";

const MyInfo = () => {
  // Variations for unique floating patterns
  const floatVariant = (xRange, yRange, duration) => ({
    animate: {
      x: xRange,
      y: yRange,
      transition: {
        duration: duration,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    },
  });

  return (
    <div className="relative flex flex-col gap-8 py-16 px-4 min-h-[600px] justify-center overflow-visible">
      {/* --- FLOATING ELEMENTS (SATELLITES) --- */}

      {/* Welcome Tag - Floating Top Left */}
      <motion.div
        variants={floatVariant([0, 15], [0, 10], 3)}
        animate="animate"
        className="absolute top-0 left-10 z-10 bg-amber-200 backdrop-blur-md border border-violet-900/6 px-4 py-1.5 rounded-full text-xs tracking-widest uppercase"
      >
        Welcome to my universe 🌠
      </motion.div>

      {/* CV Button - Floating Randomly Middle Right */}
      <motion.a
        href="/cv.pdf"
        target="_blank"
        variants={floatVariant([0, -20], [0, 40], 4)}
        animate="animate"
        whileHover={{
          scale: 1.1,
          boxShadow: "0 0 20px rgba(139, 92, 246, 0.4)",
        }}
        className="absolute right-0 md:right-20 top-20 z-20 bg-indigo-500/10 border border-indigo-500/40 text-indigo-500 px-6 py-2 rounded-full text-sm font-bold backdrop-blur-sm cursor-pointer shadow-lg"
      >
        View my CV
      </motion.a>

      {/* LinkedIn - Floating Bottom Left */}
      <motion.a
        href="https://linkedin.com"
        target="_blank"
        variants={floatVariant([0, 30], [0, -25], 5)}
        animate="animate"
        whileHover={{
          scale: 1.1,
          boxShadow: "0 0 20px rgba(59, 130, 246, 0.4)",
        }}
        className="absolute left-0 md:left-70 bottom-40 z-20 bg-blue-500/10 border border-blue-500/40 text-blue-500 px-6 py-2 rounded-full text-sm font-bold backdrop-blur-sm cursor-pointer shadow-lg"
      >
        LinkedIn Profile
      </motion.a>

      {/* --- STATIC CONTENT --- */}

      <div className="relative z-0 space-y-2">
        <h1 className="text-7xl md:text-8xl font-black tracking-tighte opacity-90">
          Hello<span className="text-violet-600 italic">.</span>
        </h1>
        <h2 className="text-2xl font-extralight text-slate-500 tracking-[0.3em] uppercase ml-2">
          I'm
        </h2>
      </div>

      <div className="relative z-10 -ml-2">
        <NamePlate />
      </div>

      <div className="relative group max-w-fit mt-4">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl blur-lg opacity-20 group-hover:opacity-40 transition duration-1000"></div>
        <div className="relative bg-violet-600 border border-white/5  px-4 py-1 rounded-xl text-l md:text-xl font-semibold tracking-tight">
          <TypeWriter
            text={[
              "Frontend Developer",
              "Mern Stack Developer",
              "Modern Web Design",
            ]}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor={true}
          />
        </div>
      </div>

      <div className="mt-6 space-y-4 border-l-2 border-indigo-500/20">
        <div className="text-lg font-medium text-slate-500">
          React Enthusiast <span className="text-indigo-400">⚛️</span> | Next.js
          Explorer
        </div>
        <p className="text-slate-500 leading-relaxed italic">
          "Leading scalable UI development & shaping modern web experiences with
          clean, efficient code."
        </p>
      </div>
    </div>
  );
};

export default MyInfo;
