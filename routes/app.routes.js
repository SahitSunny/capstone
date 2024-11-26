module.exports = (app) => {
    const servicesController = require("../controller/services.controller.js")
    const requestsController = require("../controller/requests.controller.js")
    const membersController = require("../controller/members.controller.js")

    app.get('/allservices', servicesController.getAllServices)

    app.get('/getservicebytype/:type', servicesController.getServiceByType)

    app.post('/service/:type/form', requestsController.createRequest)

    app.post('/member', membersController.createMember)

    app.post('/service/:param_type/calculate', requestsController.calculateEMI)

    app.put('/updaterequest', requestsController.updateRequest)

    app.put('/updatepassword', membersController.updatePassword)

    app.delete('/deleterequest', requestsController.deleteRequest)

    app.delete('/cancelmember', membersController.cancelMember)
}