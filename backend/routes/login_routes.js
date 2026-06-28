const express = require("express");
const { sign, login ,getUserProfile} = require("../controller/login_controller");
const auth = require("../middleware/auth");
const router = express.Router();
router.post('/sign', sign);
router.post('/login', login);
router.get('/profile', auth, getUserProfile);
module.exports = router;