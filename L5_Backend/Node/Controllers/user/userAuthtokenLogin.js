// to connect with collection in mongoDb 
const User = require('../../Model/User');

const userAuthtokenLogin = async (req,res)=>{

    try {
        // fetching the id provided by fetchCustomer middleware 
        const userId = req.user.id;

        // gethering the details of custmr with provided id 
        const user = await User.findById(userId).select("-password");
        if(!user){
           return res.status(401).json({error: "Authentication fail please login", signal: 'red'});
        }
        return res.json({user:user, signal: 'green'});

    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal Server Error", signal: "red"}); 
    }
 };

 module.exports = userAuthtokenLogin;