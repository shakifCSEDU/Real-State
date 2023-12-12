const express = require("express");
const router = express.Router();

const {
  createListing,
  deleteListing,
  updateListing,
  getListing,
  getListings,
} = require("../controller/listing.controller.js");

const { verifyToken } = require("../utils/verifyUser");

router.post("/create", verifyToken, createListing);
router.delete("/delete/:id", verifyToken, deleteListing);
router.post("/update/:id", verifyToken, updateListing);
router.get("/get/:id", getListing);
router.get("/get", getListings);

module.exports = router;
