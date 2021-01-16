import React, { useState, useEffect } from "react";
import classes from "./GroupsCard.module.css";
import JoinedGroupCard from "../JoinedGroupCard/JoinedGroupCard";
import NotJoinedGroupCard from "../NotJoinedGroupCard/NotJoinedGroupCard";
import { useStore, useStoreValue } from "react-context-hook";

const GroupsCard = (props) => {
  const joinedGroups = props.joinedGroups;
  const notJoinedGroups = props.notJoinedGroups;
  const user_data = useStoreValue("user");

  return (
    <div className={classes.GroupsCardContainer}>
      <div className={classes.TopContainer}>
        <div className={classes.JoinedGroupsContainer}>
          {joinedGroups.map((joinedGroup) => {
            return (
              <div className={classes.JoinedGroupCard} key={joinedGroup.id}>
                <JoinedGroupCard joinedGroup={joinedGroup} />
              </div>
            );
          })}
        </div>
      </div>
      <div className={classes.BottomContainer}>
        <div className={classes.NotJoinedGroupsContainer}>
          {notJoinedGroups.map((notJoinedGroup) => {
            if (
              !notJoinedGroup.group_name.startsWith("Kitchen") &&
              !notJoinedGroup.group_name.startsWith("Floor") &&
              !notJoinedGroup.group_name.startsWith("Gronjords Main") &&
              notJoinedGroup.user_id !== user_data.id
            ) {
              return (
                <div
                  className={classes.JoinedGroupCard}
                  key={notJoinedGroup.id}
                >
                  <NotJoinedGroupCard notJoinedGroup={notJoinedGroup} />
                </div>
              );
            } else {
              return <span></span>;
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default GroupsCard;
