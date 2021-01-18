import React, { useState } from "react";
import classes from "./Modal.module.css";
import TextField from "@material-ui/core/TextField";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import DragAndDrop from "../DragAndDrop/DragAndDrop";
import LogoGrojords from "../../assets/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { withStyles } from "@material-ui/core/styles";
import Datepicker from "../Datepicker/Datepicker";
import {
  login,
  register,
  recoverOrResendValidation,
  changePassword,
} from "../../helpers/auth";
import { contactTechnician, contactAdministration } from "../../helpers/email";
import { validateForm } from "../../helpers/validation";
import {
  createPost,
  createAnnouncementPost,
  createItemPost,
  createRoomPost,
} from "../../helpers/posts";
import {
  useStore,
  useSetStoreValue,
  useSetAndDelete,
} from "react-context-hook";
import toastr from "toastr";
import "../../styles/toastr.css";
import { useHistory } from "react-router-dom";
import moment from "moment";
import ClipLoader from "react-spinners/ClipLoader";

const EmailTextField = withStyles({
  root: {
    width: "100%",
    marginTop: "10px",
    "& label.Mui-focused": {
      color: "#00E17B",
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#00E17B",
      },
      "& label.Mui-focused": {
        color: "black",
      },
    },
  },
})(TextField);

const PasswordTextField = withStyles({
  root: {
    width: "100%",
    marginTop: "10px",
    "& label.Mui-focused": {
      color: "#00E17B",
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        border: "2px solid #00E17B",
      },
      "& label.Mui-focused": {
        color: "black",
      },
    },
  },
})(TextField);

const SubmitButton = withStyles({
  root: {
    width: "100%",
    height: "56px",
    marginTop: "20px",
    marginBottom: "20px",
    fontWeight: "bold",
    fontSize: "17px",
    backgroundColor: "#00E17B",
    boxShadow: "none",
    "&:hover": {
      boxShadow: "none",
      backgroundColor: "#00C76D",
    },
    "&:focused": {
      boxShadow: "none",
      backgroundColor: "black",
    },
    "&:active": {
      boxShadow: "none",
      transition: "0.1s",
      color: "pink",
    },
    "& .MuiButton-label": {
      color: "white",
    },
    textTransform: "none",
  },
})(Button);

