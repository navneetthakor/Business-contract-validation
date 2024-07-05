const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserHistorySchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    unique: true,
    index: "hashed",
  },

  search_history: [
    {
      company: {
        type: String,
        required: true,
      },
      data: [
        {
          version: {
            type: Number,
            required: true,
          },
          uploaded_pdf: {
            type: String,
          },

          highlighted_pdf: {
            type: String,
          },

          summary: {
            type: String,
          },

          ner_dic: [{
            key: String,
            value: []
          }],
          compare_dic: {
            type: Object,
          },
          search_date: {
            type: Date,
            default: Date.now,
          },
        },
      ],
    },
  ],
});

const UserHistory = mongoose.model("userhistory", UserHistorySchema);

module.exports = UserHistory;
