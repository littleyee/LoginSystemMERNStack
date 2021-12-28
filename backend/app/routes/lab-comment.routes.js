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


     // Create a new lab result 
  router.post("/create", 
  [authJwt.verifyToken, authJwt.isAdmin],
  labComment.create);

   // select options
   router.get("/getNurses", 
   labComment.getNurses
);

  
  
    // Retrieve a single lab_comment with lab_comment_id
    router.get("getComment/:lab_comment_id", 
      [authJwt.verifyToken, authJwt.isAdmin],
      labComment.findOne
    );
  
    // Update a lab_comment_id with lab_comment_id
    router.put("/:lab_comment_id", 
      [authJwt.verifyToken, authJwt.isAdmin],
      labComment.update
    );

    // get all lab results for one lab 
  router.get("/:lab_id", 
  [authJwt.verifyToken, authJwt.isAdmin],
  labComment.findAll);
  
    // define the prefix to the route
    app.use('/api/lab-management/lab-comment', router);
  };

  