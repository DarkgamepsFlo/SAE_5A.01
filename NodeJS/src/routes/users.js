const express = require("express");
const router = express.Router();
const { findAllUsers, inscription, connexion, motdepasse, changerpassword, search, searchAllUsers } = require("../controllers/users");

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
// 7 //
router.post("/searchAllUsers", searchAllUsers);

module.exports = router;
