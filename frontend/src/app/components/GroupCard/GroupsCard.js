import React from "react";
import classes from "./GroupsCard.module.css";
import PostCard from "../PostCard/PostCard";
const GroupCard = () => {
  return (
    <div className={classes.GroupsPostsContainer}>
      <PostCard />
      <PostCard />
      <PostCard />
    </div>
  );
};

export default GroupCard;
