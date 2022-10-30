const User = require("../Models/UserModel");
const { createSendToken } = require("./AuthController");

exports.getAllUser = async (req, res) => {
  try {
    const allUserList = await User.find({});
    res.status(200).json({
      status: "success",
      data: allUserList,
    });
  } catch (error) {
    res.status(200).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.createUser = async (req, res) => {
  try {
    //   
    const { userName, email, userImage, password, confirmPassword } = req.body;
    const saveUserObj = {
      userName,
      email,
      userImage,
      password,
      confirmPassword,
    };
   
    const userData = await User.create(saveUserObj);
    createSendToken(userData,200,res)
     
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};

exports.login = async (req, res, next) => {
    const { email, password } = req.body;
  
    // 1) Check if email and password exist
    if (!email || !password) {
      return res.status(400).end("Enter all fields")
    }
    // 2) Check if user exists && password is correct
    const user = await User.findOne({ email }).select('+password');
  
    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(400).end("Please enter correct user name or password")
    }
  
    // 3) If everything ok, send token to client
    createSendToken(user, 200, res);
  };

  exports.userCartItem = async (req, res, next) => {
    try {
      const {userCartItem,_id}=req.user
      const {productId}=req.body
       userCartItem.push(productId)
       const updatedUser = await User.findByIdAndUpdate(_id,{
        $push: { userCartItem: req.body.productId }},{
          new:true
        }
      )
       res.status(200).json(updatedUser)
      
    } catch (error) {
      res.status(400).json(error.message)
    }
  
  };


