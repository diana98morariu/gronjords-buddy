import React, { useState, useEffect } from "react";
import classes from "./ProfileCard.module.css";

const ProfileCard = (props) => {
  const [birthdate, setUserBirthdate] = useState(undefined);
  const [created_at, setCreatedAt] = useState(undefined);
  const [user_data, setUserData] = useState(undefined);

  console.log(birthdate, created_at, user_data);
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
      setUserData(props.user);
    }
  }, [props]);

  return (
    <div className={classes.ProfileCardContainer}>
      <div className="TopContainer">
        {user_data.first_name + " " + user_data.last_name}
        <div className={classes.room}>Room {user_data.room}</div>
        <div className={classes.joinedIn}>Joined in {created_at}</div>
      </div>
      <div className={classes.MiddleContainer}>
        <div className={classes.InfoTitles}>First Name</div>
        <div className={classes.info}>{user_data.first_name}</div>
        <div className={classes.InfoTitles}>Last Name</div>
        <div className={classes.info}>{user_data.last_name}</div>
        <div className={classes.InfoTitles}>Birthday</div>
        <div className={classes.info}>{birthdate}</div>
        <div className={classes.InfoTitles}>Phone</div>
        <div className={classes.info}>{user_data.phone_nr}</div>
      </div>
      <div className={classes.BottomContainer}>
        <div className={classes.SecurityInfoTitles}>Email</div>
        <div className={classes.SecurityInfo}>{user_data.email}</div>
        <div className={classes.SecurityInfoTitles}>Password</div>
        {/* <div className="SecurityInfo">{user_data.password}</div> */}
      </div>
    </div>
  );
};

export default ProfileCard;
