// to use express 
const express = require('express');
const router = express.Router();

// importing middlewares 
const fetchUser = require('../Middelwares/fetchUser.js');

// importing controllers
const getUserHistory = require('../Controllers/userHistory/getUserHistory.js');


// --------------------------ROUTE:2 to fetch userHistory ----------------------------------------------------------
router.post('/getUserHistory',
fetchUser,
getUserHistory);

module.exports = router;