import React from "react";
import classes from "./NotJoinedGroupCard.module.css";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const JoinButton = withStyles({
  root: {
    width: "100%",
    height: "30px",
    fontSize: "14px",
    backgroundColor: "rgba(0,0,0,0)",
    boxShadow: "none",
    fontWeight: "bold",
    "&:hover": {
      boxShadow: "none",
      backgroundColor: "#2c225508",
    },
    textTransform: "none",
  },
})(Button);

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
        <div className={classes.JoinButton}>
          <JoinButton
            variant="contained"
            size="small"
            onClick={(e) => {
              props.handleJoinGroup(id);
            }}
          >
            Join
          </JoinButton>
        </div>
      </div>
    </React.Fragment>
  );
};

export default NotJoinedGroupCard;
