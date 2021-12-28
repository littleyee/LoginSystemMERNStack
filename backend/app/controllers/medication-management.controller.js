const db = require("../models");
const MedicationFrequency  =  db.medicationFrequency 
const MedicationMeasurement  = db.medicationMeasurement 
const Medication  = db.medication 
const Pharmacy  = db.pharmacy 
const PatientMedication  = db.patientMedication 
const Person = db.person
const User = db.user;
const Role = db.role;
// const State = db.state
// const PatientInfo = db.patientInfo


const State = db.state;

const Op = db.Sequelize.Op;

// Create and Save a new PatientMedication
exports.create = (req, res) => {
    // Validate request
    if (req.body.medication == ""
    ) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a PatientMedication
    const patientMedicationManagement = {
      //patient_medication_id: req.body.patient_medication_id, // this is auto increment
  
      patient_id: req.body.patient_id,
      medication_id: req.body.medication_id,
      amount: req.body.amount,
      medication_frequency_id: req.body.medication_frequency_id,
      medication_measurement_id: req.body.medication_measurement_id,
      prescribed_by: req.body.prescribed_by,
      prescribed_on: req.body.prescribed_on,
      pharmacy_id: req.body.pharmacy_id,
    };
  
    // Save PatientMedication in the database
    PatientMedication.create(patientMedicationManagement)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the PatientMedication."
        });
      });
  };
  
  // Retrieve all PatientMedications from the database.
  exports.getAll = (req, res) => {
    const patient_id = req.params.patient_id;
    //var condition = patient_id ? { patient_id: { [Op.eq]: `${patient_id}` } } : null;
    // console.log(`Pat Med ${patient_id}`);
    PatientMedication.findAll({
      include: [{
        model: MedicationFrequency,
        required: true
       },
       {
        model: MedicationMeasurement,
        required: true
       },
       {
        model: Medication,
        required: true
       },
       {
        model: Person,
        required: true
       },
       {
        model: Pharmacy,
        required: true
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

        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving patient medication for this person."
        });
      });
  };
  
  // Find a single PatientMedication with an patient_medication_id
  exports.findOne = (req, res) => {
    // const patient_id = req.params.patient_id;
    const patient_medication_id = req.params.patient_medication_id;
  
    PatientMedication.findOne({
      include: [{
        model: MedicationFrequency,
        required: true
       },
       {
        model: MedicationMeasurement,
        required: true
       },
       {
        model: Medication,
        required: true
       },
       {
        model: Person,
        required: true
       },
       {
        model: Pharmacy,
        required: true
       }
      ],
       where: {patient_medication_id: { [Op.eq]: patient_medication_id}} 
    })
      .then(data => {
        if (data.length === 0) {
          res.status(404).send({
            message: `No record for ${patient_medication_id}!`
          })
          return
        } 

        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving patient medication for this person."
        });
      });
  };
  
  // Update a PatientMedication by the patient_medication_id in the request
  exports.update = (req, res) => {
    const patient_medication_id = req.params.patient_medication_id;
  
    PatientMedication.update(req.body, {
      where: { patient_medication_id: patient_medication_id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "PatientMedication was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update PatientMedication with id=${id}. Maybe PatientMedication was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating PatientMedication with id=" + id
        });
      });
  };
  
  // Delete a PatientMedication with the specified patient_medication_id in the request
  exports.delete = (req, res) => {
    const patient_medication_id = req.params.patient_medication_id;
  
    PatientMedication.destroy({
      where: { patient_medication_id: patient_medication_id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "PatientMedication was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete PatientMedication with id=${id}. Maybe PatientMedication was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete PatientMedication with id=" + id
        });
      });
  };


  // dropdowns
  // exports.getDoctors = (req, res) => {
  //   // person has to have the role of doctor to be returned
  //   Person.findAll({
  //     include: [
  //      {
  //       model: Role,
  //       required: true,
  //       where: { name: "doctor" }
  //      },
  //      {
  //       model: User,
  //       required: true
  //      },
  //     ]
  //   }).then(result  => {
  //     if (!result ) {
  //       return res.status(404).send({ message: "Options not found." });
  //     }
  //     console.log("log", result)
  
  //     res.status(200).send({
  //       result
        
  //     });
     
  //   });
  // };

  exports.getDoctors = (req, res) => {
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

  exports.getMedications = (req, res) => {
    // person has to have the role of doctor to be returned
    Medication.findAll().then(result  => {
      if (!result ) {
        return res.status(404).send({ message: "Options not found." });
      }
      res.status(200).send({
        result
      });
    });
  };

  exports.getMedicationFrequecies = (req, res) => {
    // person has to have the role of doctor to be returned
    MedicationFrequency.findAll().then(result  => {
      if (!result ) {
        return res.status(404).send({ message: "Options not found." });
      }
  
      res.status(200).send({
        result
      });
      
    });
  };

  exports.getMedicationMeasurements = (req, res) => {
    // person has to have the role of doctor to be returned
    MedicationMeasurement.findAll().then(result  => {
      if (!result ) {
        return res.status(404).send({ message: "Options not found." });
      }
  
      res.status(200).send({
        result
      });
    });
  };

  exports.getPharmacies = (req, res) => {
    // person has to have the role of doctor to be returned
    Pharmacy.findAll().then(result  => {
      if (!result ) {
        return res.status(404).send({ message: "Options not found." });
      }
  
      res.status(200).send({
        result
      });
    });
  };

