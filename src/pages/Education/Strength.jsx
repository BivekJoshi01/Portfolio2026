import React from "react";
import { strengthsList } from "./EducationData";

const Strength = () => {
  return (
    <div className="p-8 space-y-2">
      <h3 className="text-2xl font-semibold">Core Strengths</h3>

      <ul className="space-y-4">
        {strengthsList?.map((skill, i) => (
          <li key={i} className="flex items-center gap-4">
            <span className="w-2 h-2 rounded-full bg-slate-800"></span>
            <span className="text-slate-700">{skill}</span>
          </li>
        ))}
      </ul>

      <p className="text-sm text-slate-500 italic border-t pt-4">
        “Learning builds a foundation no one can take away.”
      </p>
    </div>
  );
};

export default Strength;
