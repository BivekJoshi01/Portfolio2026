import React from "react";
import VSBodyHelper from "../VSBodyHelper";

const SOURCE = `import React from "react";

/**
 * About_Me — a tiny snapshot of who I am.
 * Built with React + Tailwind, served with a side of caffeine.
 */
const About_Me = () => {
  const me = {
    name: "Bivek Joshi",
    role: "Full-Stack Developer",
    location: "Lalitpur, Nepal",
    email: "bvekjoshi03@gmail.com",
    yearsOfExperience: 4,
    available: true,
  };

  const skills = [
    "React", "Next.js", "TypeScript",
    "Node.js", "Express", "PostgreSQL",
    "Tailwind", "Three.js", "GSAP",
  ];

  const socials = [
    { label: "GitHub",   href: "https://github.com/BivekJoshi01" },
    { label: "LinkedIn", href: "https://linkedin.com/in/bivekjoshi" },
    { label: "Email",    href: "mailto:bvekjoshi03@gmail.com" },
  ];

  return (
    <section className="about">
      <header>
        <h1>Hi, I'm {me.name} 👋</h1>
        <p className="subtitle">
          {me.role} · {me.location}
        </p>
      </header>

      <p>
        I build delightful, production-ready web apps with strong design
        intuition. I care about animation timing, empty states, and the small
        details that make a UI feel alive.
      </p>

      <h2>Skills</h2>
      <ul className="skills">
        {skills.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>

      <h2>Find me</h2>
      <ul className="socials">
        {socials.map((s) => (
          <li key={s.label}>
            <a href={s.href} target="_blank" rel="noreferrer">
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default About_Me;
`;

const MyInfoVs = () => (
  <VSBodyHelper
    language="jsx"
    initialValue={SOURCE}
    onChange={(val) => {
      // intentionally local — this is a demo editor
      void val;
    }}
  />
);

export default MyInfoVs;
