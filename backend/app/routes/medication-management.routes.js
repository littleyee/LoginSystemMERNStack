module.exports = app => {
  const { authJwt, verifySignUp } = require("../middleware");
  const medicationManagement = require("../controllers/medication-management.controller.js");
  const router = require("express").Router();

  router.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Create a new medication
  router.post("/create", 
    [authJwt.verifyToken, authJwt.isAdmin],
    medicationManagement.create
  );
/*
  // Retrieve all Person
  router.get("/", 
    [authJwt.verifyToken, authJwt.isAdmin],
    medicationManagement.findAll
  );

  // Retrieve a single patient medication with patient_medication_id
  router.get("/:patient_medication_id", 
    [authJwt.verifyToken, authJwt.isAdmin],
    medicationManagement.findOne
  );

  // Update a patient_medication_id with patient_medication_id
  router.put("/:patient_medication_id", 
    [authJwt.verifyToken, authJwt.isAdmin, verifySignUp.checkDuplicateEmail],
    medicationManagement.update
  );

  // Delete a Person with person_id
  router.delete("/:patient_medication_id", 
    [authJwt.verifyToken, authJwt.isAdmin],
    medicationManagement.delete
  );
  */
  // select options
  router.get("/getDoctors", 
    medicationManagement.getDoctors
  );

  router.get("/getMedications", 
    medicationManagement.getMedications
  );

  router.get("/getMedicationFrequencies", 
    medicationManagement.getMedicationFrequecies
  );

  router.get("/getMedicationMeasurements", 
    medicationManagement.getMedicationMeasurements
  );

  router.get("/getPharmacies", 
    medicationManagement.getPharmacies
  );

  // get all medications
  router.get("/:patient_id", 
    [authJwt.verifyToken, authJwt.isAdmin],
    medicationManagement.getAll
  );

  // define the prefix to the route
  app.use('/api/medication-management', router);
};

