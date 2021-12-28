const db = require("../models");
const LabTest = db.labTest
const LabMeasurement = db.labMeasurement
const LabComment =   db.labComment
const LabResult = db.labResult
const Lab = db.lab


const MedicationMeasurement  = db.medicationMeasurement 
const Medication  = db.medication 
const Pharmacy  = db.pharmacy 
const Person = db.person
const User = db.user;
const Role = db.role;
// const State = db.state
const PatientInfo = db.patientInfo


const State = db.state;

const Op = db.Sequelize.Op;

// Create and Save a new LabComment
exports.create = (req, res) => {
    // Validate request
    if (req.body.comment == ""
    ) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a lab
    const labComment = {

      employee_id: req.body.employee_id,
      lab_id: req.body.lab_id,
      comment:req.body.comment,
      creation_date:req.body.creation_date
    };
  
    // Save LabComment in the database
    LabComment.create(labComment)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the LabComment."
        });
      });
  };
  
  // Retrieve all LabComments of one lab from the database.
  exports.findAll = (req, res) => {
    const lab_id = req.query.lab_id ;
    var condition = lab_id ? { lab_id: { [Op.like]: `%${lab_id}%` } } : null;
  
    LabComment.findAll({
      include: [{
        model: Lab ,
        required: true
       },
       
       {
        model: Person,
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
            err.message || "Some error occurred while retrieving lab comment."
        });
      });
  };
  
  
  // Find a single LabComment with an lab_comment_id
  exports.findOne = (req, res) => {
    const lab_comment_id = req.params.lab_comment_id;
  
    LabComment.findByPk(lab_comment_id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving LabComment with lab_comment_id=" + lab_comment_id
        });
      });
  };
  
  // Update a LabComment by the lab_comment_id in the request
  exports.update = (req, res) => {
    const lab_comment_id = req.params.lab_comment_id;
  
    LabComment.update(req.body, {
      where: { lab_comment_id: lab_comment_id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "LabComment was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update LabComment with id=${id}. Maybe LabComment was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating LabComment with id=" + id
        });
      });
  };
  
  // Delete a LabComment with the specified lab_comment_id in the request
  exports.delete = (req, res) => {
    const lab_comment_id = req.params.lab_comment_id;
  
    LabComment.destroy({
      where: { lab_comment_id: lab_comment_id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "LabComment was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete LabComment with id=${id}. Maybe LabComment was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete LabComment with id=" + id
        });
      });
  };

//assume the nurses perform the lab comments 
  exports.getNurses = (req, res) => {
    // person has to have the role of nurse to be returned
    Person.findAll({
      include: [
       {
        model: User,
        required: true,
          include: [
          {
            model: Role,
            required: true,
            where: { name: "nurse" }
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

  

  

