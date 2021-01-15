import React from "react";
import classes from "./GroupsCard.module.css";
import PostCard from "../PostCard/PostCard";
const GroupCard = (props) => {
  return (
    <div className={classes.GroupsPostsContainer}>
      {props.posts.map((post) => {
        return (
          <div className={classes.PostCard} key={post.id}>
            <PostCard post={post} from={"Profile"} delete={props.delete} />
          </div>
        );
      })}
    </div>
  );
};

export default GroupCard;
