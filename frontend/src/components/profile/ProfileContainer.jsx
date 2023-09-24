import React from "react";
import Profile from "./Profile";
import MatchedList from "./MatchedList";

const ProfileContainer = () => {
  return (
    <>
      <Profile />
      {/* <ProfilePhotos /> */}
      <MatchedList />
    </>
  );
};

export default ProfileContainer;
