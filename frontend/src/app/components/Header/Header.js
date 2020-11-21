import React from "react";
import classes from "./Header.module.css";
import LogoGrojords from "../../assets/images/logo.svg";
import {
  faHome,
  faUser,
  faUsers,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className={classes.HeaderContainer}>
      <div className={classes.NavbarLeft}>
        <img className={classes.Logo} src={LogoGrojords} alt="logo" />
      </div>
      <div className={classes.NavbarRight}>
        <NavLink exact to="/" activeClassName={classes.active}>
          <span className={classes.Button}>
            <FontAwesomeIcon icon={faHome} className={classes.NavIcons} />
          </span>
        </NavLink>
        <NavLink exact to="/groups" activeClassName={classes.active}>
          <span className={classes.Button}>
            <FontAwesomeIcon icon={faUsers} className={classes.NavIcons} />
          </span>
        </NavLink>
        <NavLink exact to="/market" activeClassName={classes.active}>
          <span className={classes.Button}>
            <FontAwesomeIcon
              icon={faShoppingCart}
              className={classes.NavIcons}
            />
          </span>
        </NavLink>
        <NavLink exact to="/profile" activeClassName={classes.active}>
          <span className={classes.Button}>
            <FontAwesomeIcon icon={faUser} className={classes.NavIcons} />
          </span>
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
