import React from "react";
import classes from "./SmallProfile.module.css";

const SmallProfile = () => {
  return (
    <div className={classes.SmallProfileContainer}>
      <div className={classes.ProfileLink}>
        <div className={classes.Icon} />
        <div className={classes.infoContainer}>
          <div className={classes.Name}>Andreea Steriu</div>
          <div className={classes.Room}>Room 3302</div>
        </div>
      </div>
      <div className={classes.Button}>View my posts</div>
    </div>
  );
};

export default SmallProfile;
