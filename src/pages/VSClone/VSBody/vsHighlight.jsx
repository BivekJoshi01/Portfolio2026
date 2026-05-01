import React from "react";

// VS Code Dark+ inspired colors
export const TOKEN_COLORS = {
  comment: "#6a9955",
  string: "#ce9178",
  number: "#b5cea8",
  keyword: "#c586c0",
  control: "#c586c0",
  builtin: "#4ec9b0",
  tag: "#569cd6",
  bracket: "#d4d4d4",
  component: "#4ec9b0",
  attr: "#9cdcfe",
  ident: "#9cdcfe",
  function: "#dcdcaa",
  punct: "#d4d4d4",
  operator: "#d4d4d4",
  text: "#d4d4d4",
  key: "#9cdcfe",
  boolean: "#569cd6",
  regex: "#d16969",
};

const JSX_RULES = [
  ["comment", /\/\*[\s\S]*?\*\/|\/\/[^\n]*/y],
  [
    "string",
    /"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*'|`(?:\\.|[^`\\])*`/y,
  ],
  ["number", /\b\d+(?:\.\d+)?\b/y],
  [
    "control",
    /\b(?:return|if|else|for|while|switch|case|break|continue|throw|try|catch|finally)\b/y,
  ],
  [
    "keyword",
    /\b(?:const|let|var|function|import|export|from|default|class|new|true|false|null|undefined|async|await|extends|of|in|typeof|instanceof|this|super|as|void|yield|static|get|set)\b/y,
  ],
  ["tag", /<\/?[A-Za-z][\w.]*|\/?>/y],
  ["component", /\b[A-Z][\w$]*\b/y],
  ["function", /\b[a-zA-Z_$][\w$]*(?=\s*\()/y],
  ["ident", /\b[a-zA-Z_$][\w$]*\b/y],
  ["bracket", /[{}()[\]]/y],
  ["punct", /[;,.:]/y],
  ["operator", /[=+\-*/<>!&|?]/y],
];

const JSON_RULES = [
  ["comment", /\/\/[^\n]*/y],
  ["key", /"(?:\\.|[^"\\\n])*"(?=\s*:)/y],
  ["string", /"(?:\\.|[^"\\\n])*"/y],
  ["number", /-?\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b/y],
  ["boolean", /\b(?:true|false|null)\b/y],
  ["bracket", /[{}[\]]/y],
  ["punct", /[,:]/y],
];

const tokenize = (code, language) => {
  const rules = language === "json" ? JSON_RULES : JSX_RULES;
  const tokens = [];
  let i = 0;
  const n = code.length;

  while (i < n) {
    let matched = null;
    for (const [type, regex] of rules) {
      regex.lastIndex = i;
      const m = regex.exec(code);
      if (m && m.index === i) {
        matched = { type, value: m[0] };
        break;
      }
    }
    if (matched) {
      tokens.push(matched);
      i += matched.value.length;
    } else {
      tokens.push({ type: "text", value: code[i] });
      i += 1;
    }
  }

  // Merge adjacent text tokens for fewer spans
  const merged = [];
  for (const t of tokens) {
    const last = merged[merged.length - 1];
    if (last && last.type === t.type && (t.type === "text" || t.type === "operator")) {
      last.value += t.value;
    } else {
      merged.push({ ...t });
    }
  }
  return merged;
};

export const renderHighlighted = (code, language = "jsx") => {
  if (!code) return null;
  const tokens = tokenize(code, language);
  return tokens.map((t, i) => (
    <span key={i} style={{ color: TOKEN_COLORS[t.type] || TOKEN_COLORS.text }}>
      {t.value}
    </span>
  ));
};

export const guessLanguageFromExt = (ext) => {
  if (!ext) return "jsx";
  const e = ext.toLowerCase();
  if (e === "json") return "json";
  if (e === "md") return "md";
  return "jsx";
};
