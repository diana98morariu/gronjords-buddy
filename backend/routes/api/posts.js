const router = require("express").Router();
const User = require(__dirname + "/../../models/User");
const Post = require(__dirname + "/../../models/Post");
const Enrollment = require(__dirname + "/../../models/Enrollment");
const Like = require(__dirname + "/../../models/Like");
const Comment = require(__dirname + "/../../models/Comment");
const { isAuthenticated } = require(__dirname + "/../../helpers/auth");
const { uploadFile, removeImages } = require(__dirname +
  "/../../helpers/handleImages.js");

const multipleUpload = uploadFile.array("images", 1);

//get all posts
router.get("/", isAuthenticated, async (req, res, next) => {
  try {
    const posts = await User.query()
      .select(
        "users.id",
        "users.first_name",
        "users.last_name",
        "users.room",
        "users.image",
        { post_id: "posts.id" },
        "posts.title",
        "posts.content",
        "posts.images",
        "posts.group_id",
        "posts.from_date",
        "posts.to_date",
        "posts.price",
        "posts.created_at"
      )
      .join("posts", "users.id", "posts.user_id")
      .orderBy("posts.created_at", "desc");
    if (!posts) {
      res.json({
        status: 0,
        message: "Error getting the posts from the db",
      });
    }
    return res.send(posts);
  } catch (error) {
    return res.json({ status: 0, message: "Error returning the posts" });
  }
});

//get all posts from a specific group
router.get("/group/:groupId", isAuthenticated, async (req, res, next) => {
  try {
    const groupId = req.params.groupId;
    if (!groupId)
      return res.json({
        status: 0,
        message: "Missing group id",
      });

    const posts = await User.query()
      .select(
        "users.id",
        "users.first_name",
        "users.last_name",
        "users.room",
        "users.image",
        { post_id: "posts.id" },
        "posts.title",
        "posts.content",
        "posts.images",
        "posts.group_id",
        "posts.from_date",
        "posts.to_date",
        "posts.price",
        "posts.created_at"
      )
      .join("posts", "users.id", "posts.user_id")
      .where("posts.group_id", groupId)
      .orderBy("posts.created_at", "desc");
    if (!posts) {
      res.json({
        status: 0,
        message: "Error getting the posts from the db",
      });
    }
    return res.send(posts);
  } catch (error) {
    return res.json({ status: 0, message: "Error returning the posts" });
  }
});

