import React, { useState, useEffect } from "react";
import classes from "./CommentCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faComment } from "@fortawesome/free-solid-svg-icons";

import moment from "moment";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useStoreValue } from "react-context-hook";
import { withStyles } from "@material-ui/core/styles";

const CommentCard = (props) => {
  const user_data = useStoreValue("user");

  return (
    <React.Fragment>
      <div className={classes.CommentContainer}>
        <div className={classes.ImageContainer}>
          <img
            src={
              "https://gronjords-buddy.s3.eu-north-1.amazonaws.com/" +
              props.comment.image
            }
            className={classes.Image}
            alt={user_data.image}
          />
        </div>
        <div className={classes.ContentComment}>{props.comment.content}</div>
      </div>
    </React.Fragment>
  );
};

export default CommentCard;
