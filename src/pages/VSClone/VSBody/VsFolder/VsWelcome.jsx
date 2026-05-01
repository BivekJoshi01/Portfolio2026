import React from "react";
import {
  FileText,
  FolderOpen,
  GitBranch,
  Keyboard,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { useVs } from "../../useVs";

const QUICK_ACTIONS = [
  {
    id: "about",
    icon: FileText,
    title: "Open About_Me.jsx",
    sub: "Who I am, what I build, and how I work.",
  },
  {
    id: "projects",
    icon: FolderOpen,
    title: "Open Projects.jsx",
    sub: "Selected work — fintech, e-commerce, internal tools.",
  },
  {
    id: "experience",
    icon: GitBranch,
    title: "Open Experience.json",
    sub: "Roles, stack, and outcomes — JSON-friendly.",
  },
  {
    id: "contact",
    icon: Sparkles,
    title: "Open Contact.jsx",
    sub: "Let's build something together.",
  },
];

const SHORTCUTS = [
  { keys: ["Ctrl", "K"], label: "Open command palette" },
  { keys: ["Ctrl", "L"], label: "Clear the terminal" },
  { keys: ["↑", "↓"], label: "Navigate terminal history" },
  { keys: ["Tab", "Shift+Tab"], label: "Indent / outdent in editor" },
];

const VsWelcome = () => {
  const { openFile } = useVs();

  return (
    <div className="h-full overflow-y-auto bg-[#1E1E1E] text-[#cccccc]">
      <div className="max-w-4xl mx-auto px-8 py-10">
        <div className="flex items-center gap-3 mb-2">
          <div
            className="w-10 h-10 rounded flex items-center justify-center text-white text-sm font-bold"
            style={{ background: "linear-gradient(135deg,#0078d4,#005a9e)" }}
          >
            VS
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-[#9ca3af]">
              Workspace
            </div>
            <div className="text-lg font-semibold">portfolio-2026</div>
          </div>
        </div>

        <h1 className="text-3xl font-bold mt-6">Welcome 👋</h1>
        <p className="text-[#9ca3af] mt-1 max-w-2xl">
          You're inside Bivek Joshi's portfolio rendered as a VS Code workspace.
          Pick a file from the Explorer or jump in with one of the quick actions
          below.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-8">
          {QUICK_ACTIONS.map((a) => {
            const Icon = a.icon;
            return (
              <button
                key={a.id}
                type="button"
                onClick={() => openFile(a.id)}
                className="group text-left flex items-start gap-3 p-4 rounded-lg border border-[#2a2d2e] hover:border-[#007acc] hover:bg-[#252526] transition-colors"
              >
                <Icon size={20} className="text-[#007acc] mt-0.5 shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="font-medium flex items-center gap-1">
                    {a.title}
                    <ArrowUpRight
                      size={14}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                  <div className="text-sm text-[#9ca3af] mt-0.5">{a.sub}</div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-10">
          <h2 className="text-sm uppercase tracking-wider text-[#9ca3af] flex items-center gap-2">
            <Keyboard size={14} />
            Keyboard Shortcuts
          </h2>
          <ul className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-6">
            {SHORTCUTS.map((s, i) => (
              <li key={i} className="flex items-center justify-between text-sm">
                <span className="text-[#cccccc]">{s.label}</span>
                <span className="flex gap-1">
                  {s.keys.map((k, j) => (
                    <kbd
                      key={j}
                      className="px-2 py-0.5 text-[11px] rounded bg-[#3c3c3c] border border-[#2a2d2e]"
                    >
                      {k}
                    </kbd>
                  ))}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 text-xs text-[#9ca3af] border-t border-[#2a2d2e] pt-4">
          Tip: try the terminal at the bottom — type <code>help</code> to see
          available commands. <code>code .</code> reopens this view from the
          main portfolio.
        </div>
      </div>
    </div>
  );
};

export default VsWelcome;
