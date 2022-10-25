const express = require("express");
const { protect } = require("../Controllers/AuthController");
const router = express.Router();
const productController = require("../Controllers/ProductController");


// for products
router
  .route("/")
  .get(protect ,productController.getAllProduct)
  .post(protect,productController.createProduct)
  .delete(protect,productController.deleteAllProduct)
  

  // for homeScreen products
  router 
  .route("/home")
  .get(protect,productController.getHomeProducts)


  // this is for homescreen items (category,brand,etc) for individual product another route would be used
  router 
  .route("/queryHomeItem")
  .get(protect,productController.queryHomeItem)


  // for particular product

  router
  .route("/:id")
  .get(protect,productController.getOneProduct)
  .patch(protect,productController.updateProduct)
  .delete(protect,productController.deleteSingleProduct)
 

module.exports = router;
