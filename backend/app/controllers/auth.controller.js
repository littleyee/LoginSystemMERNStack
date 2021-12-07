const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const UserAccessCode = db.userAccessCode;
const Person = db.person;
const Gender = db.gender;
const Pronoun = db.pronoun;
const SexAtBirth = db.sexAtBirth;
const State = db.state;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.forgot = (req, res) => { 
  User.findOne({ where: { username: req.body.username } }).then(user => {
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    // create an access code
    UserAccessCode.create({
      access_code: "1234", //hard coded to avoid sending out an email
      username: user.username,
      created_on: new Date(),
      is_used: false
    }).then(user => {
        // success
        // redirect to /forgotUserAccessCode
        res.status(200).send({
          username: user.username
        });
    });
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
}

exports.forgotUserAccessCode = (req, res) => {
  User.findOne({ where: { username: req.body.username } }).then(user => {
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    UserAccessCode.findOne({ where: { username: req.body.username, access_code: req.body.userAccessCode, is_used: 0 } }).then(userAccessCode => {
      if (!userAccessCode) {
        return res.status(404).send({ message: "User Access Code Not found." });
      }

      // update user password
      userAccessCode.set({
        is_used: 1
      });
      userAccessCode.save();

      // success
      // redirect to /resetPassword
      res.status(200).send({
        username: user.username
      });
    });
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
}

exports.resetPassword = (req, res) => {
  User.findOne({ where: { username: req.body.username } }).then(user => {
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    // check if passwords are the same
    if(req.body.password != req.body.password2) {
      return res.status(404).send({ message: "Passwords to not match" });
    }

    // update user password
    user.set({
      password: bcrypt.hashSync(req.body.password, 8)
    });
    user.save();

    // success
    // return to login page
    res.status(200).send({
      username: user.username
    });
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
}

exports.signup = (req, res) => {
  Person.create({
    firstName:req.body.firstName,
    lastName:req.body.lastName,
    email: req.body.email,
    address: req.body.address,
    birthday:req.body.birthday,
    gender_id: req.body.gender_id,
    pronoun_id: req.body.pronoun_id,
    sex_at_birth_id: req.body.sex_at_birth_id,
    state_id: req.body.state_id,
    city:req.body.city,
    zip:req.body.zip
  })
    .then(person => {
      User.create({
        person_id: person.person_id,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 8),
      })
        .then(user => {
          if (req.body.roles) {
            Role.findAll({
              where: {
                name: {
                  [Op.or]: req.body.roles
                }
              }
            }).then(roles => {
              user.setRoles(roles).then(() => {
                res.send({ message: "User registered successfully!" });
              });
            });
          } else {
            // user role = 1
            user.setRoles([1]).then(() => {
              res.send({ message: "User registered successfully!" });
            });
          }
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ _username: user.username, _person_id: user.person_id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      Person.findOne({
        include: [{
          model: Gender,
          required: true
          },
          {
          model: Pronoun,
          required: true
          },
          {
          model: SexAtBirth,
          required: true
          },
          {
          model: State,
          required: true
          }
        ],
        where: {
          person_id: user.person_id
        }
      }).then(person => {
        var authorities = [];

        user.getRoles().then(roles => {
          for (let i = 0; i < roles.length; i++) {
            authorities.push("ROLE_" + roles[i].name.toUpperCase());
          }
          
          res.status(200).send({
            roles: authorities,
            accessToken: token,
            // profile information
            person_id: person.person_id,
            username: user.username,
            email: person.email,
            //password: bcrypt.hashSync(user.password, 8),
            firstName: person.firstName,
            lastName: person.lastName,
            address: person.address,
            birthday: person.birthday,
            gender: person.gender.gender,
            gender_id: person.gender.gender_id,
            pronoun: person.pronoun.pronoun,
            pronoun_id: person.pronoun.pronoun_id,
            sex_at_birth: person.sex_at_birth.sex_at_birth,
            sex_at_birth_id: person.sex_at_birth.sex_at_birth_id,
            state: person.state.state,
            state_id: person.state.state_id,
            city: person.city,
            zip: person.zip
          });
        });
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
