const { Model } = require("objection");
const Enrollment = require(__dirname + "/./Enrollment.js");
const Like = require(__dirname + "/./Like.js");
const Comment = require(__dirname + "/./Comment.js");
const Post = require(__dirname + "/./Post.js");

class User extends Model {
  static get tableName() {
    return "users";
  }

  // ====================== ADD SCHEMA ======================
  static get jsonSchema() {
    return {
      type: "object",
      required: [
        "first_name",
        "last_name",
        "birthdate",
        "email",
        "password",
        "activate_or_reset_pass_key",
        "phone_nr",
        "room",
      ],

      properties: {
        user_id: { type: "integer" },

        first_name: { type: "string", minLength: 2, maxLength: 50 },
        last_name: { type: "string", minLength: 2, maxLength: 50 },

        birthdate: {
          type: "string",
          minLength: 10,
          maxLength: 10,
          pattern: "[0-9]{4}-{1}[0-9]{2}-{1}[0-9]{2}$",
        },
        phone_nr: {
          type: "string",
          minLength: 8,
          maxLength: 20,
        },
        image: {
          type: "string",
          minLength: 5,
          maxLength: 41,
        },
        room: {
          type: "integer",
          minLength: 4,
          maxLength: 4,
        },

        email: {
          type: "string",
          format: "email",
          maxLength: 254,
          errorMessage: { format: "Invalid email" },
        },

        password: { type: "string", minLength: 6, maxLength: 80 },
        activate_or_reset_pass_key: {
          type: "string",
          minLength: 36,
          maxLength: 36,
        },
      },
    };
  }

  // ====================== ADD RELATIONS ======================
  static get relationMappings() {
    return {
      posts: {
        relation: Model.HasManyRelation,
        modelClass: Post,
        join: {
          from: "users.user_id",
          to: "posts.user_id",
        },
      },

      likes: {
        relation: Model.HasManyRelation,
        modelClass: Like,
        join: {
          from: "users.user_id",
          to: "likes.user_id",
        },
      },

      comments: {
        relation: Model.HasManyRelation,
        modelClass: Comment,
        join: {
          from: "users.user_id",
          to: "comments.user_id",
        },
      },

      enrollments: {
        relation: Model.HasManyRelation,
        modelClass: Enrollment,
        join: {
          from: "users.user_id",
          to: "enrollments.user_id",
        },
      },
    };
  }
}

module.exports = User;
