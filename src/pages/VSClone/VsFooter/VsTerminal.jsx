import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, ChevronDown, Trash2, X } from "lucide-react";
import { useVs } from "../useVs";
import { VS_FILES } from "../vsFiles";

const PROMPT = "bivek@portfolio:~/portfolio2026$";

const INITIAL_LINES = [
  "Welcome to Bivek Joshi's interactive terminal 🚀",
  "Type 'help' to see available commands.",
];

const HELP_LINES = [
  "Available commands:",
  "  help              show this help",
  "  about             a quick intro",
  "  skills            my main skills",
  "  contact           how to reach me",
  "  ls                list files in this folder",
  "  pwd               print working directory",
  "  whoami            print current user",
  "  date              print current date/time",
  "  cat <file>        show file content",
  "  open <page>       open about|projects|experience|education|contact",
  "  goto <route>      navigate to a route (e.g. goto /projects)",
  "  theme [light|dark] toggle or set theme",
  "  history           show command history",
  "  echo <text>       echo text",
  "  npm start         go to portfolio home",
  "  code .            open VS Code profile",
  "  clear             clear the terminal",
];

const SAMPLE_FILES = {
  "package.json": [
    "{",
    '  "name": "portfolio2026",',
    '  "version": "1.0.0",',
    '  "scripts": { "dev": "vite", "build": "vite build" }',
    "}",
  ],
  "README.md": [
    "# portfolio2026",
    "",
    "Bivek Joshi's interactive portfolio. React 19 + Tailwind v4 + Three.js.",
  ],
  "Experience.json": [
    "[",
    '  { "role": "Frontend Developer", "company": "Legal Remit", "years": 2 },',
    '  { "role": "Full Stack Developer", "company": "DGHub", "years": 2 }',
    "]",
  ],
};

