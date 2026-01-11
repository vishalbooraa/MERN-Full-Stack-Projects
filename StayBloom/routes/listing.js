const express=require("express")
const router=express.Router()
const wrapAsync= require('../utils/wrapAsync.js');
const expressError= require('../utils/expressError.js');
const {listingSchema}= require('../schema.js');
// const Listing = require("../modules/listing.js");
const {isLoggedIn}=require("../middleware/isLoggedIn.js")
const {isOwner}=require("../middleware/isLoggedIn.js")
const listingController= require("../controllers/listing.js")
const {storage}=require('../cloudConfig.js')
const multer  = require('multer')
const upload = multer({ storage })




const validateListing= (req,res,next)=>{
    const {error}= listingSchema.validate(req.body);
    if(error){
        const msg= error.details.map(el=>el.message).join(", ");
        throw new expressError(404,msg);
    }else{
        next();
    }
}


// Show all listings

router.get("/", wrapAsync(listingController.index))

// Show new listing form

router.get("/new",isLoggedIn,listingController.renderNewForm)



// Show particular listing

router.get("/:id",wrapAsync(listingController.showListing))


// Create new listing

router.post("/",isLoggedIn,upload.single('listing[image]'),validateListing,wrapAsync(listingController.CreateNewListing))
// router.post("/",upload.single('listing[image]'),(req,res)=>{
//     res.send(req.file)
// })

// Edit listing

router.get("/:id/edit",isOwner,isLoggedIn,wrapAsync(listingController.renderEditForm))

router.put("/:id",isLoggedIn,isOwner,upload.single('listing[image]'),validateListing,wrapAsync(listingController.updateListing))

// Delete listing

router.delete("/:id",isLoggedIn,isOwner, wrapAsync(listingController.deleteListing))


module.exports=router;
