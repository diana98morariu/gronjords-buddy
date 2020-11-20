const router = require("express").Router();
const User = require(__dirname + "/../../models/User");
const { isAuthenticated } = require(__dirname + "/../../helpers/auth");
// const { v4: uuid, isUuid } = require("uuidv4");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { clientEndpoint } = require(__dirname + "/../../config/otherConfigs");

router.get("/user/:id", isAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(404).send({ response: "Missing id!" });

    const user = await User.query().select("*").where({ id });
    if (user.length === 0)
      return res.status(404).send({ response: "User does not exist" });

    return res.status(200).json({
      status: 1,
      message: "User retrieved successfully",
      data: user,
    });
  } catch (err) {
    return res.status(404).send({ response: "Error getting user!" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    const users = await User.query().select().where({ email }).limit(1);
    const user = users[0];

    if (!user) {
      return res
        .status(404)
        .send({ response: "Invalid email/password combination" });
    }
    bcrypt.compare(password, user.password, (error, isSame) => {
      if (error) {
        return res.status(500).send({ response: "Comparing error" });
      }
      if (!isSame) {
        return res
          .status(404)
          .send({ response: "Invalid user/password combination" });
      } else {
        req.session.user = {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          room: user.room,
        };
        return res.status(200).json({
          status: 1,
          message: "User logged in",
          user: user,
        });
      }
    });
  }
});

router.post("/logout", isAuthenticated, (req, res, next) => {
  req.session.destroy((err) => {
    if (err)
      return res.json({
        status: 0,
        message: "Error while trying to logout user!",
      });
    res.clearCookie("user_sid");
    res.status(200).json({ status: 1, msg: "User has logged out!" });
  });
});

router.post("/register", async (req, res, next) => {
  const {
    first_name,
    last_name,
    email,
    password,
    repeat_password,
    phone_nr,
    room,
    birthdate,
  } = req.body;
  const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  const valid = emailRegexp.test(email);

  if (
    first_name &&
    last_name &&
    phone_nr &&
    room &&
    birthdate &&
    email &&
    password &&
    repeat_password &&
    password === repeat_password
  ) {
    if (!valid) {
      return res.status(400).send({ response: "Invalid email" });
    } else if (password.length < 3) {
      return res
        .status(400)
        .send({ response: "Password does not fulfill the requirements" });
    } else {
      bcrypt.hash(password, saltRounds, async (error, hashedPassword) => {
        if (error) {
          return res.status(500).send({});
        }
        try {
          const existingRoom = await User.query()
            .select()
            .where({ room: room })
            .limit(1);
          const existingEmail = await User.query()
            .select()
            .where({ email: email })
            .limit(1);
          const existingPhoneNr = await User.query()
            .select()
            .where({ phone_nr: phone_nr })
            .limit(1);

          if (existingRoom[0] || existingEmail[0] || existingPhoneNr[0]) {
            return res.status(404).send({ response: "User already exists" });
          } else if (
            !existingRoom[0] &&
            !existingEmail[0] &&
            !existingPhoneNr[0]
          ) {
            const newUser = {
              first_name,
              last_name,
              phone_nr,
              room,
              birthdate,
              email,
              password: hashedPassword,
              activate_or_reset_pass_key: uuidv4(),
            };
            console.log(newUser);
            const createdUser = await User.query().insert(newUser);

            if (!createdUser)
              return res
                .status(404)
                .send({ response: "Error while inserting user" });

            return res.status(200).send({
              response: "User created successfully!",
              newUser: createdUser,
            });
          }
        } catch (error) {
          return res
            .status(500)
            .send({ response: "Something went wrong with the database" });
        }
      });
    }
  } else if (password !== repeat_password) {
    return res
      .status(404)
      .send({ response: "Password and repeat password are not the same" });
  } else {
    return res.status(404).send({ response: "Missing fields" });
  }
});

module.exports = router;
