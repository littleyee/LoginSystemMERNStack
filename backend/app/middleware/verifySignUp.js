const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;
const Person = db.person;

const Op = db.Sequelize.Op;

checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Failed! Username is already in use!"
      });
      return;
    }

    // Email
    Person.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Failed! Email is already in use!"
        });
        return;
      }

      next();
    });
  });
};

checkDuplicateUsername = (req, res, next) => {
  // Username
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Failed! Username is already in use!"
      });
      return;
    }

    next();
  });
};

checkDuplicateEmail = (req, res, next) => {
  const email = req.body.email;
  const person_id = req.body.person_id;
  
  var condition = {};
  condition.email = { [Op.eq]: `${email}` }; // required

  /* 
  the goal here is to check if a person_id exists
  if it exists then we need to remove that from the
  available list of emails to check for duplicates

  profileEdit needs to pass a person_id for us to verify
  personManagementEdit needs to pass a person_id for us to verify
  */
  if(person_id != "" && typeof(person_id) != undefined)
    condition.person_id = { [Op.ne]: `${person_id}` };

  // Email
  Person.findOne({
    where: condition
  }).then(user => {
    console.log(user);

    if (user) {
      res.status(400).send({
        message: "Failed! Email is already in use!"
      });
      return;
    }

    next();
  });
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Failed! Role does not exist = " + req.body.roles[i]
        });
        return;
      }
    }
  }
  
  next();
};

const verifySignUp = {
  checkDuplicateUsername: checkDuplicateUsername,
  checkDuplicateEmail: checkDuplicateEmail,
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;
