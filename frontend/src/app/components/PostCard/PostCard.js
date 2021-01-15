import React, { useEffect, useState } from "react";
import classes from "./PostCard.module.css";
import ProfileImg from "../MiniComponents/ProfileImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import ClipLoader from "react-spinners/ClipLoader";
import moment from "moment";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useStoreValue } from "react-context-hook";

const PostCard = (props) => {
  const user_data = useStoreValue("user");
  const {
    id,
    title,
    content,
    created_at,
    user_id,
    first_name,
    last_name,
  } = props.post;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (user_data === undefined)
    return (
      <div className="loading">
        <ClipLoader size={50} color={"#e83251"} />
      </div>
    );

  let editButton;
  if (user_data && user_data.id === user_id) {
    editButton = (
      <React.Fragment>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <img
            className={classes.editDelete}
            src="https://static.xx.fbcdn.net/rsrc.php/v3/yn/r/oVV-iPd4q_P.png"
            alt=""
            height="16"
            width="16"
          />{" "}
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Edit</MenuItem>
          <MenuItem
            onClick={(e) => {
              props.delete(id);
            }}
          >
            Delete
          </MenuItem>
        </Menu>
      </React.Fragment>
    );
  }

  return (
    <div className={classes.PostContainer}>
      <div className={classes.topContainer}>
        <ProfileImg />
        <div className="nameContainer">
          <div className={classes.name}>{first_name + " " + last_name}</div>

          <div className={classes.time}>
            {moment(created_at).format("HH:mm A")}
          </div>
        </div>
        <div className={classes.editDelete}>{editButton}</div>
      </div>

      <div className={classes.textContainer}>
        <div className={classes.title}>{title}</div>
        {content}
      </div>
      <div className={classes.likes}>
        <FontAwesomeIcon icon={faThumbsUp} className={classes.ThumbsUp} />
        <span className={classes.likesNumber}>3</span>
      </div>

      <div className={classes.buttonsContainer}>
        <div className={classes.button}>
          <img
            draggable="false"
            height="18"
            width="18"
            alt="likeIcon"
            src="https://static.xx.fbcdn.net/rsrc.php/v3/ym/r/HayyIjBF1VN.png"
          />
          Like
        </div>
        <div className={classes.button + " " + classes.comm}>Comment</div>
      </div>
    </div>
  );
};

export default PostCard;
