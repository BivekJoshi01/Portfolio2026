import React, { useState, useCallback } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";
import clsx from "clsx";
import BivekJoshi from "../../assets/BivekJoshi.svg";
import CButton from "../Custom/CButton";
import "./NavAppBar.css";
import ModeLanguage from "../../pages/ModeLanguage";
import MobileMenuOption from "./MobileMenuOption";

const NAV_ITEMS = [
  { name: "About Me", path: "/about-me" },
  { name: "Projects", path: "/projects" },
  { name: "Experience", path: "/experience" },
  { name: "Contact", path: "/contact-me" },
];

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
    [navigate],
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
                    isActive && "nav-pill-link--active",
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
      <div className="hidden md:flex gap-3.5 items-center">
        <ModeLanguage />
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
          <MobileMenuOption
            NAV_ITEMS={NAV_ITEMS}
            isDark={isDark}
            closeSidebar={closeSidebar}
            goTo={goTo}
          />
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavAppBar;
