const mongoose = require("mongoose");

const servicesSchema = mongoose.Schema({
  type: {
    type: String,
    required: [true, "service must have a type"],
    unique: [true, "service already exists"],
  },
  code: {
    type: String,
    required: [true, "service must have a service code"],
    unique: [true, "service already exists"],
  },
  description: {
    type: String,
    required: [true, "service must have description"],
  },
  imgUrl: {
    type: String,
  },
  detail: {
    type: [String],
  },
});

module.exports = mongoose.model("services", servicesSchema);
