import React, { useEffect, useMemo, useRef, useState } from "react";
import { renderHighlighted } from "./vsHighlight.jsx";

const FONT_FAMILY =
  'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace';

const PADDING_X = 12;
const PADDING_Y = 8;
const LINE_HEIGHT = 20; // px
const FONT_SIZE = 13;
const GUTTER_MIN_WIDTH = 56;

const VSBodyHelper = ({
  initialValue = "",
  onChange,
  language = "jsx",
  className = "",
  showMinimap = true,
}) => {
  const [code, setCode] = useState(initialValue);
  const [activeLine, setActiveLine] = useState(1);
  const [scrollTop, setScrollTop] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const editorRef = useRef(null);

  useEffect(() => {
    setCode(initialValue);
  }, [initialValue]);

  const lines = useMemo(
    () => (code === "" ? [""] : code.split("\n")),
    [code]
  );

  const tokens = useMemo(
    () => renderHighlighted(code + (code.endsWith("\n") ? " " : ""), language),
    [code, language]
  );

  const handleScroll = () => {
    const el = editorRef.current;
    if (!el) return;
    setScrollTop(el.scrollTop);
    setScrollLeft(el.scrollLeft);
  };

  const computeActiveLine = () => {
    const el = editorRef.current;
    if (!el) return;
    const before = el.value.slice(0, el.selectionStart);
    setActiveLine(before.split("\n").length);
  };

  const handleChange = (e) => {
    setCode(e.target.value);
    if (typeof onChange === "function") onChange(e.target.value);
    computeActiveLine();
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
      const indent = "  ";

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
        const linesArr = mid.split("\n");
        const indented = e.shiftKey
          ? linesArr
              .map((ln) =>
                ln.startsWith(indent) ? ln.slice(indent.length) : ln
              )
              .join("\n")
          : linesArr.map((ln) => indent + ln).join("\n");

        const next = before + indented + after;
        const delta = indented.length - mid.length;
        setCode(next);
        if (typeof onChange === "function") onChange(next);
        requestAnimationFrame(() => {
          el.selectionStart = start;
          el.selectionEnd = end + delta;
        });
      }
      return;
    }

    setTimeout(computeActiveLine, 0);
  };

  const sharedFontStyle = {
    fontFamily: FONT_FAMILY,
    fontSize: FONT_SIZE,
    lineHeight: `${LINE_HEIGHT}px`,
    tabSize: 2,
  };

  return (
    <div
      className={`relative w-full h-full flex font-mono bg-[#1E1E1E] overflow-hidden ${className}`}
      style={{ fontSize: FONT_SIZE }}
    >
      {/* Gutter */}
      <div
        aria-hidden
        className="select-none text-right bg-[#1E1E1E] text-[#858585] border-r border-[#1c1c1c] overflow-hidden relative shrink-0"
        style={{ minWidth: GUTTER_MIN_WIDTH, paddingTop: PADDING_Y, paddingBottom: PADDING_Y }}
      >
        {/* Active line highlight band on the gutter */}
        <div
          className="absolute left-0 right-0 bg-[#2a2d2e]"
          style={{
            top: PADDING_Y + (activeLine - 1) * LINE_HEIGHT - scrollTop,
            height: LINE_HEIGHT,
          }}
        />
        <div
          style={{
            transform: `translateY(${-scrollTop}px)`,
            paddingLeft: 8,
            paddingRight: 12,
            ...sharedFontStyle,
          }}
        >
          {lines.map((_, i) => {
            const n = i + 1;
            const isActive = n === activeLine;
            return (
              <div
                key={n}
                className={isActive ? "text-[#cccccc] relative" : "relative"}
                style={{ height: LINE_HEIGHT }}
              >
                {n}
              </div>
            );
          })}
        </div>
      </div>

      {/* Editor area */}
      <div className="flex-1 relative overflow-hidden min-w-0">
        {/* Active line full-width band */}
        <div
          className="absolute left-0 right-0 pointer-events-none"
          style={{
            top: PADDING_Y + (activeLine - 1) * LINE_HEIGHT - scrollTop,
            height: LINE_HEIGHT,
            background: "rgba(255,255,255,0.04)",
            borderTop: "1px solid rgba(255,255,255,0.04)",
            borderBottom: "1px solid rgba(255,255,255,0.04)",
          }}
          aria-hidden
        />

        {/* Highlight overlay */}
        <pre
          aria-hidden
          className="absolute top-0 left-0 m-0 pointer-events-none whitespace-pre will-change-transform"
          style={{
            transform: `translate(${-scrollLeft}px, ${-scrollTop}px)`,
            padding: `${PADDING_Y}px ${PADDING_X}px`,
            color: "#d4d4d4",
            ...sharedFontStyle,
          }}
        >
          {tokens}
        </pre>

        {/* Editable transparent textarea */}
        <textarea
          ref={editorRef}
          value={code}
          onChange={handleChange}
          onScroll={handleScroll}
          onKeyDown={handleKeyDown}
          onKeyUp={computeActiveLine}
          onClick={computeActiveLine}
          spellCheck={false}
          autoCorrect="off"
          autoCapitalize="off"
          placeholder="// Start typing here..."
          className="absolute inset-0 w-full h-full resize-none outline-none overflow-auto whitespace-pre"
          style={{
            padding: `${PADDING_Y}px ${PADDING_X}px`,
            color: "transparent",
            background: "transparent",
            caretColor: "#aeafad",
            ...sharedFontStyle,
          }}
        />
      </div>

      {/* Minimap */}
      {showMinimap && (
        <div
          className="hidden md:block bg-[#252526] border-l border-[#1c1c1c] py-2 select-none overflow-hidden shrink-0"
          style={{ width: 80 }}
          aria-hidden
        >
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 3,
              lineHeight: "4px",
              color: "#5e5e5e",
              padding: "0 4px",
              whiteSpace: "pre",
            }}
          >
            {lines.map((ln, i) => (
              <div
                key={i}
                style={{
                  background:
                    i + 1 === activeLine ? "rgba(0,122,204,0.2)" : "transparent",
                }}
              >
                {ln || " "}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VSBodyHelper;
