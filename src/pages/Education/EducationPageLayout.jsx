import React from "react";
import TechnologyUsed from "../TechnologyUsed/TechnologyUsed";
import { EducationList } from "./EducationData";
import Strength from "./Strength";

const EducationPageLayout = () => {
  const featured = EducationList?.find((e) => e.featured);
  const rest = EducationList?.filter((e) => !e.featured);

  return (
    <section className="w-full py-10">
      <div className="grid lg:grid-cols-12 gap-12 items-start">
        {/* LEFT SIDE — Education Narrative */}
        <div className="lg:col-span-8 space-y-12">
          {/* Header */}
          <header className="space-y-4">
            <h2 className="text-6xl font-black tracking-tight leading-tight text-slate-900">
              Academic{" "}
              <span className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                Pedigree
              </span>
            </h2>
            <p className="text-xl text-slate-500 max-w-2xl leading-relaxed">
              A chronological journey through the institutions that shaped my
              analytical thinking and technical foundation.
            </p>
          </header>

          {/* Featured Education Card — Premium Look */}
          <div className="relative group overflow-hidden rounded-[2.5rem] bg-white border border-slate-100 p-1 bg-gradient-to-br from-slate-50 to-white shadow-2xl shadow-slate-200/60">
            {/* Subtle Accent Glow */}
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-indigo-100/50 rounded-full blur-3xl group-hover:bg-indigo-200/50 transition-colors duration-700" />

            <div className="relative p-8 md:p-6">
              <div className="flex flex-col md:flex-row md:items-center gap-8">
                <div className="flex-shrink-0 p-4 bg-white rounded-2xl shadow-inner border border-slate-50">
                  <img
                    src={featured.logo}
                    alt={featured.school}
                    className="w-20 h-20 object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                      Latest
                    </span>
                    <span className="text-indigo-600 font-semibold tracking-wide">
                      {featured.year}
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                    {featured.degree}
                  </h2>
                  <p className="text-xl text-slate-500 font-medium">
                    {featured.school}
                  </p>
                </div>
              </div>

              <div className="mt-10 grid md:grid-cols-1 gap-6">
                <p className="text-slate-600 text-lg leading-relaxed border-l-4 border-indigo-500 pl-8 italic">
                  "{featured.desc}"
                </p>
              </div>
            </div>
          </div>

          {/* Secondary Education — Bento Style Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {rest?.map((edu, i) => (
              <div
                key={i}
                className="group relative bg-white border border-slate-200/60 rounded-3xl p-5 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-500 flex flex-col justify-between overflow-hidden"
              >
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 p-4 opacity-[0.09] group-hover:opacity-[0.2] transition-opacity">
                  <img
                    src={edu?.logo}
                    alt=""
                    className="w-32 h-32 object-contain"
                  />
                </div>

                <div className="relative z-10">
                  <span className="inline-block px-3 py-1 rounded-lg bg-slate-100 text-slate-500 text-xs font-bold mb-4">
                    {edu.year}
                  </span>
                  <h3 className="text-2xl font-bold text-slate-800 leading-tight group-hover:text-indigo-600 transition-colors">
                    {edu.degree}
                  </h3>
                  <p className="text-slate-500 font-medium mt-1 mb-6">
                    {edu.school}
                  </p>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    {edu.desc}
                  </p>
                </div>

                {/* Small Logo bottom-right */}
                <div className="mt-8 self-end absolute right-5 bottom-5">
                  <img
                    src={edu?.logo}
                    alt={edu?.school}
                    className="w-12 h-12 object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE — Utility Sidebar */}
        <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-10">
          <div className="w-full h-[320px] rounded-2xl overflow-hidden">
            <TechnologyUsed />
          </div>

          <div className="bg-gradient-to-tr from-indigo-400 via-amber-100 to-purple-800/50 rounded-[2rem] shadow-lg">
            <Strength />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationPageLayout;
