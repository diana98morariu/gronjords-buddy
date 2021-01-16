import React, { useEffect, useState } from "react";
import classes from "./Home.module.css";
import PostCard from "../../components/PostCard/PostCard";
import SmallProfile from "../../components/SmallProfile/SmallProfile";
import AdministrationIcon from "../../assets/images/administration.svg";
import TechnicianIcon from "../../assets/images/technician.svg";
import { useStore, useSetAndDelete } from "react-context-hook";
import ClipLoader from "react-spinners/ClipLoader";
import { getFeedPosts } from "../../helpers/posts";
import Modal from "../../components/Modal/Modal";
import toastr from "toastr";
import { removePost } from "../../helpers/posts";
import { useHistory } from "react-router-dom";

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useStore("isAuthenticated");
  const [showModal, setShowModal] = useStore("showModal");
  const [setRedirectTo] = useSetAndDelete("redirectTo");
  const [posts, setPosts] = useState(undefined);
  const [showPage, setShowPage] = useState("0");
  const history = useHistory();
  const setModal = (modalName) => setShowModal(modalName);
  const closeModal = () => {
    setRedirectTo(undefined);
    setShowModal(undefined);
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

  let modalToShow;
  if (showModal)
    modalToShow = <Modal page={showModal} closeModal={closeModal} />;

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
        <div className={classes.HomeContainer} style={{ opacity: showPage }}>
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
              <div
                className={classes.Button}
                onClick={() => setModal("Contact Blåmænd")}
              >
                Contact Blåmænd
              </div>
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
              <div
                className={classes.Button}
                onClick={() => setModal("Contact Administration")}
              >
                Contact Administration
              </div>
            </div>
          </div>
        </div>
      )}
      {modalToShow ? modalToShow : undefined}
    </React.Fragment>
  );
};

export default Home;
