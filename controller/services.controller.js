const Services = require("../models/services.model")

exports.getAllServices = async (req, res) => { 
    await Services.find().
    then((data) => {
        res.status(200).send(data)
    })
    .catch((err) => {
        console.log("error occured while fetching data", err)
        res.status(500)
    })
}

exports.getServiceByType = async (req, res) => {
    await Services.find({type: req.params.type}).
    then((data) => {
        res.status(200).send(data)
    })
    .catch((err) => {
        console.log("error occured while fetching data", err)
        res.status(500)
    })
}
