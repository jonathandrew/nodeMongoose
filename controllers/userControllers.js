const User = require("../models/Users");
const bcrypt = require("bcryptjs");
module.exports = {
  getAllUser: async (req, res) => {
    try {
      const users = await User.find({});
      if (users) {
        return res.status(200).json(users);
      } else {
        return res.status(400).json({ message: "No Users Found" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Server Error" });
    }
  },
  register: (req, res) => {
    return new Promise((resolve, rej) => {
      const { name, email, password } = req.body;
      if (name.length === 0 || email.length === 0 || password.length === 0) {
        return res
          .status(400)
          .json({ message: "All fields must be completed" });
      }
      User.findOne({ email }).then(user => {
        if (user) {
          return res.status(403).json({ message: "User already exists" });
        }
        const newUser = new User();
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        newUser.name = name;
        newUser.email = email;
        newUser.password = hash;
        newUser
          .save()
          .then(user => {
            res.status(200).json({ message: "user is created", user });
          })
          .catch(err => {
            reject(err, "error");
          });
        resolve(user);
      });
    });
  },
  login: (req, res) => {
    return new Promise((resolve, reject) => {
      User.findOne({ email: req.body.email })
        .then(user => {
          bcrypt
            .compare(req.body.password, user.password)
            .then(user => {
              return res.send(
                user === true
                  ? "You are now logged in "
                  : "Incorrct credentials"
              );
            })
            .catch(err => {
              return res.status(400).json({ message: "server error", err });
            });
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};
