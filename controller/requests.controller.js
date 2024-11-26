const Requests = require("../models/requests.model");

exports.createRequest = async (req, res) => {
  try {
    if (!req.body)
      res.status(400).send({ message: "Request body cannot be empty." });

    const newRequest = new Requests({
      mobile: req.body.mobile,
      email: req.body.email,
      amt: req.body.amt,
      type: req.body.type,
      msg: req.body.msg,
      code: req.body.code,
    });

    await newRequest.save().then((data) => {
      res.status(200).send(data);
    });
  } catch (err) {
    console.log("error occured while creating request");
    res.status(500).send({ message: err.message });
  }
};



exports.calculateEMI = (req, res) => {
  const { amt, tenure, type } = req.body;
  const param_type = req.params.param_type;

  try {
    if (!amt || !tenure) {
      return res.status(400).send({ message: "Required fields are missing" });
    }
    let emi;
    if (param_type === "homeloan") {
      emi = ((amt * tenure) / 100) * 12; 
    } else if (param_type === "personalloan") {
      emi = ((amt * tenure) / 100) * 16; 
    } else if (param_type === "educationalloan") {
      emi = ((amt * tenure) / 100) * 10; 
    } else {
      return res.status(400).send({ message: "Invalid loan type provided" });
    }
    res.status(200).send({ emi });
  } catch (err) {
    console.error("Error occurred while calculating EMI:", err);
    res.status(500).send({ error: err.message });
  }
};




exports.updateRequest = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Cannot update with empty data" });
  }
  try {
    const mobile = req.body.mobile; 
    const updatedRequest = await Requests.findOneAndUpdate({mobile: mobile} , req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedRequest) {
      return res.status(404).send({ message: "Request not found" });
    }

    res.status(200).send(updatedRequest);
  } catch (err) {
    console.error("Error occurred while updating request:", err);
    res.status(500).send({ message: err.message });
  }
};

exports.deleteRequest = async (req, res) => {
  try {
    const mobile = req.body.mobile;

    if (!mobile) {
      return res.status(400).send({ message: "Mobile number is required to delete a request." });
    }

    const deletedRequest = await Requests.findOneAndDelete({ mobile: mobile });

    if (!deletedRequest) {
      return res.status(404).send({ message: "Request not found with the provided mobile number." });
    }

    res.status(200).send({ message: "Request deleted successfully.", data: deletedRequest });
  } catch (err) {
    console.error("Error occurred while deleting request:", err);
    res.status(500).send({ message: err.message });
  }
};

