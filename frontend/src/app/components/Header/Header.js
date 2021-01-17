import React from "react";
import classes from "./Header.module.css";
import LogoGrojords from "../../assets/images/logo.png";
import {
  faHome,
  faUsers,
  faStore,
  faPowerOff,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  useStore,
  useSetStoreValue,
  useSetAndDelete,
  useStoreValue,
} from "react-context-hook";
import UserIcon from "../../assets/images/user_icon.svg";
import { NavLink, useHistory } from "react-router-dom";
import Modal from "../Modal/Modal";
import { logout } from "../../helpers/auth";

const Header = (props) => {
  const history = useHistory();
  const [isAuthenticated, setIsAuthenticated] = useStore("isAuthenticated");
  const [showModal, setShowModal] = useStore("showModal");
  const [setRedirectTo] = useSetAndDelete("redirectTo");
  const setUser = useSetStoreValue("user");
  const setModal = (modalName) => setShowModal(modalName);
  const closeModal = () => {
    setRedirectTo(undefined);
    setShowModal(undefined);
  };
  let modalToShow;

  if (showModal)
    modalToShow = <Modal page={showModal} closeModal={closeModal} />;

  const handleLogout = async () => {
    const res = await logout();
    if (res.status === 1) {
      setIsAuthenticated(false);
      setUser(undefined);
      history.push("/");
      // window.location.reload();
    }
  };
  const user_data = useStoreValue("user");

  return (
    <React.Fragment>
      {!isAuthenticated ? (
        setModal("Log in")
      ) : (
        <div className={classes.HeaderContainer}>
          <div className={classes.NavbarLeft}>
            <NavLink exact to="/">
              <img className={classes.Logo} src={LogoGrojords} alt="logo" />
            </NavLink>
          </div>
          <React.Fragment>
            <div className={classes.NavbarRight}>
              <NavLink
                exact
                to="/"
                className={classes.Button}
                activeClassName={classes.active}
              >
                <FontAwesomeIcon icon={faHome} className={classes.NavIcons} />
              </NavLink>
              <NavLink
                exact
                to="/groups"
                className={classes.Button}
                activeClassName={classes.active}
              >
                <FontAwesomeIcon icon={faUsers} className={classes.NavIcons} />
              </NavLink>
              <NavLink
                exact
                to="/market"
                className={classes.Button}
                activeClassName={classes.active}
              >
                <FontAwesomeIcon icon={faStore} className={classes.NavIcons} />
              </NavLink>
              <NavLink
                exact
                to="/profile"
                className={classes.Button + " " + classes.ProfileButton}
                activeClassName={classes.active}
              >
                {user_data ? (
                  <img
                    src={
                      "https://gronjords-buddy.s3.eu-north-1.amazonaws.com/" +
                      user_data.image
                    }
                    className={classes.Image}
                    alt={user_data.image}
                  />
                ) : (
                  <img src={UserIcon} alt="user-icon" />
                )}
              </NavLink>
              <NavLink
                exact
                to="/"
                className={classes.Button}
                onClick={handleLogout}
              >
                <FontAwesomeIcon
                  icon={faPowerOff}
                  className={classes.NavIcons}
                />
              </NavLink>
            </div>
          </React.Fragment>
        </div>
      )}
      {modalToShow ? modalToShow : undefined}
    </React.Fragment>
  );
};

export default Header;
