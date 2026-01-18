import React from "react";
import { strengthsList } from "./EducationData";

const Strength = () => {
  return (
    <div
      className="
        p-4 sm:p-6 md:p-8
        space-y-3 md:space-y-2
      "
    >
      {/* Title */}
      <h3
        className="
          text-xl sm:text-2xl
          font-semibold
        "
      >
        Core Strengths
      </h3>

      {/* List */}
      <ul
        className="
          space-y-3 sm:space-y-4
        "
      >
        {strengthsList?.map((skill, i) => (
          <li
            key={i}
            className="
              flex items-start sm:items-center
              gap-3 sm:gap-4
            "
          >
            <span className="w-2 h-2 mt-2 sm:mt-0 rounded-full bg-slate-800 shrink-0"></span>
            <span
              className="
                text-sm sm:text-base
                text-slate-700
                leading-relaxed
              "
            >
              {skill}
            </span>
          </li>
        ))}
      </ul>

      {/* Quote */}
      <p
        className="
          text-xs sm:text-sm
          text-slate-500
          italic
          border-t
          pt-3 sm:pt-4
        "
      >
        “Learning builds a foundation no one can take away.”
      </p>
    </div>
  );
};

export default Strength;
