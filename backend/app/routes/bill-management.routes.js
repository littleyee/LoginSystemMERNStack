module.exports = app => {
    
    const billManagement = require("../controllers/bill-management.controller.js");
    const router = require("express").Router();
    router.use(function (req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
     

      );
      next();
    });
  
  
    
    // Create a new Bill
    router.post("/", 
      
      billManagement.create
    );
  
    // Retrieve all Bills
    router.get("/", 
      
      billManagement.findAll
    );
  
    // Retrieve all Bills
    router.post("/search", 
      
      billManagement.findBill
    );
  
    // Retrieve a single Bill with bill_id
    router.get("/:bill_id", 
      
      billManagement.findOne
    );
  
    // Update a Bill with bill_id
    router.put("/:bill_id", 
      
      billManagement.update
    );
  
    // Delete a Bill with bill_id
    router.delete("/:bill_id", 
      
      billManagement.delete
    );
  
    // define the prefix to the route
    app.use('/api/bill-management', router);
  };