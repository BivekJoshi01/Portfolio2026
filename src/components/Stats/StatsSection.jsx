import React, { useEffect, useRef, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, useInView } from "framer-motion";
import { Code2, Briefcase, FolderGit2, Users } from "lucide-react";

const STATS = [
  { label: "Years of Experience", value: 4, suffix: "+", icon: Briefcase },
  { label: "Projects Shipped", value: 25, suffix: "+", icon: FolderGit2 },
  { label: "Happy Clients", value: 18, suffix: "+", icon: Users },
  { label: "Technologies", value: 20, suffix: "+", icon: Code2 },
];

const Counter = ({ to, suffix = "", duration = 1600, run }) => {
  const [n, setN] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!run || startedRef.current) return;
    startedRef.current = true;
    const start = performance.now();
    let frame;
    const step = (now) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      setN(Math.round(to * eased));
      if (t < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [run, to, duration]);

  return (
    <span>
      {n}
      {suffix}
    </span>
  );
};

const StatsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  return (
    <section
      ref={ref}
      className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-10"
      aria-label="Stats"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5">
        {STATS.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
              className="group relative overflow-hidden rounded-2xl border p-4 sm:p-5 backdrop-blur-md transition-transform hover:-translate-y-1"
              style={{
                borderColor: "rgba(125,125,125,0.25)",
                background: "rgba(255,255,255,0.04)",
              }}
            >
              <div
                className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-30 blur-2xl transition-opacity group-hover:opacity-60"
                style={{ background: "var(--primary, #7c3aed)" }}
                aria-hidden
              />
              <div className="flex items-center gap-2 mb-2 opacity-80">
                <Icon size={16} />
                <span className="text-[11px] sm:text-xs uppercase tracking-wider">
                  {s.label}
                </span>
              </div>
              <div
                className="text-3xl sm:text-4xl font-extrabold leading-none"
                style={{ color: "var(--primary, #7c3aed)" }}
              >
                <Counter to={s.value} suffix={s.suffix} run={inView} />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default StatsSection;
