const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: [true, "Product Name is required"],
  },
  productDescription: {
    type: String,
  },
  discount:{
    type:Number
  },
  Images: [
    {
      type: String,
      required: [true, "Image is required to upload"],
    },
  ],
  productPrice: {
    type: Number,
    required: [true, "Product Name is required"],
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Category',
    required:[true,"product must have category"],
  
  },
  Reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  quantity: {
    type: Number,
  },
  brand:{
    type: String,
  },
  brandPopularity:{
    type:String
  },
 
 
},{
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})





const Product = mongoose.model("Product", productSchema);

module.exports = Product;
