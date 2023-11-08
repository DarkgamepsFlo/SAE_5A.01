const express = require("express");
const router = express.Router();
const { findAllUsers, inscription, connexion, motdepasse, changerpassword, search, searchAllUsers, getInformation, changerInfoSansMdp, changerInfoAvecMdp, profilUser, profilCollection, collection, wishlist, contact } = require("../controllers/users");

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
// 8 //
router.post("/getinfouser", getInformation);
// 9 // 
router.post("/modifinfoavecmdp", changerInfoAvecMdp);
// 10 // 
router.post("/modifinfosansmdp", changerInfoSansMdp);
// 11 //
router.post("/profiluser", profilUser);
// 12 //
router.post("/profilcollection", profilCollection)
// 13 //
router.post("/collection", collection);
// 14 //
router.post("/wishlist", wishlist);
// 15 //
router.post("/contact", contact);

module.exports = router;
