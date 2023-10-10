const express = require("express");
const router = express.Router();
const { search, searchAllBoites, ficheBoite, nouveaute } = require("../controllers/boite");

// 1 //
router.post("/search", search);
// 2 //
router.post("/searchAllBoite", searchAllBoites);
// 3 //
router.post("/ficheboite", ficheBoite);
// 4 //
router.post("/nouveaute", nouveaute);
module.exports = router;
