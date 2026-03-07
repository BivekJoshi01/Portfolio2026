import React from "react";
import { motion } from "framer-motion";
import { X, ChevronRight } from "lucide-react";
import clsx from "clsx";
import { NavLink } from "react-router-dom";
import CButton from "../Custom/CButton";

const SIDEBAR_VARIANTS = {
  open: {
    x: 0,
    transition: { type: "spring", damping: 26, stiffness: 280 },
  },
  closed: {
    x: "100%",
    transition: { type: "spring", damping: 26, stiffness: 280 },
  },
};

const SIDEBAR_STAGGER = {
  open: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
  closed: {
    transition: { staggerChildren: 0.03, staggerDirection: -1 },
  },
};

const SIDEBAR_ITEM = {
  open: { opacity: 1, y: 0 },
  closed: { opacity: 0, y: 12 },
};

const MobileMenuOption = ({ NAV_ITEMS, closeSidebar, goTo }) => {
  return (
    <div className="fixed inset-0 z-40 md:hidden  backdrop-blur-xl">
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closeSidebar}
        className="fixed inset-0 z-40 backdrop-blur-md md:hidden"
      />

      {/* Sidebar */}
      <motion.aside
        variants={SIDEBAR_VARIANTS}
        initial="closed"
        animate="open"
        exit="closed"
        className={clsx(
          "fixed top-0 right-0 z-50 h-full w-[88%] max-w-[330px] md:hidden",
          "flex flex-col",
          "",
          "backdrop-blur-2xl",
          "border-l border-white/20 dark:border-neutral-700/50",
          "shadow-[0_20px_60px_rgba(0,0,0,0.35)]",
        )}
      >
        <div className="flex h-full flex-col">
          <div
            className="bg-linear-to-tr
      from-indigo-400/60
      via-amber-100/60
      to-purple-800/60
      backdrop-blur-xl rounded-xl"
          >
            <header className="flex items-center justify-between px-6 py-5">
              <div className="h-1 w-10 rounded-full bg-neutral-300 dark:bg-neutral-600" />

              <button
                onClick={closeSidebar}
                className="p-2 rounded-full hover:bg-white/20 transition"
              >
                <X size={22} />
              </button>
            </header>
            <motion.ul
              variants={SIDEBAR_STAGGER}
              className="flex flex-col gap-3 px-5 py-3 flex-1"
            >
              {NAV_ITEMS?.map(({ name, path }) => (
                <motion.li key={path} variants={SIDEBAR_ITEM}>
                  <NavLink
                    to={path}
                    onClick={closeSidebar}
                    className={({ isActive }) =>
                      clsx(
                        "group flex items-center justify-between",
                        "px-4 py-1.5 rounded-xl",
                        "text-base font-semibold",
                        "transition-all duration-200",
                        "border border-white/20",
                        "backdrop-blur-lg",
                        "hover:scale-[1.02]",
                        isActive
                          ? "bg-primary text-white shadow-lg"
                          : "bg-white/50 hover:bg-white/70 dark:bg-white/5 dark:hover:bg-white/10",
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span className="tracking-wide">{name}</span>

                        <ChevronRight
                          size={20}
                          className={clsx(
                            "transition-all duration-200",
                            isActive
                              ? "opacity-100 translate-x-1"
                              : "opacity-50 group-hover:translate-x-2",
                          )}
                        />
                      </>
                    )}
                  </NavLink>
                </motion.li>
              ))}
            </motion.ul>

            {/* Bottom CTA */}
            <div className="p-5 border-t border-white/20 dark:border-neutral-700">
              <CButton
                variant="primary"
                className="w-full rounded-xl py-3.5 text-base font-semibold"
                onClick={() => goTo("/contact-me")}
              >
                Hire Me
              </CButton>
            </div>
          </div>
        </div>
      </motion.aside>
    </div>
  );
};

export default MobileMenuOption;
