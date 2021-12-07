const db = require("../models");
const Person = db.person;
const Gender = db.gender;
const Pronoun = db.pronoun;
const SexAtBirth = db.sexAtBirth;
const State = db.state;

const Op = db.Sequelize.Op;

// Create and Save a new Person
exports.create = (req, res) => {
  // Validate request
  if (req.body.first_name == ""
    || req.body.last_name == ""
    || req.body.email == ""
  ) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Person
  const personManagement = {
    //person_id: req.body.person_id, // this is auto increment
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    address: req.body.address,
    sex_at_birth_id: req.body.sex_at_birth_id,
    gender_id: req.body.gender_id,
    pronoun_id: req.body.pronoun_id,
    state_id: req.body.state_id,
    birthday: req.body.birthday,
    city: req.body.city,
    zip: req.body.zip,
  };

  // Save Person in the database
  Person.create(personManagement)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Person."
      });
    });
};

// Retrieve all Persons from the database.
exports.findAll = (req, res) => {
  const person_id = req.query.person_id;
  var condition = person_id ? { person_id: { [Op.like]: `%${person_id}%` } } : null;

  Person.findAll({
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
    where: condition 
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving people."
      });
    });
};

// Retrieve all Persons from the database.
exports.findPerson = (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const birthday = req.body.birthday;
  
  var condition = {};
  if(firstName != "" && typeof(firstName) != undefined)
    condition.firstName = { [Op.like]: `%${firstName}%` };
  if(lastName != "" && typeof(lastName) != undefined)
    condition.lastName = { [Op.like]: `%${lastName}%` };
  if(birthday != "" && typeof(birthday) != undefined)
    condition.birthday = { [Op.eq]: `${birthday}` };

  Person.findAll({
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
    where: condition 
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving people."
      });
    });
};

// Find a single Person with an person_id
exports.findOne = (req, res) => {
  const person_id = req.params.person_id;

  Person.findByPk(person_id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Person with person_id=" + person_id
      });
    });
};

// Update a Person by the person_id in the request
exports.update = (req, res) => {
  const person_id = req.params.person_id;

  Person.update(req.body, {
    where: { person_id: person_id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Person was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Person with id=${id}. Maybe Person was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Person with id=" + id
      });
    });
};

// Delete a Person with the specified person_id in the request
exports.delete = (req, res) => {
  const person_id = req.params.person_id;

  Person.destroy({
    where: { person_id: person_id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Person was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Person with id=${id}. Maybe Person was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Person with id=" + id
      });
    });
};