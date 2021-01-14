import React, { useEffect, useState } from "react";
import classes from "./Home.module.css";
import GroupsCard from "../../components/GroupCard/GroupsCard";
import SmallProfile from "../../components/SmallProfile/SmallProfile";
import AdministrationIcon from "../../assets/images/administration.svg";
import TechnicianIcon from "../../assets/images/technician.svg";
import { useStore, useStoreValue } from "react-context-hook";
import ClipLoader from "react-spinners/ClipLoader";
import { getFeedPosts } from "../../helpers/posts";
import toastr from "toastr";
import { removePost } from "../../helpers/posts";

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useStore("isAuthenticated");
  const [posts, setPosts] = useState(undefined);
  const [showPage, setShowPage] = useState("0");
  const user_data = useStoreValue("user");

  const handleDeletePost = async (id) => {
    const result = await removePost(id);
    if (result.status === 1) {
      const newPosts = [...posts];
      const indexDeleted = newPosts.findIndex((post) => post.id === id);
      newPosts.splice(indexDeleted, 1);
      setPosts(newPosts);
      toastr.success("Property deleted successfully!");
    }
  };

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
        <ClipLoader size={50} color={"#e83251"} />
      </div>
    );

  if (showPage !== "1" && posts) {
    setShowPage("1");
  }

  return (
    <React.Fragment>
      <div className="loading">
        <ClipLoader
          size={50}
          color={"#E4215B"}
          loading={showPage === "1" ? false : true}
        />
      </div>
      {!isAuthenticated ? (
        ""
      ) : (
        <div className={classes.HomeContainer} style={{ opacity: showPage }}>
          <div className={classes.LeftContainers}>
            <GroupsCard posts={posts} handleDeletePost={handleDeletePost} />
          </div>
          <div className={classes.RightContainers}>
            {" "}
            <SmallProfile />
            <div className={classes.AdministrationContainer}>
              <div className={classes.ProfileLink}>
                <img src={TechnicianIcon} alt="Technician" />
                <div className={classes.infoContainer}>
                  <div className={classes.Name}>Blåmænd</div>
                  <div className={classes.time}>
                    <span className={classes.days}>Mon - Fri</span>
                    <span className={classes.hours}> 8:00 - 15:00</span>
                  </div>
                </div>
              </div>
              <div className={classes.Button}>Contact Blåmænd</div>
            </div>
            <div className={classes.AdministrationContainer}>
              <div className={classes.ProfileLink}>
                <img src={AdministrationIcon} alt="Administration" />
                <div className={classes.infoContainer}>
                  <div className={classes.Name}>Administration</div>
                  <div className={classes.time}>
                    <span className={classes.days}>Mon - Wed </span>
                    <span className={classes.hours}>7:30 - 09:00</span>
                    <span className={classes.days}> Thu </span>
                    <span className={classes.hours}>7:30 - 09:00 </span>
                    <span className={classes.days}>Fri</span>{" "}
                    <span className={classes.hours}>Closed</span>
                  </div>
                </div>
              </div>
              <div className={classes.Button}>Contact Administration</div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Home;
