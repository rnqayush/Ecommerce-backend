const express = require("express");
const { protect } = require("../Controllers/AuthController");
const router = express.Router();
const userController = require("../Controllers/userController");



// for users
router
  .route("/")
  .get(userController.getAllUser)

  
router.post("/signup",userController.createUser)
router.post("/login",userController.login)
router.patch("/userCartItem",protect,userController.userCartItem)



module.exports = router;
