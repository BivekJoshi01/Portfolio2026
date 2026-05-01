import React from "react";
import { ChevronDown, FunctionSquare, Code2, Hash } from "lucide-react";
import { useVs } from "../useVs";

const OUTLINE_BY_FILE = {
  about: [
    { kind: "component", name: "About_Me" },
    { kind: "function", name: "renderHeading" },
    { kind: "function", name: "renderSummary" },
    { kind: "var", name: "skills" },
  ],
  education: [
    { kind: "component", name: "Education" },
    { kind: "function", name: "renderTimeline" },
    { kind: "var", name: "milestones" },
  ],
  projects: [
    { kind: "component", name: "Projects" },
    { kind: "function", name: "filterByCategory" },
    { kind: "var", name: "categories" },
    { kind: "var", name: "ProjectList" },
  ],
  experience: [
    { kind: "var", name: "experience" },
    { kind: "var", name: "experience[0].role" },
    { kind: "var", name: "experience[0].company" },
  ],
  contact: [
    { kind: "component", name: "Contact" },
    { kind: "function", name: "handleSubmit" },
    { kind: "var", name: "email" },
  ],
};

const KIND_META = {
  component: { color: "#4ec9b0", Icon: Code2 },
  function: { color: "#dcdcaa", Icon: FunctionSquare },
  var: { color: "#9cdcfe", Icon: Hash },
};

const VsOutlinePanel = () => {
  const { activeFile } = useVs();
  const symbols = activeFile ? OUTLINE_BY_FILE[activeFile.id] || [] : [];

  return (
    <div className="h-full flex flex-col text-[13px] text-[#cccccc]">
      <div className="px-4 py-2 text-[11px] uppercase tracking-wider text-[#9ca3af] border-b border-transparent">
        Outline
      </div>
      <div className="flex-1 overflow-y-auto px-2 py-1">
        {!activeFile && (
          <div className="text-[12px] text-[#9ca3af] px-2 py-3">
            No file selected.
          </div>
        )}

        {activeFile && (
          <div>
            <div className="flex items-center gap-1 px-1 py-1 text-[12px]">
              <ChevronDown size={12} />
              <span className="truncate">{activeFile.name}</span>
            </div>
            <div className="pl-3">
              {symbols.map((s, i) => {
                const meta = KIND_META[s.kind] || KIND_META.var;
                const Icon = meta.Icon;
                return (
                  <div
                    key={i}
                    className="flex items-center gap-2 py-0.5 px-2 rounded hover:bg-[#2a2d2e] cursor-pointer"
                  >
                    <Icon size={12} style={{ color: meta.color }} />
                    <span className="truncate text-[12px]">{s.name}</span>
                  </div>
                );
              })}
              {symbols.length === 0 && (
                <div className="text-[11px] text-[#9ca3af] px-2 py-1">
                  No symbols.
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-[#1c1c1c] px-4 py-2 text-[11px] text-[#9ca3af]">
        TIP: Press <kbd className="px-1 bg-[#3c3c3c] rounded">Ctrl</kbd>+
        <kbd className="px-1 bg-[#3c3c3c] rounded">K</kbd> for global search.
      </div>
    </div>
  );
};

export default VsOutlinePanel;
