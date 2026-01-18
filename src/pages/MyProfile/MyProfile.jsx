import React from "react";
import MyInfo from "./MyInfo/MyInfo";
import MyDetailInfo from "./MyDetailInfo/MyDetailInfo";

const MyProfile = () => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-8 w-full">
      {/* Left — always visible */}
      <div className="w-full md:flex-1">
        <MyInfo />
      </div>

      {/* Right — hidden on mobile */}
      <div className="hidden md:block w-full md:flex-1">
        <MyDetailInfo />
      </div>
    </div>
  );
};

export default MyProfile;
