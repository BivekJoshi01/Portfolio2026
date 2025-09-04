import React from 'react'
import VSBodyHelper from '../VSBodyHelper'

const MyExperience = () => {
  return (
       <VSBodyHelper
        height={460}
        initialValue={`import React from "react";

export default function App() {
  return <h1>Hello VS-like editor</h1>;
}
`}
        onChange={(val) => console.log("code:", val)}
      />
  )
}

export default MyExperience