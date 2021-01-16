import React, { useState, useEffect } from "react";
import classes from "./JoinedGroupCard.module.css";

const JoinedGroupCard = (props) => {
  const { group_name } = props.joinedGroup;

  return <div className={classes.JoinedGroupContainer}>{group_name}</div>;
};

export default JoinedGroupCard;
