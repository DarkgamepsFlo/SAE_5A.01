const express = require("express");
const router = express.Router();
const { ajoutBoite, findSuggestion, addSuggestion, removeSuggestion, updateSuggestion } = require("../controllers/suggestion");

// 1 //
router.post("/add", ajoutBoite);
// 2 //
router.get("/find", findSuggestion);
// 3 //
router.post("/addinboite", addSuggestion);
// 4 //
router.post("/remove", removeSuggestion);
// 5 //
router.post("/update", updateSuggestion);

module.exports = router;