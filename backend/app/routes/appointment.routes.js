module.exports = app => {
  const { authJwt, verifySignUp } = require("../middleware");
  const appointmentController = require("../controllers/appointment.controller.js");
  const router = require("express").Router();

  router.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });


  // cancel appointment
  router.delete("/:appointment_id/cancel", 
    [authJwt.verifyToken, authJwt.hasRole(['patient'])],
    appointmentController.cancel
  );

  // Retrieve all appointments
  router.get("/findAllMyAppointments", 
    [authJwt.verifyToken, authJwt.hasRole(['patient'])],
    appointmentController.findAllMyAppointments
  );


  // define the prefix to the route
  app.use('/api/appointments', router);
};