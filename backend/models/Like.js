const { Model } = require("objection");
const User = require(__dirname + "/./User.js");
const Post = require(__dirname + "/./Post.js");

class Like extends Model {
  static get tableName() {
    return "likes";
  }

  // ====================== ADD SCHEMA ======================
  static get jsonSchema() {
    return {
      type: "object",
      required: ["user_id", "post_id"],

      properties: {
        like_id: { type: "integer" },

        user_id: { type: "integer" },
        post_id: { type: "integer" },
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
          from: "likes.like_id",
          to: "users.like_id",
        },
      },

      posts: {
        relation: Model.HasManyRelation,
        modelClass: Post,
        join: {
          from: "likes.like_id",
          to: "posts.like_id",
        },
      },
    };
  }
}

module.exports = Like;
