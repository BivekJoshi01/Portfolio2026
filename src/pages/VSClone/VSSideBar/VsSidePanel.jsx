import React from "react";
import { useVs } from "../useVs";
import VsExplorerPanel from "./VsExplorerPanel";
import VsSearchPanel from "./VsSearchPanel";
import VsSourceControlPanel from "./VsSourceControlPanel";
import VsDebugPanel from "./VsDebugPanel";
import VsExtensionsPanel from "./VsExtensionsPanel";
import VsSettingsPanel from "./VsSettingsPanel";

const TITLES = {
  explorer: "EXPLORER",
  search: "SEARCH",
  scm: "SOURCE CONTROL",
  debug: "RUN AND DEBUG",
  extensions: "EXTENSIONS",
  account: "ACCOUNT",
  settings: "SETTINGS",
};

const VsSidePanel = () => {
  const { activityPanel } = useVs();

  let body = null;
  switch (activityPanel) {
    case "search":
      body = <VsSearchPanel />;
      break;
    case "scm":
      body = <VsSourceControlPanel />;
      break;
    case "debug":
      body = <VsDebugPanel />;
      break;
    case "extensions":
      body = <VsExtensionsPanel />;
      break;
    case "account":
    case "settings":
      body = <VsSettingsPanel panel={activityPanel} />;
      break;
    case "explorer":
    default:
      body = <VsExplorerPanel />;
  }

  return (
    <div className="h-full flex flex-col text-[13px] text-[#cccccc]">
      <div className="px-4 py-2 text-[11px] uppercase tracking-wider text-[#9ca3af] flex items-center justify-between border-b border-transparent">
        <span>{TITLES[activityPanel] || "PANEL"}</span>
        <span className="opacity-60">…</span>
      </div>
      <div className="flex-1 overflow-y-auto">{body}</div>
    </div>
  );
};

export default VsSidePanel;
