const router = require("express").Router();
const User = require(__dirname + "/../../models/User");
const Group = require(__dirname + "/../../models/Group");
const Enrollment = require(__dirname + "/../../models/Enrollment");
const { isAuthenticated } = require(__dirname + "/../../helpers/auth");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const nodemailer = require("nodemailer");
const { clientEndpoint } = require(__dirname + "/../../config/otherConfigs");

//====================== CHECK IF USER HAS A SESSION ======================
router.get("/checkauth", isAuthenticated, async (req, res) => {
  try {
    // ====================== FIND LOGGED USER ======================
    const loggedUser = await User.query()
      .select(
        "id",
        "email",
        "first_name",
        "last_name",
        "room",
        "birthdate",
        "image",
        "created_at"
      )
      .findById(req.session.user.id);
    if (!loggedUser)
      return res.json({ status: 0, msg: "User not authorized!" });

    // ====================== SEND BACK LOGGED USER ======================
    return res
      .status(200)
      .json({ status: 1, msg: "User authorized!", user: loggedUser });

    // ====================== HANDLE ERROR ======================
  } catch (err) {
    return res.json({ status: 0, msg: "User not authorized!" });
  }
});

router.get("/user/:id", isAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(404).send({ response: "Missing id!" });

    const user = await User.query().select("*").where({ id });
    if (user.length === 0)
      return res.status(404).send({ response: "User does not exist" });

    return res.status(200).send({
      status: 1,
      response: "User retrieved successfully",
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
          response: "User logged in",
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
        response: "Error while trying to logout user!",
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
          const strRoom = room.toString();
          const floor = room % 1000;
          const strFloor = floor.toString();
          const blockFloor = strRoom.substring(0, 2);

          if (
            strRoom.length !== 4 ||
            strRoom.startsWith("5") ||
            strRoom.startsWith("7") ||
            strRoom.startsWith("8") ||
            strRoom.startsWith("9") ||
            strFloor.startsWith("0") ||
            strFloor.startsWith("9") ||
            room % 100 >= 23
          ) {
            return res.status(404).send({ response: "Room does not exist" });
          }
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
            profile_image = "user.png";
            const newUser = {
              first_name,
              last_name,
              phone_nr,
              image: profile_image,
              room,
              birthdate,
              email,
              password: hashedPassword,
              activate_or_reset_pass_key: uuidv4(),
            };

            const createdUser = await User.query().insert(newUser);
            if (!createdUser)
              return res
                .status(404)
                .send({ response: "Error while inserting user" });

            const floorGroup = await Group.query()
              .select("id")
              .where({ group_name: "Floor " + blockFloor });
            if (!floorGroup)
              return res
                .status(404)
                .send({ response: "Error while searching for floor group" });
            const newFloorMate = await Enrollment.query().insert({
              user_id: createdUser.id,
              group_id: floorGroup[0].id,
            });
            if (!newFloorMate)
              return res.status(404).send({
                response: "Error while inserting user in floor group",
              });

            if (room % 100 <= 12) {
              const kitchenGroupA = await Group.query()
                .select("id")
                .where({ group_name: "Kitchen " + blockFloor + "A" });

              if (!kitchenGroupA)
                return res.status(404).send({
                  response: "Error while searching for kitchen group",
                });

              const newKitchenMate = await Enrollment.query().insert({
                user_id: createdUser.id,
                group_id: kitchenGroupA[0].id,
              });
              if (!newKitchenMate)
                return res.status(404).send({
                  response: "Error while inserting user in kitchen group",
                });
            } else if (room % 100 > 12) {
              const kitchenGroupB = await Group.query()
                .select("id")
                .where({ group_name: "Kitchen " + blockFloor + "B" });

              if (!kitchenGroupB)
                return res.status(404).send({
                  response: "Error while searching for kitchen group",
                });

              const newKitchenMate = await Enrollment.query().insert({
                user_id: createdUser.id,
                group_id: kitchenGroupB[0].id,
              });
              if (!newKitchenMate)
                return res.status(404).send({
                  response: "Error while inserting user in kitchen group",
                });
            }

            const newMate = await Enrollment.query().insert({
              user_id: createdUser.id,
              group_id: 1,
            });

            if (!newMate)
              return res.status(404).send({
                response: "Error while inserting user in main group",
              });

            const groups = await Enrollment.query()
              .select("group_id")
              .where({ user_id: createdUser.id });

            return res.status(200).send({
              status: 1,
              response: "User created successfully!",
              newUser: createdUser,
              groups: groups,
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

router.delete("/", isAuthenticated, async (req, res) => {
  try {
    const user = await User.query().deleteById(req.session.user.id);
    if (!user)
      return res.json({ status: 0, message: "Error deleting the user!" });

    req.session.destroy((err) => {
      if (err)
        return res.json({
          status: 0,
          message: "Error while trying to logout user!",
          code: 404,
        });

      // ====================== CLEAR USER COOKIE ======================
      res.clearCookie("user_sid");

      // ====================== EVERYTHING OK ======================
      return res.json({ status: 1, message: "User deleted successfully!" });
    });
  } catch (err) {
    return res.json({ status: 0, message: "Error deleting the user!" });
  }
});

module.exports = router;
