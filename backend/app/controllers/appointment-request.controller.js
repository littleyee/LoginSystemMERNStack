const db = require("../models");
const AppointmentRequest = db.appointmentRequest;
const AppointmentRequestTime = db.appointmentRequestTime;
const Person = db.person;
const Role = db.role;
const User = db.user;

const Op = db.Sequelize.Op;

// Create and Save a new appointment request
exports.create = (req, res) => {
  // Validate request
  if (req.body.doctor_id == ""
    || req.body.date_min == ""
    || req.body.date_max == ""
    || req.body.appointment_time_id == ""
    || req.body.reason == ""
  ) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a appointment request
  const appointmentRequest = {
    status: 'requested',
    patient_id: req._person_id,
    doctor_id: req.body.doctor_id,
    date_min: req.body.date_min,
    date_max: req.body.date_max,
    appointment_time_id: req.body.appointment_time_id,
    reason: req.body.reason,
  };

  // Save appointment request in the database
  AppointmentRequest.create(appointmentRequest)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the appointment request."
      });
    });
};



// dropdowns
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
  });
};

exports.getAppointmentRequestTimes = (req, res) => {
  AppointmentRequestTime.findAll().then(result  => {
    if (!result ) {
      return res.status(404).send({ message: "Options not found." });
    }

    res.status(200).send({
      result
    });
  });
};