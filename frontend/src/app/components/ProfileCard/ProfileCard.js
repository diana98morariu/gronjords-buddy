import React, { useState, useEffect } from "react";
import classes from "./ProfileCard.module.css";
import ProfileImg from "../MiniComponents/ProfileImage";
import { useStoreValue } from "react-context-hook";
import ClipLoader from "react-spinners/ClipLoader";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
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
const ProfileCard = (props) => {
  const [birthdate, setUserBirthdate] = useState(undefined);
  const [created_at, setCreatedAt] = useState(undefined);
  const {
    id,
    room,
    first_name,
    last_name,
    phone_nr,
    email,
    password,
  } = props.user;
  const user_data = useStoreValue("user");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (props.user) {
      const birthday = props.user.birthdate;
      const birthdate = `${birthday.split("-")[2].slice(0, -14)}/${
        birthday.split("-")[1]
      }/${birthday.split("-")[0]}`;
      const created_at = props.user.created_at;
      const newCreatedAt = created_at.slice(0, -20);
      setUserBirthdate(birthdate);
      setCreatedAt(newCreatedAt);
    }
  }, [props]);

  if (user_data === undefined)
    return (
      <div className="loading">
        <ClipLoader size={50} color={"#00e17b"} />
      </div>
    );

  let editButton = (
    <React.Fragment>
      <EditDeleteButton
        style={{ padding: "none" }}
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
          Delete Account
        </MenuItem>
      </Menu>
    </React.Fragment>
  );

  return (
    <div className={classes.ProfileCardContainer}>
      <div className={classes.TopContainer}>
        <div className={classes.ProfileInfoContainer}>
          <ProfileImg />
          <div style={{ padding: "1em" }}>
            <div className={classes.FullName}>
              {first_name + " " + last_name}
            </div>
            <div className={classes.Room}>Room {room}</div>
          </div>
        </div>

        <div className={classes.JoinedIn}>Joined in {created_at}</div>
        <div className={classes.editDelete}>{editButton}</div>
      </div>
      <div className={classes.MiddleContainer}>
        <div className={classes.InfoTitles}>First Name</div>
        <div className={classes.info}>{first_name}</div>
        <div className={classes.InfoTitles}>Last Name</div>
        <div className={classes.info}>{last_name}</div>
        <div className={classes.InfoTitles}>Birthday</div>
        <div className={classes.info}>{birthdate}</div>
        <div className={classes.InfoTitles}>Phone</div>
        <div className={classes.info}>{phone_nr}</div>
      </div>
      <div className={classes.BottomContainer}>
        <div className={classes.SecurityInfoTitles}>Email</div>
        <div className={classes.SecurityInfo}>{email}</div>
        <div className={classes.SecurityInfoTitles}>Password</div>
        <input
          type="password"
          className={classes.Password}
          value={password}
          readOnly
        />
      </div>
    </div>
  );
};

export default ProfileCard;
