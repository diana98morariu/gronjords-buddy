const router = require("express").Router();
const Group = require(__dirname + "/../../models/Group");
const Enrollment = require(__dirname + "/../../models/Enrollment");
const { isAuthenticated } = require(__dirname + "/../../helpers/auth");
const { uploadFile, removeImages } = require(__dirname +
  "/../../helpers/handleImages.js");

const multipleUpload = uploadFile.array("images", 1);

//get all groups
router.get("/", isAuthenticated, async (req, res, next) => {
  try {
    const groups = await Group.query().select("*");
    if (!groups) {
      res.json({
        status: 0,
        message: "Error getting the groups from the db",
      });
    }
    return res.send(JSON.stringify(groups));
  } catch (error) {
    return res.json({ status: 0, message: "Error returning the groups" });
  }
});

// get groups of a specific user
router.get("/:userId", isAuthenticated, async (req, res, next) => {
  try {
    if (req.params.userId == req.session.user.id) {
      const enrollments = await Group.query()
        .select("groups.id", "groups.group_name", "enrollments.user_id")
        .join("enrollments", "groups.id", "enrollments.group_id")
        .where("enrollments.user_id", req.session.user.id);
      if (!enrollments) {
        res.json({
          status: 0,
          message: "Error getting the groups from the db",
        });
      }
      return res.send(enrollments);
    }
    return res.send({
      status: 0,
      message: "Error returning the groups of the user",
    });
  } catch (error) {
    return res.json({ status: 0, message: "Error returning the groups" });
  }
});

//get one specific group
router.get("/groups/:groupId", isAuthenticated, async (req, res, next) => {
  const groups = await Group.query().findById(req.params.groupId);
  if (!groups) {
    res.json({
      status: 0,
      message: "Error getting the group from the db",
    });
  }
  res.json(groups);
});

//join a group
router.post("/:groupId/join", isAuthenticated, async (req, res) => {
  try {
    const groupId = req.params.groupId;
    const user_id = req.session.user.id;
    if (!groupId || !user_id)
      return res.json({ status: 0, message: "Missing ids!", code: 404 });

    const newGroup = await Group.query().findById(groupId);
    if (!newGroup) {
      return res.json({ status: 0, message: "Group does not exist!" });
    }
    const oldJoin = await Enrollment.query()
      .select("*")
      .where({ group_id: JSON.parse(groupId), user_id });
    if (oldJoin[0]) {
      return res.json({
        status: 0,
        message: "User already exists in the group!",
      });
    }
    const addedJoin = {
      group_id: JSON.parse(groupId),
      user_id,
    };

    const newJoin = await Enrollment.query().insertGraph(addedJoin);
    if (!newJoin) {
      return res.json({ status: 0, message: "Could not join group!" });
    }
    return res.json({
      status: 1,
      message: "Group joined added successfully!",
      data: newJoin,
    });
  } catch (err) {
    return res.json({ status: 0, message: "Error joining group!" });
  }
});

//leave a group
router.delete("/:groupId/leave", isAuthenticated, async (req, res) => {
  try {
    const groupId = req.params.groupId;
    const user_id = req.session.user.id;
    if (!groupId || !user_id)
      return res.json({ status: 0, message: "Missing ids!", code: 404 });

    const newGroup = await Group.query().findById(groupId);
    if (!newGroup) {
      return res.json({ status: 0, message: "Group does not exist!" });
    }

    const oldJoin = await Enrollment.query()
      .select("*")
      .where({ group_id: JSON.parse(groupId), user_id });

    if (!oldJoin) {
      return res.json({
        status: 0,
        message: "User does not exist in the group!",
      });
    }

    const leaveGroup = await Enrollment.query().deleteById(oldJoin[0].id);
    if (!leaveGroup) {
      return res.json({ status: 0, message: "Could not like post!" });
    }
    return res.json({
      status: 1,
      message: "Group left successfully!",
    });
  } catch (err) {
    return res.json({ status: 0, message: "Error leaving group!" });
  }
});
module.exports = router;
