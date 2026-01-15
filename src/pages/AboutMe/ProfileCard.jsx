import React from "react";
import AIMe from "../../assets/Me/AIMe.jpg";
import RealMe from "../../assets/Me/RealMe.png";

const ProfileCard = () => {
  return (
    <div className="relative w-[340px] md:w-[380px] rounded-[30px] p-[1.5px]">
      {/* Glass body */}
      <div className="relative rounded-[28px] bg-white/40 backdrop-blur-2xl px-8 py-10 overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-2 text-xs text-gray-600 mb-6 relative">
          <span className="w-2 h-2 rounded-full bg-gray-400" />
          Profile
        </div>

        {/* Avatar */}
        <div className="relative w-40 h-40 mx-auto mb-6 flex items-center justify-center">
          {/* Glow */}
          <div
            className="absolute inset-0 rounded-full
    bg-gradient-to-br from-indigo-400 to-purple-400
    blur-2xl opacity-30"
          />

          {/* Dashed ring */}
          <div
            className="absolute inset-0 rounded-full
    border border-dashed border-white/90"
            style={{
              borderWidth: "2.5px",
              borderDasharray: "4 12", // manual dash spacing
            }}
          />

          {/* Avatar */}
          <img
            src={RealMe}
            alt="Profile"
            className="relative w-36 h-36 rounded-full
      object-cover bg-white
      border-4 border-white shadow-xl"
          />
        </div>

        {/* Name */}
        <h3 className="text-center text-lg font-semibold text-gray-900 tracking-wide">
          Bivek Prasad Joshi
        </h3>
        <p className="text-center text-sm text-gray-600 mb-6">
          Frontend Developer
        </p>

        {/* Skill pills */}
        <div className="flex justify-center gap-3 flex-wrap">
          {["React", "UI / UX", "Performance"].map((skill) => (
            <span
              key={skill}
              className="px-4 py-1.5 text-xs rounded-full bg-white/70 backdrop-blur-md border border-white/60 shadow-sm text-gray-700"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
