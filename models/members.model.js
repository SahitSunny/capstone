const mongoose = require("mongoose");

const membersSchema = mongoose.Schema({
  mobile: {
    type: Number,
    required: [true, "number is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
  },
  occupation : {
    type: String,
    required: [true, "occupation is required"],
  },
  createpassword: {
    type: String,
    require: [true, "password is required"]
  },
});

module.exports = mongoose.model("members", membersSchema);
