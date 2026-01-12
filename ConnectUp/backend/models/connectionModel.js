import mongoose from "mongoose";

const connectionRequestSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    connectionId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    status_accepted:{
        type:Boolean,
        default:null
    }
});

const ConnectionRequestModel=mongoose.model("ConnectionRequest",connectionRequestSchema);
export default ConnectionRequestModel;
