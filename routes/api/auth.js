const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

// Item model
const User = require("../../models/Users");

//@route POST api/auth
//@desc Authenticate
//@acess public
router.post("/", (req, res) => {
  const { email, password } = req.body;
  if (!email | !password)
    return res.status(400).json({ msg: "please enter all field" });

  User.findOne({ email }).then(user => {
    if (!user) return res.status(400).json({ msg: " User does not exist" });
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) return res.status(400).json({ msg: "invalid credential" });
      jwt.sign(
        { id: user.id },
        process.env.JWT_SECRECT,
        { expiresIn: 3600 * 24 * 30 },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              id: user.id,
              email: user.email,
              name: user.name
            }
          });
        }
      );
    });
  });
});

// @route GET api/auth/user
// @desc get user data
// @access private
router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select(["-password"])
    .then(user => res.json(user));
});

module.exports = router;
