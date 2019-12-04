const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Item model
const User = require("../../models/Users");

//@route Get api/users
//@desc Register new users
//@acess public
router.post("/", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email | !password)
    return res.status(400).json({ msg: "please enter all field" });
  User.find({ email }).then(user => {
    if (user.length !== 0)
      return res.status(400).json({ msg: " email has been registered" });
    const newUser = new User({
      name,
      email,
      password
    });
    //Create Salt & hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then(user => {
          jwt.sign(
            { id: user.id },
            process.env.JWT_SECRECT,
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email
                }
              });
            }
          );
        });
      });
    });
  });
});

module.exports = router;
