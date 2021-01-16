import React, { useState, useEffect } from "react";
import BigGroupCard from "../../components/GroupCards/BigGroupCard/BigGroupCard";
import GroupsCard from "../../components/GroupCards/GroupsCard/GroupsCard";
import classes from "./Groups.module.css";
import ClipLoader from "react-spinners/ClipLoader";
import {
  getNotJoinedGroups,
  getOneGroup,
  getUserGroups,
} from "../../helpers/groups";
import { getGroupPosts } from "../../helpers/posts";
import { useStore, useStoreValue } from "react-context-hook";

const GroupsPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useStore("isAuthenticated");
  const [notJoinedGroups, setNotJoinedGroups] = useState(undefined);
  const [joinedGroups, setJoinedGroups] = useState(undefined);
  //   const [posts, setPosts] = useState(undefined);
  //   const [user, setUser] = useState(undefined);
  const [showPage, setShowPage] = useState("0");
  const user_data = useStoreValue("user");

  useEffect(() => {
    const fetchData = async () => {
      if (user_data) {
        const notJoinedGroups = await getNotJoinedGroups(user_data.id);
        const joinedGroups = await getUserGroups(user_data.id);
        // const oneGroup = await getOneGroup(id)
        // const groupPosts = await getGroupPosts(id)
        setNotJoinedGroups(notJoinedGroups);
        setJoinedGroups(joinedGroups);
      }
    };

    if (user_data) fetchData();
  }, [user_data]);

  if (joinedGroups === undefined || notJoinedGroups === undefined)
    return (
      <div className="loading">
        <ClipLoader size={50} color={"#00e17b"} />
      </div>
    );

  if (showPage !== "1" && joinedGroups && notJoinedGroups) {
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
        <div className={classes.GroupsPageContainer}>
          <div className={classes.LeftContainer}>
            <BigGroupCard />
          </div>
          <div className={classes.RightContainer}>
            <GroupsCard
              notJoinedGroups={notJoinedGroups}
              joinedGroups={joinedGroups}
            />
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default GroupsPage;
