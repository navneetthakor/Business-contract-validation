// to connect with user Collection 
const User = require('../../Model/User');
const UserHistory = require('../../Model/UserHistory');

// to validate body params 
const {validationResult} = require('express-validator');

// to provide authtoken (for digital signature) 
const jwt = require('jsonwebtoken');

// to encrypt the password 
const bcrypt = require('bcryptjs');

// to delete image 
const fs = require('fs');
const path = require('path');
const Template = require('../../Model/Template');

const createUser = async(req,res) => {
    try{

        // checking the given parameters 
        const err =  validationResult(req);
        if(!err.isEmpty()){
            // delete uploaded file 
            if(req.file) fs.unlinkSync(path.join(__dirname,'../..', req.file.path));
            return res.status(400).json({error: err.array(), signal: "red"})
        }
    
        // check wheteher any User exists with provided email or not 
        let user = await User.findOne({email: req.body.email});
        if(user){
            // delete uploaded file 
            if(req.file) fs.unlinkSync(path.join(__dirname,'../..', req.file.path));
            return res.status(400).json({error: "user with given email already exists", signal: "red"});
        }
    
        // ------Now all set to create User ------
        // encrypt the password using bcrypt
        const salt = await bcrypt.genSaltSync(10);
        const securePas = await bcrypt.hashSync(req.body.password, salt);
        // creating and saving user in backend 
        let imgPath;
        if(req.file) imgPath = req.file.path.replace(/\\/g, '/');
        const newUser = new User({
            image: req.file ? imgPath : "",
            username: req.body.username,
            email: req.body.email,
            password: securePas,
            contact_num: req.contact_num? req.contact_num : "",
        })
        newUser.save();
    
        // creating user history 
        const newUserHistory = new UserHistory({
            user_id: newUser._id,
            search_history: [],
        })
        newUserHistory.save();

        // creating template record for this user 
        const templateRec = new Template({
            user_id: newUser._id,
            templates: [{"version": "Default template", "url" : "https://res.cloudinary.com/deziazvyp/image/upload/v1720014577/pdfs/software%20agreement.pdf"}]
        })
        templateRec.save();
    
        // jsonwebtoken related 
        // to provide authentication token back to user 
        const data = {
            user: {
                id: newUser._id,
            }
        }
        const jwt_secret = process.env.JWT_SECRET;
        const usertoken = jwt.sign(data,jwt_secret);


        return res.json({usertoken: usertoken, signal: "green"});
    
        }catch(e){
            console.log(e);
    
            // delete uploaded file 
            if(req.file) fs.unlinkSync(path.join(__dirname,'../..', req.file.path));
            res.status(500).json({error: "some error occured", signal: 'red'});
        }
};

module.exports = createUser;