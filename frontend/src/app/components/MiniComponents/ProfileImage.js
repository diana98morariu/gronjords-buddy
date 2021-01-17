import React from "react";
import classes from "./ProfileImg.module.css";
import { useStoreValue } from "react-context-hook";

export let size;

const ProfileImg = (props) => {
  const user_data = useStoreValue("user");
  return (
    <div className={classes.ImageContainer}>
      <img
        src={
          "https://gronjords-buddy.s3.eu-north-1.amazonaws.com/" +
          user_data.image
        }
        className={classes.Image}
        alt={user_data.image}
      />
    </div>
  );
};

export default ProfileImg;
