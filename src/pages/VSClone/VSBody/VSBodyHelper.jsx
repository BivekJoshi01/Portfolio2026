import React, { useEffect, useMemo, useRef, useState } from "react";

const VSBodyHelper = ({
  initialValue = "",
  onChange,
  className = "",
}) => {
  const [code, setCode] = useState(initialValue);
  const gutterRef = useRef(null);
  const editorRef = useRef(null);

  const lineNumbers = useMemo(() => {
    const lines = (code === "" ? 1 : code.split("\n").length) || 1;
    let s = "";
    for (let i = 1; i <= lines; i++) s += i + (i === lines ? "" : "\n");
    return s;
  }, [code]);

  const handleScroll = () => {
    if (!editorRef.current || !gutterRef.current) return;
    gutterRef.current.scrollTop = editorRef.current.scrollTop;
    gutterRef.current.scrollLeft = editorRef.current.scrollLeft;
  };

  const handleChange = (e) => {
    setCode(e.target.value);
    if (typeof onChange === "function") onChange(e.target.value);
  };

  const handleKeyDown = (e) => {
    const el = editorRef.current;
    if (!el) return;

    if (e.key === "Tab") {
      e.preventDefault();
      const start = el.selectionStart;
      const end = el.selectionEnd;

      const value = el.value;
      const selected = value.slice(start, end);
      const isMultiLine = selected.includes("\n");

      const indent = "  "; // 2 spaces; change to "\t" if you prefer tabs

      if (!isMultiLine) {
        const next = value.slice(0, start) + indent + value.slice(end);
        setCode(next);
        if (typeof onChange === "function") onChange(next);
        requestAnimationFrame(() => {
          el.selectionStart = el.selectionEnd = start + indent.length;
        });
      } else {
        const before = value.slice(0, start);
        const after = value.slice(end);
        const mid = value.slice(start, end);

        const lines = mid.split("\n");
        const indented = e.shiftKey
          ? lines
              .map((ln) =>
                ln.startsWith(indent) ? ln.slice(indent.length) : ln
              )
              .join("\n")
          : lines.map((ln) => indent + ln).join("\n");

        const next = before + indented + after;
        const delta = indented.length - mid.length;

        setCode(next);
        if (typeof onChange === "function") onChange(next);

        requestAnimationFrame(() => {
          el.selectionStart = start;
          el.selectionEnd = end + delta;
        });
      }
    }
  };

  useEffect(() => {
    // Keep gutter and editor styles consistent if needed
  }, []);

  return (
    <div className={`w-full h-full overflow-hidden ${className} `}>
      {/* Editor area */}
      <div className="relative flex font-mono text-[13px] leading-6">
        <div
          ref={gutterRef}
          className="select-none text-right px-3 py-2 bg-[#1f1f1f] text-[#858585] border-r border-zinc-800 overflow-auto"
          style={{ height: "100%" }}
          aria-hidden="true"
        >
          <pre className=" whitespace-pre">{lineNumbers}</pre>
        </div>

        <div style={{width:'100%'}} className="w-full">
          <textarea
            ref={editorRef}
            value={code}
            onChange={handleChange}
            onScroll={handleScroll}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            placeholder="// Start typing here..."
            className="flex-1 resize-none px-3 py-2 outline-none text-[#d4d4d4] placeholder:text-zinc-500 overflow-auto"
            style={{
              tabSize: 2,
              width:'100%',
              height:'100%',
              lineHeight: "1.5rem",
              fontFamily:
                'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default VSBodyHelper;
