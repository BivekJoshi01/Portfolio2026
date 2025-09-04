import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MyDetailInfo = () => {
  const [lines, setLines] = useState([
    "Welcome to Bivek Joshi's interactive terminal 🚀",
    "Type 'help' to see available commands.",
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const bottomRef = useRef(null);
  const navigate = useNavigate();

  // Handle commands
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

  // Handle Enter
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!input.trim()) return;

      const userLine = `legalRemit@LegalRemitPC:~$ ${input}`;
      const output = handleCommand(input.trim());

      // Add the typed command + output to terminal
      setLines((prev) => [...prev, userLine, ...output]);

      setInput(""); // reset for next prompt
    }
  };

  return (
    <div
      className="bg-[#1e1e1e] text-gray-200 font-mono text-sm rounded-md overflow-hidden h-104 flex flex-col cursor-text"
      onClick={() => inputRef.current?.focus()} // click anywhere to focus
    >
      {/* Terminal Header */}
      <div className="flex items-center justify-between bg-[#2d2d2d] px-3 py-1 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-red-500"></span>
          <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
          <span className="w-3 h-3 rounded-full bg-green-500"></span>
        </div>
        <div className="flex space-x-4 text-xs text-gray-400">
          <button className="px-2 py-0.5 hover:bg-gray-700 rounded">npm</button>
          <button className="px-2 py-0.5 hover:bg-gray-700 rounded bg-gray-700 text-white">
            bash
          </button>
        </div>
        <div className="text-gray-400">+</div>
      </div>

      {/* Terminal Body */}
      <div className="flex-1 p-2 overflow-y-auto">
        {lines.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap">
            {line}
          </div>
        ))}

        {/* Active input prompt (always last line) */}
        <div className="flex items-center">
          <span className="text-green-400">
            frontendDeveloper@BivekJoshiPC:~/portfolio2026$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-transparent outline-none text-gray-200 ml-2 flex-1"
            autoFocus
          />
        </div>

        <div ref={bottomRef}></div>
      </div>
    </div>
  );
};

export default MyDetailInfo;
