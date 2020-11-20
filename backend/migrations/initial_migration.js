exports.up = function (knex) {
  return knex.schema
    .createTable("users", (table) => {
      table.increments("id").primary();
      table.string("first_name").notNullable();
      table.string("last_name").notNullable();
      table.date("birthdate").notNullable();
      table.string("phone_nr").notNullable();
      table.string("image");
      table.integer("room").notNullable();
      table.string("email").unique().notNullable();
      table.string("password").notNullable();
      table.datetime("reset_pass_time");
      table.string("activate_or_reset_pass_key").notNullable();
      table.boolean("admin").notNullable().defaultTo(false);
      table.timestamp("created_at").defaultTo(knex.fn.now());
    })

    .createTable("groups", (table) => {
      table.increments("id").primary();
      table.string("group_name").notNullable();
      table.string("image").notNullable();
    })

    .createTable("enrollments", (table) => {
      table.increments("id").primary();
      table.integer("user_id").unsigned().notNullable();
      table
        .foreign("user_id")
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table.integer("group_id").unsigned().notNullable();
      table
        .foreign("group_id")
        .references("id")
        .inTable("groups")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })

    .createTable("posts", (table) => {
      table.increments("id").primary();
      table.string("title").notNullable();
      table.string("content", 1500).notNullable();
      table.date("from_date");
      table.date("to_date");
      table.integer("price");
      table.json("images");
      table.boolean("available").defaultTo(true);
      table.integer("group_id").unsigned().notNullable();
      table
        .foreign("group_id")
        .references("id")
        .inTable("groups")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table.integer("user_id").unsigned().notNullable();
      table
        .foreign("user_id")
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table.timestamp("created_at").defaultTo(knex.fn.now());
    })

    .createTable("likes", (table) => {
      table.increments("id").primary();
      table.integer("user_id").unsigned().notNullable();
      table
        .foreign("user_id")
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table.integer("post_id").unsigned().notNullable();
      table
        .foreign("post_id")
        .references("id")
        .inTable("posts")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })

    .createTable("comments", (table) => {
      table.increments("id").primary();
      table.string("content").notNullable();
      table.integer("user_id").unsigned().notNullable();
      table
        .foreign("user_id")
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table.integer("post_id").unsigned().notNullable();
      table
        .foreign("post_id")
        .references("id")
        .inTable("posts")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table.timestamp("created_at").defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("likes")
    .dropTableIfExists("comments")
    .dropTableIfExists("posts")
    .dropTableIfExists("enrollments")
    .dropTableIfExists("groups")
    .dropTableIfExists("users");
};
