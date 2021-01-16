import React from "react";
import classes from "./SmallProfile.module.css";
import { useStoreValue } from "react-context-hook";
import ProfileImg from "../MiniComponents/ProfileImage";
const SmallProfile = (props) => {
  const user_data = useStoreValue("user");
  return (
    <div
      className={classes.SmallProfileContainer}
      onClick={() => props.click(user_data.id)}
    >
      <div className={classes.ProfileLink}>
        <ProfileImg />
        <div className={classes.infoContainer}>
          <div className={classes.Name}>
            {user_data
              ? user_data.first_name + " " + user_data.last_name
              : "Unknown name"}{" "}
          </div>
          <div className={classes.Room}>
            Room {user_data ? user_data.room : "unknown"}{" "}
          </div>
        </div>
      </div>
      <div className={classes.Button}>View my posts</div>
    </div>
  );
};

export default SmallProfile;
