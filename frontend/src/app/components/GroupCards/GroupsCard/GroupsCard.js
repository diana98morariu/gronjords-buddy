import React, { useState, useEffect } from "react";
import classes from "./GroupsCard.module.css";
import JoinedGroupCard from "../JoinedGroupCard/JoinedGroupCard";
import NotJoinedGroupCard from "../NotJoinedGroupCard/NotJoinedGroupCard";
import { useStoreValue } from "react-context-hook";
import { joinGroup, leaveGroup } from "../../../helpers/groups";
import toastr from "toastr";

const GroupsCard = (props) => {
  const [joinedGroups, setJoinedGroups] = useState(props.joinedGroups);
  const [notJoinedGroups, setNotJoinedGroups] = useState(props.notJoinedGroups);
  const user_data = useStoreValue("user");

  const joinedGroupsIds = [];
  for (let i = 0; i < joinedGroups.length; i++) {
    joinedGroupsIds.push(JSON.stringify(joinedGroups[i].id));
  }
  const handleJoinGroup = async (id) => {
    const result = await joinGroup(id);
    if (result.status === 1) {
      const newNotJoinedGroups = [...notJoinedGroups];
      const indexDeleted = newNotJoinedGroups.findIndex(
        (notJoinedGroup) => notJoinedGroup.id === id
      );
      newNotJoinedGroups.splice(indexDeleted, 1);
      setNotJoinedGroups(newNotJoinedGroups);

      const newJoinedGroups = [...joinedGroups];
      newJoinedGroups.unshift(result.data);
      setJoinedGroups(newJoinedGroups);
      toastr.success("Group joined successfully!");
    }
  };

  const handleLeaveGroup = async (id) => {
    const result = await leaveGroup(id);
    if (result.status === 1) {
      const newJoinedGroups = [...joinedGroups];
      const indexDeleted = newJoinedGroups.findIndex(
        (joinedGroup) => joinedGroup.id === id
      );
      newJoinedGroups.splice(indexDeleted, 1);
      setJoinedGroups(newJoinedGroups);

      const newNotJoinedGroups = [...notJoinedGroups];
      newNotJoinedGroups.unshift(result.data);
      setNotJoinedGroups(newNotJoinedGroups);

      toastr.success("Group left successfully!");
    }
  };
  useEffect(() => {}, [joinedGroups, notJoinedGroups]);

  return (
    <div className={classes.GroupsCardContainer}>
      <div className={classes.TopContainer}>
        <div className={classes.TopContainerTitle}>Joined groups</div>
        <div className={classes.JoinedGroupsContainer}>
          {joinedGroups.map((joinedGroup) => {
            return (
              <div className={classes.JoinedGroupCard} key={joinedGroup.id}>
                <JoinedGroupCard
                  joinedGroup={joinedGroup}
                  handleLeaveGroup={handleLeaveGroup}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className={classes.BottomContainer}>
        <div className={classes.BottomContainerTitle}>Other groups</div>
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
                >
                  <NotJoinedGroupCard
                    notJoinedGroup={notJoinedGroup}
                    handleJoinGroup={handleJoinGroup}
                  />
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
