const express = require("express");
const router = express.Router();
const { findAllUsers, inscription, connexion, motdepasse, changerpassword, search } = require("../controllers/users");

// 1 //
router.get("/findUser", findAllUsers);
// 2 //
router.post("/findUser", search);
// 3 //
router.post("/inscription", inscription);
// 4 //
router.post("/connexion", connexion);
// 5 //
router.post("/motdepasse", motdepasse);
// 6 //
router.post("/changerpassword", changerpassword);

module.exports = router;
