const Listing=require("../modules/listing")
const Review=require("../modules/review")

module.exports.createReview=async(req,res)=>{
    let id=req.params.id
    let listing= await Listing.findById(id)
    let newReview = new Review(req.body.review)
    newReview.author= req.user._id

    await newReview.save()
    console.log(newReview)
    listing.review.push(newReview._id)
    await listing.save()
    console.log("review saved")
    req.flash("success","Review Added Successfully!")
    res.redirect(`/listing/${listing.id}`)
}

module.exports.deleteReview=async (req,res)=>{
    let {id,reviewId}=req.params
    let listing= await Listing.findByIdAndUpdate(id, {$pull:{review:reviewId}})
    await Review.findByIdAndDelete(reviewId)
    req.flash("success","Review Deleted Successfully!")
    res.redirect(`/listing/${listing.id}`)
    }