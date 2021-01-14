const app = require("express")();

const usersRoute = require(__dirname + "/./api/users");
const postsRoute = require(__dirname + "/./api/posts");
const groupsRoute = require(__dirname + "/./api/groups.js");
const emailsRoute = require(__dirname + "/./api/sendEmail.js");

app.use("/users", usersRoute);
app.use("/posts", postsRoute);
app.use("/groups", groupsRoute);
app.use("/sendEmail", emailsRoute);

module.exports = app;
