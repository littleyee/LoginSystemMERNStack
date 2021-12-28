module.exports = app => {
  const {authJwt} = require("../middleware");
  const controller = require("../controllers/user.controller");
  const router = require("express").Router();


  router.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  router.get("/all", controller.allAccess);

  router.get("/user",
    [authJwt.verifyToken],
    controller.userBoard
  );

  router.get("/admin",
    [authJwt.verifyToken, authJwt.hasRole(['admin'])],
    controller.adminBoard
  );

  // define the prefix to the route
  app.use('/api/user', router);
};