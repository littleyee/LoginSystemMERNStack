const db = require("../models");
const Appointment = db.appointment;
const AppointmentStatus = db.appointmentStatus;
const AppointmentComment = db.appointmentComment;
const AppointmentTeam = db.appointmentTeam;
const AppointmentTeamRole = db.appointmentTeamRole;
const Person = db.person;

const Op = db.Sequelize.Op;

// create an appointment
exports.create = async (req, res) => {
  // Validate request
  if (req.body.appointment_date == ""
  || req.body.patient_id == ""
  || req.body.appointment_status_id == ""
  ) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // construct database information
  const appointmentInput = {
    //appointment_id is auto increment
    appointment_date: req.body.appointment_date,
    patient_id: req.body.patient_id,
    appointment_status_id: req.body.appointment_status_id
  };

  // save to the database
  const appointment = await Appointment.create(appointmentInput)
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while adding an appointment."
      });
    });

  // success
  res.send(appointment);
}

// get appointment comments
exports.getComments = async (req, res) => {
  // Validate request
  if (req.body.appointment_id == ""
  ) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // save to the database
  const appointment_id = req.body.appointment_id;
  const appointmentComments = await AppointmentComment.findAll({where: {appointment_id : appointment_id }})
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while adding an appointment comment."
      });
    });

  // success
  res.send(appointmentComments);
}

// add comment to appointment
exports.addComment = async (req, res) => {
  // Validate request
  if (req.body.appointment_id == ""
  || req.body.comment == ""
  || req.body.person_id == ""
  ) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // construct database information
  const commentInput = {
    //appointment_comment_id is auto increment
    appointment_id: req.body.appointment_id,
    comment: req.body.comment,
    person_id: req.body.person_id
  };

  // save to the database
  const appointmentComment = await AppointmentComment.create(commentInput)
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while adding an appointment comment."
      });
    });

  // success
  res.send(appointmentComment);
}

// add team member to appointment
exports.getTeamMembers = async (req, res) => {
  // Validate request
  if (req.body.appointment_id == ""
  ) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // save to the database
  const appointment_id = req.body.appointment_id;
  const appointmentTeamMembers = await AppointmentTeam.findAll({where: {appointment_id : appointment_id }})
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while adding a team member."
      });
    });

  // success
  res.send(appointmentTeamMembers);
}

// add team member to appointment
exports.addTeamMember = async (req, res) => {
  // Validate request
  if (req.body.appointment_id == ""
  || req.body.employee_id  == ""
  || req.body.appointment_team_role_id == ""
  ) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // construct database information
  const appointmentTeamInput = {
    //appointment_team_id is auto increment
    appointment_id: req.body.appointment_id,
    employee_id: req.body.employee_id,
    appointment_team_role_id: req.body.appointment_team_role_id
  };

  // save to the database
  const appointmentTeam = await AppointmentTeam.create(appointmentTeamInput)
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while adding a team member."
      });
    });

  // success
  res.send(appointmentTeam);
}

/* // change the status of an appointment
exports.changeStatus = async (req, res) => {
  // Validate request
  if (req.body.appointment_id == ""
  || req.body.appointment_status_id  == ""
  ) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // construct database information
  const appointmentStatusInput = {
    appointment_status_id: req.body.appointment_status_id,
  };

  // save to the database
  const appointment = await Appointment.update(appointmentStatusInput, {where: { appointment_id: req.body.appointment_id }})
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while updating the status of the appointment."
      });
    });

  // success
  res.send(appointment);
} */

// change the status of an appointment
exports.updateAppointment = async (req, res) => {
  // Validate request
  if (req.body.appointment_id == ""
  || req.body.appointment_date  == ""
  || req.body.appointment_status_id  == ""
  ) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // construct database information
  const appointmentInput = {
    appointment_date: req.body.appointment_date,
    appointment_status_id: req.body.appointment_status_id,
  };

  // save to the database
  const appointment = await Appointment.update(appointmentInput, {where: { appointment_id: req.body.appointment_id }})
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while updating the appointment."
      });
    });

  // success
  res.send(appointment);
}

// Retrieve all appointments from the database.
exports.findAllMyAppointments = (req, res) => {
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
    where: { patient_id: req._person_id }
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving appointment."
      });
    });
};

// get all appointments from database
exports.getAppointments = async (req, res) => {
  // Validate request
  if (req.params.patient_id == ""
  ) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const patient_id = req.params.patient_id;
  const appointment_id = await Appointment.findAll({where: {patient_id : patient_id }})
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while fetching the appointments."
      });
    });

  // success
  res.send(appointments);
};


// cancel an appointment
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