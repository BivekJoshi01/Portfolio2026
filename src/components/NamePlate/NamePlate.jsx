import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NamePlate = () => {
  const [isHovered, setIsHovered] = useState(false);

  const stars = useMemo(
    () =>
      Array.from({ length: 35 }).map((_, i) => ({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 2 + 1,
        duration: Math.random() * 0.3 + 0.2,
        delay: Math.random() * 2,
      })),
    [],
  );

  return (
    <div className="w-full flex">
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative"
        animate={
          isHovered
            ? {
                x: [0, -1.5, 1.5, -1, 1, 0],
                y: [0, 1, -1, 1.5, -1.5, 0],
              }
            : {
                x: [0, -0.5, 0.5, -0.5, 0.5, 0],
                y: [0, 0.5, -0.5, 0.5, -0.5, 0],
              }
        }
        transition={{
          repeat: Infinity,
          duration: 0.12,
          ease: "linear",
        }}
      >
        {/* Outer Aura */}
        <div
          className={`absolute -inset-2 bg-white/5 blur-2xl rounded-xl transition-opacity duration-1000 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Plate */}
        <div
          className="
            relative
            px-4 sm:pl-2 sm:pr-16
            py-2
            bg-[#050505]
            rounded-xl
            overflow-hidden
            border border-white/10
            shadow-2xl
            min-w-[260px] sm:min-w-[320px]
            flex justify-center items-center
            w-fit
          "
        >
          {/* Stars */}
          <div className="absolute inset-0 z-0">
            {stars.map((star) => (
              <motion.div
                key={star.id}
                className="absolute bg-white rounded-full"
                initial={{ left: star.left, top: star.top, opacity: 0.3 }}
                animate={
                  isHovered
                    ? {
                        left: ["-10%", "120%"],
                        opacity: [0, 1, 1, 0],
                        scaleX: [1, 12, 1],
                        scaleY: [1, 0.5, 1],
                      }
                    : {
                        opacity: [0.2, 0.5, 0.2],
                        scaleX: 1,
                        scaleY: 1,
                      }
                }
                transition={
                  isHovered
                    ? {
                        duration: star.duration,
                        repeat: Infinity,
                        delay: star.delay,
                        ease: "easeIn",
                      }
                    : {
                        duration: 2,
                        repeat: Infinity,
                      }
                }
                style={{
                  width: star.size,
                  height: star.size,
                  filter: isHovered
                    ? "blur(0.5px) drop-shadow(0 0 4px #fff)"
                    : "none",
                }}
              />
            ))}
          </div>

          {/* Thunder */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 0, 0.4, 0, 0.6, 0, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  times: [0, 0.8, 0.82, 0.84, 0.86, 0.88, 1],
                }}
                className="absolute inset-0 bg-blue-100 mix-blend-overlay z-10 pointer-events-none"
              />
            )}
          </AnimatePresence>

          {/* Text */}
          <div className="relative z-20">
            <motion.h1
              animate={{
                scale: isHovered ? 1.05 : 1,
                letterSpacing: isHovered ? "0.02em" : "-0.04em",
              }}
              className="
                text-3xl sm:text-5xl
                font-black
                select-none
                pointer-events-none
              "
              style={{
                background:
                  "linear-gradient(to bottom, #fff 40%, #64748b 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Bivek Joshi
            </motion.h1>

            {/* Ghost Text */}
            <AnimatePresence>
              {isHovered && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 0.3, 0],
                    x: [-5, 5, -5],
                  }}
                  transition={{ repeat: Infinity, duration: 0.1 }}
                  className="
                    absolute inset-0
                    text-4xl sm:text-6xl
                    font-black
                    text-blue-400/30
                    blur-sm italic
                  "
                >
                  Bivek Joshi
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          {/* Electric Rail */}
          <motion.div
            animate={
              isHovered ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }
            }
            className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default NamePlate;
