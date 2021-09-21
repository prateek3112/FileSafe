const mongoose = require('mongoose');
const env = require('dotenv');
env.config({path : './config.env'});
const Db = process.env.DB;

mongoose.connect(Db,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:false
}).then(()=>{
    console.log("connection succesfull");
}).catch((err)=>{
    console.log(err);
});