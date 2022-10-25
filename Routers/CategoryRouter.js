const express = require("express");
const router = express.Router();
const categoryController = require("../Controllers/CategoryController");

router
  .route("/")
  .get(categoryController.getAllCategory)
  .post(categoryController.createCategory)
  .delete(categoryController.deleteAllCategory)
  
//   router 
//   .route("/all")
//   .get(productController.getAllProduct)


  router
  .route("/:id")
  .get(categoryController.getOneCategory)
  .patch(categoryController.updateCategory)
  .delete(categoryController.deleteSingleCategory)
 

module.exports = router;