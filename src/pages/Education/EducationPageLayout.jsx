import React from "react";
import TechnologyUsed from "../TechnologyUsed/TechnologyUsed";
import { EducationList } from "./EducationData";
import Strength from "./Strength";

const EducationPageLayout = () => {
  const featured = EducationList?.find((e) => e.featured);
  const rest = EducationList?.filter((e) => !e.featured);

  return (
    <section className="w-full py-10 px-4 sm:px-6 lg:px-0">
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        {/* LEFT SIDE */}
        <div className="lg:col-span-8 space-y-10 lg:space-y-12">
          {/* Header */}
          <header className="space-y-4">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-slate-900">
              Academic{" "}
              <span className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                Pedigree
              </span>
            </h2>

            <p className="text-base sm:text-lg lg:text-xl text-slate-500 max-w-2xl leading-relaxed">
              A chronological journey through the institutions that shaped my
              analytical thinking and technical foundation.
            </p>
          </header>

          {/* Featured Card */}
          <div className="relative group overflow-hidden rounded-[2rem] lg:rounded-[2.5rem] bg-white border border-slate-100 p-1 bg-gradient-to-br from-slate-50 to-white shadow-2xl shadow-slate-200/60">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-indigo-100/50 rounded-full blur-3xl group-hover:bg-indigo-200/50 transition-colors duration-700" />

            <div className="relative p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8">
                <div className="self-start sm:self-auto p-4 bg-white rounded-2xl shadow-inner border border-slate-50">
                  <img
                    src={featured.logo}
                    alt={featured.school}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-3 py-1 bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                      Latest
                    </span>
                    <span className="text-indigo-600 font-semibold tracking-wide text-sm">
                      {featured.year}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
                    {featured.degree}
                  </h2>

                  <p className="text-base sm:text-lg text-slate-500 font-medium">
                    {featured.school}
                  </p>
                </div>
              </div>

              <p className="mt-8 sm:mt-10 text-slate-600 text-base sm:text-lg leading-relaxed border-l-4 border-indigo-500 pl-6 sm:pl-8 italic">
                "{featured.desc}"
              </p>
            </div>
          </div>

          {/* Secondary Education */}
          <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
            {rest?.map((edu, i) => (
              <div
                key={i}
                className="group relative bg-white border border-slate-200/60 rounded-2xl sm:rounded-3xl p-5 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-500 overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-[0.08] group-hover:opacity-[0.18] transition-opacity">
                  <img
                    src={edu.logo}
                    alt=""
                    className="w-24 h-24 sm:w-32 sm:h-32 object-contain"
                  />
                </div>

                <div className="relative z-10">
                  <span className="inline-block px-3 py-1 rounded-lg bg-slate-100 text-slate-500 text-xs font-bold mb-4">
                    {edu.year}
                  </span>

                  <h3 className="text-xl sm:text-2xl font-bold text-slate-800 leading-tight group-hover:text-indigo-600 transition-colors">
                    {edu.degree}
                  </h3>

                  <p className="text-slate-500 font-medium mt-1 mb-4 sm:mb-6 text-sm sm:text-base">
                    {edu.school}
                  </p>

                  <p className="text-slate-600 leading-relaxed text-sm">
                    {edu.desc}
                  </p>
                </div>

                <div className="absolute right-4 bottom-4">
                  <img
                    src={edu.logo}
                    alt={edu.school}
                    className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE — moves below on mobile */}
        <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-10">
          {/* Desktop and tablet: show */}
          <div className="w-full h-[320px] rounded-2xl overflow-hidden hidden sm:block">
            <TechnologyUsed />
          </div>

          <div className="rounded-[1.5rem] sm:rounded-[2rem] bg-gradient-to-tr from-indigo-400 via-amber-100 to-purple-800/50 shadow-lg">
            <Strength />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationPageLayout;
