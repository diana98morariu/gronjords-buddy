import React from "react";
import classes from "./JoinedGroupCard.module.css";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
const LeaveButton = withStyles({
  root: {
    width: "100%",
    position: "absolute",
    top: "0",
    right: "0",
    fontSize: "14px",
    backgroundColor: "rgba(0,0,0,0)",
    boxShadow: "none",
    color: "#65676b",
    "&:hover": {
      boxShadow: "none",
      backgroundColor: "rgba(0,0,0,0)",
      color: "#000",
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
          <FontAwesomeIcon icon={faTimes} />
        </LeaveButton>
      </div>
    </div>
  );
};

export default JoinedGroupCard;
