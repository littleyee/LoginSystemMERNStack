const db = require("../models");
const Person = db.person;
const Role = db.role;
const User = db.user;
const Appointment = db.appointment;
const AppointmentStatus = db.appointmentStatus;
const AppointmentComment = db.appointmentComment;
const AppointmentTeam = db.appointmentTeam;
const AppointmentTeamRole = db.appointmentTeamRole;

const Op = db.Sequelize.Op;

// Create and Save a new appointment
exports.create = (req, res) => {
  console.log('creating');
  // Validate request
  if (req.body.appointment_status_id == ""
    || req.body.patient_id == ""
    || req.body.doctor_id == ""
    || req.body.appointment_date == ""
    || req.body.reason == ""
  ) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a appointment
  const appointmentData = {
    appointment_status_id: req.body.appointment_status_id,
    patient_id: req.body.patient_id,
    appointment_date: req.body.appointment_date,
    reason: req.body.reason
  };

  // Save Person in the database
  Appointment.create(appointmentData)
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
          res.status(200).send({ message: "Appointment created." });
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
          err.message || "Some error occurred while creating the Person."
      });
    });
};

// Retrieve all Persons from the database.
exports.findAll = (req, res) => {
  const appointment_id = req.query.appointment_id;
  var condition = appointment_id ? { appointment_id: { [Op.like]: `%${appointment_id}%` } } : null;

  Appointment.findAll({
    include: [{
      model: AppointmentTeam,
      required: true,
      include: [{
          model: AppointmentTeamRole,
          required: true
        },
        {
          model: Person,
          as: 'employee',
          required: true
        }
      ]
     },
     {
      model: Person,
      as: 'patient',
      required: true
     },
     {
      model: AppointmentStatus,
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

// Find a single Person with an appointment_id
exports.findOne = (req, res) => {
  const appointment_id = req.params.appointment_id;

  Appointment.findByPk(appointment_id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Person with appointment_id=" + appointment_id
      });
    });
};

// Update a Person by the appointment_id in the request
exports.update = (req, res) => {
  const appointment_id = req.params.appointment_id;

  const appointmentData = {
    appointment_status_id: req.body.appointment_status_id,
    patient_id: req.body.patient_id,
    appointment_date: req.body.appointment_date,
    reason: req.body.reason
  };

  Appointment.update(appointmentData, {
    where: { appointment_id: appointment_id }
  })
    .then(updatedAppointment => {
      //AppointmentTeam.findOne
      
      // add code to update doctor
      
      res.send({
        message: "Appointment was updated successfully."
      });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating appointment with id"
      });
    });
};

// Delete a Person with the specified appointment_id in the request
exports.cancel = (req, res) => {
  const appointment_id = req.params.appointment_id;

  Appointment.update(
    {appointment_status_id: 1}, // cancelled
    {where: { appointment_id: appointment_id } }
  )
    .then(appointment => {
      res.send(appointment);
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not cancel appointment"
      });
    });
};
// dropdowns
exports.getPatients = (req, res) => {
  // person has to have the role of patient to be returned
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
  });
};

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

exports.getAppointmentStatuses = (req, res) => {
AppointmentStatus.findAll().then(result  => {
    if (!result ) {
      return res.status(404).send({ message: "Options not found." });
    }

    res.status(200).send({
      result
    });
  });
};