// ====================== IMPORTS ======================
const express = require("express");
// const bodyParser = require("body-parser");
const app = express();
// const helmet = require("helmet");
const { Model } = require("objection");
const Knex = require("knex");
const knexFile = require(__dirname + "/knexfile");
const session = require("express-session");
const KnexStore = require("connect-session-knex")(session);
const { sessionKey, serverPORT, clientEndpoint } = require(__dirname +
  "/config/otherConfigs");
const routes = require(__dirname + "/routes/routes.js");

const client = process.env.CLIENT || clientEndpoint;

// ====================== MIDDLEWARE ======================
app.use(express.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(express.json()); // parse application/json

// ====================== HELMET ======================
// app.use(helmet());

// ====================== CORS HEADERS ======================
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Methods",
    "POST,GET,OPTIONS,PUT,DELETE, PATCH"
  );
  next();
});

// ====================== KNEX & OBJECTION SETUP ======================
const knex = Knex(knexFile.development);
Model.knex(knex);

// ====================== CREATE SESSIONS WITH KNEX ======================
const store = new KnexStore({ knex });

// ====================== SETUP SESSIONS ======================
app.use(
  session({
    secret: process.env.SESSION || sessionKey,
    name: "user_sid",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 120000 * 600000,
    },
    store,
  })
);

// ====================== ADD ROUTES ======================
app.use("/api", routes);

// ====================== CREATE SERVER ======================
const PORT = process.env.PORT || serverPORT;
app.listen(PORT, (err) =>
  err
    ? console.log("Server ERROR...")
    : console.log("Server listening on port: " + PORT)
);
