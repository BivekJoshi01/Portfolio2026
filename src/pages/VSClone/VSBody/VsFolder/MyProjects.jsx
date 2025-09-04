import React from 'react'
import VSBodyHelper from '../VSBodyHelper'

const MyProjects = () => {
  return (
      <VSBodyHelper
        height={460}
        initialValue={`import React from "react";

const MyProjects = () => {
  return <h1>Hello VS-like editor</h1>;
}

export default MyProjects
`}
        onChange={(val) => console.log("code:", val)}
      />
  )
}

export default MyProjects