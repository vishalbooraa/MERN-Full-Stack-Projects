const {Schema}=require("mongoose")
const bcrypt=require("bcryptjs")

const userSchema=new Schema({
    username:{type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }
});



userSchema.pre("save",async function(){
    this.password= await bcrypt.hash(this.password,12);
})

module.exports={userSchema}