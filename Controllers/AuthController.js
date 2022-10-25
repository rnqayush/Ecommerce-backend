const jwt = require("jsonwebtoken");
const { promisify } = require('util');
const User = require("../Models/UserModel");
exports.createSendToken = (user, statusCode, res) => {
   
  const id = user._id;

  const Token = jwt.sign({ id },process.env.JWT_KEY , {
    expiresIn: 24 * 60 * 60 * 1000,
  });
  const cookieOptions = {
    expires: new Date(Date.now()+1 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  res.cookie("jwt", Token, cookieOptions);
  // Remove password from output
  user.password = undefined;
  res.status(statusCode).json({
    status: "success",
    Token,
    data: {
      user,
    },
  });
};

exports.protect = async (req, res, next) => {
    // 1) Getting token and check of it's there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }
  
    if (!token) {
        return res.end('You are not logged in! Please log in to get access.')
      
    }
  
    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_KEY);
  
    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.end("login error")
      
    }
  
 
  
    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    next();
  };
