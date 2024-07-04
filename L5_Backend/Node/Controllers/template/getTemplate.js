// to access Template collection
const Template = require("../../Model/Template");


const addTemplate = async (req, res) => {
  try {

    // find template corresponding to user id
    const templateRec = await Template.findOne({user_id: req.user.id});

    // if  tempate record not found for user (typically it will never happen)
    if (!templateRec) {
      return res.status(400).json({
        error: "template record not found. please contact administrator",
        success: false,
      });
    }

    // extarct templates array
    const templates = templateRec.templates;

    // returning templates
    return res.status(200).json({ templates: templates, success: true });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error", success: false});
  }
};

module.exports = addTemplate;
