

module.exports = app => {
    const { authJwt, verifySignUp } = require("../middleware");
    const labResult = require("../controllers/lab-result.controller.js");
    const router = require("express").Router();
  
    router.use(function (req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });

     // Create a new lab result 
  router.post("/create", 
  [authJwt.verifyToken, authJwt.isAdmin],
  labResult.create);
    
    // select options

    router.get("/getLabs", 
    labResult.getLabs
    );

    router.get("/getLabTests", 
        labResult.getLabTests
    );

    router.get("/getLabMeasurements", 
        labResult.getLabMeasurements
    );

    router.get("/getPerformedBys", 
        labResult.getPerformedBys
    );

    // Retrieve a lab result 
    router.get("getLabResult/:lab_result_id", 
      [authJwt.verifyToken, authJwt.isAdmin],
      labResult.findOne
    );
  
    // Update a lab_result_id with lab_result_id
    router.put("/update/:lab_result_id", 
      [authJwt.verifyToken, authJwt.isAdmin, verifySignUp.checkDuplicateEmail],
      labResult.update
    );

    // get all lab results for one lab 
  router.get("/:lab_id", 
  [authJwt.verifyToken, authJwt.isAdmin],
  labResult.findAll);
  
    // define the prefix to the route
    app.use('/api/lab-management/lab-result', router);
  };