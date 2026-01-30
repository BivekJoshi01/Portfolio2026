import React, { useState, useCallback } from "react";
import { X, ChevronRight } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import BivekJoshi from "../../assets/BivekJoshi.svg";
import CButton from "../Custom/CButton";
import "./NavAppBar.css";

const NAV_ITEMS = [
  { name: "About Me", path: "/about-me" },
  { name: "Projects", path: "/projects" },
  { name: "Experience", path: "/experience" },
  { name: "Contact", path: "/contact-me" },
];

const SIDEBAR_VARIANTS = {
  open: {
    x: 0,
    transition: { type: "spring", damping: 28, stiffness: 300 },
  },
  closed: {
    x: "100%",
    transition: { type: "spring", damping: 28, stiffness: 300 },
  },
};

const SIDEBAR_STAGGER = {
  open: {
    transition: { staggerChildren: 0.04, delayChildren: 0.08 },
  },
  closed: { transition: { staggerChildren: 0.02, staggerDirection: -1 } },
};

const SIDEBAR_ITEM = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: 16 },
};

const NavAppBar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const theme = useSelector((state) => state.theme.mode);
  const isDark = theme === "dark";

  const goTo = useCallback(
    (path) => {
      navigate(path);
      setIsOpen(false);
    },
    [navigate]
  );

  const closeSidebar = useCallback(() => setIsOpen(false), []);

  return (
    <nav
      className="relative z-40 flex w-full items-center justify-between"
      role="navigation"
      aria-label="Main"
    >
      {/* Decorative glow — desktop only */}
      <div
        className="nav-glow pointer-events-none absolute -left-20 -top-20 hidden h-64 w-64 rounded-full blur-[100px] md:block"
        aria-hidden
      />

      {/* Logo */}
      <button
        type="button"
        onClick={() => goTo("/")}
        className="cursor-pointer select-none transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-(--primary) focus-visible:ring-offset-2"
        aria-label="Go to home"
      >
        <img
          src={BivekJoshi}
          className="h-20 w-22 sm:w-24"
          alt=""
          width={96}
          height={80}
        />
      </button>

      {/* Desktop: pill nav */}
      <ul
        className="nav-pill hidden items-center gap-0.5 rounded-full border backdrop-blur-xl md:flex"
        style={{ padding: "6px 6px" }}
      >
        {NAV_ITEMS.map(({ name, path }) => (
          <li key={path}>
            <NavLink to={path} onClick={closeSidebar}>
              {({ isActive }) => (
                <span
                  className={clsx(
                    "nav-pill-link block rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 focus-visible:ring-2 focus-visible:ring-(--primary) focus-visible:ring-offset-2",
                    isActive && "nav-pill-link--active"
                  )}
                >
                  {name}
                </span>
              )}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Desktop: CTA */}
      <div className="hidden md:block">
        <CButton variant="primary" onClick={() => goTo("/contact-me")}>
          HIRE ME
        </CButton>
      </div>

      {/* Mobile: edge menu handle */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="nav-handle-dot group fixed right-0 top-1/2 z-30 flex -translate-y-1/2 cursor-pointer items-center rounded-l-full transition-all duration-300 hover:scale-105 md:hidden"
          style={{ height: 80, width: 6 }}
          aria-label="Open menu"
          aria-expanded={false}
        >
          <span
            className="absolute right-4 text-[10px] font-bold uppercase tracking-[0.2em] -rotate-90 opacity-70 transition-opacity duration-300 group-hover:opacity-100"
            style={{ color: "var(--primary)" }}
          >
            Menu
          </span>
        </button>
      )}

      {/* Mobile: overlay + sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="nav-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={clsx(
                "fixed inset-0 z-40 backdrop-blur-sm md:hidden",
                isDark ? "nav-overlay-dark" : "nav-overlay-light"
              )}
              onClick={closeSidebar}
              aria-hidden
            />

            <motion.aside
              key="nav-sidebar"
              variants={SIDEBAR_VARIANTS}
              initial="closed"
              animate="open"
              exit="closed"
              className="nav-sidebar fixed top-0 right-0 z-50 flex h-full w-[88%] max-w-[320px] flex-col border-l shadow-2xl md:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              <div className="flex h-full flex-col">
                {/* Sidebar header */}
                <header className="flex shrink-0 items-center justify-between border-b p-5 border-(--sidebar-border)">
                  <div className="nav-sidebar-header-line h-1 w-12 rounded-full" />
                  <button
                    type="button"
                    onClick={closeSidebar}
                    className="nav-sidebar-close flex rounded-full p-2.5 transition-all duration-200 active:scale-95 focus-visible:ring-2 focus-visible:ring-(--primary) focus-visible:ring-offset-2"
                    aria-label="Close menu"
                  >
                    <X size={22} strokeWidth={2} />
                  </button>
                </header>

                {/* Nav links with stagger */}
                <motion.ul
                  variants={SIDEBAR_STAGGER}
                  className="flex flex-1 flex-col gap-1 overflow-auto p-4"
                >
                  {NAV_ITEMS.map(({ name, path }) => (
                    <motion.li key={path} variants={SIDEBAR_ITEM}>
                      <NavLink
                        to={path}
                        onClick={closeSidebar}
                        className={({ isActive }) =>
                          clsx(
                            "nav-sidebar-link flex items-center justify-between rounded-xl px-4 py-4 text-base font-semibold transition-all duration-200",
                            isActive
                              ? "nav-sidebar-link--active"
                              : "hover:bg-black/5 dark:hover:bg-white/10"
                          )
                        }
                      >
                        {({ isActive }) => (
                          <>
                            <span>{name}</span>
                            <ChevronRight
                              size={20}
                              className={isActive ? "opacity-90" : "opacity-40"}
                              strokeWidth={2}
                            />
                          </>
                        )}
                      </NavLink>
                    </motion.li>
                  ))}
                </motion.ul>

                {/* Bottom CTA */}
                <div className="shrink-0 border-t p-4 pt-3 border-(--sidebar-border)">
                  <CButton
                    variant="primary"
                    className="w-full rounded-xl py-3.5 text-base font-semibold"
                    onClick={() => goTo("/contact-me")}
                  >
                    HIRE ME
                  </CButton>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavAppBar;
