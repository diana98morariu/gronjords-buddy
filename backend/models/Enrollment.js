const { Model } = require("objection");
const User = require(__dirname + "/./User.js");
const Group = require(__dirname + "/./Group.js");

class Enrollment extends Model {
  static get tableName() {
    return "enrollments";
  }

  // ====================== ADD SCHEMA ======================
  static get jsonSchema() {
    return {
      type: "object",
      required: ["group_id", "user_id"],

      properties: {
        enrollment_id: { type: "integer" },
        group_id: { type: "integer" },
        user_id: { type: "integer" },
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
          from: "enrollments.enrollment_id",
          to: "users.user_id",
        },
      },
      groups: {
        relation: Model.HasManyRelation,
        modelClass: Group,
        join: {
          from: "enrollments.enrollment_id",
          to: "groups.group_id",
        },
      },
    };
  }
}

module.exports = Enrollment;
