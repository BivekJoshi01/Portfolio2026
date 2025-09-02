import React from "react";
import MyProfile from "./MyProfile/MyProfile";
import AboutMe from "./AboutMe/AboutMe";
import TechnologyUsed from "./TechnologyUsed/TechnologyUsed";

const LandLayout = () => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        maxWidth: "920px",
        gap: "6rem",
      }}
    >
      <div style={{ width: "100%" }}>
        <MyProfile />
      </div>
      <div style={{ width: "100%" }}>
        <AboutMe />
      </div>
      <div style={{ width: "400px", height: "400px" }}>
        <TechnologyUsed />
      </div>
    </div>
  );
};

export default LandLayout;
