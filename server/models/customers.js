const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide the name of customer"],
      maxlength: 12,
    },
    email: {
      type: String,
      required: [true, "Please provide the email of customer"],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide the valid Email",
      ],
      unique: true,
    },
    telePhone: {
      type: String,
      minlength: 11,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "please provide the user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Customer", customerSchema);
