import React, { useState, useEffect } from "react";
import classes from "./GroupsCard.module.css";
import JoinedGroupCard from "../JoinedGroupCard/JoinedGroupCard";
import NotJoinedGroupCard from "../NotJoinedGroupCard/NotJoinedGroupCard";
import { useStore, useStoreValue } from "react-context-hook";
import { useHistory, useLocation } from "react-router-dom";

const GroupsCard = (props) => {
  const joinedGroups = props.joinedGroups;
  const notJoinedGroups = props.notJoinedGroups;
  const user_data = useStoreValue("user");
  const history = useHistory();

  const joinedGroupsIds = [];
  for (let i = 0; i < joinedGroups.length; i++) {
    joinedGroupsIds.push(JSON.stringify(joinedGroups[i].id));
  }

  return (
    <div className={classes.GroupsCardContainer}>
      <div className={classes.TopContainer}>
        <div className={classes.TopContainerTitle}>Joined groups</div>
        <div className={classes.JoinedGroupsContainer}>
          {joinedGroups.map((joinedGroup) => {
            return (
              <div
                className={classes.JoinedGroupCard}
                key={joinedGroup.id}
                onClick={() => {
                  history.push(`/groups/${joinedGroup.id}`);
                }}
              >
                <JoinedGroupCard joinedGroup={joinedGroup} />
              </div>
            );
          })}
        </div>
      </div>
      <div className={classes.BottomContainer}>
        <div className={classes.BottomContainerTitle}>Groups to join</div>
        <div className={classes.NotJoinedGroupsContainer}>
          {notJoinedGroups.map((notJoinedGroup) => {
            if (
              notJoinedGroup.user_id !== user_data.id &&
              joinedGroupsIds.length > 1 &&
              joinedGroupsIds.includes(JSON.stringify(notJoinedGroup.id)) ===
                false
            ) {
              return (
                <div
                  className={classes.JoinedGroupCard}
                  key={notJoinedGroup.id}
                  onClick={() => {
                    history.push(`/groups/${notJoinedGroup.id}`);
                  }}
                >
                  <NotJoinedGroupCard notJoinedGroup={notJoinedGroup} />
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default GroupsCard;
