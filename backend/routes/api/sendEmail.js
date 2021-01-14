const router = require("express").Router();
const User = require(__dirname + "/../../models/User");
const { isAuthenticated } = require(__dirname + "/../../helpers/auth");
const nodemailer = require("nodemailer");

router.post("/administration", isAuthenticated, async (req, res) => {
  try {
    if (!req.session.user) {
      return res.json({ status: 0, message: "Missing user!" });
    }

    if (!req.body.message || !req.body.subject) {
      return res.json({ status: 0, message: "Missing fields!" });
    }

    const users = await User.query()
      .select()
      .where({ email: req.session.user.email })
      .limit(1);
    const user = users[0];
    if (!user) {
      return res.json({ status: 0, message: "User not in database!" });
    }

    var transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "testkea03@gmail.com",
        pass: "gronjordsbuddy",
      },
    });
    var mailOptions = {
      from: "testkea03@gmail.com",
      to: "diana.morariu@gmail.com, Administration <administration@gmail.com>",
      subject: `${user.first_name} ${user.last_name} - ${user.email} Room: ${user.room} - Subject - ${req.body.subject}`,
      text: `${req.body.message}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.json({ status: 0, message: "Error transporting email!" });
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    return res.json({ status: 1, message: "Email sent successfully!" });
  } catch (err) {
    return res.json({ status: 0, message: "Error sending email!" });
  }
});

router.post("/blamaend", isAuthenticated, async (req, res) => {
  try {
    if (!req.session.user) {
      return res.json({ status: 0, message: "Missing user!" });
    }

    if (!req.body.message || !req.body.subject) {
      return res.json({ status: 0, message: "Missing fields!" });
    }

    const users = await User.query()
      .select()
      .where({ email: req.session.user.email })
      .limit(1);
    const user = users[0];
    if (!user) {
      return res.json({ status: 0, message: "User not in database!" });
    }

    var transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "testkea03@gmail.com",
        pass: "gronjordsbuddy",
      },
    });
    var mailOptions = {
      from: "testkea03@gmail.com",
      to: "diana.morariu@gmail.com, Blåmænd <blamaend@gmail.com>",
      subject: `${user.first_name} ${user.last_name} - ${user.email} Room: ${user.room} - Subject - ${req.body.subject}`,
      text: `${req.body.message}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.json({ status: 0, message: "Error transporting email!" });
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    return res.json({ status: 1, message: "Email sent successfully!" });
  } catch (err) {
    return res.json({ status: 0, message: "Error sending email!" });
  }
});

module.exports = router;
