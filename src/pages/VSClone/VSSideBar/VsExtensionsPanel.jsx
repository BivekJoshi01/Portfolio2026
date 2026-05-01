import React, { useMemo, useState } from "react";
import { Star, Download } from "lucide-react";

const EXTENSIONS = [
  { name: "Prettier - Code formatter", author: "Prettier", rating: 4.8, downloads: "39M", installed: true },
  { name: "ESLint", author: "Microsoft", rating: 4.7, downloads: "31M", installed: true },
  { name: "Tailwind CSS IntelliSense", author: "Tailwind Labs", rating: 4.9, downloads: "12M", installed: true },
  { name: "GitLens — Git supercharged", author: "GitKraken", rating: 4.7, downloads: "26M", installed: true },
  { name: "Material Icon Theme", author: "Philipp Kief", rating: 4.9, downloads: "16M", installed: false },
  { name: "Error Lens", author: "Alexander", rating: 4.8, downloads: "10M", installed: true },
  { name: "Auto Rename Tag", author: "Jun Han", rating: 4.6, downloads: "21M", installed: false },
];

const VsExtensionsPanel = () => {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return EXTENSIONS;
    return EXTENSIONS.filter(
      (e) =>
        e.name.toLowerCase().includes(q) ||
        e.author.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="px-3 py-2 text-[13px]">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search Extensions in Marketplace"
        className="w-full bg-[#3c3c3c] focus:bg-[#3c3c3c] border border-[#3c3c3c] focus:border-[#007acc] rounded px-2 py-1 outline-none text-[#cccccc] placeholder:text-[#7c7c7c]"
      />

      <div className="mt-3 text-[11px] uppercase tracking-wider text-[#9ca3af]">
        Installed ({EXTENSIONS.filter((e) => e.installed).length})
      </div>
      <div className="mt-1 space-y-2">
        {filtered.map((ext) => (
          <div
            key={ext.name}
            className="flex gap-2 p-2 rounded hover:bg-[#2a2d2e]"
          >
            <div
              className="w-9 h-9 rounded shrink-0 flex items-center justify-center text-[10px] font-bold"
              style={{
                background: "linear-gradient(135deg,#0078d4,#005a9e)",
                color: "#fff",
              }}
              aria-hidden
            >
              {ext.name.charAt(0)}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[13px] font-medium truncate">{ext.name}</div>
              <div className="text-[11px] text-[#9ca3af] truncate">
                {ext.author}
              </div>
              <div className="flex items-center gap-2 text-[10px] text-[#9ca3af] mt-0.5">
                <span className="flex items-center gap-0.5">
                  <Star size={10} className="text-[#ffd34b]" />
                  {ext.rating}
                </span>
                <span className="flex items-center gap-0.5">
                  <Download size={10} />
                  {ext.downloads}
                </span>
              </div>
            </div>
            <button
              type="button"
              className={`text-[11px] px-2 py-1 rounded shrink-0 self-start ${
                ext.installed
                  ? "bg-[#3c3c3c] text-[#cccccc]"
                  : "bg-[#0e639c] hover:bg-[#1177bb] text-white"
              }`}
            >
              {ext.installed ? "Installed" : "Install"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VsExtensionsPanel;
