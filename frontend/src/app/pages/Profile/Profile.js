import React, { useState, useEffect } from "react";
import PostCard from "../../components/PostCard/PostCard";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import classes from "./Profile.module.css";
import ClipLoader from "react-spinners/ClipLoader";
import { getUserPosts } from "../../helpers/posts";
import { getSpecificUser } from "../../helpers/auth";
import { useStoreValue } from "react-context-hook";

const Profile = () => {
  const [posts, setPosts] = useState(undefined);
  const [user, setUser] = useState(undefined);
  const [showPage, setShowPage] = useState("0");
  const user_data = useStoreValue("user");

  useEffect(() => {
    const fetchData = async () => {
      if (user_data) {
        const posts = await getUserPosts(user_data.id);
        const user = await getSpecificUser(user_data.id);
        setPosts(posts);
        setUser(user.data[0]);
      }
    };

    if (user_data) fetchData();
  }, [user_data]);

  if (posts === undefined || user === undefined)
    return (
      <div className="loading">
        <ClipLoader size={50} color={"#00e17b"} />
      </div>
    );

  if (showPage !== "1" && posts && user) {
    setShowPage("1");
  }

  const handleDeletePost = async (id) => {
    // const result = await removePost(id);
    // if (result.status === 1) {
    //   const newPosts = [...posts];
    //   const indexDeleted = newPosts.findIndex((post) => post.id === id);
    //   newPosts.splice(indexDeleted, 1);
    //   setPosts(newPosts);
    //   toastr.success("Property deleted successfully!");
    // }
  };
  return (
    <React.Fragment>
      <div className="loading">
        <ClipLoader
          size={50}
          color={"#00e17b"}
          loading={showPage === "1" ? false : true}
        />
      </div>

      <div className={classes.ProfileContainer} style={{ opacity: showPage }}>
        <div className={classes.LeftContainer}>
          <div className={classes.GroupsPostsContainer}>
            {posts.map((post) => {
              return (
                <div className={classes.PostCard} key={post.id}>
                  <PostCard
                    post={post}
                    from={"Home"}
                    delete={handleDeletePost}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className={classes.RightContainer}>
          <ProfileCard user={user} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Profile;
