const express = require("express");
const lookupController = require("../controller/lookup.controller");
const router = express.Router();


router.post("/category", lookupController.createCategory)
router.get("/getcategory", lookupController.getCategory)
router.post("/subcategory", lookupController.createsubCategory)
router.get("/getsubcategory", lookupController.getsubCategory)


module.exports = router