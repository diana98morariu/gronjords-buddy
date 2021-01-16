import React, { useState, useEffect } from "react";
import classes from "./NotJoinedGroupCard.module.css";

const NotJoinedGroupCard = (props) => {
  const { group_name } = props.notJoinedGroup;

  return <div className={classes.NotJoinedGroupContainer}>{group_name}</div>;
};

export default NotJoinedGroupCard;
