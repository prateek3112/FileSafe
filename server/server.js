const env = require('dotenv');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('./db/connection');
const fileUpload = require('express-fileupload');
const cookieParser = require("cookie-parser");

app.use(cookieParser());

app.use(express.json({limit:'100mb'}));

app.use(express.urlencoded({limit:'100mb',extended:true}));

// default options
app.use(fileUpload());
app.use(express.static("uploads"));

env.config({path : './config.env'});

const port = process.env.PORT;

// const User = require('./models/userSchema');
//Middleware

app.use(require('./routes/auth'));

const middleware = (req,res,next)=> {
console.log('Middleware called!');
next();
}

app.listen(port,()=>{
    console.log("Hey!")
});

