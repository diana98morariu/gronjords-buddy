import React, { useState, useEffect } from "react";
import classes from "./JoinedGroupCard.module.css";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const LeaveButton = withStyles({
  root: {
    width: "100%",
    height: "30px",
    fontSize: "14px",
    backgroundColor: "#d3d3d3",
    boxShadow: "none",
    "&:hover": {
      boxShadow: "none",
      backgroundColor: "rgba(0,0,0,0)",
    },
    textTransform: "none",
  },
})(Button);

const JoinedGroupCard = (props) => {
  const { id, group_name, image } = props.joinedGroup;

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

      <div className={classes.LeaveButton}>
        <LeaveButton
          variant="contained"
          size="small"
          onClick={(e) => {
            props.handleLeaveGroup(id);
          }}
        >
          Leave
        </LeaveButton>
      </div>
    </div>
  );
};

export default JoinedGroupCard;
