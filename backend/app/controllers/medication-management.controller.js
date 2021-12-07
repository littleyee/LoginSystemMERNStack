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
      .then(data => {console.log(data);
        console.log(data.dataValues);
        console.log(data.medication);
        console.log(data.dataValues.medication_frequency);
        console.log(data.medication_frequency);

        //res.send(data);
        /*

        data =  {
              "patient_medication_id": 1,
              "patient_id": 2,
              "medication_id": 1,
              "amount": 50,
              "medication_frequency_id": 1,
              "medication_measurement_id": 1,
              "prescribed_by": 4,
              "prescribed_on": "2010-01-20",
              "pharmacy_id": 1,
              "createdAt": "2021-12-07T02:50:31.000Z",
              "updatedAt": "2021-12-07T02:50:31.000Z",
              "medication_frequency": {
                  "medication_frequency_id": 1,
                  "medication_frequency": "once a day",
                  "createdAt": "2021-12-07T02:26:15.000Z",
                  "updatedAt": "2021-12-07T02:26:15.000Z"
              },
              "medication_measurement": {
                  "medication_measurement_id": 1,
                  "medication_measurement": "mg",
                  "createdAt": "2021-12-07T02:26:15.000Z",
                  "updatedAt": "2021-12-07T02:26:15.000Z"
              },
              "medication": {
                  "medication_id": 1,
                  "medication": "Zoloft",
                  "createdAt": "2021-12-07T02:26:15.000Z",
                  "updatedAt": "2021-12-07T02:26:15.000Z"
              },
              "person": {
                  "person_id": 4,
                  "firstName": "Yiqing1234",
                  "lastName": "Zhu123",
                  "email": "zhuyiqing234@gmail.com",
                  "address": "1543 Wild Prairie Dr",
                  "birthday": "2020-11-23",
                  "sex_at_birth_id": 1,
                  "gender_id": 1,
                  "pronoun_id": 1,
                  "state_id": 15,
                  "city": "Iowa City",
                  "zip": 52246,
                  "createdAt": "2021-12-07T02:43:20.000Z",
                  "updatedAt": "2021-12-07T02:43:20.000Z"
              },
              "pharmacy": {
                  "pharmacy_id": 1,
                  "name": "target",
                  "address": null,
                  "city": null,
                  "state_id": null,
                  "createdAt": "2021-12-07T02:26:15.000Z",
                  "updatedAt": "2021-12-07T02:26:15.000Z"
              }
          }

        */
        res.status(200).send({
          // medication information
          patient_medication_id: data.patient_medication_id, 
          patient_id:data.patient_id,
          medication_id: data.medication_id,
          amount: data.amount,
          medication_frequency_id:data.medication_frequency_id,
          medication_measurement_id:data.medication_measurement_id,
          prescribed_by: data.prescribed_by,
          prescribed_on: data.prescribed_on,
          pharmacy_id: data.pharmacy_id,
          medication_frequency: data.medication_frequency.medication_frequency,
          medication_measurement: data.medication_measurement.medication_measurement,
          medication: data.medication.medication,
          pharmacy: data.pharmacy.name
        });
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
  
    PatientMedication.findByPk(patient_medication_id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving PatientMedication with patient_medication_id=" + patient_medication_id
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

