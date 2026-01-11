const express=require("express")
const router=express.Router();
const User= require('../modules/user')
const wrapAsync= require('../utils/wrapAsync');
const passport = require("passport");
const {savedRedirectUrl}=require("../middleware/isLoggedIn.js")
const userController=require("../controllers/user.js")



router.get('/signup',userController.renderSignUpPage)

router.post('/signup',wrapAsync(userController.signUpUser))


router.get('/login',wrapAsync(userController.renderLogInPage))

router.post('/login',savedRedirectUrl,passport.authenticate('local',{failureRedirect : '/login',failureFlash : true}),userController.logInUser)

router.get('/logout',userController.logOutUser)


module.exports=router