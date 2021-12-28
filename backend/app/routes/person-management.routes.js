module.exports = app => {
  const { authJwt, verifySignUp } = require("../middleware");
  const personManagement = require("../controllers/person-management.controller.js");
  const medicationManagement = require("../controllers/medication-management.controller.js");

  const labManagement = require("../controllers/lab-management.controller.js");
  const router = require("express").Router();

  router.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Create a new Person
  router.post("/", 
    [authJwt.verifyToken, authJwt.hasRole(['admin']), verifySignUp.checkDuplicateEmail],
    personManagement.create
  );

  // Retrieve all Person
  router.get("/", 
    [authJwt.verifyToken, authJwt.hasRole(['admin'])],
    personManagement.findAll
  );

  // Retrieve all Person
  router.post("/search", 
    [authJwt.verifyToken, authJwt.hasRole(['admin'])],
    personManagement.findPerson
  );

  // Retrieve a single Person with person_id
  router.get("/:person_id", 
    [authJwt.verifyToken, authJwt.hasRole(['admin'])],
    personManagement.findOne
  );

  // Update a Person with person_id
  router.put("/:person_id", 
    [authJwt.verifyToken, authJwt.hasRole(['admin']), verifySignUp.checkDuplicateEmail],
    personManagement.update
  );

  // Delete a Person with person_id
  router.delete("/:person_id", 
    [authJwt.verifyToken, authJwt.hasRole(['admin'])],
    personManagement.delete
  );

    // get a Person medication records with person_id
    router.get("/:person_id/medications", 
    [authJwt.verifyToken, authJwt.isAdmin],
    medicationManagement.getAll
  );

  // get a Person lab records with person_id
  router.get("/:person_id/labs", 
  [authJwt.verifyToken, authJwt.isAdmin],
  labManagement.findAll
);


  // define the prefix to the route
  app.use('/api/person-management', router);
};