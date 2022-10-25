const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userController");



// for users
router
  .route("/")
  .get(userController.getAllUser)

  
router.post("/signup",userController.createUser)
router.post("/login",userController.login)



module.exports = router;
