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
  
  
    // Retrieve a single lab_comment with lab_result_id
    router.get("/:lab_result_id", 
      [authJwt.verifyToken, authJwt.isAdmin],
      labResult.findOne
    );
  
    // Update a lab_result_id with lab_result_id
    router.put("/:lab_result_id", 
      [authJwt.verifyToken, authJwt.isAdmin, verifySignUp.checkDuplicateEmail],
      labResult.update
    );
  
    // Delete a lab comment with lab_result_id
    router.delete("/:lab_result_id", 
      [authJwt.verifyToken, authJwt.isAdmin],
      labResult.delete
    );
    
    // select options

    router.get("/:lab_result_id/getLabs", 
    labResult.getLabs
);

    router.get("/:lab_result_id/getLabTests", 
        labResult.getLabTests
    );

    router.get("/:lab_result_id/getLabMeasurements", 
        labResult.getLabMeasurements
    );

    router.get("/:lab_result_id/getPerformedBys", 
        labResult.getPerformedBys
    );
  
    // define the prefix to the route
    app.use('/api/lab-result', router);
  };