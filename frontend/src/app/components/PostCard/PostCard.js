import React, { useEffect, useState } from "react";
import classes from "./PostCard.module.css";
import ProfileImg from "../MiniComponents/ProfileImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { getSpecificUser } from "../../helpers/auth";
import ClipLoader from "react-spinners/ClipLoader";
import toastr from "toastr";
import moment from "moment";
const PostCard = (props) => {
  const [users, setUsers] = useState(undefined);
  const { title, content, created_at, user_id } = props.post;
  setInterval(() => {}, 1000);
  useEffect(() => {
    const fetchUsers = async () => {
      if (props.post) {
        const res = await getSpecificUser(user_id);
        const resarray = [res.data[0]];
        console.log(resarray);
        if (res) {
          setUsers(resarray);
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

        <div>
          <img
            className={classes.editDelete}
            src="https://static.xx.fbcdn.net/rsrc.php/v3/yn/r/oVV-iPd4q_P.png"
            alt=""
            height="16"
            width="16"
          />
        </div>

        {/* <div className="editPosition">
          <EditDelete showDialog={showDialog} />
        </div> */}
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
