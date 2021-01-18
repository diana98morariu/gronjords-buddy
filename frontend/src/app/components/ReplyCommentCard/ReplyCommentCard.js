import React, { useState, useEffect } from "react";
import classes from "./ReplyCommentCard.module.css";
import Button from "@material-ui/core/Button";
import { useStoreValue } from "react-context-hook";
import { withStyles } from "@material-ui/core/styles";
import toastr from "toastr";
import { addCommentToPost } from "./../../helpers/posts";

const ReplyButton = withStyles({
  root: {
    width: "20%",
    height: "2rem",
    borderTopLeftRadius: "0",
    borderBottomLeftRadius: "0",
    borderTopRightRadius: "8px",
    borderBottomRightRadius: "8px",
    fontWeight: "bold",
    fontSize: "15px",
    backgroundColor: "#00E17B",
    boxShadow: "none",
    "&:hover": {
      boxShadow: "none",
      backgroundColor: "#00C76D",
    },
    "&:focused": {
      boxShadow: "none",
      backgroundColor: "black",
    },
    "&:active": {
      boxShadow: "none",
      transition: "0.1s",
      color: "pink",
    },
    "& .MuiButton-label": {
      color: "white",
    },
    textTransform: "none",
  },
})(Button);

const ReplyCommentCard = (props) => {
  const user_data = useStoreValue("user");
  const post_id = props.post_id;
  // const [content, setContent] = useState("");

  // useEffect(() => {
  //   if (post_id) {
  //   }
  // });

  return (
    <React.Fragment>
      <div className={classes.CommentContainer}>
        <div className={classes.ImageContainer}>
          <img
            src={
              "https://gronjords-buddy.s3.eu-north-1.amazonaws.com/" +
              user_data.image
            }
            className={classes.Image}
            alt={user_data.image}
          />
        </div>
        <div className={classes.inputCommentButtonPost}>
          <input
            className={classes.inputCommentPost}
            type="text"
            placeholder={"Comment"}
            value={props.newContent}
            onChange={(e) => props.setNewContent(e.target.value)}
          />
          <ReplyButton
            variant="contained"
            onClick={() => {
              props.submitComment(post_id, props.newContent);
            }}
          >
            Relpy
          </ReplyButton>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ReplyCommentCard;
