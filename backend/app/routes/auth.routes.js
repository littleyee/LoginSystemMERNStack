module.exports = function (app) {
  const { verifySignUp } = require("../middleware");
  const controller = require("../controllers/auth.controller");
  const router = require("express").Router();

  router.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  router.post(
    "/signup",
    [
      //verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkDuplicateUsername,
      verifySignUp.checkDuplicateEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  router.post("/forgot", controller.forgot);
  router.post("/forgotUserAccessCode", controller.forgotUserAccessCode);
  router.post("/resetPassword", controller.resetPassword);

  router.post("/signin", controller.signin);


  // define the prefix to the route
  app.use('/api/auth', router);
};