const AuthModal = (props) => {
  const history = useHistory();

  const [key, setChangeKey] = useStore("changeKey");
  const [redirectTo, setRedirectTo] = useStore("redirectTo");
  const [setIsAuthenticated] = useSetAndDelete("isAuthenticated");
  const setUser = useSetStoreValue("user");

  const [showPage, setShowPage] = useState(props.page);
  const [loadingButton, setLoadingButton] = useState(false);

  const [user_first_name, setFirstName] = useState("");
  const [user_last_name, setLastName] = useState("");
  const [user_birthdate, setBirthdate] = useState(
    moment("1999-01-25").format("yyyy-MM-DD")
  );
  const [user_email, setEmail] = useState("");
  const [user_room, setRoom] = useState("");
  const [user_phone, setPhone] = useState("");
  const [user_password, setPassword] = useState("");
  const [user_rePassword, setRepassword] = useState("");
  const [mail_message, setMessage] = useState("");
  const [mail_subject, setSubject] = useState("");
  const [post_title, setTitle] = useState("");
  const [post_content, setContent] = useState("");
  const [item_price, setPrice] = useState("");
  const [room_from_date, setFromDate] = useState(moment().format("yyyy-MM-DD"));
  const [room_to_date, setToDate] = useState(
    moment().add(1, "days").format("yyyy-MM-DD")
  );

  const [files, setFiles] = useState([]);

  const setNewFiles = (files) => setFiles(files);

  const changeDate = (newDate) => {
    const date = moment(newDate).format("yyyy-MM-DD");
    setBirthdate(date);
    setFromDate(date);
    setToDate(date);
  };
  const changeFromDate = (newDate) => {
    const date = moment(newDate).format("yyyy-MM-DD");
    setFromDate(date);
  };
  const changeToDate = (newDate) => {
    const date = moment(newDate).format("yyyy-MM-DD");
    setToDate(date);
  };
  const handleClose = () => props.closeModal();

  let signUpContent, switchModalButtons, contactInfo, createPostContent;

  if (showPage === "Post" || showPage === "Post Announcement") {
    createPostContent = (
      <React.Fragment>
        <div>
          <EmailTextField
            id="outlined-title-input"
            label="Title"
            type="text"
            autoComplete="off"
            variant="outlined"
            value={post_title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <EmailTextField
            id="outlined-multiline-static"
            label="Content"
            type="text"
            multiline
            rows={4}
            autoComplete="off"
            variant="outlined"
            value={post_content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div>
          <DragAndDrop files={files} setNewFiles={setNewFiles} />
        </div>
      </React.Fragment>
    );
  }

  if (showPage === "Post Item") {
    createPostContent = (
      <React.Fragment>
        <div>
          <EmailTextField
            id="outlined-title-input"
            label="Title"
            type="text"
            autoComplete="off"
            variant="outlined"
            value={post_title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <EmailTextField
            id="outlined-select"
            label="Price"
            type="number"
            variant="outlined"
            value={item_price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div>
          <EmailTextField
            id="outlined-multiline-static"
            label="Content"
            type="text"
            multiline
            rows={4}
            autoComplete="off"
            variant="outlined"
            value={post_content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div>
          <DragAndDrop files={files} setNewFiles={setNewFiles} />
        </div>
      </React.Fragment>
    );
  }

  if (showPage === "Post Room") {
    createPostContent = (
      <React.Fragment>
        <div>
          <EmailTextField
            id="outlined-title-input"
            label="Title"
            type="text"
            autoComplete="off"
            variant="outlined"
            value={post_title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={classes.Datepicker}>
          <div>
            <Datepicker
              date={room_from_date}
              newLabel="From date"
              from={"Reservation card"}
              handleChange={changeFromDate}
            />
          </div>
          <div>
            <Datepicker
              date={room_to_date}
              newLabel="To date"
              from={"Reservation card"}
              handleChange={changeToDate}
            />
          </div>
        </div>
        <div>
          <EmailTextField
            id="outlined-multiline-static"
            label="Content"
            type="text"
            multiline
            rows={4}
            autoComplete="off"
            variant="outlined"
            value={post_content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div>
          <DragAndDrop files={files} setNewFiles={setNewFiles} />
        </div>
      </React.Fragment>
    );
  }

  if (showPage === "Sign up") {
    signUpContent = (
      <React.Fragment>
        <div>
          <EmailTextField
            id="outlined-firstname-input"
            label="First name"
            type="text"
            autoComplete="off"
            variant="outlined"
            value={user_first_name}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <EmailTextField
            id="outlined-lastname-input"
            label="Last name"
            type="text"
            autoComplete="off"
            variant="outlined"
            value={user_last_name}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <EmailTextField
            id="outlined-room-input"
            label="Room"
            type="text"
            autoComplete="off"
            variant="outlined"
            value={user_room}
            onChange={(e) => setRoom(e.target.value)}
          />
        </div>
        <div>
          <EmailTextField
            id="outlined-phone-input"
            label="Phone Nr."
            type="text"
            autoComplete="off"
            variant="outlined"
            value={user_phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <Datepicker
          date={user_birthdate}
          newLabel="Birthdate"
          page="Sign up"
          handleChange={changeDate}
        />
      </React.Fragment>
    );

    switchModalButtons = (
      <div className="modalBottom">
        <div
          className={classes.SwitchPageButton}
          onClick={() => setShowPage("Log in")}
        >
          Already have an account? Log in
        </div>
      </div>
    );
  }

  if (showPage === "Contact Administration" || showPage === "Contact Blåmænd") {
    contactInfo = (
      <React.Fragment>
        <div>
          <EmailTextField
            id="outlined-subject-input"
            label="Subject"
            type="text"
            autoComplete="off"
            variant="outlined"
            value={mail_subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <div>
          <EmailTextField
            id="outlined-multiline-static"
            label="Message"
            type="text"
            multiline
            rows={4}
            autoComplete="off"
            variant="outlined"
            value={mail_message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
      </React.Fragment>
    );
  }

  // ====================== LOGIN ======================
  else if (showPage === "Log in") {
    switchModalButtons = (
      <div className="modalBottom">
        <div
          className={classes.SwitchPageButton}
          onClick={() => setShowPage("Recover password")}
        >
          Forgotten password?
        </div>
        <div
          className={classes.SwitchPageButton}
          onClick={() => setShowPage("Sign up")}
        >
          Don't have an account? Sign up
        </div>
      </div>
    );
  }

  // ====================== RECOVER PASS ======================
  else if (showPage === "Recover password") {
    switchModalButtons = (
      <div className="modalBottom">
        <div
          className={classes.SwitchPageButton}
          onClick={() => setShowPage("Log in")}
        >
          Remember your password? Log in
        </div>
      </div>
    );
  }

  // ====================== CHANGE PASS ======================
  else if (showPage === "Change password") {
    switchModalButtons = (
      <div className="modalBottom">
        <div
          className={classes.SwitchPageButton}
          onClick={() => setShowPage("Log in")}
        >
          Remember your password? Log in
        </div>
      </div>
    );
  }

  const submitForm = async () => {
    // ====================== LOGIN ======================
    if (showPage === "Log in") {
      // ====================== VALIDATION ======================

      const loginValidData = [
        { type: "email", val: user_email },
        { type: "password", val: user_password },
      ];
      const isFormValid = validateForm(loginValidData);
      if (!isFormValid.formIsValid)
        return toastr.error(`Invalid ${isFormValid.invalids.join(", ")}`);
      const loginData = { email: user_email, password: user_password };
      setLoadingButton(true);
      const res = await login(loginData);
      setLoadingButton(false);

      // ====================== RESPONSE ======================
      if (res.status === 1) {
        toastr.success("You are now logged in!");

        setIsAuthenticated(true);
        setUser(res.user);

        if (redirectTo !== undefined) {
          const goTo = redirectTo;
          setRedirectTo(undefined);
          history.push(goTo);
        }
        props.closeModal();
      } else return toastr.error(res.response);
    }

    // ====================== SIGNUP ======================
    else if (showPage === "Sign up") {
      if (user_password !== user_rePassword)
        return toastr.error("Passwords do not match!");

      // ====================== VALIDATION ======================
      const signUpValidData = [
        { type: "first_name", val: user_first_name },
        { type: "last_name", val: user_last_name },
        { type: "birthdate", val: user_birthdate },
        { type: "room", val: user_room },
        { type: "phone_nr", val: user_phone },
        { type: "email", val: user_email },
        { type: "password", val: user_password },
        { type: "password", val: user_rePassword },
      ];

      const isFormValid = validateForm(signUpValidData);
      if (!isFormValid.formIsValid)
        return toastr.error(`Invalid ${isFormValid.invalids.join(", ")}`);

      const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);
      const signUpData = {
        first_name: capitalize(user_first_name),
        last_name: capitalize(user_last_name),
        birthdate: user_birthdate,
        room: parseInt(user_room),
        phone_nr: user_phone,
        email: user_email,
        password: user_password,
        repeat_password: user_rePassword,
      };

      setLoadingButton(true);
      const res = await register(signUpData);
      setLoadingButton(false);

      // ====================== RESPONSE ======================
      if (res.status === 1) {
        toastr.success("Your account is now created!");
        props.closeModal();
      } else return toastr.error(res.response);
    }

    // ====================== RECOVER PASSWORD ======================
    else if (showPage === "Recover password") {
      // ====================== VALIDATION ======================
      const resetPassValidData = [{ type: "email", val: user_email }];

      const isFormValid = validateForm(resetPassValidData);
      if (!isFormValid.formIsValid)
        return toastr.error(`Invalid ${isFormValid.invalids.join(", ")}`);
      const resetPassData = { email: user_email };
      setLoadingButton(true);
      const res = await recoverOrResendValidation(resetPassData);
      setLoadingButton(false);

      // ====================== RESPONSE ======================
      if (res.status === 1) {
        toastr.success(
          "Follow the email instructions to complete this action",
          "Email was sent successfully!"
        );

        setRedirectTo(undefined);
        props.closeModal();
      } else return toastr.error(res.response);
    }

    // ====================== CHANGE PASSWORD ======================
    else if (showPage === "Change password") {
      if (user_password !== user_rePassword)
        return toastr.error("Passwords do not match!");

      // ====================== VALIDATION ======================
      const changePassValidData = [
        { type: "password", val: user_password },
        { type: "password", val: user_rePassword },
      ];

      const isFormValid = validateForm(changePassValidData);
      if (!isFormValid.formIsValid)
        return toastr.error(`Invalid ${isFormValid.invalids.join(", ")}`);

      if (key) changePassValidData.push({ key });
      else return toastr.error("Unauthorized!");
      const changePassData = {
        password: user_password,
        repeat_password: user_rePassword,
      };
      setLoadingButton(true);
      const res = await changePassword(changePassData);
      setChangeKey(undefined);
      setLoadingButton(false);

      // ====================== RESPONSE ======================
      if (res.status === 1) {
        toastr.success(
          "You can now login into your account",
          "Your password was changed successfully!"
        );

        setRedirectTo(undefined);
        setPassword("");
        setShowPage("Log in");
      } else return toastr.error(res.response);
    }

    // ====================== CONTACT ADMINISTRATION OR TECHNICIAN ======================
    else if (
      showPage === "Contact Administration" ||
      showPage === "Contact Blåmænd"
    ) {
      // ====================== VALIDATION ======================
      const emailContentData = [
        { type: "subject", val: mail_subject },
        { type: "message", val: mail_message },
      ];

      const isFormValid = validateForm(emailContentData);
      if (!isFormValid.formIsValid)
        return toastr.error(`Invalid ${isFormValid.invalids.join(", ")}`);
      const emailContent = { subject: mail_subject, message: mail_message };
      setLoadingButton(true);
      let res;
      if (showPage === "Contact Blåmænd") {
        res = await contactTechnician(emailContent);
      } else if (showPage === "Contact Administration") {
        res = await contactAdministration(emailContent);
      }
      setLoadingButton(false);

      // ====================== RESPONSE ======================
      if (res.status === 1) {
        toastr.success(
          "You contacted the Administration",
          "Email was sent successfully!"
        );

        setRedirectTo(undefined);
        props.closeModal();
      } else return toastr.error(res.response);
    }
    // ====================== CREATE A POST ======================
    else if (showPage === "Post" || showPage === "Post Announcement") {
      // ====================== VALIDATION ======================
      const postContentData = [
        { type: "title", val: post_title },
        { type: "content", val: post_content },
      ];

      const isFormValid = validateForm(postContentData);
      if (!isFormValid.formIsValid)
        return toastr.error(`Invalid ${isFormValid.invalids.join(", ")}`);
      const requestData = new FormData();

      const postContent = { title: post_title, content: post_content };

      requestData.append("data", JSON.stringify(postContent));
      files.map((file) => requestData.append("images", file, file.name));

      setLoadingButton(true);
      let res;
      if (showPage === "Post Announcement")
        res = await createAnnouncementPost(requestData);
      else if (showPage === "Post")
        res = await createPost(props.groupId, requestData);
      setLoadingButton(false);

      // ====================== RESPONSE ======================
      if (res.status === 1) {
        toastr.success("You created a post", "Post was created successfully!");

        setRedirectTo(undefined);
        props.closeModal();
      } else return toastr.error(res.response);
    }
    // ====================== CREATE AN ITEM POST ======================
    else if (showPage === "Post Item") {
      // ====================== VALIDATION ======================
      const postContentData = [
        { type: "title", val: post_title },
        { type: "content", val: post_content },
        { type: "price", val: parseInt(item_price) },
      ];

      const isFormValid = validateForm(postContentData);
      if (!isFormValid.formIsValid)
        return toastr.error(`Invalid ${isFormValid.invalids.join(", ")}`);
      const requestData = new FormData();
      const postContent = {
        title: post_title,
        price: item_price,
        content: post_content,
      };

      requestData.append("data", JSON.stringify(postContent));
      files.map((file) => requestData.append("images", file, file.name));

      setLoadingButton(true);
      const res = await createItemPost(requestData);

      setLoadingButton(false);

      // ====================== RESPONSE ======================
      if (res.status === 1) {
        toastr.success("You created a post", "Post was created successfully!");

        setRedirectTo(undefined);
        props.closeModal();
      } else return toastr.error(res.response);
    }

    // ====================== CREATE A ROOM POST ======================
    else if (showPage === "Post Room") {
      // ====================== VALIDATION ======================
      const postContentData = [
        { type: "title", val: post_title },
        { type: "content", val: post_content },
        { type: "available_start", val: room_from_date },
        { type: "available_end", val: room_to_date },
      ];

      const isFormValid = validateForm(postContentData);
      if (!isFormValid.formIsValid)
        return toastr.error(`Invalid ${isFormValid.invalids.join(", ")}`);
      const requestData = new FormData();

      const postContent = {
        title: post_title,
        content: post_content,
        from_date: room_from_date,
        to_date: room_to_date,
      };

      requestData.append("data", JSON.stringify(postContent));
      files.map((file) => requestData.append("images", file, file.name));

      setLoadingButton(true);
      const res = await createRoomPost(requestData);

      setLoadingButton(false);

      // ====================== RESPONSE ======================
      if (res.status === 1) {
        toastr.success("You created a post", "Post was created successfully!");

        setRedirectTo(undefined);
        props.closeModal();
      } else return toastr.error(res.response);
    }
  };

  let closeIcon;
  if (showPage !== "Log In" || showPage !== "Sign up") {
    closeIcon = (
      <div onClick={handleClose} className={classes.closeButton}>
        <FontAwesomeIcon icon={faTimes} />
      </div>
    );
  }
  return (
    <React.Fragment>
      <Modal
        open={true}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.modalContainer}>
          <div className={classes.titleContainer}>
            {closeIcon}
            <div className={classes.loginTitle}>
              <p>
                <img src={LogoGrojords} alt="Login" style={{ width: "15em" }} />
              </p>
            </div>
          </div>
          <div className={classes.FormContainer}>
            <form className={classes.loginForm} noValidate autoComplete="off">
              {signUpContent ? signUpContent : undefined}
              {contactInfo ? contactInfo : undefined}
              {createPostContent ? createPostContent : undefined}
              {showPage === "Sign up" ||
              showPage === "Log in" ||
              showPage === "Recover password" ? (
                <div>
                  <EmailTextField
                    id="outlined-email-input"
                    label="Email"
                    type="email"
                    autoComplete="off"
                    variant="outlined"
                    value={user_email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              ) : undefined}

              {showPage === "Sign up" ||
              showPage === "Log in" ||
              showPage === "Change password" ? (
                <div>
                  <PasswordTextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="outlined"
                    value={user_password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              ) : undefined}
              {showPage === "Sign up" || showPage === "Change password" ? (
                <div>
                  <PasswordTextField
                    id="outlined-repassword-input"
                    label="Repeat password"
                    type="password"
                    variant="outlined"
                    value={user_rePassword}
                    onChange={(e) => setRepassword(e.target.value)}
                  />
                </div>
              ) : undefined}

              <SubmitButton variant="contained" onClick={() => submitForm()}>
                {loadingButton ? (
                  <ClipLoader size={18} color={"#fff"} />
                ) : (
                  showPage
                )}
              </SubmitButton>

              {switchModalButtons ? switchModalButtons : undefined}
            </form>
          </div>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default AuthModal;
