const Members = require("../models/members.model");

exports.createMember = async (req, res) => {
    try{
        if(!req.body)
            return res.status(400).json({message: "Please provide all required fields."});

        const newMember = new Members({
            mobile: req.body.mobile,
            email: req.body.email,
            occupation: req.body.occupation,
            createpassword: req.body.createpassword
        })

        newMember.save()
        .then((data) => {
            res.status(200).send("member has added")
        })
    }
    catch(err){
        console.log("error while creating a member")
        res.status(500).send("Cannot add the Member")
    }
}

exports.updatePassword = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "Cannot update with empty data" });
      }
      try {
        const mobile = req.body.mobile; 
        const newPassword = req.body.password
        const updatedPassword = await Members.findOneAndUpdate({mobile: mobile} ,{createpassword: newPassword},{
          new: true,
          runValidators: true,
        });
    
        if (!updatedPassword) {
          return res.status(404).send({ message: "Member not found" });
        }
    
        res.status(200).send(updatedPassword);
      } catch (err) {
        console.error("Error occurred while updating password:", err);
        res.status(500).send({ message: err.message });
      }
}

exports.cancelMember = async (req, res) =>{
    try {
        const mobile = req.body.mobile;
    
        if (!mobile) {
          return res.status(400).send({ message: "Mobile number is required to delete a request." });
        }
    
        const deletedMember = await Members.findOneAndDelete({ mobile: mobile });
    
        if (!deletedMember) {
          return res.status(404).send({ message: "Member not found with the provided mobile number." });
        }
    
        res.status(200).send({ message: "Member deleted successfully.", data: deletedMember });
      } catch (err) {
        console.error("Error occurred while deleting Member:", err);
        res.status(500).send({ message: err.message });
      }
}