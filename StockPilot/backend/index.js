require('dotenv').config();
const express= require("express");
const mongoose=require("mongoose");
const {HoldingsModel}= require("./models/HoldingModel")
const {positionModel}=require("./models/positionModel")
const {orderModel}=require("./models/orderModel")
const {watchListModel}=require("./models/watchListModel")
const ExpressError=require("./utility/ExpressError")
const asyncWrap=require("./utility/WrapAsync")
const {orderSchema,sellSchema,signupSchema,loginSChema}=require("./schema")
const {userModel}=require("./models/userModel")
const {createSecretToken}=require("./utility/secretToken")
const bcrypt=require("bcryptjs")
const {verifyUser}=require("./middlewares/verifyUser")
const cookieParser=require("cookie-parser")
const {Server}= require("socket.io")
const http = require("http")


const cors=require("cors")


const PORT= process.env.PORT || 3002;
const url= process.env.MONGO_URL;

const app=express()

const server=http.createServer(app)
const io= new Server(server,{
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true,
    }
})

io.on("connection",(socket)=>{
    console.log("a user connected: ",socket.id)
    socket.on("join-room",(userId)=>{
        console.log("user joined room: ",userId)
        socket.join(userId)
    })
    socket.on("disconnect",()=>{
        console.log("user disconnected")
    })
})



app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:3000",
    credentials:true,
}));
// app.use(bodyParser.json())
app.use(express.json())



async function main() {
    await mongoose.connect(url)
}

main().then(()=>{
    console.log("Connected to MongoDB")
})
.catch((err)=>{
    console.log(err)
})



const validateNewOrder=(req,res,next)=>{
    let {error}=orderSchema.validate(req.body)
    if(error){
        const msg = error.details.map(el => el.message).join(", ");
        console.log(msg)
        throw new ExpressError(400,msg)
    }else{
        next()
    }
}

const validateSellOrder=(req,res,next)=>{
    let {error}=sellSchema.validate(req.body)
    if(error){
        const msg = error.details.map(el => el.message).join(", ");
        throw new ExpressError(400,msg)
    }else{
        next()
    }
}

const validateSignup=(req,res,next)=>{
    let result=signupSchema.validate(req.body)
    console.log(result)
    let {error}=result
    if(error){
        console.log(error.details)
        const msg = error.details.map(el => el.message).join(", ");
        throw new ExpressError(400,msg)
    }
    next() 
}


const validateLogin=(req,res,next)=>{
    let {error}= loginSChema.validate(req.body)
    if(error){
        const msg = error.details.map(el => el.message).join(", ");
        throw new ExpressError(400,msg)
    }
    next()
}


app.post("/signup",validateSignup,asyncWrap(async(req,res)=>{
    const {username,email,password}=req.body
    const existingUser=await userModel.findOne({username})
    if(existingUser){
        throw new ExpressError(400,"username already exists")
    }
    const newUser=new userModel({username,email,password})
    await newUser.save()
    const token=createSecretToken(newUser._id);
    res.cookie("token",token,{
        httpOnly: true,
        sameSite: "Lax",        
        secure: false 
    })
    res.status(200).json({ success: true, message: "User authenticated" });

}))

app.post("/login",validateLogin,asyncWrap(async(req,res)=>{
    const {username,password}=req.body
    const  user=await userModel.findOne({username})
    if(!user){
        throw new ExpressError(400,"Invalid username or password")
    }
    const isValidPassword=await bcrypt.compare(password,user.password)
    if(!isValidPassword){
        throw new ExpressError(400,"Invalid username or password")
    }
    const token=createSecretToken(user._id);
    res.cookie("token",token,{
        httpOnly: true,
        sameSite: "Lax",    
        secure: false 
    })
    res.status(200).json({ success: true, message: "User authenticated" });

}))



app.use(verifyUser)

app.get("/verify",(req,res)=>{
    res.json({success:true,message:"user is verified"})
})

app.get("/getuser",(req,res)=>{
  res.json({success:true,user:req.user})
})


app.get("/logout",(req,res)=>{
    res.clearCookie("token",{
        httpOnly: true,
        sameSite: "Lax",
        secure:false
    });
    res.status(200).json({success:true,message:"logged out"})
})

