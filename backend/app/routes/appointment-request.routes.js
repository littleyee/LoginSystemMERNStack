module.exports = app => {
  const { authJwt, verifySignUp } = require("../middleware");
  const appointmentRequestController = require("../controllers/appointment-request.controller.js");
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
  
  // Create a appointment request
  router.post("/create", 
    [authJwt.verifyToken, authJwt.hasRole(['patient'])],
    appointmentRequestController.create
  );

  router.get("/getDoctors", appointmentRequestController.getDoctors);
  router.get("/getAppointmentRequestTimes", appointmentRequestController.getAppointmentRequestTimes);

  // define the prefix to the route
  app.use('/api/appointment-requests', router);
};