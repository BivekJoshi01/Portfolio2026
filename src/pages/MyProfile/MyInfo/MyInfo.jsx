import React, { useMemo } from "react";
import { motion } from "framer-motion";
import TypeWriter from "../../../components/TypeWriter/TypeWriter";
import NamePlate from "../../../components/NamePlate/NamePlate";
import { useTranslation } from "react-i18next";
import "./MyInfo.css";

const FLOAT_CONFIG = [
  { x: [0, 15], y: [0, 10], duration: 3 },
  { x: [0, -20], y: [0, 40], duration: 4 },
  { x: [0, 30], y: [0, -25], duration: 5 },
];

const TYPEWRITER_TEXTS = [
  "Frontend Developer",
  "Mern Stack Developer",
  "Modern Web Design",
];

const MyInfo = () => {
  const { t } = useTranslation();

  const floatVariant = useMemo(
    () => (xRange, yRange, duration) => ({
      animate: {
        x: xRange,
        y: yRange,
        transition: {
          duration,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        },
      },
    }),
    []
  );

  return (
    <div className="relative flex flex-col justify-center gap-8 overflow-visible px-4 py-16">
      {/* Floating: greeting tag */}
      <motion.div
        variants={floatVariant(FLOAT_CONFIG[0].x, FLOAT_CONFIG[0].y, FLOAT_CONFIG[0].duration)}
        animate="animate"
        className="myinfo-greeting absolute left-10 top-0 z-10 rounded-full border px-4 py-1.5 text-xs uppercase tracking-widest backdrop-blur-md"
      >
        {t("greeting")}
      </motion.div>

      {/* Floating: CV link */}
      <motion.a
        href="/#/cv.pdf"
        target="_blank"
        rel="noopener noreferrer"
        variants={floatVariant(FLOAT_CONFIG[1].x, FLOAT_CONFIG[1].y, FLOAT_CONFIG[1].duration)}
        animate="animate"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.98 }}
        className="myinfo-link absolute right-0 top-20 z-20 cursor-pointer rounded-full px-6 py-2.5 text-sm font-semibold shadow-md backdrop-blur-sm transition-shadow duration-300 md:right-20"
      >
        {t("viewCv")}
      </motion.a>

      {/* Floating: LinkedIn link */}
      <motion.a
        href="https://www.linkedin.com/in/bivek-joshi-68b02b239/"
        target="_blank"
        rel="noopener noreferrer"
        variants={floatVariant(FLOAT_CONFIG[2].x, FLOAT_CONFIG[2].y, FLOAT_CONFIG[2].duration)}
        animate="animate"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.98 }}
        className="myinfo-link absolute bottom-51 left-10 z-20 cursor-pointer rounded-full px-6 py-2.5 text-sm font-semibold shadow-md backdrop-blur-sm transition-shadow duration-300 md:left-60"
      >
        LinkedIn Profile
      </motion.a>

      {/* Main heading */}
      <div className="relative z-0 space-y-2">
        <h1 className="myinfo-heading text-7xl font-black tracking-tight opacity-95 md:text-8xl">
          {t("hello")}
          <span className="myinfo-heading-accent italic">.</span>
        </h1>
        <h2 className="myinfo-muted ml-2 text-2xl font-extralight uppercase tracking-[0.3em]">
          {t("I")}
        </h2>
      </div>

      <div className="relative z-10 -ml-2">
        <NamePlate />
      </div>

      {/* TypeWriter block */}
      <div className="group relative mt-4 max-w-fit">
        <div className="myinfo-typewriter-inner relative rounded-xl px-4 py-2 text-lg font-semibold tracking-tight md:text-xl">
          <TypeWriter
            text={TYPEWRITER_TEXTS}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor={true}
          />
        </div>
      </div>

      {/* Tagline & quote */}
      <div className="myinfo-quote-border mt-6 space-y-4 pl-4">
        <p className="myinfo-muted text-lg font-medium">
          React Enthusiast <span className="myinfo-tagline-accent">⚛️</span> | Next.js Explorer
        </p>
        <p className="myinfo-muted leading-relaxed italic">
          "{t("motto")}"
        </p>
      </div>
    </div>
  );
};

export default MyInfo;
