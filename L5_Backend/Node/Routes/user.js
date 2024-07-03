// to use the express 
const express = require('express');
const router = express.Router();

// to validate the given parameter in request 
const {body} = require('express-validator');

// to upload images 
const upload = require('../Middelwares/fetchImages.js');

// importing middleware 
const fetchUser = require('../Middelwares/fetchUser.js');

// importing controllers
const createUser = require('../Controllers/user/createUser.js');
const userLogin = require('../Controllers/user/userLogin.js');
const userAuthtokenLogin = require('../Controllers/user/userAuthtokenLogin.js');
const updateUser = require('../Controllers/user/updateUser.js');


// --------------------------ROUTE:1 create user account ----------------------------------------------------------
router.post('/createuser',
upload.single('image'),
[
    body("username", "please enter name").not().isEmpty(),
    body("email", "please enter valid email").isEmail(),
    body("password", "please enter password with minimum length of : 6").isLength({min:6})
],
createUser);

// --------------------------ROUTE:2 login to account (previous login not require) ----------------------------------------------------------
router.post('/userlogin',
[
    body("email", "please enter valid email").isEmail(),
    body("password", "please do enter your password").not().isEmpty()
],
userLogin);

// --------------------------ROUTE:3 login to accoutn with authtoken ( previous login not require) ----------------------------------------------------------
router.post('/userAuthtokenLogin', 
fetchUser , 
userAuthtokenLogin);

//  --------------------------Route:4 to update profile (login required) --------------------------
router.put('/updateUser',
fetchUser,
upload.single('image'),
updateUser);

module.exports = router;