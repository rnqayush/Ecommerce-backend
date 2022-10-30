const Category = require("../Models/CategoryModel");
const Product = require("../Models/ProductModel");

exports.getAllProduct = async (req, res) => {
  const allProducts = await Product.find();
  const totalCount = allProducts.length;
  res.status(200).json({
    data: allProducts,
    totalCount: totalCount,
  });
};

exports.createProduct = async (req, res) => {
  try {
    const data = await Product.create(req.body);
    res.status(200).json({
      status: "success",
      data: data,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error,
    });
  }
};
exports.getOneProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.end("No product found");
    res.status(201).json({
      status: "success",
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error,
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedProduct) return res.end("No product to update");
    res.status(201).json({
      status: "success",
      data: updatedProduct,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error,
    });
  }
};

exports.deleteSingleProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.end("No product to update");
    res.status(201).json({
      status: "success",
      data: deletedProduct,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error,
    });
  }
};
exports.deleteAllProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.remove({});
    res.status(201).json({
      status: "success",
      data: deletedProduct,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error,
    });
  }
};

exports.getHomeProducts = async (req, res) => {
  console.log(req.user);
  try {
    const byTopBrand = await Product.aggregate([
      {
        $sort: { brandPopularity: 1 },
      },
      {
        $project: {
          brand: 1,
          brandPopularity: 1,
        },
      },
    ]);
    const byCategory = await Product.aggregate([
      {
        $project: {
          category: 1,
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "categoryDetails",
        },
      },
      {
        $project: {
          category: 0,
        },
      },
      {
        $unwind: "$categoryDetails",
      },
    ]);

    const bestPriceTopBrands = await Product.aggregate([
      {
        $match: { brandPopularity: "high" },
      },
      {
        $sort: {
          productPrice: 1,
        },
      },
      {
        $project: {
          brand: 1,
          brandPopularity: 1,
          productPrice: 1,
        },
      },
    ]);
    const bestDiscount = await Category.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "category",
          as: "categoryProduct",
        },
      },
      {
        $project: {
          categoryName: 1,
          categoryProduct: 1,
        },
      },
      {
        $unwind: "$categoryProduct",
      },
      {
        $group: {
          _id: "$_id",
          categoryName: { $first: "$categoryName" },
          discountsUpto: { $max: "$categoryProduct.discount" },
        },
      },
    ]);
    const shopNowList = await Product.find({});
    const homeData = {
      byTopBrand: byTopBrand,
      byCategory: byCategory,
      bestPriceTopBrands: bestPriceTopBrands,
      bestDiscount: bestDiscount,
      shopNowList: shopNowList,
    };
    res.status(200).json({
      status: "success",
      data: homeData,
    });
  } catch (error) {
    res.status(400).json({
      status: "fails",
      message: error.message,
    });
  }
};

exports.queryHomeItem = async (req, res) => {
  try {
    const queryStr = { ...req.query };
    const { sort } = req.query;
    var allProducts = Product.find(queryStr); // do not use await if you want to extend its functionality
    allProducts = await allProducts.sort(sort); //see here we are extending sort functionality then using await to get data
    
    res.status(200).json({
      status: "success",
      data: {
        data: allProducts,
        count: allProducts.length,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fails",
      message: error.message,
    });
  }
};

// below function is same as above.... we didnot know its use so went so long

// exports.queryHomeItem = async (req, res) => {
//   try {
//     let allProducts = [];
//     let similarProduct=[]
//     //products based on clicked category
//     if (mongoose.isValidObjectId(req.query.categoryId)) {
//       allProducts = await Product.find({}).where({
//         category: req.query.categoryId,

//       }
//       )

//       similarProduct= await Category.aggregate([
//         {
//           $match:{_id:{$ne:mongoose.Types.ObjectId(req.query.categoryId)}}
//         },
//         {
//           $lookup:{
//             from:'products',
//             localField:'_id',
//             foreignField:'category',
//             as:"similarProducts"
//           }
//         },{
//           $unwind:"$similarProducts"
//         },
//         {
//           $group:{
//             _id:"",
//             product:{$push:'$similarProducts'}
//           }
//         },{
//           $unwind:"$product"
//         },{
//           $project:{
//             _id:0
//           }
//         }
//       ])

//     }
//      //products based on clicked brand
//     if (req.query.brandName) {
//       allProducts = await Product.aggregate([
//         {
//           $match: { brand: req.query.brandName },
//         },
//       ]);

//      similarProduct = await Product.aggregate([
//         {
//           $match: { brandPopularity: "high" },
//         },
//       ]);

//     }

//     //products based on discount category
//     if (req.query.sortCategory) {
//       allProducts = await Product.aggregate([
//         {
//           $match: { category: mongoose.Types.ObjectId(req.query.sortCategory)},
//         },
//         {
//           $sort:{
//             discount:-1
//           }
//         }
//       ]);

//      similarProduct = await Product.aggregate([
//         {
//           $match: { category: {$ne:mongoose.Types.ObjectId(req.query.sortCategory)} },
//         },
//         {
//           $sort:{
//             discount:-1
//           }
//         }
//       ]);

//     }

//     const totalCount = allProducts.length;
//     const productData={
//       clickedProduct:allProducts,
//       similarProduct:similarProduct
//     }
//     res.status(200).json({
//       data:productData ,
//       totalCount: totalCount,
//     });
//   } catch (error) {
//     res.status(200).json({
//       status: "fail",
//       message: error.message,
//     });
//   }
// };