app.get("/allwatchlists",asyncWrap(async(req,res)=>{
    let allwatchlists=await watchListModel.find({})
    res.json(allwatchlists)
}))

app.get("/allholdings",asyncWrap(async(req,res)=>{
    let allholdings= await HoldingsModel.find({user:req.user._id})
    res.json(allholdings)
}))

app.get("/allpositions",asyncWrap(async(req,res)=>{
    let allpositions= await positionModel.find({})
    res.json(allpositions)
}))


app.get("/allorders",asyncWrap(async(req,res)=>{
    let allorders=await orderModel.find({user:req.user._id})
    res.json(allorders)
}))

app.post("/neworder",validateNewOrder,asyncWrap(async(req,res)=>{
    const newOrder= new orderModel({
        name: req.body.name,
        quantity: req.body.qty,
        price: req.body.price,
        mode: req.body.mode,
        user:req.user._id
    })
    await newOrder.save()
    const watchList= await watchListModel.findOne({name:req.body.name})
    const holding= await HoldingsModel.findOne({name:req.body.name,user:req.user._id})
    if (holding){
        const newQty=Number(req.body.qty)
        const oldQty=Number(holding.qty)
        const newPrice=Number(req.body.price)
        const oldPrice=Number(holding.price)
        const totalQty= newQty+oldQty
        const currPrice= newPrice
        const avgPrice= ((currPrice*newQty)+(oldPrice*oldQty))/totalQty
        const netPercentage=((currPrice*totalQty-avgPrice*totalQty)/(avgPrice*totalQty))*100
        const dayPercentage = oldPrice === 0 ? 0 :  ((newPrice - oldPrice) / oldPrice) * 100;

        holding.qty=totalQty
        holding.price=currPrice
        holding.avg=avgPrice.toFixed(2)
        holding.net=netPercentage.toFixed(2)+"%"
        holding.isLoss= netPercentage<0
        holding.day=dayPercentage.toFixed(2)+"%"
        await holding.save()
        if(watchList){
            watchList.price=currPrice
            watchList.percent=netPercentage.toFixed(2)+"%"
            watchList.isDown=netPercentage<0
            await watchList.save()
        }
    }else{
        const newHolding= new HoldingsModel({
            name: req.body.name,
            qty: req.body.qty,
            price: req.body.price,
            avg: req.body.price,
            net: "0%",
            day: "0%",
            isLoss:false,
            user:req.user._id
        })
        await newHolding.save()
        if(watchList){
            watchList.percent="0%"
            watchList.price=req.body.price,
            watchList.isDown=false
            await watchList.save()
        }
    }
    io.to(req.user._id.toString()).emit("ordersUpdated");
    io.to(req.user._id.toString()).emit("holdingsUpdated");
    io.to(req.user._id.toString()).emit("watchlistUpdated");
    res.status(200).json({ success: true, message: "Buy order placed successfully" });
}))

app.delete("/sellorder",validateSellOrder,asyncWrap(async(req,res)=>{
    const name =req.body.name
    const mode=req.body.mode
    const holding= await HoldingsModel.findOne({name:name,user:req.user._id})

    if(holding){
        const newOrder= new orderModel({
        name:name,
        quantity:holding.qty,
        price: holding.price,
        mode:mode,
        user:req.user._id   
    })
    await newOrder.save()
    await HoldingsModel.findOneAndDelete({name:name,user:req.user._id})
    
    
    io.to(req.user._id.toString()).emit("ordersUpdated");
    io.to(req.user._id.toString()).emit("holdingsUpdated");
    io.to(req.user._id.toString()).emit("watchlistUpdated");

    return res.status(200).json({ success: true, message: "Sell order placed and holding removed" });
    }
    return res.status(200).json({ success: true, message: "Sell order placed and holding removed" });
}))


app.all(/.*/, (req, res, next) => {
     next(new ExpressError(404, "Page Not Found"));
});



app.use((err,req,res,next)=>{
    let{status=500,message="something went wrong"}=err;
    res.status(status).json({message})
})



server.listen(PORT,()=>{
    console.log(`app is running on port ${PORT}`)
})