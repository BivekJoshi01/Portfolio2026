import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import Logo from "../../assets/BivekJoshi.svg";

const quotes = [
  "Crafting digital experiences...",
  "Designing with purpose.",
  "Building the future, one pixel at a time.",
  "Turning coffee into clean code.",
  "Welcome to Bivek's Creative Space.",
];

// First visit gets a short intro; reloads in the same session barely see it.
const MIN_DURATION_FIRST = 1000;
const MIN_DURATION_REPEAT = 400;
// Never hold the visitor longer than this, even on a slow network.
const MAX_WAIT = 3500;
const INTRO_SEEN_KEY = "introSeen";

const hasSeenIntro = () => {
  try {
    return sessionStorage.getItem(INTRO_SEEN_KEY) === "1";
  } catch {
    return false;
  }
};

const whenPageLoaded = () =>
  document.readyState === "complete"
    ? Promise.resolve()
    : new Promise((resolve) =>
        window.addEventListener("load", resolve, { once: true }),
      );

const Loader = ({ onComplete, waitFor }) => {
  const { t } = useTranslation();
  const [progress, setProgress] = useState(0);
  // One quote per visit; the last one is reserved for "ready"
  const [quoteIndex, setQuoteIndex] = useState(() =>
    Math.floor(Math.random() * (quotes.length - 1)),
  );
  const [isReady, setIsReady] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  // Resolve once fonts, the page and the first route chunk are in (or MAX_WAIT hits).
  useEffect(() => {
    let cancelled = false;
    const minDuration = hasSeenIntro() ? MIN_DURATION_REPEAT : MIN_DURATION_FIRST;
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const logo = new Image();
    logo.src = Logo;

    const assets = Promise.all([
      document.fonts?.ready,
      whenPageLoaded(),
      logo.decode?.().catch(() => {}),
      waitFor,
    ]).catch(() => {});

    Promise.all([Promise.race([assets, delay(MAX_WAIT)]), delay(minDuration)]).then(
      () => {
        if (cancelled) return;
        try {
          sessionStorage.setItem(INTRO_SEEN_KEY, "1");
        } catch {
          /* storage unavailable */
        }
        setIsReady(true);
      },
    );

    return () => {
      cancelled = true;
    };
  }, [waitFor]);

  // Ease towards 90% while waiting, then sprint to 100% once ready.
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => {
        const target = isReady ? 100 : 90;
        const next = p + (target - p) * (isReady ? 0.5 : 0.08);
        return target - next < 0.5 ? target : next;
      });
    }, 40);
    return () => clearInterval(timer);
  }, [isReady]);

  useEffect(() => {
    if (progress !== 100) return;
    setQuoteIndex(quotes.length - 1);
    // Brief beat on "System Ready" before handing over
    const timeout = setTimeout(() => onCompleteRef.current?.(), 350);
    return () => clearTimeout(timeout);
  }, [progress]);

  return (
    <div
      role="status"
      aria-label="Loading"
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-(--bg) p-6"
    >
      {/* Single soft, theme-aware glow */}
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full blur-[120px] opacity-40"
        style={{
          background:
            "radial-gradient(circle, var(--primary), transparent 70%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center">
        {/* Logo with a light sweep across it */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, filter: "blur(8px)" }}
          animate={
            logoLoaded
              ? { opacity: 1, scale: 1, filter: "blur(0px)" }
              : { opacity: 0, scale: 0.92, filter: "blur(8px)" }
          }
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative w-40 sm:w-48 aspect-[793/564]"
        >
          <img
            src={Logo}
            alt={t("myFullName")}
            onLoad={() => setLogoLoaded(true)}
            className="w-full h-full object-contain select-none"
            style={{
              filter:
                "drop-shadow(0 8px 28px color-mix(in srgb, var(--primary) 55%, transparent))",
            }}
            draggable={false}
          />
          <motion.div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              WebkitMaskImage: `url(${Logo})`,
              maskImage: `url(${Logo})`,
              WebkitMaskSize: "contain",
              maskSize: "contain",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskPosition: "center",
              maskPosition: "center",
              background:
                "linear-gradient(110deg, transparent 40%, rgba(255,255,255,0.9) 50%, transparent 60%)",
              backgroundSize: "250% 100%",
            }}
            animate={{ backgroundPosition: ["120% 0%", "-20% 0%"] }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              repeatDelay: 0.5,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Progress */}
        <div
          className="mt-10 h-[2px] w-48 rounded-full overflow-hidden"
          style={{
            background: "color-mix(in srgb, var(--text) 10%, transparent)",
          }}
        >
          <div
            className="h-full rounded-full"
            style={{
              width: `${progress}%`,
              background: "linear-gradient(90deg, var(--primary), var(--secondary))",
              boxShadow: "0 0 12px var(--primary)",
            }}
          />
        </div>

        {/* Quote */}
        <div className="mt-5 h-6 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={quoteIndex}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 0.6, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="text-sm tracking-wide text-(--text) text-center"
            >
              {quotes[quoteIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Credit */}
      <div className="absolute bottom-8 text-(--text) opacity-40 text-[10px] tracking-[0.5em] uppercase">
        {t("myFullName")} • {new Date().getFullYear()}
      </div>
    </div>
  );
};

export default Loader;
