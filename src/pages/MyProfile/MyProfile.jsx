import React from 'react'
import MyInfo from './MyInfo/MyInfo'
import MyDetailInfo from './MyDetailInfo/MyDetailInfo'

const MyProfile = () => {
  return (
    <div style={{display:'flex',justifyContent:'space-between'}}>
        <MyInfo/>
        <MyDetailInfo/>
    </div>
  )
}

export default MyProfile