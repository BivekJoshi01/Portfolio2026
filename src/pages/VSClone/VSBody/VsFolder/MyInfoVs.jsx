import React from 'react'
import VSBodyHelper from '../VSBodyHelper'

const MyInfoVs = () => {
  return (
      <VSBodyHelper
        height={460}
        initialValue={`import React from "react";

const About_Me = () => {
  return (
    <>
      <div>
        <h1> Hello, I am Bivek Joshi </h1>
        <p> Frontend Developer </p>
        <h1> Hello, I am Bivek Joshi</h1>
      </div>
    </>
  );
}

export default About_Me
`}
        onChange={(val) => console.log("code:", val)}
      />
  )
}

export default MyInfoVs