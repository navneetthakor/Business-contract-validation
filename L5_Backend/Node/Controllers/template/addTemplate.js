// to access Template collection
const { Mongoose } = require("mongoose");
const Template = require("../../Model/Template");

// to check wether requried details are provided in body or not
const { validationResult } = require("express-validator");

const addTemplate = async (req, res) => {
  try {
    // checking the given parameters
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json({ error: err.array(), success: false });
    }

    // very that pdf is provided or not
    if (!req.file) {
      return res
        .status(400)
        .json({ error: "template is not provided", success: false });
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
    const sameVersion = templates.find((t) => t.version === req.body.version);

    if (sameVersion) {
      return res
        .status(400)
        .json({ error: "template exists with same version", success: false });
    }

    // all safe to add new template
    templates.push({ version: req.body.version, url: req.file.path });
    templateRec.save();

    return res.status(200).json({ newRecord: templates, success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error", success: false});
  }
};

module.exports = addTemplate;
