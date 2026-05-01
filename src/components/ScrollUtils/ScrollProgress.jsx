import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useTranslation } from "react-i18next";

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  const [scroller, setScroller] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    const findScroller = () => {
      const candidates = document.querySelectorAll(
        ".overflow-y-scroll, .overflow-y-auto"
      );
      let best = null;
      let bestHeight = 0;
      candidates.forEach((el) => {
        if (el.scrollHeight > el.clientHeight && el.scrollHeight > bestHeight) {
          best = el;
          bestHeight = el.scrollHeight;
        }
      });
      return best || document.scrollingElement || document.documentElement;
    };

    let target = findScroller();
    setScroller(target);

    const compute = () => {
      const el = target;
      if (!el) return;
      const top = el.scrollTop ?? window.scrollY;
      const height =
        (el.scrollHeight ?? document.documentElement.scrollHeight) -
        (el.clientHeight ?? window.innerHeight);
      const pct = height > 0 ? (top / height) * 100 : 0;
      setProgress(pct);
    };

    compute();
    const onScroll = () => compute();
    target.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", compute);

    // Re-attach if route swaps the scroller
    const interval = setInterval(() => {
      const next = findScroller();
      if (next !== target) {
        target.removeEventListener("scroll", onScroll);
        target = next;
        setScroller(next);
        target.addEventListener("scroll", onScroll, { passive: true });
        compute();
      }
    }, 1500);

    return () => {
      target.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", compute);
      clearInterval(interval);
    };
  }, []);

  const scrollToTop = () => {
    if (!scroller) return;
    scroller.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div
        className="fixed top-0 left-0 right-0 z-60 h-0.75 pointer-events-none"
        style={{ background: "transparent" }}
        aria-hidden
      >
        <motion.div
          className="h-full origin-left"
          style={{
            width: `${progress}%`,
            background:
              "linear-gradient(90deg, var(--primary, #7c3aed), var(--secondary, #06b6d4))",
            boxShadow: "0 0 12px var(--primary, #7c3aed)",
          }}
          transition={{ ease: "linear", duration: 0.05 }}
        />
      </div>

      <AnimatePresence>
        {progress > 18 && (
          <motion.button
            type="button"
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full shadow-xl backdrop-blur-md hover:scale-110 active:scale-95 transition-transform"
            style={{
              background: "var(--primary, #7c3aed)",
              color: "#fff",
              boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
            }}
            aria-label={t("scroll_back_to_top")}
            title={t("scroll_back_to_top")}
          >
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default ScrollProgress;
