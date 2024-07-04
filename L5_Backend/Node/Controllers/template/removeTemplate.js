// to access Template collection
const Template = require("../../Model/Template");

const removeTemplate = async (req, res) => {
  try {
    if (!req.body.version) {
      console.log(req.body.version);
      return res.status(400).json({ error: "Please provide version to remove", success: false });
    }

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

    // check that any template is there with same version  as current
    const newTemplates = templates.filter((t) => t.version !== req.body.version);

    await Template.updateOne(
        {_id: templateRec._id},
        {$set : {templates: newTemplates}},
        {new: true}
    )

    return res.status(200).json({remaining: newTemplates , success: true});
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error", success: false });
  }
};

module.exports = removeTemplate;
