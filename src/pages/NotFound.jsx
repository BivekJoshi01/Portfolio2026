import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, ArrowLeft, Compass } from "lucide-react";

const QUICK_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about-me", label: "About Me" },
  { to: "/projects", label: "Projects" },
  { to: "/experience", label: "Experience" },
  { to: "/contact-me", label: "Contact" },
  { to: "/vs-profile", label: "VS Code Profile" },
];

const NotFound = () => {
  const { pathname } = useLocation();

  return (
    <div className="w-full min-h-[80vh] flex items-center justify-center px-6">
      <div className="w-full max-w-2xl text-center">
        <div
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6"
          style={{
            background:
              "linear-gradient(135deg, var(--primary, #7c3aed), var(--secondary, #06b6d4))",
            color: "#fff",
          }}
          aria-hidden
        >
          <Compass size={28} />
        </div>

        <div
          className="text-7xl sm:text-8xl font-extrabold leading-none"
          style={{
            background:
              "linear-gradient(90deg, var(--primary, #7c3aed), var(--secondary, #06b6d4))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          404
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold mt-3">
          This page wandered off.
        </h1>
        <p className="opacity-70 mt-2 break-all">
          Nothing lives at <code>{pathname}</code> — but here are some places
          you can go.
        </p>

        <div className="flex flex-wrap gap-2 justify-center mt-6">
          {QUICK_LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-full border px-3 py-1.5 text-sm hover:scale-[1.02] active:scale-[0.98] transition-transform"
              style={{ borderColor: "rgba(125,125,125,0.35)" }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center justify-center gap-3 mt-8">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm hover:scale-[1.02] active:scale-[0.98] transition-transform"
            style={{ borderColor: "rgba(125,125,125,0.35)" }}
          >
            <ArrowLeft size={16} />
            Go back
          </button>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-white shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-transform"
            style={{ background: "var(--primary, #7c3aed)" }}
          >
            <Home size={16} />
            Take me home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
