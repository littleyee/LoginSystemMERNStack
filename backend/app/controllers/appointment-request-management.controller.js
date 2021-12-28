const db = require("../models");
const AppointmentRequest = db.appointmentRequest;
const AppointmentRequestTime = db.appointmentRequestTime;
const Appointment = db.appointment;
const AppointmentTeam = db.appointmentTeam;
const Person = db.person;
const Role = db.role;
const User = db.user;

const Op = db.Sequelize.Op;

exports.approve = (req, res) => {
  const appointment_request_id = req.params.appointment_request_id;
  
  AppointmentRequest.findOne({ where: { appointment_request_id: appointment_request_id } }).then(appointmentRequest => {
    if (!appointmentRequest) {
      return res.status(404).send({ message: "Appointment request Not found." });
    }

    // update appointmentRequest password
    appointmentRequest.set({
      status: "approved"
    });
    appointmentRequest.save();

    // Create an appointment
    const appointment = {
      patient_id: appointmentRequest.patient_id,
      appointment_status_id: 2, // upcoming
      appointment_date: req.body.appointment_date,
    };

    // Save appointment in the database
    Appointment.create(appointment)
      .then(createdAppointment => {

        // we need to create appointment team
        const appointmentTeamDoctor = {
          employee_id: req.body.doctor_id,
          appointment_team_role_id: 1,
          appointment_id: createdAppointment.appointment_id,
        }
        AppointmentTeam.create(appointmentTeamDoctor)
          .then(createdAppointmentTeamDoctor => {
            // success
            //res.send(createdAppointmentTeamDoctor);
            res.status(200).send({ message: "Appointment request approved." });
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the appointment team."
            });
          });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the appointment."
        });
      });
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
}
exports.deny = (req, res) => {
  const appointment_request_id = req.params.appointment_request_id;
  
  AppointmentRequest.findOne({ where: { appointment_request_id: appointment_request_id } }).then(appointmentRequest => {
    if (!appointmentRequest) {
      return res.status(404).send({ message: "Appointment request Not found." });
    }

    // update appointmentRequest password
    appointmentRequest.set({
      status: "denied"
    });
    appointmentRequest.save();

    // success
    res.status(200).send({ message: "Appointment request denied." });
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
}

// Retrieve all Persons from the database.
exports.findAll = (req, res) => {
  AppointmentRequest.findAll({
    include: [{
      model: Person,
      as: 'doctor',
      required: true
     },
     {
      model: Person,
      as: 'patient',
      required: true
     },
     {
      model: AppointmentRequestTime,
      required: true
     }
    ]
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving appointment requests."
      });
    });
};

// Find a single Person with an appointment_request_id
exports.findOne = (req, res) => {
  const appointment_request_id = req.params.appointment_request_id;

  AppointmentRequest.findByPk(appointment_request_id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Appointment Request with appointment_request_id=" + appointment_request_id
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