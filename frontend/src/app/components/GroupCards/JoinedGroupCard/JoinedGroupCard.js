import React from "react";
import classes from "./JoinedGroupCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";

const JoinedGroupCard = (props) => {
  const { id, group_name, image } = props.joinedGroup;
  const history = useHistory();

  let leaveButton;

  if (id !== 1) {
    if (id !== 2) {
      if (!group_name.startsWith("Floor")) {
        if (!group_name.startsWith("Kitchen")) {
          leaveButton = (
            <div
              className={classes.LeaveButton}
              onClick={(e) => {
                props.handleLeaveGroup(id);
              }}
            >
              <FontAwesomeIcon icon={faTimes} />
            </div>
          );
        }
      }
    }
  }

  return (
    <div className={classes.GroupContainer}>
      <div
        className={classes.JoinedGroupContainer}
        onClick={() => {
          history.push(`/groups/${id}`);
        }}
      >
        <div className={classes.JoinedGroupImage}>
          <img
            src={"https://gronjords-buddy.s3.eu-north-1.amazonaws.com/" + image}
            className={classes.GroupImage}
            alt={image}
          />
        </div>
        <div className={classes.JoinedGroupName}>{group_name}</div>
      </div>
      {id ? leaveButton : ""}
    </div>
  );
};

export default JoinedGroupCard;
