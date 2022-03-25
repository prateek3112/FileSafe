const express = require("express");
const jwt = require("jsonwebtoken");
require("../db/connection");
const bcrypt = require("bcrypt");
const User = require("../models/userSchema");
const router = express.Router();
const authenticate = require('../middleware/authenticate');
path = require('path');
const {cloudinary} = require('../cloudinary');



router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ Error: "Enter the Details" });
  }
  try {
    const user = await User.findOne({ email: email });

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);

     
      if (isMatch) {
        const token = await user.generateAuthToken();
        console.log(token);
        res.cookie('token',token,{
            expires: new Date(Date.now() + 900000),
            httpOnly:false
        });
        
        return res.status(200).json({ message: "Login Succesfull" });
      } else {
        return res.status(500).json({ Error: "Please Enter Correct Creds!" });
      }
    }

    return res.status(422).json({ Error: "User Does not Exist" });
  } catch (err) {
    res.status(500).json({ err });
  }
});
router.post("/register", async (req, res) => {
  const { name, email, password, cpassword } = req.body;
  if (!name || !email || !password || !cpassword) {
    return res.status(422).json({ Error: "Enter the Details" });
  }

  try {
    
    const userexist = await User.findOne({ email: email });

    if (userexist) {
      return res.status(422).json({ Error: "User already Exist!" });
    }
    if (password !== cpassword) {
      return res.status(422).json({ Error: "Passwords don't match!" });
    }
    const user = new User({ name, email, password, cpassword });

    const userRegistered = await user.save();

    if (userRegistered) {
      res.status(201).json({ message: "User Registered!" });
    }
  } catch (err) {
    res.status(500).json({ err });
  }
});


router.get('/home',authenticate,async (req,res)=>
{

res.send(req.rootUser);
});



router.post("/upload", (req, res) => {
  
  const newpath =  path.join(__dirname, '../uploads/');
  
  const file = req.files.file;
  const filename = file.name;

  file.mv(`${newpath}${filename}`, (err) => {
    if (err) {
      res.status(500).send({ message: "File upload failed", code: 200 });
      console.log(err)
    }
    res.status(200).send({ message: "File Uploaded", code: 200 });
    
  });
});

router.post('/server/upload',authenticate,async (req,res)=>{
  try {
    const fileContent = req.body.data;
    const fileData = (req.body.fileData);
    console.log("File is =>",fileData);
    const uploadResponse = await cloudinary.uploader.upload(fileContent,{
      upload_Preset:'ml_default'
    });
    
    console.log(uploadResponse);
    const user = await User.findOne({_id : req.userId});
    
    if(user){
      await user.addfile({uploadResponse,fileData});

      
    }
    
    res.send({message:"FileUploaded succesfully"});


  } catch (error) {
    console.log(error);
    res.status(500).json({err:"Something went wrong"});
  }
});


router.get('/getData',authenticate,(req,res)=>
{

res.send(req.rootUser);
});


module.exports = router;
