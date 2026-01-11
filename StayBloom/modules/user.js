const mongoose= require('mongoose');
const Schema = mongoose.Schema;
const passpportLocalMongoose = require("passport-local-mongoose")

const userSchema= new Schema({
    email :{
        type:String,
        required : true
    }
})

userSchema.plugin(passpportLocalMongoose);
module.exports= mongoose.model("User",userSchema);