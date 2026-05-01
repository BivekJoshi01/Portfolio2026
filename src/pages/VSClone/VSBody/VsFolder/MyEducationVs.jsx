import React from "react";
import VSBodyHelper from "../VSBodyHelper";

const SOURCE = `import React from "react";

const EDUCATION = [
  {
    level: "Bachelor's",
    degree: "BCA — Bachelor of Computer Application",
    institution: "Shankerdev Campus, Tribhuvan University",
    location: "Kathmandu, Nepal",
    startedAt: 2021,
    finishedAt: 2025,
    highlights: [
      "Web Development, DSA, Software Engineering",
      "Capstone: Real-time chat with WebSockets",
    ],
  },
  {
    level: "+2",
    degree: "Higher Secondary — Science",
    institution: "Trinity International College",
    location: "Kathmandu, Nepal",
    startedAt: 2018,
    finishedAt: 2020,
    highlights: ["Physics, Computer Science"],
  },
  {
    level: "Self-taught",
    degree: "Online courses & open source",
    institution: "freeCodeCamp · YouTube · MDN",
    startedAt: 2019,
    finishedAt: "present",
    highlights: [
      "React + Redux Toolkit",
      "Three.js & shader basics",
      "Accessibility & performance",
    ],
  },
];

const Education = () => {
  return (
    <section className="timeline">
      <h1>Education & Learning</h1>

      <ol className="entries">
        {EDUCATION.map((entry, i) => (
          <li key={i} className="entry">
            <div className="meta">
              <span className="level">{entry.level}</span>
              <span className="years">
                {entry.startedAt} – {entry.finishedAt}
              </span>
            </div>
            <h3>{entry.degree}</h3>
            <p className="institution">{entry.institution}</p>
            <ul>
              {entry.highlights.map((h, j) => (
                <li key={j}>{h}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default Education;
`;

const MyEducationVs = () => (
  <VSBodyHelper language="jsx" initialValue={SOURCE} />
);

export default MyEducationVs;