const VsTerminal = () => {
  const navigate = useNavigate();
  const { openFile } = useVs();
  const [lines, setLines] = useState([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [tab, setTab] = useState("bash");
  const inputRef = useRef(null);
  const scrollRef = useRef(null);
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) return;
    didMount.current = true;
    setLines(INITIAL_LINES);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [lines]);

  const append = (chunks) =>
    setLines((prev) => [...prev, ...(Array.isArray(chunks) ? chunks : [chunks])]);

  const run = (raw) => {
    const trimmed = raw.trim();
    if (!trimmed) return;

    const userLine = `${PROMPT} ${trimmed}`;
    append(userLine);

    const [cmd, ...rest] = trimmed.split(/\s+/);
    const arg = rest.join(" ").trim();

    switch (cmd.toLowerCase()) {
      case "help":
        append(HELP_LINES);
        break;
      case "about":
        append([
          "👨‍💻 Bivek Joshi — Full-Stack Developer based in Lalitpur, Nepal.",
          "💡 React, Node.js, and crafting delightful UIs.",
        ]);
        break;
      case "skills":
        append([
          "⚡ Skills:",
          "  Frontend: React, Next.js, Tailwind, Three.js, GSAP",
          "  Backend:  Node.js, Express, REST, Postgres, MongoDB",
          "  Tooling:  Git, Vite, Docker, Linux",
        ]);
        break;
      case "contact":
        append([
          "📧 bvekjoshi03@gmail.com",
          "🔗 github.com/BivekJoshi01",
          "💼 linkedin.com/in/bivekjoshi",
        ]);
        break;
      case "ls": {
        const items = [
          ...VS_FILES.map((f) => f.name),
          "package.json",
          "README.md",
          "vite.config.js",
        ];
        append(items.join("  "));
        break;
      }
      case "pwd":
        append("/home/bivek/portfolio2026");
        break;
      case "whoami":
        append("bivek (a.k.a. caffeine-driven react dev)");
        break;
      case "date":
        append(new Date().toString());
        break;
      case "echo":
        append(arg || "");
        break;
      case "history":
        append(history.length === 0 ? ["(empty)"] : history.map((h, i) => `  ${i + 1}  ${h}`));
        break;
      case "cat": {
        if (!arg) {
          append("usage: cat <file>");
          break;
        }
        const content = SAMPLE_FILES[arg];
        if (content) append(content);
        else append(`cat: ${arg}: No such file or directory`);
        break;
      }
      case "open": {
        const file = VS_FILES.find(
          (f) =>
            f.id === arg.toLowerCase() ||
            f.name.toLowerCase().startsWith(arg.toLowerCase())
        );
        if (!file) {
          append(`open: unknown page '${arg}'. Try: about, projects, experience, education, contact.`);
        } else {
          append(`Opening ${file.name}...`);
          setTimeout(() => openFile(file.id), 200);
        }
        break;
      }
      case "goto": {
        if (!arg) {
          append("usage: goto <route>");
          break;
        }
        const target = arg.startsWith("/") ? arg : `/${arg}`;
        append(`Navigating to ${target}...`);
        setTimeout(() => navigate(target), 200);
        break;
      }
      case "theme": {
        const ev = new KeyboardEvent("keydown", {
          key: "k",
          ctrlKey: true,
          bubbles: true,
        });
        append("Open the theme picker via Ctrl+K → 'theme'.");
        window.dispatchEvent(ev);
        break;
      }
      case "code":
        if (rest[0] === ".") {
          append("Opening VS Code profile...");
          setTimeout(() => navigate("/vs-profile"), 200);
        } else {
          append("usage: code .");
        }
        break;
      case "npm":
        if (rest[0] === "start" || rest[0] === "run" || rest[0] === "dev") {
          append([
            "  VITE v7.1.2  ready in 312 ms",
            "  ➜  Local:   http://localhost:5173/",
            "  ➜  Network: use --host to expose",
            "Opening portfolio...",
          ]);
          setTimeout(() => navigate("/"), 1200);
        } else {
          append(`npm: '${rest.join(" ")}' not found`);
        }
        break;
      case "clear":
        setLines([]);
        break;
      case "exit":
        append("Bye! 👋");
        break;
      default:
        append([
          `command not found: ${cmd}`,
          "Type 'help' for available commands.",
        ]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = input;
      if (value.trim()) {
        setHistory((prev) => [...prev, value]);
        setHistoryIndex(-1);
      }
      run(value);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const next = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(next);
      setInput(history[next]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (history.length === 0 || historyIndex === -1) return;
      const next = historyIndex + 1;
      if (next >= history.length) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        setHistoryIndex(next);
        setInput(history[next]);
      }
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    } else if (e.key === "c" && e.ctrlKey) {
      // Mimic ctrl-c
      append(`${PROMPT} ${input}^C`);
      setInput("");
    }
  };

  return (
    <div
      className="h-full text-[#cccccc] font-mono text-[13px] flex flex-col cursor-text bg-[#1E1E1E]"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Tab strip */}
      <div className="flex items-center h-7 bg-[#252526] border-b border-[#1c1c1c] text-[12px]">
        <div className="flex items-center px-2 gap-3 text-[#9ca3af]">
          {["problems", "output", "debug", "terminal", "ports"].map((t) => (
            <button
              key={t}
              type="button"
              className={`uppercase tracking-wider text-[11px] py-1 ${
                t === "terminal"
                  ? "text-white border-b border-white"
                  : "hover:text-[#cccccc]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-1 px-2">
          {["bash", "node", "npm"].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`px-2 py-0.5 rounded text-[11px] ${
                tab === t ? "bg-[#3c3c3c] text-white" : "hover:bg-[#3c3c3c] text-[#9ca3af]"
              }`}
            >
              {t}
            </button>
          ))}
          <button
            type="button"
            title="New terminal"
            className="p-1 hover:bg-[#3c3c3c] rounded"
          >
            <Plus size={12} />
          </button>
          <button
            type="button"
            title="Hide panel"
            className="p-1 hover:bg-[#3c3c3c] rounded"
          >
            <ChevronDown size={12} />
          </button>
          <button
            type="button"
            onClick={() => setLines([])}
            title="Clear terminal"
            className="p-1 hover:bg-[#3c3c3c] rounded"
          >
            <Trash2 size={12} />
          </button>
          <button
            type="button"
            title="Kill terminal"
            className="p-1 hover:bg-[#3c3c3c] rounded"
          >
            <X size={12} />
          </button>
        </div>
      </div>

      {/* Output */}
      <div ref={scrollRef} className="flex-1 px-3 py-2 overflow-y-auto">
        {lines.map((line, i) => (
          <div
            key={i}
            className={`whitespace-pre-wrap ${
              line.startsWith(PROMPT) ? "text-[#74e87a]" : ""
            }`}
          >
            {line}
          </div>
        ))}
        <div className="flex items-center">
          <span className="text-[#74e87a]">{PROMPT}</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            autoComplete="off"
            className="bg-transparent outline-none text-[#cccccc] ml-2 flex-1"
            autoFocus
          />
        </div>
      </div>
    </div>
  );
};

export default VsTerminal;
