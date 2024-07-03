// to connect with collection 
const UserHistory = require("../../Model/UserHistory");

const getUserHistory = async (req,res) => {
    try{
        const history = await UserHistory.findOne({user_id: req.user.id});
        if(!history){
            return res.status(400).json({error: "No history found", success: false})
        }
        return res.status(200).json({history: history.search_history, success: true});

    } catch (e) {
        console.log(e);
        return res
          .status(500)
          .json({ error: "Internal server error", success: false });
      }
};

module.exports = getUserHistory;