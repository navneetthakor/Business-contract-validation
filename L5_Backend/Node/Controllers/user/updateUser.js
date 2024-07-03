// to connect with collection in mongoDb 
const User = require('../../Model/User');

// to delete image 
const fs = require('fs');
const path = require('path');

const updateUser = async (req,res) => {
    try{

        // find id of user
        const userId = req.user.id;
        
        // find user 
        const user = await User.findById(userId);
        if(!user){
            // delete uploaded image 
            if(req.file) fs.unlinkSync(path.join(__dirname,'../..', req.file.path));
            return res.status(401).json({message: "Please login with valid credentials", signal: "red"});
        }
        
        // now user exists
        // get all the fields which are suppose to update 
        const {username, contact_num} = req.body;
        
        // create object to hold values 
        const newUser = {
            username: username ? username : user.username,
            contact_num: contact_num ? contact_num : user.contact_num,
        };
        if(req.file) newUser.image = req.file.path;
        
        // delete old image if new image is being provided 
        if(req.file && user.image!=="") fs.unlinkSync(path.join(__dirname,'../..', user.image));
        
        // now update profile 
        const updtUser = await User.findByIdAndUpdate(
            userId,
            {$set : newUser},
            {new :  true}
        )
            
        // return updated profile 
        return  res.json({user: updtUser, signal:"green"});
    }
    catch(e){
        console.log(e);
        // delete uploaded image 
        if(req.file) fs.unlinkSync(path.join(__dirname,'../..', req.file.path));
        return res.status(500).json({message: "internal error occured", signal: "red"});
    }
};

module.exports = updateUser;