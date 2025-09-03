import React from "react";
import MyInfo from "./MyInfo/MyInfo";
import MyDetailInfo from "./MyDetailInfo/MyDetailInfo";

const MyProfile = () => {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        alignItems:'center'
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <MyInfo />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <MyDetailInfo />
      </div>
    </div>
  );
};

export default MyProfile;
