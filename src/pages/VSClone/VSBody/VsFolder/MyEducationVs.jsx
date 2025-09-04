import React from "react";
import VSBodyHelper from "../VSBodyHelper";

const MyEducationVs = () => {
  return (
    <VSBodyHelper
      height={460}
      initialValue={`import React from "react";
const My_Education = () => {
  const EDU_LIST=[
    {
     level:"Under Graduate",
     institude: "Shankerdev Campus",
     passed_year:"2025",
    },
    {
     level:"Under Graduate",
     institude: "Shankerdev Campus",
     passed_year:"2025",
    },
  ]
  return (
      <div>
        <h1> Hello, I am Bivek Joshi </h1>
        <p> Frontend Developer </p>
        <h1> Hello, I am Bivek Joshi</h1>
      </div>
  );
}

export default My_Education
`}
      onChange={(val) => console.log("code:", val)}
    />
  );
};

export default MyEducationVs;
