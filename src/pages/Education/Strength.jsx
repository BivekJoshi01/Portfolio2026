import React from "react";
import useEducationData from "./EducationData";

const Strength = () => {
  const { strengthsList } = useEducationData();

  return (
    <div
      className="
      bg-linear-to-tr
      from-indigo-400/20
      via-amber-100/20
      to-purple-800/20
      backdrop-blur-xl
      rounded-4xl
      shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]
      mx-auto overflow-hidden
      p-[1.2px] md:p-[1.5px]
  "
    >
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
          text-(--secondary)
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
              <span className="w-2 h-2 mt-2 sm:mt-0 rounded-full bg-(--primary) shrink-0"></span>
              <span
                className="
                text-sm sm:text-base
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
          italic
          border-t
          pt-3 sm:pt-4
        "
        >
          “Learning builds a foundation no one can take away.”
        </p>
      </div>
    </div>
  );
};

export default Strength;
