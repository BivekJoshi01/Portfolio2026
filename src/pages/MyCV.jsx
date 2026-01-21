import React from "react";
import MYCV from "./Bivek_CV.pdf";

const MyCV = () => {
  return (
    <div className="w-screen h-screen">
      <iframe
        src={MYCV}
        title="My CV"
        className="w-full h-full"
        style={{ border: "none" }}
      ></iframe>
    </div>
  );
};

export default MyCV;
