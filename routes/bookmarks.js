var express = require("express");
var router = express.Router();
const User = require("../models/users");

// route add bookmarks

router.get("/bookmarksPerUser/:userId", (req, res) => {
  User.find({
    _id: req.params.userId,
  }).then((data) => {
    res.json({
      data: data[0].bookmarks
    });
  });
});

let bookmarks = [];
router.post("/addBookmark/:userId", (req, res) => {
  const userId = req.params.userId;
  const title = req.body.title;

  // Rechercher l'utilisateur par son ID
  User.findById(userId, (err, user) => {
    if (err) {
      res.status(500).send(err);
    } else {
      if (user.bookmarks.includes(title)) {
         res.json({

          result:false,
          message:'Ce titre est deja dans votre bookmark'
        })
      }
      user.bookmarks.push(title);
      user.save((err) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.json({
            result:true,
            message:'Ce titre a été ajouté avec succés'
          })
        }
      });
    }
  });
});



module.exports = router;
