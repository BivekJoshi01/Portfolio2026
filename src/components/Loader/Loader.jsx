import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

const quotes = [
  "Crafting digital experiences...",
  "Designing with purpose.",
  "Building the future, one pixel at a time.",
  "Turning coffee into clean code.",
  "Welcome to Bivek's Creative Space.",
];

const Loader = ({ onComplete }) => {
  const { t } = useTranslation();
  const [progress, setProgress] = useState(0);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const totalDuration = 5000;
    const intervalTime = 50;
    const increment = 100 / (totalDuration / intervalTime);

    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        const nextProgress = oldProgress + increment;
        if (nextProgress >= 100) {
          clearInterval(timer);
          return 100;
        }
        return nextProgress;
      });
    }, intervalTime);

    const quoteTimer = setInterval(() => {
      setQuoteIndex((prev) => {
        if (prev < quotes.length - 1) return prev + 1;
        return prev;
      });
    }, 1100);

    return () => {
      clearInterval(timer);
      clearInterval(quoteTimer);
    };
  }, []);

  //   useEffect(() => {
  //     if (progress === 100) {
  //       setQuoteIndex(quotes.length - 1);
  //       const timeout = setTimeout(() => {
  //         setIsFinished(true);
  //         setTimeout(() => {
  //           if (onComplete) onComplete();
  //         }, 800);
  //       }, 1000);
  //       return () => clearTimeout(timeout);
  //     }
  //   }, [progress, onComplete]);

  useEffect(() => {
    if (progress === 100) {
      setQuoteIndex(quotes.length - 1);
      setIsFinished(true); // Immediately finish once progress hits 100
      if (onComplete) {
        onComplete(); // Call onComplete without additional delay
      }
    }
  }, [progress, onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 bg-[#030712] flex flex-col items-center justify-center p-6 z-[9999] overflow-hidden"
        >
          {/* Background Ambient Glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px]" />

          <div className="flex flex-col items-center justify-center min-h-[160px] space-y-6 z-10">
            {/* Main Animated Orb */}
            <div className="relative w-20 h-20">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-2 border-transparent border-t-purple-500 border-l-blue-500 blur-[1px]"
              />
              <div className="absolute inset-2 rounded-full border border-slate-800 animate-[ping_2s_linear_infinite]" />
              <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-purple-600/20 to-blue-600/30 backdrop-blur-xl border border-white/10 flex items-center justify-center shadow-inner">
                <motion.div
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                />
              </div>
            </div>

            <div className="text-center">
              <span className="text-[10px] font-bold tracking-[0.3em] text-slate-500 uppercase">
                {progress < 100 ? "System Initializing" : "System Ready"}
              </span>
            </div>
          </div>

          <div className="w-full max-w-md mt-12 relative z-10">
            {/* Quote Section */}
            <div className="h-16 mb-6 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={quoteIndex}
                  initial={{ opacity: 0, y: 15, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -15, filter: "blur(10px)" }}
                  transition={{ duration: 0.6, ease: "circOut" }}
                  className="text-lg md:text-xl font-light tracking-wide text-slate-200 text-center"
                >
                  {quotes[quoteIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Premium Progress Bar */}
            <div className="relative h-[4px] w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-600 via-purple-500 to-indigo-400 shadow-[0_0_20px_rgba(139,92,246,0.6)]"
              />
              {/* Shimmer Effect on bar */}
              <motion.div
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
              />
            </div>

            {/* Footer Stats */}
            <div className="mt-4 flex justify-between items-center font-mono text-[9px] tracking-widest uppercase text-slate-600">
              <div className="flex gap-4">
                <span>Core: v2.0.4</span>
                <span className="text-slate-800">|</span>
                <span>Status: {progress < 100 ? "Loading" : "Active"}</span>
              </div>
              <span className="text-purple-400 font-bold text-xs transition-all duration-300">
                {Math.round(progress)}%
              </span>
            </div>
          </div>

          {/* Bottom Credit */}
          <div className="absolute bottom-10 overflow-hidden">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-slate-500 text-[10px] tracking-[0.5em] uppercase"
            >
              {t("myFullName")} • {new Date().getFullYear()}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
