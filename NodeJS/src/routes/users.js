const express = require("express");
const router = express.Router();
const { findAllUsers, inscription } = require("../controllers/users");

// 1 //
router.get("/findUser", findAllUsers);

// 2 //
router.post("/inscription", inscription);

module.exports = router;
