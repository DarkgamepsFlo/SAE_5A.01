const express = require("express");
const router = express.Router();
const { search, searchAllBoites } = require("../controllers/boite");

// 1 //
router.post("/search", search);
// 2 //
router.post("/searchAllBoite", searchAllBoites);

module.exports = router;
