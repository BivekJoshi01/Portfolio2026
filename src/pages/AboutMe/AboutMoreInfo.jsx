import React from "react";
import { useTranslation } from "react-i18next";
import TechnicalSkillsDetail from "./TechnicalSkillsDetail";

const AboutMoreInfo = () => {
  const { t } = useTranslation();

  return (
    <div>
      <div className="my-6">
        <h2
          className="
          text-3xl sm:text-4xl md:text-5xl
          font-extrabold leading-tight
          mb-5 md:mb-6
          bg-(--secondary) bg-clip-text text-transparent
        "
        >
          Summary
        </h2>
        <p
          className="
          text-base sm:text-lg
          leading-relaxed
          mb-6 md:mb-8
        "
        >
          I am a Technology Specialist with a passion for frontend development.
          I have a Bachelor degree in Information Management (BIM) and over 2
          years of experience in building responsive and user friendly websites.
          I have good skills in React JS, API integration, UI design, and Figma.
          I enjoy learning new technologies and solving challenging problems.
        </p>
      </div>
      <div className="my-6">
        <h2
          className="
          text-3xl sm:text-4xl md:text-5xl
          font-extrabold leading-tight
          mb-5 md:mb-6
        "
        >
          Carrier{" "}
          <span className="bg-(--secondary) bg-clip-text text-transparent">
            Objective
          </span>
        </h2>
        <p
          className="
          text-base sm:text-lg
          leading-relaxed
          mb-6 md:mb-8
        "
        >
          To be a part of the firm where I can devote myself fully and joyfully
          give best of my talent and skill to become its strong assets. To
          secure further learning with the IT Domain, where I can utilize my
          skills and training background to the maximum.
        </p>
      </div>
      <div className="my-6">
        <h2
          className="
          text-3xl sm:text-4xl md:text-5xl
          font-extrabold leading-tight
          mb-5 md:mb-6
        "
        >
          Technical{" "}
          <span className="bg-(--secondary) bg-clip-text text-transparent">
            Skills
          </span>
        </h2>
        <TechnicalSkillsDetail />
      </div>
    </div>
  );
};

export default AboutMoreInfo;
