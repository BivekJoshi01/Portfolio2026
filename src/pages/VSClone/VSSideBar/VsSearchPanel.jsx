import React, { useMemo, useState } from "react";
import { CaseSensitive, Regex, WholeWord, ChevronDown } from "lucide-react";
import { VS_FILES, getFileIcon } from "../vsFiles";
import { useVs } from "../useVs";

// Synthetic search corpus — quick, demo-grade hit list per file
const CORPUS = {
  about: [
    "const About_Me = () => {",
    "Frontend developer based in Lalitpur, Nepal.",
    "Loves React, Tailwind, and fine micro-interactions.",
  ],
  education: [
    "Tribhuvan University — BSc CSIT",
    "Self-taught: React, Three.js, Node.js",
  ],
  projects: [
    "<ProjectCard /> renders selected work",
    "Filter projects by category: Fintech, Web, E-commerce",
  ],
  experience: [
    '"role": "Frontend Developer"',
    '"company": "Legal Remit"',
    '"years": 4',
  ],
  contact: [
    "bvekjoshi03@gmail.com",
    "Lalitpur, Nepal — open to remote",
  ],
};

const VsSearchPanel = () => {
  const [query, setQuery] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [whole, setWhole] = useState(false);
  const [regex, setRegex] = useState(false);
  const { openFile } = useVs();

  const matches = useMemo(() => {
    if (!query.trim()) return [];
    let test;
    try {
      if (regex) {
        const re = new RegExp(query, caseSensitive ? "" : "i");
        test = (s) => re.test(s);
      } else {
        const q = caseSensitive ? query : query.toLowerCase();
        test = (s) => {
          const target = caseSensitive ? s : s.toLowerCase();
          if (whole) {
            const re = new RegExp(`\\b${q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, caseSensitive ? "" : "i");
            return re.test(s);
          }
          return target.includes(q);
        };
      }
    } catch {
      return [];
    }
    const results = [];
    Object.entries(CORPUS).forEach(([id, lines]) => {
      const file = VS_FILES.find((f) => f.id === id);
      if (!file) return;
      const hits = lines
        .map((line, i) => ({ line, lineNumber: i + 1 }))
        .filter(({ line }) => test(line));
      if (hits.length) results.push({ file, hits });
    });
    return results;
  }, [query, caseSensitive, whole, regex]);

  const totalHits = matches.reduce((acc, m) => acc + m.hits.length, 0);

  const renderHighlight = (text) => {
    if (!query) return text;
    try {
      const flags = caseSensitive ? "g" : "gi";
      const pattern = regex
        ? new RegExp(query, flags)
        : new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), flags);
      const parts = text.split(pattern);
      const hits = text.match(pattern) || [];
      const out = [];
      parts.forEach((p, i) => {
        out.push(<span key={`p-${i}`}>{p}</span>);
        if (hits[i] !== undefined)
          out.push(
            <span
              key={`h-${i}`}
              className="bg-[#613a1f] text-[#fdd97c] rounded-sm px-[1px]"
            >
              {hits[i]}
            </span>
          );
      });
      return out;
    } catch {
      return text;
    }
  };

  return (
    <div className="px-3 py-2 text-[13px]">
      <input
        autoFocus
        type="text"
        placeholder="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full bg-[#3c3c3c] border border-[#3c3c3c] focus:border-[#007acc] rounded px-2 py-1 outline-none text-[#cccccc] placeholder:text-[#7c7c7c]"
      />
      <div className="flex gap-1 mt-2">
        <button
          type="button"
          onClick={() => setCaseSensitive((v) => !v)}
          title="Match Case"
          className={`p-1 rounded ${caseSensitive ? "bg-[#007acc] text-white" : "hover:bg-[#2a2d2e] text-[#9ca3af]"}`}
        >
          <CaseSensitive size={14} />
        </button>
        <button
          type="button"
          onClick={() => setWhole((v) => !v)}
          title="Match Whole Word"
          className={`p-1 rounded ${whole ? "bg-[#007acc] text-white" : "hover:bg-[#2a2d2e] text-[#9ca3af]"}`}
        >
          <WholeWord size={14} />
        </button>
        <button
          type="button"
          onClick={() => setRegex((v) => !v)}
          title="Use Regular Expression"
          className={`p-1 rounded ${regex ? "bg-[#007acc] text-white" : "hover:bg-[#2a2d2e] text-[#9ca3af]"}`}
        >
          <Regex size={14} />
        </button>
      </div>

      <div className="mt-3 text-[11px] text-[#9ca3af]">
        {query.trim()
          ? `${totalHits} results in ${matches.length} files`
          : "Type to search across project files"}
      </div>

      <div className="mt-2 space-y-2">
        {matches.map(({ file, hits }) => {
          const { color, glyph } = getFileIcon(file.ext);
          return (
            <div key={file.id}>
              <div className="flex items-center gap-2 text-[12px] text-[#cccccc] py-1">
                <ChevronDown size={12} />
                <span style={{ color }} className="text-[10px] font-bold">
                  {glyph}
                </span>
                <span className="truncate">{file.name}</span>
                <span className="ml-auto text-[10px] text-[#9ca3af]">
                  {hits.length}
                </span>
              </div>
              <div className="pl-5">
                {hits.map((h, i) => (
                  <button
                    type="button"
                    key={i}
                    onClick={() => openFile(file.id)}
                    className="w-full text-left truncate py-0.5 text-[12px] text-[#9ca3af] hover:bg-[#2a2d2e] hover:text-white rounded px-1"
                    title={h.line}
                  >
                    {renderHighlight(h.line)}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VsSearchPanel;
