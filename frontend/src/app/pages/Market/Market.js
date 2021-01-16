import React, { useEffect, useState } from "react";
import classes from "./Market.module.css";
import PostCard from "../../components/PostCard/PostCard";
import SmallProfile from "../../components/SmallProfile/SmallProfile";
import { useStore } from "react-context-hook";
import ClipLoader from "react-spinners/ClipLoader";
import { getFeedPosts } from "../../helpers/posts";
import toastr from "toastr";
import { removePost } from "../../helpers/posts";
import { useHistory } from "react-router-dom";

const Market = () => {
  const [isAuthenticated, setIsAuthenticated] = useStore("isAuthenticated");
  const [posts, setPosts] = useState(undefined);
  const [showPage, setShowPage] = useState("0");
  const history = useHistory();

  useEffect(() => {
    const fetchPosts = async () => {
      if (posts === undefined) {
        const posts = await getFeedPosts();
        if (posts) setPosts(posts);
        else toastr.error("Something went wrong!");
      }
    };

    if (posts === undefined) fetchPosts();
  });

  if (posts === undefined)
    return (
      <div className="loading">
        <ClipLoader size={50} color={"#00e17b"} />
      </div>
    );
  if (showPage !== "1" && posts) {
    setShowPage("1");
  }
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

  const openProfilePage = (id) => {
    history.push(`/profile`);
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
      {!isAuthenticated ? (
        ""
      ) : (
        <div className={classes.MarketContainer} style={{ opacity: showPage }}>
          <div className={classes.LeftContainers}>
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
          <div className={classes.RightContainers}>
            {" "}
            <SmallProfile click={openProfilePage} />
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Market;
