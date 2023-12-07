const Listing = require("../models/listing.model.js");
const errorHanlder = require("../utils/error.js");

const createListing = async (req, res, next) => {
  try {
    const listing = new Listing(req.body);
    await listing.save();
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};
const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(errorHanlder(404, "Listing not found!"));
  }
  if (req.user.id !== listing.userRef) {
    return next(errorHanlder(401, "You can only delete your own listings"));
  }

  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json("Listing has been deleted!");
  } catch (error) {
    next(error);
  }
};

module.exports = {createListing,deleteListing};
