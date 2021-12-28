module.exports = app => {
  const { authJwt, verifySignUp } = require("../middleware");
  const appointmentRequestManagementController = require("../controllers/appointment-request-management.controller.js");
  const router = require("express").Router();

  router.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });


  /* // get all appointments for person
  router.post("/:patient_id/get", 
    [authJwt.verifyToken, authJwt.hasRole(['admin'])],
    appointmentController.getAppointments
  ); */

  router.get("/getDoctors", appointmentRequestManagementController.getDoctors);
  router.get("/getAppointmentRequestTimes", appointmentRequestManagementController.getAppointmentRequestTimes);
  
  // deny a appointment request
  router.get("/:appointment_request_id/deny", 
    [authJwt.verifyToken, authJwt.hasRole(['admin'])],
    appointmentRequestManagementController.deny
  );
  // approve a appointment request
  router.post("/:appointment_request_id/approve", 
    [authJwt.verifyToken, authJwt.hasRole(['admin'])],
    appointmentRequestManagementController.approve
  );
  // Retrieve all Appointment Requests
  router.get("/findAll", 
    [authJwt.verifyToken, authJwt.hasRole(['admin'])],
    appointmentRequestManagementController.findAll
  );
  // Retrieve a single appointment request with appointment_request_id
  router.get("/:appointment_request_id", 
    [authJwt.verifyToken, authJwt.hasRole(['admin'])],
    appointmentRequestManagementController.findOne
  );

  // define the prefix to the route
  app.use('/api/appointment-request-management', router);
};