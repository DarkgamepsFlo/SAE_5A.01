const express = require("express");
const router = express.Router();
const { search, searchAllBoites, ficheBoite } = require("../controllers/boite");

// 1 //
router.post("/search", search);
// 2 //
router.post("/searchAllBoite", searchAllBoites);
// 3 //
router.post("/ficheboite", ficheBoite)
module.exports = router;
