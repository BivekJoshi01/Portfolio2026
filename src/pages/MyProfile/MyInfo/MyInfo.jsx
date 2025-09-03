import React from "react";
import TypeWriter from "../../../components/TypeWriter/TypeWriter";
import NamePlate from "../../../components/NamePlate/NamePlate";

const MyInfo = () => {
  return (
    <div className="flex flex-col gap-5.5">
      <div className="bg-amber-300 max-w-fit px-4 rounded-2xl">
        Welcome to my universe
      </div>
      <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
        Hello<span className="text-indigo-500">.</span>
      </h1>
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">I'm</h2>
      <NamePlate />
      <div className="bg-gray-400 text-white px-5 py-2 rounded-xl shadow-lg text-lg md:text-xl font-semibold text-center max-w-fit min-w-35">
        <TypeWriter
          text={["Frontend Developer", "Smooth Transition", "Happy coding!"]}
          typingSpeed={75}
          pauseDuration={1500}
          showCursor={true}
          cursorCharacter=""
        />
      </div>
      <div className="mt-5">
        <div>React Enthusiast ⚛️ | Next.js Explorer</div>
        <div>
          🚀 Leading scalable UI development & shaping modern web experiences
          with clean, efficient code 💻✨
        </div>
      </div>
    </div>
  );
};

export default MyInfo;
