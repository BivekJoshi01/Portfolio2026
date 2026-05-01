import React, { useEffect, useMemo, useRef, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Search,
  Home as HomeIcon,
  User,
  Briefcase,
  FolderGit2,
  Mail,
  FileText,
  Sun,
  Moon,
  Languages,
  Code2,
  ArrowRight,
} from "lucide-react";
import { setTheme } from "../../redux/Reducer/themeSlice";
import { setLanguage } from "../../redux/Reducer/languageSlice";

const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const mode = useSelector((s) => s.theme.mode);
  const lang = useSelector((s) => s.lang.lang);

  const commands = useMemo(
    () => [
      {
        id: "nav-home",
        label: "Go to Home",
        hint: "Landing page",
        group: "Navigation",
        icon: HomeIcon,
        run: () => navigate("/"),
      },
      {
        id: "nav-about",
        label: "Go to About Me",
        hint: "Bio & background",
        group: "Navigation",
        icon: User,
        run: () => navigate("/about-me"),
      },
      {
        id: "nav-projects",
        label: "Go to Projects",
        hint: "Selected work",
        group: "Navigation",
        icon: FolderGit2,
        run: () => navigate("/projects"),
      },
      {
        id: "nav-experience",
        label: "Go to Experience",
        hint: "Work history",
        group: "Navigation",
        icon: Briefcase,
        run: () => navigate("/experience"),
      },
      {
        id: "nav-contact",
        label: "Go to Contact",
        hint: "Get in touch",
        group: "Navigation",
        icon: Mail,
        run: () => navigate("/contact-me"),
      },
      {
        id: "nav-vs",
        label: "Open VS Code Profile View",
        hint: "Developer-style profile",
        group: "Navigation",
        icon: Code2,
        run: () => navigate("/vs-profile"),
      },
      {
        id: "action-cv",
        label: "Download CV",
        hint: "PDF resume",
        group: "Actions",
        icon: FileText,
        run: () => window.open("#/cv.pdf", "_blank"),
      },
      {
        id: "action-theme",
        label: mode === "dark" ? "Switch to Light theme" : "Switch to Dark theme",
        hint: "Toggle appearance",
        group: "Preferences",
        icon: mode === "dark" ? Sun : Moon,
        run: () => dispatch(setTheme(mode === "dark" ? "light" : "dark")),
      },
      {
        id: "action-lang",
        label: lang === "en" ? "Switch language to Nepali" : "Switch language to English",
        hint: "Toggle language",
        group: "Preferences",
        icon: Languages,
        run: () =>
          dispatch(setLanguage(lang === "en" ? "np" : "en")),
      },
      {
        id: "action-email",
        label: "Email Bivek",
        hint: "bvekjoshi03@gmail.com",
        group: "Actions",
        icon: Mail,
        run: () => (window.location.href = "mailto:bvekjoshi03@gmail.com"),
      },
    ],
    [navigate, dispatch, mode, lang]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) =>
      `${c.label} ${c.hint} ${c.group}`.toLowerCase().includes(q)
    );
  }, [commands, query]);

  const grouped = useMemo(() => {
    const map = new Map();
    filtered.forEach((c) => {
      if (!map.has(c.group)) map.set(c.group, []);
      map.get(c.group).push(c);
    });
    return Array.from(map.entries());
  }, [filtered]);

  useEffect(() => {
    const handler = (e) => {
      const cmdKey = e.metaKey || e.ctrlKey;
      if (cmdKey && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const runActive = () => {
    const cmd = filtered[activeIndex];
    if (!cmd) return;
    cmd.run();
    setOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      runActive();
    }
  };

  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-index="${activeIndex}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  let runningIndex = -1;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="cmdk-backdrop"
          className="fixed inset-0 z-100 flex items-start justify-center pt-24 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
        >
          <div
            className="absolute inset-0 backdrop-blur-md"
            style={{ background: "rgba(0,0,0,0.45)" }}
          />
          <motion.div
            key="cmdk-panel"
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-xl overflow-hidden rounded-2xl border shadow-2xl"
            style={{
              background: "var(--surface, rgba(20,20,28,0.92))",
              borderColor: "rgba(255,255,255,0.08)",
              color: "var(--nav-text, #fff)",
            }}
          >
            <div
              className="flex items-center gap-3 px-4 py-3 border-b"
              style={{ borderColor: "rgba(255,255,255,0.06)" }}
            >
              <Search size={18} className="opacity-70" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a command or search… (try 'projects', 'theme')"
                className="w-full bg-transparent outline-none text-sm placeholder:opacity-50"
                aria-label="Search commands"
              />
              <kbd
                className="hidden sm:inline-block text-[10px] px-1.5 py-0.5 rounded border opacity-70"
                style={{ borderColor: "rgba(255,255,255,0.15)" }}
              >
                ESC
              </kbd>
            </div>

            <div
              ref={listRef}
              className="max-h-80 overflow-y-auto py-2"
              role="listbox"
            >
              {filtered.length === 0 && (
                <div className="px-4 py-6 text-center text-sm opacity-60">
                  No matches for &quot;{query}&quot;
                </div>
              )}
              {grouped.map(([group, items]) => (
                <div key={group} className="px-2 pb-1">
                  <div className="px-3 pt-2 pb-1 text-[10px] uppercase tracking-wider opacity-50">
                    {group}
                  </div>
                  {items.map((cmd) => {
                    runningIndex += 1;
                    const idx = runningIndex;
                    const Icon = cmd.icon;
                    const isActive = idx === activeIndex;
                    return (
                      <button
                        key={cmd.id}
                        data-index={idx}
                        type="button"
                        onMouseEnter={() => setActiveIndex(idx)}
                        onClick={() => {
                          cmd.run();
                          setOpen(false);
                        }}
                        className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors"
                        style={{
                          background: isActive
                            ? "rgba(255,255,255,0.08)"
                            : "transparent",
                        }}
                        role="option"
                        aria-selected={isActive}
                      >
                        <Icon size={16} className="shrink-0 opacity-80" />
                        <span className="flex-1 truncate">{cmd.label}</span>
                        <span className="text-[11px] opacity-50 truncate">
                          {cmd.hint}
                        </span>
                        {isActive && (
                          <ArrowRight size={14} className="opacity-70" />
                        )}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>

            <div
              className="flex items-center justify-between px-4 py-2 border-t text-[11px] opacity-60"
              style={{ borderColor: "rgba(255,255,255,0.06)" }}
            >
              <span>↑↓ navigate · ↵ select</span>
              <span>
                <kbd className="px-1">Ctrl</kbd>+<kbd className="px-1">K</kbd>
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
