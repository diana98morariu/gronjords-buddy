const { Model } = require("objection");
const Like = require(__dirname + "/./Like.js");
const Comment = require(__dirname + "/./Comment.js");
const User = require(__dirname + "/./User.js");

class Post extends Model {
  static get tableName() {
    return "posts";
  }

  // ====================== ADD SCHEMA ======================
  static get jsonSchema() {
    return {
      type: "object",
      required: ["title", "content"],

      properties: {
        post_id: { type: "integer" },

        title: { type: "string" },
        content: { type: "string" },

        price: {
          type: "integer",
          maxLength: 4,
        },
        from_date: {
          type: "string",
          minLength: 10,
          maxLength: 10,
          pattern: "[0-9]{4}-{1}[0-9]{2}-{1}[0-9]{2}$",
        },
        to_date: {
          type: "string",
          minLength: 10,
          maxLength: 10,
          pattern: "[0-9]{4}-{1}[0-9]{2}-{1}[0-9]{2}$",
        },
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
          from: "posts.post_id",
          to: "users.post_id",
        },
      },

      likes: {
        relation: Model.HasManyRelation,
        modelClass: Like,
        join: {
          from: "posts.post_id",
          to: "likes.post_id",
        },
      },

      comments: {
        relation: Model.HasManyRelation,
        modelClass: Comment,
        join: {
          from: "posts.post_id",
          to: "comments.post_id",
        },
      },
    };
  }
}

module.exports = Post;
