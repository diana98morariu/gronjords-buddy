import React from "react";
import classes from "./Header.module.css";
import LogoGrojords from "../../assets/images/logo.svg";
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

  return (
    <React.Fragment>
      {!isAuthenticated ? (
        setModal("Log in")
      ) : (
        <div className={classes.HeaderContainer}>
          <div className={classes.NavbarLeft}>
            <img className={classes.Logo} src={LogoGrojords} alt="logo" />
          </div>
          <React.Fragment>
            <div className={classes.NavbarRight}>
              <NavLink exact to="/" activeClassName={classes.active}>
                <span className={classes.Button}>
                  <FontAwesomeIcon icon={faHome} className={classes.NavIcons} />
                </span>
              </NavLink>
              <NavLink exact to="/groups" activeClassName={classes.active}>
                <span className={classes.Button}>
                  <FontAwesomeIcon
                    icon={faUsers}
                    className={classes.NavIcons}
                  />
                </span>
              </NavLink>
              <NavLink exact to="/market" activeClassName={classes.active}>
                <span className={classes.Button}>
                  <FontAwesomeIcon
                    icon={faStore}
                    className={classes.NavIcons}
                  />
                </span>
              </NavLink>
              <NavLink exact to="/profile" activeClassName={classes.active}>
                <span className={classes.ProfileButton}>
                  <img src={UserIcon} alt="user-icon" />
                </span>
              </NavLink>
              <NavLink exact to="/" activeClassName={classes.active}>
                <span className={classes.Button} onClick={handleLogout}>
                  <FontAwesomeIcon
                    icon={faPowerOff}
                    className={classes.NavIcons}
                  />
                </span>
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
