var express = require("express");
var router = express.Router();

const bcrypt = require("bcrypt");
const uid2 = require("uid2");

const User = require("../models/users");

const { checkBody } = require("../modules/checkBody");

//ROUTES USERS

router.get("/", (req, res) => {
  res.json({
    message: "Route users",
  });
});
router.post("/signup", (req, res) => {
  if (!checkBody(req.body, ["username", "password", "email"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }

  User.findOne({
    $or: [{ email: req.body.email }, { username: req.body.username }],
  }).then((data) => {
    if (data === null) {
      const hash = bcrypt.hashSync(req.body.password, 10);
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hash,
        token: uid2(32),
      });
      newUser.save().then((newDoc) => {
        res.json({ result: true, token: newDoc.token });
      });
    } else {
      res.json({ result: false, message: "Un utilisaeur existe déja" });
    }
  });
});

router.post("/signin", (req, res) => {
  if (!checkBody(req.body, ["username", "password"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }

  User.findOne({ username: req.body.username }).then((data) => {
    if (data && bcrypt.compareSync(req.body.password, data.password)) {
      res.json({ result: true, message: "Bienvenue", data });
    } else {
      res.json({
        result: false,
        message: "L'utilisateur n'a pas été trouvé ou mauvais mot de passe ",
      });
    }
  });
});

module.exports = router;
