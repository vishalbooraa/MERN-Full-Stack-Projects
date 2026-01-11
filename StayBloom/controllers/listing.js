const Listing = require("../modules/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken= process.env.MAP_TOKEN
const geocodingClient = mbxGeocoding({ accessToken: mapToken });



module.exports.index=async (req,res)=>{
    let allListing= await Listing.find({})
        res.render("listings/index.ejs",{allListing})
}

module.exports.renderNewForm=(req,res)=>{
    res.render("listings/new.ejs")
}

module.exports.showListing=async(req,res)=>{
    let id=req.params.id
    let listing= await Listing.findById(id).populate({path:"review",populate: {path:"author"}}).populate("owner")
    console.log(listing)
    if(!listing){
        req.flash("error","Listing you requested for not found")
        res.redirect("/listing")
    }else{
        res.render("listings/show.ejs",{listing})
    }
}


module.exports.CreateNewListing=async(req,res,next)=>{ 
        let result= await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1
        })
        .send()
  
        url=req.file.path
        fileName=req.file.filename  
        const newListing = new Listing(req.body.listing)
        newListing.owner=req.user
        newListing.image={url,fileName}
        newListing.geometry=result.body.features[0].geometry
        let slisting=await newListing.save()
        console.log(slisting)
        req.flash("success","New Listing Created!")
        res.redirect("/listing")          
}


module.exports.renderEditForm=async (req,res)=>{
    let id=req.params.id
    let listing= await Listing.findById(id)
    if(!listing){
        req.flash("error","Listing you requested for not found")
        res.redirect("/listing")
    }else{
        res.render("listings/edit.ejs",{listing})
    }
}


module.exports.updateListing=async (req,res)=>{
    let id=req.params.id
    listing=await Listing.findByIdAndUpdate(id,{...req.body.listing})

    if(typeof req.file !="undefined"){
        url=req.file.path
        fileName=req.file.filename 
        listing.image={url,fileName}
        await listing.save()
    }
    req.flash("success","Listing Updated Successfully!")
    res.redirect(`/listing/${listing._id}`)
}


module.exports.deleteListing=async (req,res)=>{
    let id=req.params.id
    await Listing.findByIdAndDelete(id)
    req.flash("success","Listing Deleted Successfully!")
    res.redirect("/listing")
}