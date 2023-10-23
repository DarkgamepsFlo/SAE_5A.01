const express = require("express");
const router = express.Router();
const { search, searchAllBoites, ficheBoite, nouveaute, deleteCollec, addCollec, addWishlist, deleteWishlist } = require("../controllers/boite");

// 1 //
router.post("/search", search);
// 2 //
router.post("/searchAllBoite", searchAllBoites);
// 3 //
router.post("/ficheboite", ficheBoite);
// 4 //
router.post("/nouveaute", nouveaute);
// 5 //
router.post("/deleteCollec", deleteCollec);
// 6 //
router.post("/addCollec", addCollec);
// 7 //
router.post("/addWishlist", addWishlist);
// 8 //
router.post("/deleteWishlist", deleteWishlist)
module.exports = router;
