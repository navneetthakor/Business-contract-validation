// to connect with user Collection 
const User = require('../../Model/User');

// to validate body params 
const {validationResult} = require('express-validator');

// to provide authtoken (for digital signature) 
const jwt = require('jsonwebtoken');

// to encrypt the password 
const bcrypt = require('bcryptjs');

const userLogin = async (req,res) => {
    try{
        // check validation of parameters provided body 
        const err = validationResult(req);
        if(!err.isEmpty()){
            return res.status(400).json({error: err.array(), signal: "red"});
        }
    
        // check wheter any user exists with given email or not 
        const user = await User.findOne({email: req.body.email});
        if(!user){
            return res.status(400).json({error: "user not exists", signal: "red"});
        }
    
        // check whether the password provided is correct or not 
        const passCompare = await bcrypt.compare(req.body.password, user.password);
        if(!passCompare){
            return res.status(400).json({error: "enter valid credentials", signal: "red"});
        }
    
        // we reach here means all details are correct 
        // so prepare authtoken to provide it back 
        const data = {
            user: {
                id: user._id
            }
        }
        const jwt_secret = process.env.JWT_SECRET;
        const usertoken = jwt.sign(data,jwt_secret);
        return res.json({usertoken: usertoken, signal: "green"});
    
        } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal Server Error", signal: "red"}); 
        }
};

module.exports = userLogin;