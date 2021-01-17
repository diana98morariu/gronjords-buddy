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

import { useStore, useStoreValue } from "react-context-hook";

const GroupsPage = () => {
  const [notJoinedGroups, setNotJoinedGroups] = useState(undefined);
  const [isAuthenticated, setIsAuthenticated] = useStore(
    "isAuthenticated",
    undefined
  );
  const [joinedGroups, setJoinedGroups] = useState(undefined);
  const [oneGroup, setOneGroup] = useState(undefined);
  const [showPage, setShowPage] = useState("0");
  const user_data = useStoreValue("user");
  const id = window.location.pathname.split("/")[2];

  useEffect(() => {
    const fetchData = async () => {
      if (user_data) {
        const fetchedNotJoinedGroups = await getNotJoinedGroups(user_data.id);
        const fetchedJoinedGroups = await getUserGroups(user_data.id);
        if (id) {
          const fetchedOneGroup = await getOneGroup(id);
          setOneGroup(fetchedOneGroup);
        }

        setNotJoinedGroups(fetchedNotJoinedGroups);
        setJoinedGroups(fetchedJoinedGroups);
      }
    };

    if (user_data) fetchData();
  }, [user_data, id]);

  if (
    joinedGroups === undefined ||
    notJoinedGroups === undefined ||
    (id && oneGroup === undefined)
  )
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
            {!id ? (
              <div className={classes.ChooseGroupImageContainer}>
                <img
                  className={classes.ChooseGroupImage}
                  src="https://gronjords-buddy.s3.eu-north-1.amazonaws.com/choose-group-grayscale.svg"
                  alt="choose-group"
                />
              </div>
            ) : (
              <BigGroupCard oneGroup={oneGroup} />
            )}
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
