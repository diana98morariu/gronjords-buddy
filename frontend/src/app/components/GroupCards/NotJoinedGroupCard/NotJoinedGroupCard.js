import React from "react";
import classes from "./NotJoinedGroupCard.module.css";

const NotJoinedGroupCard = (props) => {
  const { id, group_name, image } = props.notJoinedGroup;

  return (
    <React.Fragment>
      <div className={classes.NotJoinedGroupContainer}>
        <div className={classes.NotJoinedGroupImage}>
          <img
            src={"https://gronjords-buddy.s3.eu-north-1.amazonaws.com/" + image}
            className={classes.GroupImage}
            alt={image}
          />
        </div>
        <div className={classes.NotJoinedGroupName}>{group_name}</div>
        <div
          className={classes.JoinButton}
          onClick={(e) => {
            props.handleJoinGroup(id);
          }}
        >
          Join
        </div>
      </div>
    </React.Fragment>
  );
};

export default NotJoinedGroupCard;
