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

module.exports = router;
