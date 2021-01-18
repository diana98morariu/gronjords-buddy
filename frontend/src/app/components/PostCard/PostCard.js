import React, { useState, useEffect } from "react";
import classes from "./PostCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import ClipLoader from "react-spinners/ClipLoader";
import moment from "moment";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useStoreValue } from "react-context-hook";
import { withStyles } from "@material-ui/core/styles";
import {
  getPostLikes,
  likePost,
  dislikePost,
  checkLike,
} from "./../../helpers/posts";
import toastr from "toastr";

const EditDeleteButton = withStyles({
  root: {
    width: "100%",
    position: "absolute",
    top: "0",
    right: "0",
    fontSize: "14px",
    boxShadow: "none",
    color: "#65676b",
    minWidth: "2em",
    "&:hover": {
      boxShadow: "none",
      backgroundColor: "#2c225508",
      backgroundSize: "100%",
      color: "#000",
    },
    textTransform: "none",
  },
})(Button);

const PostCard = (props) => {
  const user_data = useStoreValue("user");
  const [likes, setLikes] = useState(undefined);
  const [numberLikes, setNumberLikes] = useState(undefined);
  const [liked, setLiked] = useState(false);

  const {
    id,
    title,
    content,
    created_at,
    first_name,
    last_name,
    image,
    images,
  } = props.post;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    const fetchData = async () => {
      if (user_data) {
        if (id) {
          const fetchedPostLikes = await getPostLikes(id);
          const response = await checkLike(id);
          console.log(response);
          if (response.status !== 0) {
            setLiked(true);
          }
          setLikes(fetchedPostLikes);
          setNumberLikes(fetchedPostLikes.length);
        }
      }
    };

    if (user_data) fetchData();
  }, [id]);

  const addLike = async () => {
    const response = await likePost(id);
    if (response.status === 1) {
      const newLikes = [...likes];
      newLikes.unshift(response.data);
      setLikes(newLikes);
      setNumberLikes(newLikes.length);
      setLiked(true);

      toastr.success("Post liked successfully!");
    }
  };

  const removeLike = async () => {
    const response = await dislikePost(id);
    if (response.status === 1) {
      const newLikes = [...likes];
      const indexDeleted = newLikes.findIndex((newLike) => newLike.id === id);
      newLikes.splice(indexDeleted, 1);
      setLikes(newLikes);
      setNumberLikes(newLikes.length);
      setLiked(false);

      toastr.success("Post disliked successfully!");
    }
  };

  if (user_data === undefined)
    return (
      <div className="loading">
        <ClipLoader size={50} color={"#00e17b"} />
      </div>
    );

  let editButton;

  editButton = (
    <React.Fragment>
      <EditDeleteButton
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
      </EditDeleteButton>
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

  return (
    <div className={classes.PostContainer}>
      <div className={classes.topContainer}>
        <div className={classes.ImageContainer}>
          <img
            src={"https://gronjords-buddy.s3.eu-north-1.amazonaws.com/" + image}
            className={classes.Image}
            alt={image}
          />
        </div>
        <div className="nameContainer">
          <div className={classes.name}>{first_name + " " + last_name}</div>

          <div className={classes.time}>
            {moment(created_at).format("HH:mm A")}
          </div>
        </div>
        {user_data.id === id ? (
          <div className={classes.editDelete}>{editButton}</div>
        ) : (
          ""
        )}
      </div>

      <div className={classes.textContainer}>
        <div className={classes.title}>{title}</div>
        {content}
        {images ? (
          <div className={classes.PostImageContainer}>
            <img
              src={
                "https://gronjords-buddy.s3.eu-north-1.amazonaws.com/" + images
              }
              className={classes.PostImage}
              alt={image}
            />
          </div>
        ) : (
          ""
        )}
      </div>

      <div className={classes.likes}>
        <FontAwesomeIcon icon={faThumbsUp} className={classes.ThumbsUp} />
        <span className={classes.likesNumber}>{numberLikes}</span>
      </div>

      <div className={classes.buttonsContainer}>
        <div
          className={classes.button}
          onClick={(e) => {
            if (liked === false) {
              addLike(id);
            } else {
              removeLike(id);
            }
          }}
        >
          {liked === true ? (
            <div className={classes.LikeButton}>
              <FontAwesomeIcon
                icon={faThumbsUp}
                className={classes.likedText}
              />
              <div className={classes.likedText}>Like</div>
            </div>
          ) : (
            <div className={classes.LikeButton}>
              <FontAwesomeIcon icon={faThumbsUp} />
              <div>Like</div>
            </div>
          )}
        </div>
        <div className={classes.button + " " + classes.comm}>Comment</div>
      </div>
    </div>
  );
};

export default PostCard;