// get posts of a specific user
router.get("/:userId", isAuthenticated, async (req, res, next) => {
  try {
    if (req.params.userId == req.session.user.id) {
      const posts = await User.query()
        .select(
          "users.id",
          "users.first_name",
          "users.last_name",
          "users.room",
          "users.image",
          { post_id: "posts.id" },
          "posts.title",
          "posts.content",
          "posts.images",
          "posts.group_id",
          "posts.from_date",
          "posts.to_date",
          "posts.price",
          "posts.created_at"
        )
        .join("posts", "users.id", "posts.user_id")
        .where("posts.user_id", req.params.userId)
        .orderBy("posts.created_at", "desc");
      if (!posts) {
        res.json({
          status: 0,
          message: "Error getting the posts from the db",
        });
      }
      return res.send(posts);
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
      const data = JSON.parse(req.body.data);
      const groupId = req.params.groupId;

      if (req.files.length > 0) {
        const photos = [];
        req.files.map((img) => photos.push(img.location.slice(-41)));
        newPost.images = JSON.stringify(photos[0]);
      }

      const enrollments = await Enrollment.query()
        .select("*")
        .where({ user_id: userId, group_id: groupId })
        .limit(1);

      if (enrollments.length < 1)
        return res.json({
          status: 0,
          message: "User does not belong to the group",
        });

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

    if (post.images) {
      const photo = [];
      photo.push(post.images);
      const awsRes = await removeImages(photo);

      if (awsRes.status === 0)
        return res.json({ status: 0, message: "Problem with aws", code: 404 });
    }
    const dbRes = await Post.query().deleteById(id);
    if (!dbRes) return res.json({ status: 0, message: "Post does not exist!" });
    return res.json({ status: 1, message: "Post deleted successfully!" });
  } catch (err) {
    return res.json({ status: 0, message: "Error deleting post!" });
  }
});

//get all likes
router.get("/likes/:postId", isAuthenticated, async (req, res, next) => {
  try {
    const postId = req.params.postId;
    if (!postId)
      return res.json({ status: 0, message: "Missing id!", code: 404 });

    const posts = await Post.query().select("*").findById(postId);
    if (!posts)
      return res.json({
        status: 0,
        message: "Could not find post!",
        code: 404,
      });

    const likes = await User.query()
      .select(
        "users.id",
        "users.first_name",
        "users.last_name",
        { post_id: "likes.post_id" },
        {
          like_id: "likes.id",
        }
      )
      .join("likes", "users.id", "likes.user_id")
      .where("likes.post_id", postId);

    if (!likes) {
      res.json({
        status: 0,
        message: "Error getting the likes from the db",
      });
    }
    return res.send(likes);
  } catch (error) {
    return res.json({ status: 0, message: "Error returning the likes" });
  }
});

// check if liked
router.get("/checklike/:postId", isAuthenticated, async (req, res, next) => {
  try {
    const postId = req.params.postId;
    if (!postId)
      return res.json({ status: 0, message: "Missing id!", code: 404 });

    const posts = await Post.query().select("*").findById(postId);
    if (!posts) {
      return res.json({
        status: 0,
        message: "Could not find post!",
        code: 404,
      });
    }

    const likes = await Like.query()
      .select("*")
      .where({ post_id: JSON.parse(postId), user_id: req.session.user.id });

    if (likes.length === 0) {
      return res.json({
        status: 0,
        message: "Error getting the likes from the db",
      });
    }
    return res.send(likes).status(200);
  } catch (error) {
    return res.json({ status: 0, message: "Error returning the likes" });
  }
});

//like a post
router.post("/:postId/like", isAuthenticated, async (req, res) => {
  try {
    const postId = req.params.postId;
    const user_id = req.session.user.id;
    if (!postId || !user_id)
      return res.json({ status: 0, message: "Missing ids!", code: 404 });

    const newPost = await Post.query().findById(postId);
    if (!newPost) {
      return res.json({ status: 0, message: "Post does not exist!" });
    }
    const oldLike = await Like.query()
      .select("*")
      .where({ post_id: JSON.parse(postId), user_id });

    if (oldLike.length > 1) {
      return res.json({ status: 0, message: "Like already exists!" });
    }
    const addedLike = {
      post_id: JSON.parse(postId),
      user_id,
    };

    const newLike = await Like.query().insertGraph(addedLike);
    if (!newLike) {
      return res.json({ status: 0, message: "Could not like post!" });
    }
    return res.json({
      status: 1,
      message: "Like added successfully!",
      data: newLike,
    });
  } catch (err) {
    return res.json({ status: 0, message: "Error liking post!" });
  }
});

//dislike a post
router.delete("/:postId/dislike", isAuthenticated, async (req, res) => {
  try {
    const postId = req.params.postId;
    const user_id = req.session.user.id;
    if (!postId || !user_id)
      return res.json({ status: 0, message: "Missing ids!", code: 404 });

    const newPost = await Post.query().findById(postId);
    if (!newPost) {
      return res.json({ status: 0, message: "Post does not exist!" });
    }

    const oldLike = await Like.query()
      .select("*")
      .where({ post_id: JSON.parse(postId), user_id });
    if (!oldLike) {
      return res.json({ status: 0, message: "Like does not exist!" });
    }

    const noLike = await Like.query().deleteById(oldLike[0].id);
    if (!noLike) {
      return res.json({ status: 0, message: "Could not like post!" });
    }
    return res.json({
      status: 1,
      message: "Like deleted successfully!",
    });
  } catch (err) {
    return res.json({ status: 0, message: "Error disliking post!" });
  }
});

//comment post
router.post("/:postId/comment", isAuthenticated, async (req, res) => {
  try {
    const postId = req.params.postId;
    const user_id = req.session.user.id;
    const commentContent = req.body.content;

    if (!postId || !user_id)
      return res.json({ status: 0, message: "Missing ids!", code: 404 });

    if (!commentContent)
      return res.json({
        status: 0,
        message: "Missing content of the comment!",
        code: 404,
      });

    const newPost = await Post.query().findById(postId);
    if (!newPost) {
      return res.json({ status: 0, message: "Post does not exist!" });
    }

    const oldComment = await Comment.query()
      .select()
      .where({
        post_id: JSON.parse(postId),
        user_id: user_id,
        content: commentContent,
      })
      .limit(1);

    if (oldComment[0]) {
      return res.json({ status: 0, message: "Comment already exists!" });
    }

    const addedComment = {
      post_id: JSON.parse(postId),
      user_id,
      content: commentContent,
    };

    const newComment = await Comment.query().insertGraph(addedComment);
    if (!newComment) {
      return res.json({ status: 0, message: "Could not comment on post!" });
    }
    return res.json({
      status: 1,
      message: "Comment added successfully!",
      data: newComment,
    });
  } catch (err) {
    return res.json({ status: 0, message: "Error commenting on post!" });
  }
});

//delete comment
router.delete(
  "/:commentId/deletecomment",
  isAuthenticated,
  async (req, res) => {
    try {
      const commentId = req.params.commentId;
      const user_id = req.session.user.id;
      if (!commentId || !user_id)
        return res.json({ status: 0, message: "Missing ids!", code: 404 });

      const oldComment = await Comment.query().findById(commentId);
      if (!oldComment) {
        return res.json({ status: 0, message: "Comment does not exist!" });
      }

      const noComment = await Comment.query().deleteById(commentId);
      if (!noComment) {
        return res.json({ status: 0, message: "Could not delete comment!" });
      }
      return res.json({
        status: 1,
        message: "Comment deleted successfully!",
      });
    } catch (err) {
      return res.json({ status: 0, message: "Error deleting comment!" });
    }
  }
);

module.exports = router;
