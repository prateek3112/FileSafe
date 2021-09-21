const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const env = require("dotenv");
env.config({ path: "./config.env" });

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  cpassword: { type: String, required: true },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  files :[
   { 
     
    name : {
      type: String
    },
    
    file : {
      type: String
    },
    createdAt:{
      type:String
    }
    
  }
  ]

});

//hashing

userSchema.pre("save", async function (next) {
  // only hash the password if it has been modified (or is new)
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    this.cpassword = await bcrypt.hash(this.cpassword, 12);

    next();
  }
});

//generating Auth Token
userSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.SECRET);
    this.tokens = this.tokens.concat({ token: token });
   await this.save();
   return token;
  } catch (err) {
    console.log(err);
  }
};

userSchema.methods.addfile = async function (res){
  try {
    
  console.log("Response is",res.uploadResponse);
  console.log("fileData is",res.fileData);

  this.files = this.files.concat({name : res.fileData.name, file : res.uploadResponse.url, createdAt : res.uploadResponse.created_at});
  await this.save();
  
  } catch (error) {
    console.log(error);
  }
}

const User = mongoose.model("USER", userSchema);

module.exports = User;
