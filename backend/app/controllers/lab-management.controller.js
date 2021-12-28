const db = require("../models");

const Lab = db.lab
const Person = db.person
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;

// Create and Save a new Lab
exports.create = (req, res) => {
    // Validate request
    if (req.body.ordered_date == "" || req.body.lab_done_date == "" || req.body.lab_reviewed_date == ""
    ) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a lab
    const labManagement = {

  
      // lab_id: req.body.lab_id,
      patient_id: req.body.patient_id,
      ordered_by_id: req.body.ordered_by_id,
      ordered_date: req.body.ordered_date,
      lab_done_date:req.body.lab_done_date,
      lab_reviewed_by:req.body.lab_reviewed_by,
      lab_reviewed_date:req.body.lab_reviewed_date
  
    };
  
    // Save Lab in the database
    Lab.create(labManagement)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Lab."
        });
      });
  };
  
  // Retrieve all Labs from the database.

  exports.findAll = (req, res) => {
    const patient_id = req.params.patient_id;
    // var condition = lab_id ? { lab_id: { [Op.like]: `%${lab_id}%` } } : null;

     console.log(`Test get' ${patient_id}`);
  
    Lab.findAll({
      include: [{
        model: Person,
        required: true,
        as: 'patient'
       },
       {
        model: Person,
        required: true,
        as: 'reviewer'
       },
       {
        model: Person,
        required: true,
        as: 'orderer'
       }
      ],
      where: {patient_id: { [Op.eq]: patient_id}} 
    })
    .then(data => {
      if (data.length === 0) {
        res.status(404).send({
          message: `No record for ${patient_id}!`
        })
        return
      } 
      console.log(data);

      res.send(data);
    })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving lab."
        });
      });
  };
  
  
  // Find a single Lab with an lab_id
  exports.findOne = (req, res) => {
    const lab_id = req.params.lab_id;
  
    Lab.findByPk(lab_id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Lab with lab_id=" + lab_id
        });
      });
  };
  
  // Update a Lab by the lab_id in the request
  exports.update = (req, res) => {
    const lab_id = req.params.lab_id;
  
    Lab.update(req.body, {
      where: { lab_id: lab_id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Lab was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Lab with id=${id}. Maybe Lab was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Lab with id=" + id
        });
      });
  };
  
  // Delete a Lab with the specified lab_id in the request
  exports.delete = (req, res) => {
    const lab_id = req.params.lab_id;
  
    Lab.destroy({
      where: { lab_id: lab_id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Lab was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Lab with id=${id}. Maybe Lab was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Lab with id=" + id
        });
      });
  };

  exports.getPatients = (req, res) => {
    // person has to have the role of doctor to be returned
    Person.findAll({
      include: [
       {
        model: User,
        required: true,
          include: [
          {
            model: Role,
            required: true,
            where: { name: "patient" }
          }]
       }
      ]
    }).then(result  => {
      if (!result ) {
        return res.status(404).send({ message: "Options not found." });
      }
      res.status(200).send({
        result
      });
      console.log("log", result)
    });
  };

  exports.getOrderedBys = (req, res) => {
    // person has to have the role of doctor to be returned
    Person.findAll({
      include: [
       {
        model: User,
        required: true,
          include: [
          {
            model: Role,
            required: true,
            where: { name: "doctor" }
          }]
       }
      ]
    }).then(result  => {
      if (!result ) {
        return res.status(404).send({ message: "Options not found." });
      }
      res.status(200).send({
        result
      });
      console.log("log", result)
    });
  };

  exports.getReviewedBys = (req, res) => {
    // person has to have the role of doctor to be returned
    Person.findAll({
      include: [
       {
        model: User,
        required: true,
          include: [
          {
            model: Role,
            required: true,
            where: { name: "doctor" }
          }]
       }
      ]
    }).then(result  => {
      if (!result ) {
        return res.status(404).send({ message: "Options not found." });
      }
      res.status(200).send({
        result
      });
      console.log("log", result)
    });
  };


