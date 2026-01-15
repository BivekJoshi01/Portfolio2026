import React from "react";
import MyAboutInfo from "./MyAboutInfo";
import ProfileCard from "./ProfileCard";
import AboutLine from "../../assets/AboutLine.svg";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
  FaTwitter,
} from "react-icons/fa";

const socials = [
  { name: "facebook", icon: <FaFacebookF />, link: "https://facebook.com" },
  { name: "instagram", icon: <FaInstagram />, link: "https://instagram.com" },
  { name: "linkedin", icon: <FaLinkedinIn />, link: "https://linkedin.com" },
  { name: "github", icon: <FaGithub />, link: "https://github.com" },
  { name: "twitter", icon: <FaTwitter />, link: "https://twitter.com" },
].slice(0, 5);
const socialColors = {
  facebook: { main: "#1877F2", light: "#E8F0FE" },
  instagram: { main: "#E4405F", light: "#FDEBF0" },
  linkedin: { main: "#0A66C2", light: "#DCEEFB" },
  github: { main: "#171515", light: "#EAEAEA" },
  twitter: { main: "#1DA1F2", light: "#E5F4FD" },
};

const SocialIcons = () => {
  return (
    <>
      {socials.map((item, i) => {
        const colors = socialColors[item.name];

        // First 4 float on sides
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

        // Last 2 pinned at bottom
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
    </>
  );
};

const AboutMe = () => {
  return (
    <section className="relative overflow-hidden py-28">
      {/* Background grid feel */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000010_1px,transparent_1px),linear-gradient(to_bottom,#00000010_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />

      <div className="relative max-w-7xl mx-auto grid md:grid-cols-2 gap-24 items-center px-6">
        {/* LEFT — PROFILE CARD */}
        <div className="relative flex justify-center">
          {/* Pulse Gradient Border */}
          <div className="relative z-20 p-[2px] rounded-[32px] bg-gradient-to-tr from-indigo-400 via-amber-100 to-purple-800/50">
            <ProfileCard />
          </div>

          {/* Floating icons */}
          <SocialIcons />
        </div>
        <div className="absolute top-0 left-0 z-10 w-[567px] h-[600px] pointer-events-none">
          <img src={AboutLine} alt="" className="w-full h-full" />
        </div>

        {/* RIGHT — CONTENT */}
        <MyAboutInfo />
      </div>

      {/* Animations */}
      <style>
        {`
        @keyframes borderPulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        .animate-borderPulse {
          animation: borderPulse 3s ease-in-out infinite;
        }

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
