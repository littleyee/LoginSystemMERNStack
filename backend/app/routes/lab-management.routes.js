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

    // Create a new lab
  router.post("/create", 
  [authJwt.verifyToken, authJwt.isAdmin],
  labManagement.create);
  

// select options
  router.get("/getOrderedBys", 
  labManagement.getOrderedBys);

  router.get("/getPatients", 
  labManagement.getPatients
  );

  router.get("/getReviewedBys", 
  labManagement.getReviewedBys
  );

    // Retrieve a single lab
  router.get("/:lab_id/getLab", 
    [authJwt.verifyToken, authJwt.isAdmin],
    labManagement.findOne
  );
  
    // Update a lab
  router.put("/:lab_id/update", 
    [authJwt.verifyToken, authJwt.isAdmin],
    labManagement.update
  );

  // get all labs
  router.get("/:patient_id", 
    [authJwt.verifyToken, authJwt.isAdmin],
    labManagement.findAll
  );

  // Delete a Person with person_id
  router.delete("/:lab_id/delete", 
    [authJwt.verifyToken, authJwt.isAdmin],
    labManagement.delete
  );
  
    // define the prefix to the route
    app.use('/api/lab-management', router);
  };