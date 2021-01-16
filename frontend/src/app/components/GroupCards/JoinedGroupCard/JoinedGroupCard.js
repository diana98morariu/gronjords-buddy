import React, { useState, useEffect } from "react";
import classes from "./JoinedGroupCard.module.css";

const JoinedGroupCard = (props) => {
  const { group_name } = props.joinedGroup;

  return (
    <div className={classes.JoinedGroupContainer}>
      <div className={classes.JoinedGroupImage}></div>
      <div className={classes.JoinedGroupName}>{group_name}</div>
    </div>
  );
};

export default JoinedGroupCard;
