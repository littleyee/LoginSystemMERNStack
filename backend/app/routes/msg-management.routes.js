module.exports = app => {
    
    const msgManagement = require("../controllers/msg-management.controller.js");
    const router = require("express").Router();
    router.use(function (req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
     

      );
      next();
    });
  
  
    
    // Create a new Msg
    router.post("/", 
      
      msgManagement.create
    );
  
    // Retrieve all Msgs
    router.get("/", 
      
      msgManagement.findAll
    );
  
    // Retrieve all Msgs
    router.post("/search", 
      
      msgManagement.findMsg
    );
  
    // Retrieve a single Msg with msg_id
    router.get("/:msg_id", 
      
      msgManagement.findOne
    );
  
    // Update a Msg with msg_id
    router.put("/:msg_id", 
      
      msgManagement.update
    );
  
    // Delete a Msg with msg_id
    router.delete("/:msg_id", 
      
      msgManagement.delete
    );
  
    // define the prefix to the route
    app.use('/api/msg-management', router);
  };