const express = require("express");
const router = express.Router();
const { findAllUsers, inscription, connexion, motdepasse, changerpassword } = require("../controllers/users");

// 1 //
router.get("/findUser", findAllUsers);

// 2 //
router.post("/inscription", inscription);
// 3 //
router.post("/connexion", connexion);
// 4 //
router.post("/motdepasse", motdepasse);
// 5 //
router.post("/changerpassword", changerpassword);

module.exports = router;
