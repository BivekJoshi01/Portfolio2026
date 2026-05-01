import React from "react";
import {
  Files,
  Search,
  GitBranch,
  Bug,
  PackageOpen,
  User,
  Settings,
} from "lucide-react";
import { useVs } from "../useVs";

const ITEMS_TOP = [
  { id: "explorer", label: "Explorer", icon: Files },
  { id: "search", label: "Search", icon: Search },
  { id: "scm", label: "Source Control", icon: GitBranch, badge: 2 },
  { id: "debug", label: "Run and Debug", icon: Bug },
  { id: "extensions", label: "Extensions", icon: PackageOpen, badge: 1 },
];

const ITEMS_BOTTOM = [
  { id: "account", label: "Accounts", icon: User },
  { id: "settings", label: "Settings", icon: Settings },
];

const ActivityButton = ({ item, active, onClick }) => {
  const Icon = item.icon;
  return (
    <button
      type="button"
      onClick={onClick}
      title={item.label}
      aria-label={item.label}
      className={`relative w-full h-12 flex items-center justify-center transition-colors ${
        active ? "text-white" : "text-[#858585] hover:text-white"
      }`}
    >
      {active && (
        <span className="absolute left-0 top-0 h-full w-0.5 bg-white" />
      )}
      <Icon size={22} strokeWidth={1.5} />
      {item.badge ? (
        <span className="absolute right-1.5 bottom-1.5 min-w-4 h-4 px-1 rounded-full bg-[#007acc] text-[10px] font-bold flex items-center justify-center">
          {item.badge}
        </span>
      ) : null}
    </button>
  );
};

const VsSideShowBar = () => {
  const { activityPanel, setActivityPanel } = useVs();

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1">
        {ITEMS_TOP.map((it) => (
          <ActivityButton
            key={it.id}
            item={it}
            active={activityPanel === it.id}
            onClick={() => setActivityPanel(it.id)}
          />
        ))}
      </div>
      <div>
        {ITEMS_BOTTOM.map((it) => (
          <ActivityButton
            key={it.id}
            item={it}
            active={activityPanel === it.id}
            onClick={() => setActivityPanel(it.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default VsSideShowBar;
