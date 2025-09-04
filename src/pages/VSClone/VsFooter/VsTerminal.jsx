import React, { useState } from "react";

const VsTerminal = () => {
  const [lines, setLines] = useState([
    "legalRemit@LegalRemitPC:~/LegalRemit/OffOffice/portfolio2026$ git add .",
    'legalRemit@LegalRemitPC:~/LegalRemit/OffOffice/portfolio2026$ git commit -m "add ."',
    "legalRemit@LegalRemitPC:~/LegalRemit/OffOffice/portfolio2026$ git push origin main",
    "Enumerating objects: 23, done.",
    "Counting objects: 100% (23/23), done.",
    "Delta compression using up to 12 threads",
    "Compressing objects: 100% (12/12), done.",
  ]);

  return (
    <div className=" text-gray-200 font-mono text-sm overflow-hidden h-64 flex flex-col">
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
      </div>

      {/* Input */}
      <div className="border-t border-gray-700 px-2 py-1">
        <span className="text-green-400">
          legalRemit@LegalRemitPC:~/portfolio2026$
        </span>{" "}
        <input
          type="text"
          className="bg-transparent outline-none text-gray-200 w-3/4"
          placeholder="type a command..."
        />
      </div>
    </div>
  );
};

export default VsTerminal;
