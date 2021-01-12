import React from "react";
import classes from "./PostCard.module.css";
import ProfileImg from "../MiniComponents/ProfileImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
const PostCard = (props) => {
  return (
    <div className={classes.PostContainer}>
      <div className={classes.topContainer}>
        <ProfileImg />
        <div class="nameContainer">
          <div class="name" onclick={() => {}}>
            Andreea Steriu
          </div>
          <div className={classes.time}>{moment().format("HH:mm A")}</div>
        </div>

        <div>
          <img
            className={classes.editDelete}
            src="https://static.xx.fbcdn.net/rsrc.php/v3/yn/r/oVV-iPd4q_P.png"
            alt=""
            height="16"
            width="16"
          />
        </div>

        {/* <div class="editPosition">
          <EditDelete showDialog={showDialog} />
        </div> */}
      </div>

      <div className={classes.textContainer}>
        <div className={classes.title}>Title</div>
        content
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
