const mongoose=require("mongoose")
const initData=require("./data.js")
const Listing= require("../modules/listing.js")


main().then(()=>{
    console.log("DB connected")
})

.catch((err)=>{
    console.log(err)
})



async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/StayBloom');
    
}


const initDB= async ()=>{
    await Listing.deleteMany({})
    initData.data=initData.data.map((obj)=>({...obj,owner: '680d7c3f56af6c689fad1fb4'}))
    await Listing.insertMany(initData.data)
    console.log("data saved")
}


initDB();