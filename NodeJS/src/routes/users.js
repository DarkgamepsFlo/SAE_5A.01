const express = require("express");
const router = express.Router();
const { findAllUsers } = require("../controllers/users");

// 1 //
router.get("/findUser", findAllUsers);

module.exports = router;
