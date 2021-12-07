module.exports = app => {
    const { authJwt, verifySignUp } = require("../middleware");
    const labManagement = require("../controllers/lab-management.controller.js");
    const router = require("express").Router();
  
    router.use(function (req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
  
  
    // Retrieve a single patient medication with patient_medication_id
    router.get("/:lab_id", 
      [authJwt.verifyToken, authJwt.isAdmin],
      labManagement.findOne
    );
  
    // Update a patient_medication_id with patient_medication_id
    router.put("/:lab_id", 
      [authJwt.verifyToken, authJwt.isAdmin, verifySignUp.checkDuplicateEmail],
      labManagement.update
    );
  
    // Delete a Person with person_id
    router.delete("/:lab_id", 
      [authJwt.verifyToken, authJwt.isAdmin],
      labManagement.delete
    );
    
    // select options
    router.get("/:lab_id/getOrderedBys", 
        labManagement.getOrderedBys
    );
  
    router.get("/:lab_id/getPatients", 
        labManagement.getPatients
    );
  
    router.get("/:lab_id/getReviewedBys", 
        labManagement.getReviewedBys
    );
  
    // define the prefix to the route
    app.use('/api/labs', router);
  };