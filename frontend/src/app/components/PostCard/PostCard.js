import React, { useEffect, useState } from "react";
import classes from "./PostCard.module.css";
import ProfileImg from "../MiniComponents/ProfileImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { getSpecificUser } from "../../helpers/auth";
import ClipLoader from "react-spinners/ClipLoader";
import toastr from "toastr";
import moment from "moment";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const PostCard = (props) => {
  const [users, setUsers] = useState(undefined);
  const { id, title, content, created_at, user_id } = props.post;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  setInterval(() => {}, 1000);
  useEffect(() => {
    const fetchUsers = async () => {
      if (props.post) {
        const res = await getSpecificUser(user_id);

        if (res) {
          setUsers(res);
        } else toastr.error("Something went wrong!");
      }
    };

    if (props.post) fetchUsers();
  });

  if (users === undefined)
    return (
      <div className="loading">
        <ClipLoader size={50} color={"#e83251"} />
      </div>
    );

  return (
    <div className={classes.PostContainer}>
      <div className={classes.topContainer}>
        <ProfileImg />
        <div className="nameContainer">
          {/* {users.map((user) => {
            return (
              <div className={classes.name} key={user.id}>
                {user.firt_name + " " + user.last_name}
              </div>
            );
          })} */}
          <div className={classes.time}>
            {moment(created_at).format("HH:mm A")}
          </div>
        </div>
        <div className={classes.editDelete}>
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
        </div>
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
