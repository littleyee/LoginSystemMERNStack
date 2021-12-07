module.exports = app => {
  const { authJwt, verifySignUp } = require("../middleware");
  const controller = require("../controllers/profile.controller");
  const router = require("express").Router();


  router.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // profile edit
  router.put("/edit", 
    [authJwt.verifyToken, verifySignUp.checkDuplicateEmail],
    controller.profileEdit);

  // define the prefix to the route
  app.use('/api/profile', router);
};