const mongoose = require("mongoose");

const requestsSchema = mongoose.Schema({
  mobile: {
    type: Number,
    required: [true, "request must have users number"],
  },
  email: {
    type: String,
    required: [true, "request must have users email"],
  },
  amt : {
    type: Number,
    required: [true, "request must have an amount"],
  },
  type: {
    type: String,
    require: [true, "request must have its type"]
  },
  msg: {
    type: String,
    require: [true, "request message required"]
  },
  code: {
    type: String, 
    require: [true, "request code required"]
  }
});

module.exports = mongoose.model("requests", requestsSchema);
