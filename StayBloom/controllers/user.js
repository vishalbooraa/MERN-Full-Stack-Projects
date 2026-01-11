const User=require("../modules/user")
const passport = require("passport");
const {savedRedirectUrl}=require("../middleware/isLoggedIn.js")

module.exports.renderSignUpPage=(req,res)=>{
    res.render('user/signup.ejs')
}

module.exports.signUpUser=async(req,res)=>{
    try{
    let {username,email,password}= req.body
    const newUser = new User({username,email}) 
    const registeredUser= await User.register(newUser,password)
    console.log(registeredUser)
    req.login(registeredUser,(err)=>{
        if(err){
            return next(err)
        }
        req.flash("success","Successfully registered and logged in to StayBloom")
        res.redirect('/listing')
    })
    
    }
    catch(e){
        req.flash("error",e.message)
        res.redirect('/signup')
    }
}

module.exports.renderLogInPage=async(req,res)=>{
    res.render('user/login.ejs')
}



module.exports.logInUser=async(req,res)=>{
    req.flash("success","Welcome to StayBloom")
    console.log(savedRedirectUrl)
    let redirectUrl= res.locals.redirectUrl || '/listing'
    res.redirect(redirectUrl)

}



module.exports.logOutUser=(req,res)=>{
    req.logout((err)=>{
        if(err){
            return next(err)
        }
        req.flash("success","You are logged Out")
        res.redirect('/listing')
    })
}




