import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MyDetailInfo = () => {
  const [lines, setLines] = useState([]);
  const [input, setInput] = useState("");
  const [mode, setMode] = useState("bash");
  const inputRef = useRef(null);
  const didMount = useRef(false);
  const terminalRef = useRef(null);

  const navigate = useNavigate();

  const initialLines = [
    "Welcome to Bivek Joshi's interactive terminal 🚀",
    "Frontend Developer",
    "Type 'help' to see available commands.",
  ];

  const typeLine = (line, delay = 20) => {
    return new Promise((resolve) => {
      let i = 0;
      setLines((prev) => [...prev, ""]);
      const interval = setInterval(() => {
        setLines((prev) => {
          const newLines = [...prev];
          newLines[newLines.length - 1] = line.slice(0, i + 1);
          return newLines;
        });
        i++;
        if (i >= line.length) {
          clearInterval(interval);
          resolve();
        }
      }, delay);
    });
  };

  const typeLinesSequentially = async (linesArray) => {
    for (let line of linesArray) {
      await typeLine(line);
    }
  };

  useEffect(() => {
    if (didMount.current) return;
    didMount.current = true;

    setLines([]);
    typeLinesSequentially(initialLines);
  }, []);

  const handleCommand = (command) => {
    switch (command.toLowerCase()) {
      case "help":
        return [
          "Available commands:",
          " about    → Learn about me",
          " skills   → See my tech stack",
          " contact  → Get my contact info",
          " code .   → Open VS Code profile",
          " clear    → Clear the terminal",
        ];
      case "about":
        return [
          "👨‍💻 My name is Bivek Joshi.",
          "💡 A passionate full-stack developer from Nepal.",
        ];
      case "skills":
        return [
          "⚡ Skills:",
          " - React, Next.js, Node.js, Express",
          " - MongoDB, PostgreSQL",
          " - Tailwind, MUI, SCSS",
          " - Git, Docker, Vite",
        ];
      case "contact":
        return [
          "📧 Email: bvkjosi03@gmail.com",
          "📞 Phone: 9865466989",
          "🔗 GitHub: github.com/BivekJoshi01",
          "💼 LinkedIn: linkedin.com/in/bivekjoshi",
        ];
      case "code .":
        setTimeout(() => {
          navigate("/vs-profile");
        }, 600);
        return ["Opening VS Code..."];
      case "clear":
        setLines([]);
        return [];
      default:
        return [
          `Command not found: ${command}`,
          "Type 'help' for available commands.",
        ];
    }
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!input.trim()) return;

      const getPrompt = () => {
        if (mode === "npm") return `npm > ${input}`;
        return `bivek@portfolio:~$ ${input}`;
      };

      const userLine = getPrompt();
      setLines((prev) => [...prev, userLine]);
      const output = handleCommand(input.trim());
      setInput("");

      for (let line of output) {
        await typeLine(line);
      }
    }
  };

  useEffect(() => {
    terminalRef.current?.scrollTo(0, terminalRef.current.scrollHeight);
  }, [lines]);

  return (
    <div
      className={`font-mono text-sm rounded-md overflow-hidden h-104 flex flex-col cursor-text ${
        mode === "bash"
          ? "bg-black text-green-400"
          : "bg-[#1e1e1e] text-gray-200"
      }`}
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center justify-between bg-[#2d2d2d] px-3 py-1 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-red-500"></span>
          <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
          <span className="w-3 h-3 rounded-full bg-green-500"></span>
        </div>
        <div className="flex space-x-4 text-xs text-gray-400">
          <button
            onClick={() => setMode("npm")}
            className={`px-2 py-0.5 rounded transition ${
              mode === "npm"
                ? "bg-[#cb3837] text-white"
                : "hover:bg-gray-700 text-gray-400"
            }`}
          >
            🚀 npm
          </button>

          <button
            onClick={() => setMode("bash")}
            className={`px-2 py-0.5 rounded transition ${
              mode === "bash"
                ? "bg-orange-400 text-white"
                : "hover:bg-gray-700 text-gray-400"
            }`}
          >
            🐧 bash
          </button>
        </div>
        <div className="text-gray-400">+</div>
      </div>

      <div ref={terminalRef} className="flex-1 p-2 overflow-y-scroll scrollbar-hide">
        {lines.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap">
            {line}
          </div>
        ))}

        <div className="flex items-center">
          <span
            className={mode === "bash" ? "text-orange-400" : "text-[#cb3837]"}
          >
            {mode === "bash" ? "bivek@portfolio:~$" : "frontendDeveloper@BivekJoshiPC:~/portfolio2026$ >"}
          </span>

          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className={`bg-transparent outline-none ml-2 flex-1 ${
              mode === "bash" ? "text-green-400" : "text-gray-200"
            }`}
            autoFocus
          />
        </div>
      </div>
    </div>
  );
};

export default MyDetailInfo;
