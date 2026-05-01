export const VS_FILES = [
  {
    id: "about",
    name: "About_Me.jsx",
    path: "/vs-profile/my-infovs",
    ext: "jsx",
    language: "JavaScript JSX",
  },
  {
    id: "education",
    name: "Education.jsx",
    path: "/vs-profile/my-educationvs",
    ext: "jsx",
    language: "JavaScript JSX",
  },
  {
    id: "projects",
    name: "Projects.jsx",
    path: "/vs-profile/my-projectsvs",
    ext: "jsx",
    language: "JavaScript JSX",
  },
  {
    id: "experience",
    name: "Experience.json",
    path: "/vs-profile/my-experiencevs",
    ext: "json",
    language: "JSON",
  },
  {
    id: "contact",
    name: "Contact.jsx",
    path: "/vs-profile/my-contactvs",
    ext: "jsx",
    language: "JavaScript JSX",
  },
];

export const FILE_TREE = [
  {
    name: "node_modules",
    type: "folder",
    open: false,
    children: [
      { name: ".package-lock.json", type: "file", ext: "json", virtual: true },
    ],
  },
  {
    name: "public",
    type: "folder",
    open: false,
    children: [
      { name: "favicon.svg", type: "file", ext: "svg", virtual: true },
      { name: "robots.txt", type: "file", ext: "txt", virtual: true },
    ],
  },
  {
    name: "src",
    type: "folder",
    open: true,
    children: [
      {
        name: "profile",
        type: "folder",
        open: true,
        children: [
          { name: "About_Me.jsx", type: "file", fileId: "about" },
          { name: "Education.jsx", type: "file", fileId: "education" },
          { name: "Projects.jsx", type: "file", fileId: "projects" },
          { name: "Experience.json", type: "file", fileId: "experience" },
          { name: "Contact.jsx", type: "file", fileId: "contact" },
        ],
      },
      { name: "main.jsx", type: "file", ext: "jsx", virtual: true },
      { name: "App.jsx", type: "file", ext: "jsx", virtual: true },
    ],
  },
  { name: ".gitignore", type: "file", ext: "git", virtual: true },
  { name: "eslint.config.js", type: "file", ext: "js", virtual: true },
  { name: "index.html", type: "file", ext: "html", virtual: true },
  { name: "package.json", type: "file", ext: "json", virtual: true },
  { name: "README.md", type: "file", ext: "md", virtual: true },
  { name: "vite.config.js", type: "file", ext: "js", virtual: true },
];

export const getFileIcon = (ext) => {
  const map = {
    jsx: { color: "#61dafb", glyph: "⚛" },
    js: { color: "#f7df1e", glyph: "JS" },
    ts: { color: "#3178c6", glyph: "TS" },
    tsx: { color: "#3178c6", glyph: "⚛" },
    json: { color: "#f7c873", glyph: "{ }" },
    md: { color: "#9ca3af", glyph: "M↓" },
    html: { color: "#e34c26", glyph: "</" },
    css: { color: "#2965f1", glyph: "#" },
    svg: { color: "#ffb13b", glyph: "S" },
    txt: { color: "#9ca3af", glyph: "T" },
    git: { color: "#f05033", glyph: "G" },
  };
  return map[ext] || { color: "#9ca3af", glyph: "•" };
};

export const findFileById = (id) => VS_FILES.find((f) => f.id === id);
export const findFileByPath = (pathname) =>
  VS_FILES.find((f) => f.path === pathname);
