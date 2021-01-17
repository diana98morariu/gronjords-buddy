import React from "react";
import classes from "./CreatePosts.module.css";
import { useStoreValue } from "react-context-hook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare, faImages } from "@fortawesome/free-solid-svg-icons";
const CreatePosts = () => {
  const user_data = useStoreValue("user");

  return (
    <React.Fragment>
      <div className={classes.CreatePostsContainer}>
        <div className={classes.topContainer}>
          <div className={classes.ImageContainer}>
            <img
              src={
                "https://gronjords-buddy.s3.eu-north-1.amazonaws.com/" +
                user_data.image
              }
              className={classes.Image}
              alt={user_data.image}
            />
          </div>
          <input
            className={classes.inputNewPost}
            type="text"
            placeholder={"What's on your mind, " + user_data.first_name + " ?"}
            // onClick={showDialog}
          />
        </div>

        <div className={classes.bottomContainer}>
          <div className={classes.photo + " " + classes.button}>
            <FontAwesomeIcon icon={faImages} className={classes.faShare} />
            Photos
          </div>

          <div className={classes.post + " " + classes.button}>
            <FontAwesomeIcon icon={faShare} className={classes.faShare} />
            Post
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CreatePosts;