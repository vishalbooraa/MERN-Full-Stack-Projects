const Listing=require("../modules/listing")
const Review=require("../modules/review")





module.exports.isLoggedIn=(req,res,next)=>{
    console.log(req)
    if(req.isUnauthenticated()){
    req.session.redirectUrl= req.originalUrl;
    req.flash("error","You must be logged in to create listing")
    return res.redirect("/login")
    }
    next()
}

module.exports.savedRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next()
}


module.exports.isOwner= async(req,res,next)=>{
    let id= req.params.id
    let listing= await Listing.findById(id)
    if(res.locals.currUser && !listing.owner.equals(res.locals.currUser._id)){
        req.flash("error","you don't have permission to do this action")
        return res.redirect(`/listing/${id}`)
    }
    next()
}



module.exports.isReviewAuthor= async(req,res,next)=>{
    let {id,reviewId}=req.params
    let list= await Listing.findById(id)
    let review = await Review.findById(reviewId)
    if(req.user && !review.author.equals(req.user._id)){
        req.flash("error","You are not the author of review")
        return res.redirect(`/listing/${list.id}`)
    }
    next()
}