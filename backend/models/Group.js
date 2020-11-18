const { Model } = require("objection");
const Enrollment = require(__dirname + "/./Enrollment.js");

class Group extends Model {
  static get tableName() {
    return "groups";
  }

  // ====================== ADD SCHEMA ======================
  static get jsonSchema() {
    return {
      type: "object",
      required: ["group_name", "image"],

      properties: {
        group_id: { type: "integer" },

        group_name: { type: "string" },
        image: {
          type: "string",
          minLength: 36,
          maxLength: 41,
        },
      },
    };
  }

  // ====================== ADD RELATIONS ======================
  static get relationMappings() {
    return {
      enrollments: {
        relation: Model.HasManyRelation,
        modelClass: Enrollment,
        join: {
          from: "groups.group_id",
          to: "enrollments.group_id",
        },
      },
    };
  }
}

module.exports = Group;
