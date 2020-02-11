const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControllers");

router.get("/", userController.getAllUser);
router.post("/register", userController.register);
router.post("/login", userController.login);
router.put("/update/:id", userController.updateProfile);
router.post("/delete/:id", userController.deleteProfile);
module.exports = router;
