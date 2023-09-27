const express = require("express");
const router = express.Router();
const { ajoutBoite } = require("../controllers/suggestion");

// 1 //
router.post("/add", ajoutBoite);

app.get('/users', (req, res, next) => {
    res.send("Hello Users!");
});

module.exports = router;