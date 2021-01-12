const router = require("express").Router();
const Post = require(__dirname + "/../../models/Post");
const { isAuthenticated } = require(__dirname + "/../../helpers/auth");
const { uploadFile, removeImages } = require(__dirname +
  "/../../helpers/handleImages.js");

const multipleUpload = uploadFile.array("images", 1);

//get all posts
router.get("/", isAuthenticated, async (req, res, next) => {
  try {
    const posts = await Post.query().select("*");
    // .where({ userId: req.session.user.id });
    if (!posts) {
      res.json({
        status: 0,
        message: "Error getting the posts from the db",
      });
    }
    return res.send(JSON.stringify(posts));
  } catch (error) {
    return res.json({ status: 0, message: "Error returning the posts" });
  }
});

// get posts of a specific user
router.get("/:userId", isAuthenticated, async (req, res, next) => {
  try {
    if (req.params.userId == req.session.user.id) {
      const posts = await Post.query()
        .select("*")
        .where({ user_id: req.params.userId });
      if (!posts) {
        res.json({
          status: 0,
          message: "Error getting the posts from the db",
        });
      }
      return res.send(JSON.stringify(posts));
    }
    return res.send({
      status: 0,
      message: "Error returning the posts of the user",
    });
  } catch (error) {
    return res.json({ status: 0, message: "Error returning the posts" });
  }
});

//get one specific post
router.get("/posts/:postId", isAuthenticated, async (req, res, next) => {
  const posts = await Post.query().findById(req.params.postId);
  if (!posts) {
    res.json({
      status: 0,
      message: "Error getting the post from the db",
    });
  }
  res.json(posts);
});

//create post in a group
router.post("/:groupId", isAuthenticated, async (req, res, next) => {
  try {
    multipleUpload(req, res, async (err) => {
      if (err)
        return res.status(422).json({
          errors: [{ title: "Image Upload Error", detail: err.message }],
        });

      const errorRemoveImgs = [];
      if (req.files.length > 0)
        req.files.forEach((img) =>
          errorRemoveImgs.push(img.location.slice(-41))
        );

      if (!req.body) {
        if (errorRemoveImgs.length > 0) removeImages(errorRemoveImgs);
        return res.json({ status: 0, message: "Invalid request!", code: 404 });
      }

      const userId = req.session.user.id;
      if (!userId)
        return res.json({ status: 0, message: "Missing id!", code: 404 });

      let newPost = {};
      const data = req.body;
      const groupId = req.params.groupId;

      if (req.files.length < 1)
        return res
          .status(400)
          .json({ status: 0, message: "Missing images!", code: 404 });
      const photos = [];
      req.files.map((img) => photos.push(img.location.slice(-41)));
      newPost.images = JSON.stringify(photos[0]);

      newPost.title = data.title;
      newPost.content = data.content;
      newPost.user_id = userId;
      newPost.group_id = groupId;

      if (groupId == 2) {
        newPost.price = Number(data.price);
      } else if (groupId == 3) {
        if (Date.parse(data.from_date) > Date.parse(data.to_date)) {
          return res
            .status(400)
            .json({ status: 0, message: "Dates are wrong", code: 404 });
        }
        newPost.from_date = data.from_date;
        newPost.to_date = data.to_date;
      }

      const createdPost = await Post.query().insertGraph(newPost);
      if (!createdPost)
        return res.json({
          status: 0,
          message: "Error while inserting post!",
          code: 404,
        });
      return res.json({ status: 1, post: createdPost });
    });
  } catch (err) {
    return res.json({ status: 0, message: "Error creating new post!" });
  }
});

//delete post
router.delete("/:id", isAuthenticated, async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) return res.json({ status: 0, message: "Missing id!", code: 404 });

    const post = await Post.query().select("images", "user_id").findById(id);
    if (!post)
      return res.json({
        status: 0,
        message: "Post does not exists!",
        code: 404,
      });

    if (post.user_id !== req.session.user.id)
      return res.json({ status: 0, message: "Unauthorized!", code: 404 });

    const photo = [];
    photo.push(post.images);
    const awsRes = await removeImages(photo);

    if (awsRes.status === 0)
      return res.json({ status: 0, message: "problem with aws", code: 404 });

    const dbRes = await Post.query().deleteById(id);
    if (!dbRes) return res.json({ status: 0, message: "Post does not exist!" });
    return res.json({ status: 1, message: "Post deleted successfully!" });
  } catch (err) {
    return res.json({ status: 0, message: "Error deleting post!" });
  }
});

module.exports = router;
