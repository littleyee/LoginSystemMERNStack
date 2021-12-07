module.exports = app => {
  const {
    authJwt
  } = require("../middleware");
  const controller = require("../controllers/person.controller");
  const router = require("express").Router();


  router.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // select options
  router.get("/getGenders", controller.getGenders);
  router.get("/getPronouns", controller.getPronouns);
  router.get("/getSexAtBirths", controller.getSexAtBirths);
  router.get("/getStates", controller.getStates);

  // define the prefix to the route
  app.use('/api/person', router);
};