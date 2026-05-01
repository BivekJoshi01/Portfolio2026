import React from "react";
import VSBodyHelper from "../VSBodyHelper";

const SOURCE = `{
  "name": "Bivek Joshi",
  "headline": "Full-Stack Developer · React + Node",
  "location": "Lalitpur, Nepal",
  "open_to": ["Remote", "Hybrid", "Contract", "Full-time"],
  "experience": [
    {
      "company": "Legal Remit",
      "role": "Frontend Developer",
      "type": "Full-time",
      "start": "2024-01",
      "end": "present",
      "stack": ["React", "Redux Toolkit", "Tailwind", "REST"],
      "highlights": [
        "Built KYC and remittance flows used by thousands of customers",
        "Owned the design system upgrade — components, tokens, docs",
        "Improved Lighthouse perf score from 62 to 91 on key pages"
      ]
    },
    {
      "company": "DGHub",
      "role": "Full-Stack Developer",
      "type": "Full-time",
      "start": "2022-06",
      "end": "2023-12",
      "stack": ["React", "Node.js", "Express", "PostgreSQL"],
      "highlights": [
        "Designed and shipped HRMS modules: payroll, attendance, leaves",
        "Wrote integration tests for billing logic — caught 4 prod bugs early",
        "Mentored two junior devs through code review and pairing"
      ]
    },
    {
      "company": "Freelance",
      "role": "Web Developer",
      "type": "Contract",
      "start": "2021-01",
      "end": "2022-05",
      "stack": ["React", "Tailwind", "Firebase"],
      "highlights": [
        "Delivered marketing sites for cafes, consultancies, and clinics",
        "Set up CI/CD on Render and Vercel for hands-off deploys"
      ]
    }
  ],
  "languages": ["English", "Nepali", "Hindi"],
  "interests": ["Open source", "3D on the web", "Coffee"]
}
`;

const MyExperience = () => (
  <VSBodyHelper language="json" initialValue={SOURCE} />
);

export default MyExperience;
