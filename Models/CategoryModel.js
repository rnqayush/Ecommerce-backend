const mongoose = require("mongoose");


const categorySchema = new mongoose.Schema({
    categoryName:{
        type:String,
        required:[true,"Category name is required"],
    },
    categoryImage:{
        type:String,
    },
    subCategory:[String]
})



const Category = mongoose.model("Category", categorySchema);

module.exports = Category;