import React from "react";
import { useLocation } from "react-router-dom";
import { FileX2, ArrowRight, Terminal } from "lucide-react";
import { useVs } from "../../useVs";
import { VS_FILES } from "../../vsFiles";

const Vs404 = () => {
  const { pathname } = useLocation();
  const { openFile } = useVs();

  const missing = pathname.replace(/^\/vs-profile\/?/, "") || pathname;

  return (
    <div className="h-full overflow-y-auto bg-[#1E1E1E] text-[#cccccc] font-mono">
      <div className="max-w-3xl mx-auto px-8 py-10">
        {/* Diagnostic header */}
        <div className="flex items-start gap-3">
          <FileX2 size={28} className="text-[#f48771] shrink-0 mt-1" />
          <div className="min-w-0">
            <div className="text-[11px] uppercase tracking-wider text-[#9ca3af]">
              Editor · Cannot open file
            </div>
            <h1 className="text-2xl font-semibold mt-1 break-all">
              <span className="text-[#f48771]">404</span>{" "}
              <span className="text-[#cccccc]">— file not found</span>
            </h1>
            <p className="text-sm text-[#9ca3af] mt-1 break-all">
              <span className="opacity-70">Path:</span>{" "}
              <span className="text-[#dcdcaa]">{pathname}</span>
            </p>
          </div>
        </div>

        {/* Faux problem block */}
        <pre className="mt-6 rounded-md border border-[#2a2d2e] bg-[#252526] p-4 text-[12.5px] leading-6 whitespace-pre-wrap">
          <span className="text-[#f48771]">Error: </span>
          <span className="text-[#cccccc]">
            Unable to resolve module{" "}
            <span className="text-[#ce9178]">'{missing}'</span> in workspace{" "}
            <span className="text-[#ce9178]">'portfolio-2026'</span>.
          </span>
          {"\n"}
          <span className="text-[#9ca3af]">  at </span>
          <span className="text-[#dcdcaa]">router.matchRoutes</span>
          <span className="text-[#9ca3af]">(AppRoutes.jsx:42)</span>
          {"\n"}
          <span className="text-[#9ca3af]">  at </span>
          <span className="text-[#dcdcaa]">VSLayout.render</span>
          <span className="text-[#9ca3af]">(VSLayout.jsx:24)</span>
        </pre>

        {/* Helpful next steps */}
        <h2 className="mt-8 text-sm uppercase tracking-wider text-[#9ca3af]">
          Try opening one of these
        </h2>
        <ul className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {VS_FILES.map((f) => (
            <li key={f.id}>
              <button
                type="button"
                onClick={() => openFile(f.id)}
                className="group w-full text-left flex items-center gap-2 px-3 py-2 rounded border border-[#2a2d2e] hover:border-[#007acc] hover:bg-[#252526] transition-colors"
              >
                <span className="text-[#9cdcfe] truncate flex-1">{f.name}</span>
                <ArrowRight
                  size={14}
                  className="opacity-0 group-hover:opacity-100 text-[#007acc]"
                />
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex items-center gap-2 text-xs text-[#9ca3af]">
          <Terminal size={14} />
          <span>
            Tip: try <span className="text-[#dcdcaa]">help</span> in the
            terminal, or press{" "}
            <kbd className="px-1 bg-[#3c3c3c] rounded">Ctrl</kbd>+
            <kbd className="px-1 bg-[#3c3c3c] rounded">K</kbd> for the command
            palette.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Vs404;
