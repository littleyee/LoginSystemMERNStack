const db = require("../models");
const LabTest = db.labTest
const LabMeasurement = db.labMeasurement
const LabComment =   db.labComment
const LabResult = db.labResult
const Lab = db.lab
const MedicationMeasurement  = db.medicationMeasurement 
const Medication  = db.medication 
const Pharmacy  = db.pharmacy 
const PatientMedication  = db.patientMedication 
const Person = db.person
const User = db.user;
const Role = db.role;
const State = db.state;

const Op = db.Sequelize.Op;

// Create and Save a new labResult
exports.create = (req, res) => {
    // Validate request
    if (req.body.result == "" 
    ) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a lab result 
    const labResult = {
      // lab_id: req.body.lab_id,
      lab_id: req.body.lab_id,
      lab_test_id: req.body.lab_test_id,
      result: req.body.result,
      lab_measurement_id:req.body.lab_measurement_id,
      comment:req.body.comment,
      performed_by:req.body.performed_by
  
    };
  
    // Save Lab in the database
    LabResult.create(labResult)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the LabResult."
        });
      });
  };
  
  // Retrieve all labResult from the database.
  exports.findAll = (req, res) => {
    const lab_id = req.query.lab_id ;
    var condition = lab_id ? { lab_id: { [Op.like]: `%${lab_id}%` } } : null;
  
    LabResult.findAll({
      include: [{
        model: Lab ,
        required: true
       },
       
       {
        model: LabTest,
        required: true
       },
       {
        model: LabMeasurement,
        required: true
       },
       {
        model: Person,
        required: true
       },
      ],
      where: condition 
    })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving lab result."
        });
      });
  };
  
  
  // Find a single LabResult with an lab_result_id
  exports.findOne = (req, res) => {
    const lab_result_id = req.params.lab_result_id;
  
    LabResult.findByPk(lab_result_id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving LabResult with lab_result_id=" + lab_result_id
        });
      });
  };
  
  // Update a LabResult by the lab_result_id in the request
  exports.update = (req, res) => {
    const lab_result_id = req.params.lab_result_id;
  
    LabResult.update(req.body, {
      where: { lab_result_id: lab_result_id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "LabResult was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update LabResult with id=${id}. Maybe LabResult was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating LabResult with id=" + id
        });
      });
  };
  
  // Delete a LabResult with the specified lab_result_id in the request
  exports.delete = (req, res) => {
    const lab_result_id = req.params.lab_result_id;
  
    LabResult.destroy({
      where: { lab_result_id: lab_result_id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "LabResult was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete LabResult with id=${id}. Maybe LabResult was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete LabResult with id=" + id
        });
      });
  };


  exports.getLabs = (req, res) => {
    // person has to have the role of doctor to be returned
    Lab.findAll().then(result  => {
      if (!result ) {
        return res.status(404).send({ message: "Options not found." });
      }
      res.status(200).send({
        result
      });
    });
  };

  exports.getLabTests = (req, res) => {
    // person has to have the role of doctor to be returned
    LabTest.findAll().then(result  => {
      if (!result ) {
        return res.status(404).send({ message: "Options not found." });
      }
      res.status(200).send({
        result
      });
    });
  };


  exports.getLabMeasurements = (req, res) => {
    // person has to have the role of doctor to be returned
    LabMeasurement.findAll().then(result  => {
      if (!result ) {
        return res.status(404).send({ message: "Options not found." });
      }
      res.status(200).send({
        result
      });
    });
  };

  //assume nurse perform the lab test

  exports.getPerformedBys = (req, res) => {
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