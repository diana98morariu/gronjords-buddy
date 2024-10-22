import React, { useState, useEffect } from "react";
import classes from "./PostCard.module.css";
import ReplyCommentCard from "../ReplyCommentCard/ReplyCommentCard";
import CommentCard from "../CommentCard/CommentCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faComment } from "@fortawesome/free-solid-svg-icons";
import ClipLoader from "react-spinners/ClipLoader";
import moment from "moment";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useStoreValue } from "react-context-hook";
import { withStyles } from "@material-ui/core/styles";
import { validateForm } from "./../../helpers/validation";
import {
  getPostLikes,
  likePost,
  dislikePost,
  checkLike,
  addCommentToPost,
  getPostComments,
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
  const [newContent, setNewContent] = useState("");
  const [comments, setComments] = useState("");
  const [numberComments, setNumberComments] = useState(0);
  const [numberLikes, setNumberLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const {
    id,
    post_id,
    title,
    content,
    created_at,
    first_name,
    last_name,
    image,
    images,
    price,
    from_date,
    to_date,
    available,
  } = props.post;
  const [anchorEl, setAnchorEl] = React.useState(null);

  let availableFromDate, availableToDate;
  if (from_date && to_date) {
    const available_from_date = from_date;
    availableFromDate = `${available_from_date.split("-")[2].slice(0, -14)}/${
      available_from_date.split("-")[1]
    }/${available_from_date.split("-")[0]}`;
    const available_to_date = to_date;
    availableToDate = `${available_to_date.split("-")[2].slice(0, -14)}/${
      available_to_date.split("-")[1]
    }/${available_to_date.split("-")[0]}`;
  }

  const handleShowComments = () => {
    setShowComments(true);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const submitComment = async (post_id, content) => {
    const validComment = [{ type: "content", val: newContent }];
    const isFormValid = validateForm(validComment);
    if (!isFormValid.formIsValid)
      return toastr.error(`Invalid ${isFormValid.invalids.join(", ")}`);
    const CommentData = { content: newContent };
    const response = await addCommentToPost(post_id, CommentData);

    if (response.status === 1) {
      const newComments = [...comments];
      newComments.push(response.data);
      setComments(newComments);
      setNewContent("");
      setNumberComments(newComments.length);
      toastr.success("Commented successfully!");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (user_data) {
        if (post_id) {
          const fetchedPostLikes = await getPostLikes(post_id);
          const response = await checkLike(post_id);
          const fetchedPostComments = await getPostComments(post_id);
          setComments(fetchedPostComments);
          if (response.status !== 0) {
            setLiked(true);
          }
          setLikes(fetchedPostLikes);
          setNumberLikes(fetchedPostLikes.length);
          setNumberComments(fetchedPostComments.length);
        }
      }
    };

    if (user_data) fetchData();
  }, [post_id, user_data]);

  const addLike = async () => {
    const response = await likePost(post_id);
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
    const response = await dislikePost(post_id);
    if (response.status === 1) {
      const newLikes = [...likes];
      const indexDeleted = newLikes.findIndex(
        (newLike) => newLike.id === post_id
      );
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
            props.delete(post_id);
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
      </div>
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
      {price ? (
        <div className={classes.PriceTextContainer}>
          {available ? `${price} kr.` : "SOLD"}
        </div>
      ) : (
        ""
      )}
      {from_date && to_date ? (
        <div className={classes.DatesTextContainer}>
          {available
            ? `${availableFromDate} - ${availableToDate}`
            : "Not available"}
        </div>
      ) : (
        ""
      )}
      <div className={classes.likes}>
        <FontAwesomeIcon icon={faThumbsUp} className={classes.ThumbsUp} />
        <span className={classes.likesNumber}>{numberLikes}</span>
      </div>

      <div className={classes.buttonsContainer}>
        <div
          className={classes.button}
          onClick={(e) => {
            if (liked === false) {
              addLike(post_id);
            } else {
              removeLike(post_id);
            }
          }}
        >
          {liked === true ? (
            <div className={classes.LikeButton}>
              <FontAwesomeIcon
                icon={faThumbsUp}
                className={classes.likedIcon}
              />
              <div className={classes.likedText}>Liked</div>
            </div>
          ) : (
            <div className={classes.LikeButton}>
              <FontAwesomeIcon icon={faThumbsUp} className={classes.likeIcon} />
              <div>Like</div>
            </div>
          )}
        </div>
        <div
          className={classes.button + " " + classes.comm}
          onClick={handleShowComments}
        >
          <FontAwesomeIcon icon={faComment} className={classes.CommentIcon} />
          {numberComments} Comments
        </div>
      </div>

      {comments && showComments ? (
        <div className={classes.PostCommentsContainer}>
          {comments.map((comment) => {
            return (
              <div className={classes.PostComment} key={comment.id}>
                <CommentCard comment={comment} />
              </div>
            );
          })}
        </div>
      ) : (
        ""
      )}

      <ReplyCommentCard
        post_id={post_id}
        submitComment={submitComment}
        newContent={newContent}
        setNewContent={setNewContent}
      />
    </div>
  );
};

export default PostCard;
