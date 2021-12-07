module.exports = app => {
    const { authJwt, verifySignUp } = require("../middleware");
    const labComment = require("../controllers/lab-comment.controller.js");
    const router = require("express").Router();
  
    router.use(function (req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
  
  
    // Retrieve a single lab_comment with lab_comment_id
    router.get("/:lab_comment_id", 
      [authJwt.verifyToken, authJwt.isAdmin],
      labComment.findOne
    );
  
    // Update a lab_comment_id with lab_comment_id
    router.put("/:lab_comment_id", 
      [authJwt.verifyToken, authJwt.isAdmin, verifySignUp.checkDuplicateEmail],
      labComment.update
    );
  
    // Delete a lab comment with lab_comment_id
    router.delete("/:lab_comment_id", 
      [authJwt.verifyToken, authJwt.isAdmin],
      labComment.delete
    );
    
    

      // select options
      router.get("/:lab_comment_id/getNurses", 
      labComment.getNurses
  );

  // select options
      router.get("/:lab_comment_id/getLabs", 
      labComment.getLabs
  );

    // define the prefix to the route
    app.use('/api/lab-comment', router);
  };