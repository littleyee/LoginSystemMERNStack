module.exports = app => {
    
    const insuranceManagement = require("../controllers/insurance-management.controller.js");
    const router = require("express").Router();
    router.use(function (req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
     

      );
      next();
    });
  
  
    
    // Create a new Insurance
    router.post("/", 
      
      insuranceManagement.create
    );
  
    // Retrieve all Insurances
    router.get("/", 
      
      insuranceManagement.findAll
    );
  
    // Retrieve all Insurances
    router.post("/search", 
      
      insuranceManagement.findInsurance
    );
  
    // Retrieve a single Insurance with insurance_id
    router.get("/:insurance_id", 
      
      insuranceManagement.findOne
    );
  
    // Update a Insurance with insurance_id
    router.put("/:insurance_id", 
      
      insuranceManagement.update
    );
  
    // Delete a Insurance with insurance_id
    router.delete("/:insurance_id", 
      
      insuranceManagement.delete
    );
  
    // define the prefix to the route
    app.use('/api/insurance-management', router);
  };