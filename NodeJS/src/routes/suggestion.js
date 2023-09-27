const express = require("express");
const router = express.Router();
const { ajoutBoite } = require("../controllers/suggestion");

// 1 //
router.post("/add", ajoutBoite);

module.exports = router;