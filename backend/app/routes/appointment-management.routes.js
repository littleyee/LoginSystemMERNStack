module.exports = app => {
  const { authJwt, verifySignUp } = require("../middleware");
  const appointmentManagement = require("../controllers/appointment-management.controller.js");
  const router = require("express").Router();

  router.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  
  router.get("/getAppointmentStatuses", appointmentManagement.getAppointmentStatuses);
  router.get("/getPatients", appointmentManagement.getPatients);
  router.get("/getDoctors", appointmentManagement.getDoctors);

  // Create a new Person
  router.post("/create", 
    [authJwt.verifyToken, authJwt.hasRole(['admin'])],
    appointmentManagement.create
  );

  // Retrieve all Person
  router.get("/", 
    [authJwt.verifyToken, authJwt.hasRole(['admin'])],
    appointmentManagement.findAll
  );

  // Retrieve all Person
  router.post("/search", 
    [authJwt.verifyToken, authJwt.hasRole(['admin'])],
    appointmentManagement.findPerson
  );

  // Retrieve a single Person with appointment_id
  router.get("/:appointment_id", 
    [authJwt.verifyToken, authJwt.hasRole(['admin'])],
    appointmentManagement.findOne
  );

  // Update a Person with appointment_id
  router.put("/:appointment_id", 
    [authJwt.verifyToken, authJwt.hasRole(['admin']), verifySignUp.checkDuplicateEmail],
    appointmentManagement.update
  );

  // Delete a Person with appointment_id
  router.delete("/:appointment_id", 
    [authJwt.verifyToken, authJwt.hasRole(['admin'])],
    appointmentManagement.cancel
  );

  // define the prefix to the route
  app.use('/api/appointment-management', router);
};