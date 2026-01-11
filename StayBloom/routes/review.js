const express=require("express")
const router=express.Router({mergeParams:true});
const wrapAsync= require('../utils/wrapAsync.js');
const expressError= require('../utils/expressError.js');
// const Review = require("../modules/review.js");
const {reviewSchema}= require('../schema.js');
// const Listing = require("../modules/listing.js");
const {isLoggedIn}= require("../middleware/isLoggedIn.js")
const {isReviewAuthor}=require("../middleware/isLoggedIn.js")
const reviewController= require("../controllers/review.js")




const validateReview= (req,res,next)=>{
    const {error}= reviewSchema.validate(req.body);
    if(error){
        const msg= error.details.map(el=>el.message).join(", ");
        throw new expressError(404,msg);
    }else{
        next();
    }
}




// Reviews post route

    router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.createReview));


// Reviews delete route
    router.delete("/:reviewId",isReviewAuthor,wrapAsync(reviewController.deleteReview));


module.exports=router;