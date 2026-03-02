import React from "react";
import RealMe from "../../assets/Me/RealMe.png";
import { useTranslation } from "react-i18next";

const ProfileCard = () => {
  const { t } = useTranslation();
  return (
    <div
      style={{ width: "100%", height: "auto", position: "relative" }}
      className="
      bg-linear-to-tr
      from-indigo-400/20
      via-amber-100/20
      to-purple-800/20
      backdrop-blur-xl
      rounded-4xl
      shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]
      w-full max-w-[340px] sm:max-w-[360px] md:w-[380px]
      mx-auto overflow-hidden
      p-[1.2px] md:p-[1.5px]
  "
    >
      <div
        style={{
          position: "absolute",
          top: "-50%",
          left: "-25%",
          width: "150%",
          height: "200%",
          background:
            "linear-gradient(115deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.05) 60%, rgba(255,255,255,0.3) 100%)",
          transform: "rotate(25deg)",
          pointerEvents: "none",
          filter: "blur(40px)",
          animation: "shineAnimation 5s ease-in-out infinite",
        }}
      />
      {/* Glass body */}
      <div
        className="
          relative
          px-5 sm:px-6 md:px-8
          py-7 sm:py-8 md:py-10
          overflow-hidden
        "
      >
        {/* Header */}
        <div className="flex items-center gap-2 text-xs mb-5 md:mb-6">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-600"></span>
          </span>

          {t("profile")}
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
              bg-linear-to-br from-indigo-400 to-purple-400
              blur-xl md:blur-2xl
              opacity-30
            "
          />

          {/* Dashed ring */}
          <div
            className="
              absolute inset-0 rounded-full
              border border-dashed border-(--secondary)/90
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
              rounded-full object-cover bg-(--primary)
              border-4 border-(--primary)
              shadow-xl
            "
          />
        </div>

        {/* Name */}
        <h3
          className="
            text-center
            text-base sm:text-lg
            font-semibold
            tracking-wide
          "
        >
          {t("myFullName")}
        </h3>

        <p
          className="
            text-center
            text-xs sm:text-sm
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
      <style>{`
                    @keyframes shineAnimation {
                      0% {
                        transform: rotate(25deg) translateX(-100%);
                        opacity: 0.3;
                      }
                      50% {
                        transform: rotate(25deg) translateX(100%);
                        opacity: 0.6;
                      }
                      100% {
                        transform: rotate(25deg) translateX(-100%);
                        opacity: 0.3;
                      }
                    }
              `}</style>
    </div>
  );
};

export default ProfileCard;
