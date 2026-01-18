import React from "react";
import MyAboutInfo from "./MyAboutInfo";
import ProfileCard from "./ProfileCard";
import AboutLine from "../../assets/AboutLine.svg";
import { socialColors, socials } from "./MeInfo";

const SocialIcons = () => {
  return (
    <>
      {/* ================= DESKTOP FLOATING ICONS ================= */}
      <div className="hidden md:block">
        {socials?.map((item, i) => {
          const colors = socialColors[item.name];

          if (i < 4) {
            return (
              <a
                key={i}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute text-3xl opacity-90 hover:opacity-100 hover:scale-110 transition-all rounded-full flex items-center justify-center animate-float"
                style={{
                  top: `${20 + i * 18}%`,
                  left: i % 2 === 0 ? "-22px" : "calc(100% - 50px)",
                  width: "50px",
                  height: "50px",
                  backgroundColor: colors.light,
                  border: `2px solid ${colors.main}`,
                  color: colors.main,
                }}
              >
                {item.icon}
              </a>
            );
          }

          return (
            <a
              key={i}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute text-3xl opacity-90 hover:opacity-100 hover:scale-110 transition-all rounded-full flex items-center justify-center animate-float"
              style={{
                bottom: "-80px",
                left: "200px",
                width: "50px",
                height: "50px",
                backgroundColor: colors.light,
                border: `2px solid ${colors.main}`,
                color: colors.main,
              }}
            >
              {item.icon}
            </a>
          );
        })}
      </div>

      {/* ================= MOBILE FRONT ICON STRIP ================= */}
      <div
        className="
          md:hidden
          absolute -bottom-6 left-1/2 -translate-x-1/2
          z-30
          flex gap-3
          bg-white/70 backdrop-blur-xl
          px-4 py-2
          rounded-full
          shadow-lg
        "
      >
        {socials?.slice(0, 4).map((item, i) => {
          const colors = socialColors[item.name];
          return (
            <a
              key={i}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="
                w-9 h-9
                text-base
                rounded-full
                flex items-center justify-center
                transition-transform
                hover:scale-110
              "
              style={{
                backgroundColor: colors.light,
                border: `1.5px solid ${colors.main}`,
                color: colors.main,
              }}
            >
              {item.icon}
            </a>
          );
        })}
      </div>
    </>
  );
};

const AboutMe = () => {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000010_1px,transparent_1px),linear-gradient(to_bottom,#00000010_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />

      <div
        className="
          relative max-w-7xl mx-auto
          grid md:grid-cols-2
          gap-16 md:gap-24
          items-center
          px-5 sm:px-6
        "
      >
        {/* LEFT — PROFILE CARD */}
        <div className="relative flex justify-center">
          <div className="relative z-20 p-[2px] rounded-[32px] bg-gradient-to-tr from-indigo-400 via-amber-100 to-purple-800/50">
            <ProfileCard />
          </div>

          {/* Social Icons */}
          <SocialIcons />
        </div>

        {/* Background line (desktop only) */}
        <div className="absolute top-0 left-0 z-10 w-[567px] h-[600px] pointer-events-none hidden md:block">
          <img src={AboutLine} alt="" className="w-full h-full" />
        </div>

        {/* RIGHT — CONTENT */}
        <div className="relative z-20">
          <MyAboutInfo />
        </div>
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0); }
            50% { transform: translateY(-12px); }
            100% { transform: translateY(0); }
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
        `}
      </style>
    </section>
  );
};

export default AboutMe;
