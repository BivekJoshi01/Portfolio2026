import React, { useState, useEffect } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { useTranslation } from "react-i18next";

// Main Component
const MyAboutInfo = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full">
      {/* Heading */}
      <h2
        className="
          text-3xl sm:text-4xl md:text-5xl
          font-extrabold leading-tight
          mb-5 md:mb-6
        "
      >
        {t("about")}{" "}
        <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          {t("me")}
        </span>
      </h2>

      {/* Intro */}
      <p
        className="
          text-base sm:text-lg
          text-gray-600 leading-relaxed
          mb-6 md:mb-8
          max-w-xl
        "
      >
        {t("hi")}{" "}
        <span className="font-semibold text-indigo-600">{t("myFullName")}</span>
        , {t("aboutDesc")}
      </p>

      {/* Quote */}
      <p className="mb-6 md:mb-8 text-sm sm:text-base text-gray-700">
        “{t("aboutObj")}”
      </p>

      {/* Skill Pills */}
      <div
        className="
          flex flex-wrap
          gap-2 sm:gap-3 md:gap-4
          mb-8 md:mb-10
        "
      >
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
            className="
              px-4 sm:px-5
              py-1.5 sm:py-2
              rounded-full
              bg-white/80 backdrop-blur
              shadow border
              text-xs sm:text-sm
              font-medium text-indigo-600
              hover:scale-105 transition
            "
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Stats Strip */}
      <div
        className="
          flex flex-col sm:flex-row
          items-center sm:items-stretch
          gap-4 sm:gap-6 md:gap-8
          mb-10 md:mb-12
          bg-white/60 backdrop-blur
          rounded-2xl
          px-6 sm:px-8
          py-5
          shadow
          max-w-lg
        "
      >
        <Stat value={3} suffix="+" label={t("yearExperience")} />
        <Divider />
        <Stat value={10} suffix="+" label={t("project")} />
        <Divider />
        <Stat value={10000} suffix="+" label={t("userImpacted")} isLarge />
      </div>

      {/* CTA Buttons */}
      <div
        className="
          flex flex-col sm:flex-row
          gap-3 sm:gap-4
        "
      >
        <a
          href="#projects"
          className="
            px-7 sm:px-8
            py-3.5 sm:py-4
            text-sm sm:text-base
            bg-gradient-to-r from-indigo-600 to-purple-600
            text-white
            rounded-xl
            shadow-lg
            hover:scale-105
            transition-transform
            text-center
          "
        >
          {t("viewWork")} →
        </a>

        <a
          href="#contact-me"
          className="
            px-7 sm:px-8
            py-3.5 sm:py-4
            text-sm sm:text-base
            border-2 border-indigo-600
            text-indigo-600
            rounded-xl
            hover:bg-indigo-600 hover:text-white
            transition
            text-center
          "
        >
          {t("contactMe")}
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
    <div className="text-center min-w-[120px]">
      <motion.div className="text-xl sm:text-2xl font-bold text-indigo-600">
        {display} {suffix}
      </motion.div>
      <div className="text-xs sm:text-sm text-gray-600">{label}</div>
    </div>
  );
};

// Divider Component
const Divider = () => <div className="hidden sm:block w-px bg-gray-300/50" />;

export default MyAboutInfo;
