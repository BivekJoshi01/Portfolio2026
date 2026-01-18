import React from "react";
import AIMe from "../../assets/Me/AIMe.jpg";
import RealMe from "../../assets/Me/RealMe.png";

const ProfileCard = () => {
  return (
    <div
      className="
        relative
        w-full max-w-[340px]
        sm:max-w-[360px]
        md:w-[380px]
        rounded-[26px] md:rounded-[30px]
        p-[1.2px] md:p-[1.5px]
        mx-auto
      "
    >
      {/* Glass body */}
      <div
        className="
          relative
          rounded-[24px] md:rounded-[28px]
          bg-white/40 backdrop-blur-2xl
          px-5 sm:px-6 md:px-8
          py-7 sm:py-8 md:py-10
          overflow-hidden
        "
      >
        {/* Header */}
        <div className="flex items-center gap-2 text-xs text-gray-600 mb-5 md:mb-6">
          <span className="w-2 h-2 rounded-full bg-gray-400" />
          Profile
        </div>

        {/* Avatar */}
        <div
          className="
            relative
            w-28 h-28
            sm:w-32 sm:h-32
            md:w-40 md:h-40
            mx-auto mb-5 md:mb-6
            flex items-center justify-center
          "
        >
          {/* Glow */}
          <div
            className="
              absolute inset-0 rounded-full
              bg-gradient-to-br from-indigo-400 to-purple-400
              blur-xl md:blur-2xl
              opacity-30
            "
          />

          {/* Dashed ring */}
          <div
            className="
              absolute inset-0 rounded-full
              border border-dashed border-white/90
            "
            style={{
              borderWidth: "2.5px",
              borderDasharray: "4 12",
            }}
          />

          {/* Avatar */}
          <img
            src={RealMe}
            alt="Profile"
            className="
              relative
              w-24 h-24
              sm:w-28 sm:h-28
              md:w-36 md:h-36
              rounded-full object-cover bg-white
              border-4 border-white
              shadow-xl
            "
          />
        </div>

        {/* Name */}
        <h3
          className="
            text-center
            text-base sm:text-lg
            font-semibold text-gray-900
            tracking-wide
          "
        >
          Bivek Prasad Joshi
        </h3>

        <p
          className="
            text-center
            text-xs sm:text-sm
            text-gray-600
            mb-5 md:mb-6
          "
        >
          Frontend Developer
        </p>

        {/* Skill pills */}
        <div className="flex justify-center gap-2 sm:gap-3 flex-wrap">
          {["React", "UI / UX", "Performance"].map((skill) => (
            <span
              key={skill}
              className="
                px-3 sm:px-4
                py-1 sm:py-1.5
                text-[11px] sm:text-xs
                rounded-full
                bg-white/70 backdrop-blur-md
                border border-white/60
                shadow-sm
                text-gray-700
              "
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
