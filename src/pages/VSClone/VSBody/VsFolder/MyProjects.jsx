import React from "react";
import VSBodyHelper from "../VSBodyHelper";

const SOURCE = `import React, { useMemo, useState } from "react";

// Selected work — public client projects + internal tools.
export const PROJECTS = [
  {
    title: "Legal Remit",
    category: "Fintech",
    stack: ["React", "Node", "Postgres"],
    summary: "Cross-border remittance platform — KYC, payouts, ledgers.",
    url: "https://legalremit.com",
  },
  {
    title: "DGHub HRMS",
    category: "Enterprise",
    stack: ["React", "Redux Toolkit"],
    summary: "Internal HR system: payroll, attendance, leave workflows.",
    url: "https://dghub.io",
  },
  {
    title: "Bizarre Cafe",
    category: "Web",
    stack: ["React", "Tailwind"],
    summary: "Marketing site with a playful, brand-led aesthetic.",
    url: "https://cafebizarre.com.np",
  },
  {
    title: "Yejus Paw",
    category: "E-commerce",
    stack: ["React", "Node", "MongoDB"],
    summary: "Pet-care e-commerce with cart, checkout, and admin tools.",
    url: "https://yejus-paw.onrender.com",
  },
];

const CATEGORIES = ["All", "Fintech", "Enterprise", "Web", "E-commerce"];

const Projects = () => {
  const [active, setActive] = useState("All");

  const visible = useMemo(() => {
    if (active === "All") return PROJECTS;
    return PROJECTS.filter((p) => p.category === active);
  }, [active]);

  return (
    <section className="projects">
      <header>
        <h1>My Projects</h1>
        <p>Each project is a unique piece of development.</p>
      </header>

      <nav className="filters" role="tablist">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            role="tab"
            aria-selected={active === c}
            onClick={() => setActive(c)}
            className={active === c ? "active" : ""}
          >
            {c}
          </button>
        ))}
      </nav>

      <ul className="grid">
        {visible.map((p) => (
          <li key={p.title} className="card">
            <h3>{p.title}</h3>
            <small>{p.category}</small>
            <p>{p.summary}</p>
            <ul className="stack">
              {p.stack.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <a href={p.url} target="_blank" rel="noreferrer">
              Visit →
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Projects;
`;

const MyProjects = () => (
  <VSBodyHelper language="jsx" initialValue={SOURCE} />
);

export default MyProjects;
