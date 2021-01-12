import React from "react";
import classes from "./Home.module.css";
import GroupsCard from "../../components/GroupCard/GroupsCard";
import SmallProfile from "../../components/SmallProfile/SmallProfile";
const Home = () => {
  return (
    <div className={classes.HomeContainer}>
      <GroupsCard />

      <div className={classes.RightContainers}>
        {" "}
        <SmallProfile />
        <div className={classes.AdministrationContainer}>
          <div className={classes.ProfileLink}>
            <div className={classes.Icon} />
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
            <div className={classes.Icon} />
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
  );
};

export default Home;
