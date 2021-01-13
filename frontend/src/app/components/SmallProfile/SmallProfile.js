import React from "react";
import classes from "./SmallProfile.module.css";
import { useStoreValue } from "react-context-hook";

const SmallProfile = () => {
  const user_data = useStoreValue("user");
  return (
    <div className={classes.SmallProfileContainer}>
      <div className={classes.ProfileLink}>
        <div className={classes.Icon} />
        <div className={classes.infoContainer}>
          <div className={classes.Name}>
            {/* {user_data.first_name + " " + user_data.last_name}{" "} */}
          </div>
          <div className={classes.Room}>Room 3302</div>
        </div>
      </div>
      <div className={classes.Button}>View my posts</div>
    </div>
  );
};

export default SmallProfile;
