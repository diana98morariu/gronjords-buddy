import React, { useState, useEffect } from "react";
import classes from "./BigGroupCard.module.css";
import { getGroupPosts } from "../../../helpers/posts";
import PostCard from "../../PostCard/PostCard";
import { useStore, useStoreValue } from "react-context-hook";
import toastr from "toastr";
import { removePost } from "../../../helpers/posts";

const GroupCard = (props) => {
  const { id, group_name, image } = props.oneGroup;
  const [posts, setPosts] = useState(undefined);
  const user_data = useStoreValue("user");

  const handleDeletePost = async (id) => {
    const result = await removePost(id);
    console.log(result);
    if (result.status === 1) {
      const newPosts = [...posts];
      const indexDeleted = newPosts.findIndex((post) => post.id === id);
      newPosts.splice(indexDeleted, 1);
      setPosts(newPosts);
      toastr.success("Property deleted successfully!");
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      if (user_data && id) {
        const fetchedPosts = await getGroupPosts(id);
        setPosts(fetchedPosts);
      }
    };

    if (user_data) fetchData();
  }, [user_data, id]);

  return (
    <div className={classes.GroupPageContainer}>
      <div className={classes.GroupCardContainer}>
        <div className={classes.OneGroupImage}>
          <img
            src={"https://gronjords-buddy.s3.eu-north-1.amazonaws.com/" + image}
            className={classes.GroupImage}
            alt={image}
          />
        </div>
        {group_name}
      </div>
      {posts ? (
        <div className={classes.PostsContainer}>
          {posts.map((post) => {
            return (
              <div className={classes.PostCard} key={post.id}>
                <PostCard
                  post={post}
                  from={"Groups"}
                  delete={handleDeletePost}
                />
              </div>
            );
          })}
        </div>
      ) : (
        "No posts found"
      )}
    </div>
  );
};

export default GroupCard;
