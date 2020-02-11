const express = require("express");
const app = express();
const logger = require("morgan");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");

require("dotenv").config();
const port = process.env.PORT || "3000";

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch(err => {
    console.log(`Mongo Error: ${err}`);
  });
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", userRoutes);

app.put("/update/:id", (req, res) => {
  return new Promise((resolve, reject) => {
    User.findById(req.params.id)
      .then(user => {
        const { name, email } = req.body;
        user.name = name ? name : user.name;
        user.email = email ? email : user.email;
        user.save();
        then(user => {
          return res.status(200).json({ message: "User updated", user });
        }).catch(err => {
          reject(err);
        });
      })
      .catch(err => {
        res.status(500).json({ message: "Server error", err });
      });
  });
});

app.delete("/delete/:id", (req, res) => {
  return new Promise((resolve, reject) => {
    User.findByIdAndDelete({ _id: req.params.id })
      .then(user => {
        return res.status(200).json({ message: "User deleted", user });
      })
      .catch(err => {
        res.status(400).json({ message: "No user to delete" });
      });
  });
});
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});

// Place the getAllUsers route in the routes file not the controller
// Controller names:
// register
// login
// updateProfile
// deleteProfile
// Routes:
// api/users   this one is for the getAllUsers route
// api/users/register
// api/users/login
// api/users/updateProfile
// api/users/deleteProfile (edited)
