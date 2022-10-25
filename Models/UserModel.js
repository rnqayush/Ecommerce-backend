const mongoose = require("mongoose");

const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "name is required"],
  },
  email: {
    type: String,
  },
  userImage: {
    type: String,
  },
  password: {
    type: String,
  },
  confirmPassword: {
    type: String,
    required: [true, "Please confirm password"],
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: "Confirm Password did not match ",
    },
  },
  role: {
    type:String,
    enum: ["user", "admin"],
    default: "user",
  },
  accountCreatedAt:String,
  accountActive:{
    type:Boolean
  }
});


userSchema.pre('save', async function(next) {
  // Only run this function if password was actually modified
 // if (!this.isModified('password')) return next();

  // Hash the password with cost of 10
  this.password = await bcrypt.hash (this.password, 10);
  console.log(this.password);
  // Delete passwordConfirm field
  this.confirmPassword = undefined;
  next();
});


userSchema.methods.correctPassword = async function(
  enteredPassword,
  passwordInDb
) {
  return await bcrypt.compare(enteredPassword, passwordInDb);
};


const User = mongoose.model("User", userSchema);

module.exports = User;