const jwt = require("jsonwebtoken");
require("../db/connection");
const bcrypt = require("bcrypt");
const User = require("../models/userSchema");


const authenticate = async(req,res,next)=>{

    try{

        const token = req.cookies.token;
        
        const verifyToken = jwt.verify(token,process.env.SECRET);

        const rootUser = await User.findOne({_id : verifyToken._id, "tokens.token" : token});

        if(!rootUser){ throw new Error("Can't Authenticate!")}

        req.token = token;
        req.rootUser = rootUser;
        req.userId = rootUser._id;

        next();

    }catch(ex){
        res.status(401).send("Unauthorized Request!!!")
        console.log(ex);
        
    }

}

module.exports = authenticate;