const Category = require("../Models/CategoryModel");

exports.getAllCategory = async (req, res) => {
  try {
    const allCategory = await Category.find();
    const totalCount=await Category.countDocuments({})
    if (!allCategory) return res.end("No Category found");
    res.status(200).json({
      data: allCategory,
      totalCount:totalCount
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error,
    });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const { categoryName, categoryImage, subCategory } = req.body;

    const category = Category.find({ categoryName: categoryName });
    if (!category) return res.end("Already Present");

    const categoryObj = {
      categoryName: categoryName,
      categoryImage: categoryImage,
      subCategory: subCategory,
    };
    const data = await Category.create(categoryObj);
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
exports.getOneCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.end("No category found");
    res.status(201).json({
      status: "success",
      data: category,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error,
    });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      {
        $push: { subCategory: req.body.subCategory },
      },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedCategory) return res.end("No category to update");
    res.status(201).json({
      status: "success",
      data: updatedCategory,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error,
    });
  }
};

exports.deleteSingleCategory = async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (!deletedCategory) return res.end("No category to update");
    res.status(201).json({
      status: "success",
      data: deletedCategory,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error,
    });
  }
};
exports.deleteAllCategory = async (req, res) => {
  try {
    const deletedCategory = await Category.remove({});
    res.status(201).json({
      status: "success",
      data: deletedCategory,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error,
    });
  }
};
