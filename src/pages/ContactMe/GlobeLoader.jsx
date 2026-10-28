import React from "react";
import { motion } from "framer-motion";

// DOM-only (no three.js) so it can render before the 3D chunk arrives.
const GlobeLoader = ({ progress }) => {
  const hasProgress = typeof progress === "number";

  return (
    <motion.div
      role="status"
      aria-live="polite"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.4, delay: 0.15 }}
      className="absolute inset-0 flex flex-col items-center justify-center gap-5 pointer-events-none"
    >
      <div className="relative w-28 h-28">
        {/* orbit rings */}
        <motion.span
          className="absolute inset-0 rounded-full border border-dashed opacity-40"
          style={{ borderColor: "var(--text)" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        />
        <motion.span
          className="absolute inset-2 rounded-full border-2 border-transparent"
          style={{
            borderTopColor: "var(--primary)",
            borderLeftColor: "var(--secondary)",
          }}
          animate={{ rotate: -360 }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
        />
        {/* planet placeholder */}
        <div
          className="absolute inset-6 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 35% 30%, color-mix(in srgb, var(--primary) 70%, white), var(--primary) 45%, color-mix(in srgb, var(--primary) 40%, black))",
            boxShadow:
              "0 0 40px -6px color-mix(in srgb, var(--primary) 70%, transparent)",
          }}
        />
        {/* satellite dot */}
        <motion.span
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
        >
          <span
            className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white"
            style={{ boxShadow: "0 0 10px 2px var(--primary)" }}
          />
        </motion.span>
      </div>

      <div className="w-40 space-y-2 text-center font-mono text-[10px] tracking-[0.3em] uppercase">
        <p className="opacity-70">Locating</p>
        <div
          className="h-[3px] w-full rounded-full overflow-hidden"
          style={{ background: "color-mix(in srgb, var(--text) 12%, transparent)" }}
        >
          {hasProgress ? (
            <motion.div
              className="h-full rounded-full"
              style={{
                background: "linear-gradient(90deg, var(--primary), var(--secondary))",
              }}
              animate={{ width: `${Math.max(progress, 4)}%` }}
              transition={{ ease: "easeOut", duration: 0.3 }}
            />
          ) : (
            <motion.div
              className="h-full w-1/3 rounded-full"
              style={{
                background: "linear-gradient(90deg, var(--primary), var(--secondary))",
              }}
              animate={{ x: ["-100%", "300%"] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </div>
        {hasProgress && (
          <p className="tabular-nums opacity-50">{Math.round(progress)}%</p>
        )}
      </div>
    </motion.div>
  );
};

export default GlobeLoader;
