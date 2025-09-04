import React from 'react'

const VsFooter = () => {
  return (
    <div className='flex justify-between h-full items-center'>
      <div className='flex gap-5'>
        <div style={{backgroundColor:"#2DA5FA"}} className='w-10'>,,</div>
        <div>main*</div>
        <div>Lunchpad</div>
        <div>Live Share</div>
        <div>Git Graph</div>
      </div>
       <div className='flex gap-5 mr-10'>
        <div>Ln 14,Col 23</div>
        <div>Spaces: 2</div>
        <div>UTF-8</div>
        <div>JavaScript JSX</div>
        <div>Prettier</div>
       </div>
    </div>
  )
}

export default VsFooter