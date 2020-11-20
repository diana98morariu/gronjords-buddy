const app = require("express")();

const usersRoute = require(__dirname + "/./api/users");

app.use("/users", usersRoute);

module.exports = app;
