import React from "react";
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

  if (user_data === undefined)
    return (
      <div className="loading">
        <ClipLoader size={50} color={"#00e17b"} />
      </div>
    );

  let editButton;
  // if (user_data && user_data.id === user_id) {
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
  // }

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
