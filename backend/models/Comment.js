const { Model } = require("objection");
const User = require(__dirname + "/./User.js");
const Post = require(__dirname + "/./Post.js");

class Comment extends Model {
  static get tableName() {
    return "comments";
  }

  // ====================== ADD SCHEMA ======================
  static get jsonSchema() {
    return {
      type: "object",
      required: ["user_id", "post_id", "content"],

      properties: {
        comment_id: { type: "integer" },

        user_id: { type: "integer" },
        post_id: { type: "integer" },
        content: { type: "string" },
      },
    };
  }

  // ====================== ADD RELATIONS ======================
  static get relationMappings() {
    return {
      users: {
        relation: Model.HasManyRelation,
        modelClass: User,
        join: {
          from: "comments.comment_id",
          to: "users.comment_id",
        },
      },

      posts: {
        relation: Model.HasManyRelation,
        modelClass: Post,
        join: {
          from: "comments.comment_id",
          to: "posts.comment_id",
        },
      },
    };
  }
}

module.exports = Comment;
