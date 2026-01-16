import React from "react";
// Optional: npm install framer-motion for smooth animations
import { motion } from "framer-motion";
import TechnologyUsed from "../TechnologyUsed/TechnologyUsed";

const education = [
  {
    degree: "Bachelor of Information Management",
    school: "Tribhuvan University",
    year: "2020 — 2024",
    desc: "Focused on software engineering, full-stack development, and system design.",
    featured: true,
    logo: "https://upload.wikimedia.org/wikipedia/en/5/50/Tribhuvan_University_Logo.png",
  },
  {
    degree: "Higher Secondary (+2 Science)",
    school: "Moonlight Secondary School",
    year: "2018 — 2020",
    desc: "Specialized in Physics and Mathematics with an elective in Computer Science.",
  },
  {
    degree: "Secondary School (SEE)",
    school: "Pragati Adarsha English School",
    year: "2016 — 2018",
    desc: "Awarded for excellence in Mathematics and Logical Reasoning.",
  },
];

const strengths = [
  "Full-Stack Web Development",
  "UI/UX Engineering",
  "React & Modern Frontend",
  "API & Database Design",
  "Clean Code & Architecture",
];

const EducationPageLayout = () => {
  const featured = education.find((e) => e.featured);
  const rest = education.filter((e) => !e.featured);

  return (
    <section>
      <div className="grid lg:grid-cols-12 gap-10">
        {/* LEFT COLUMN — Main Content */}
        <div className="lg:col-span-8 space-y-10">
          {/* Header Section */}
          <header className="space-y-4">
            <h1 className="text-6xl font-black tracking-tight text-slate-900">
              Academic <span className="text-indigo-600">Pedigree</span>
            </h1>
            <p className="text-xl text-slate-500 max-w-2xl leading-relaxed">
              A chronological look at my formal training and the foundation of
              my technical expertise.
            </p>
          </header>

          {/* Featured Education Card */}
          <div className="group relative">
            {/* Background Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[2rem] blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>

            <div className="relative bg-white border border-slate-100 rounded-[2rem] p-8 md:p-12 shadow-xl shadow-slate-200/50">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div className="flex items-center gap-6">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <img
                      src={featured.logo}
                      alt="Logo"
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                  <div>
                    <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider rounded-full">
                      {featured.year}
                    </span>
                    <h2 className="text-3xl font-bold text-slate-900 mt-2">
                      {featured.degree}
                    </h2>
                    <p className="text-lg text-slate-500 font-medium">
                      {featured.school}
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-slate-600 text-lg leading-relaxed border-l-4 border-indigo-100 pl-6">
                {featured.desc}
              </p>
            </div>
          </div>

          {/* Previous Education Timeline */}
          <div className="grid md:grid-cols-2 gap-8">
            {rest.map((edu, i) => (
              <div
                key={i}
                className="group p-8 rounded-3xl bg-white border border-slate-200 hover:border-indigo-300 transition-all duration-300 shadow-sm hover:shadow-lg"
              >
                <div className="flex flex-col h-full">
                  <span className="text-indigo-500 font-bold text-sm tracking-widest">
                    {edu.year}
                  </span>
                  <h3 className="text-xl font-bold text-slate-800 mt-2 group-hover:text-indigo-600 transition-colors">
                    {edu.degree}
                  </h3>
                  <p className="text-slate-500 text-sm font-medium mb-4">
                    {edu.school}
                  </p>
                  <p className="text-slate-600 leading-relaxed mt-auto">
                    {edu.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN — Sticky Sidebar */}
        <div className="lg:col-span-4">
          <div className="space-y-4">
            <div className="w-full h-[280px]">
              <TechnologyUsed />
            </div>
            {/* Strength Card */}
            <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white overflow-hidden relative shadow-2xl">
              {/* Decorative Circle */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl"></div>

              <h3 className="text-2xl font-bold mb-8">Core Competencies</h3>
              <ul className="space-y-5">
                {strengths.map((skill, i) => (
                  <li key={i} className="flex items-center gap-4 group">
                    <div className="w-8 h-[2px] bg-indigo-500 group-hover:w-12 transition-all"></div>
                    <span className="text-slate-300 group-hover:text-white transition-colors">
                      {skill}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-12 pt-8 border-t border-slate-800">
                <p className="text-slate-400 text-sm italic">
                  "The beautiful thing about learning is that nobody can take it
                  away from you."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationPageLayout;
