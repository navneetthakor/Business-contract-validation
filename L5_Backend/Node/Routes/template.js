// to use express Router
const express = require("express");
const router = express.Router();

// to validate the given parameter in request
const { body, check } = require("express-validator");

// template modal
const Template = require("../Model/Template");

// middlewares
const fetchUser = require("../Middelwares/fetchUser");
const upload = require("../Middelwares/fetchPDFs.js");

// installing controllers
const addTemplate = require("../Controllers/template/addTemplate.js");
const removeTemplate = require("../Controllers/template/removeTemplate.js");
const updateTemplate = require("../Controllers/template/updateTemplate.js");
const getTemplate = require("../Controllers/template/getTemplate.js");

// add Template
router.post('/add',fetchUser,
  upload.single("url"),
  [
    body("version", "Provide version  to add template").not().isEmpty(),
  ],
  addTemplate
);

//remove template
router.delete("/remove",fetchUser,removeTemplate);

//update template
router.put("/update",fetchUser,
  upload.single("url"),
  [
    body("version", "Provide version  to update").not().isEmpty()
  ],
  updateTemplate
);


// get all templates of perticular user 
router.post('/get',fetchUser,getTemplate);


module.exports = router;