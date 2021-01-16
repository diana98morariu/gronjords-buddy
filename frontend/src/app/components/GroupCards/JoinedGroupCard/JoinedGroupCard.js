import React, { useState, useEffect } from "react";
import classes from "./JoinedGroupCard.module.css";

const JoinedGroupCard = (props) => {
  const { group_name, image } = props.joinedGroup;

  return (
    <div className={classes.JoinedGroupContainer}>
      <div className={classes.JoinedGroupImage}>
        <img
          src={"https://gronjords-buddy.s3.eu-north-1.amazonaws.com/" + image}
          className={classes.GroupImage}
          alt={image}
        />
      </div>
      <div className={classes.JoinedGroupName}>{group_name}</div>
    </div>
  );
};

export default JoinedGroupCard;
