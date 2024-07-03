const mongoose = require("mongoose");
const { Schema } = mongoose;

const TemplateSchema = new Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      unique: true,
      index: "hashed",
    },
    templates: [
      {
        version: {
          type: String,
          required: true,
          unique: true,
          index: "hashed",
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Template = mongoose.model("template", TemplateSchema);

module.exports = Template;
