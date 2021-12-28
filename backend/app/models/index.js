const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.userAccessCode = require("../models/user_access_codes.model.js")(sequelize, Sequelize);

db.person = require("../models/person.model.js")(sequelize, Sequelize);
db.gender = require("../models/gender.model.js")(sequelize, Sequelize);
db.pronoun = require("../models/pronoun.model.js")(sequelize, Sequelize);
db.sexAtBirth = require("../models/sex_at_birth.model.js")(sequelize, Sequelize);
db.state = require("../models/state.model.js")(sequelize, Sequelize);

db.bill = require("../models/bill.model.js")(sequelize, Sequelize);

db.insurance = require("../models/insurance.model.js")(sequelize, Sequelize);

db.msg = require("../models/msg.model.js")(sequelize, Sequelize);

db.appointmentRequest = require("../models/appointment_request.model.js")(sequelize, Sequelize);
db.appointmentRequestTime = require("../models/appointment_request_time.model.js")(sequelize, Sequelize);
db.appointment = require("../models/appointment.model.js")(sequelize, Sequelize);
db.appointmentStatus = require("../models/appointment_status.model.js")(sequelize, Sequelize);
db.appointmentTeam = require("../models/appointment_team.model.js")(sequelize, Sequelize);
db.appointmentTeamRole = require("../models/appointment_team_role.model.js")(sequelize, Sequelize);
db.appointmentComment = require("../models/appointment_comment.model.js")(sequelize, Sequelize);

db.careTeam = require("../models/care_team.model.js")(sequelize, Sequelize);
db.careTeamRole = require("../models/care_team_role.model.js")(sequelize, Sequelize);

//initialize Sequelize in app/models folder that will contain model 
db.medicationFrequency = require("../models/medication_frequency.model.js")(sequelize, Sequelize);
db.medicationMeasurement = require("../models/medication_measurement.model.js")(sequelize, Sequelize);
db.medication = require("../models/medication.model.js")(sequelize, Sequelize);

db.pharmacy = require("../models/pharmacy.model.js")(sequelize, Sequelize);
db.patientMedication = require("../models/patient_medication.model")(sequelize, Sequelize);
db.patientInfo= require("../models/patient_info.model")(sequelize, Sequelize);

db.labComment = require("../models/lab_comment.model")(sequelize, Sequelize);
db.labMeasurement = require("../models/lab_measurement.model")(sequelize, Sequelize);
db.labResult = require("../models/lab_result.model")(sequelize, Sequelize);
db.labTest = require("../models/lab_test.model")(sequelize, Sequelize);
db.lab = require("../models/lab.model")(sequelize, Sequelize);


//define relationship

// user and roles
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "username"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "username",
  otherKey: "roleId"
});
// users and access codes
db.user.hasMany(db.userAccessCode, {
  foreignKey: 'username'
});

// users and access codes
db.userAccessCode.belongsTo(db.user, {
  foreignKey: 'username'
});

// users and people
db.person.hasOne(db.user, {
  foreignKey: 'person_id'
});
db.user.belongsTo(db.person, {
  foreignKey: 'person_id'
});

// people and genders
db.person.belongsTo(db.gender, {
  foreignKey: 'gender_id'
});

// people and pronouns
db.person.belongsTo(db.pronoun, {
  foreignKey: 'pronoun_id'
});

// people and sex at birth
db.person.belongsTo(db.sexAtBirth, {
  foreignKey: 'sex_at_birth_id'
});

// people and states
db.person.belongsTo(db.state, {
  foreignKey: 'state_id'
});

// care team and care team roles
db.careTeam.belongsTo(db.careTeamRole, {
  foreignKey: 'care_team_role_id'
});
// care team and people (employee)
db.careTeam.belongsTo(db.person, {
  foreignKey: 'employee_id'
});
// care team and people (patient)
db.careTeam.belongsTo(db.person, {
  foreignKey: 'patient_id'
});

// appointment request and people (patient)
db.appointmentRequest.belongsTo(db.person, {
  as: 'patient',
  foreignKey: 'patient_id'
});
// appointment request and people (doctor)
db.appointmentRequest.belongsTo(db.person, {
  as: 'doctor',
  foreignKey: 'doctor_id'
});
// appointment request and time
db.appointmentRequest.belongsTo(db.appointmentRequestTime, {
  foreignKey: 'appointment_time_id'
});
// appointment and people (patient)
db.appointment.belongsTo(db.person, {
  as: 'patient',
  foreignKey: 'patient_id'
});
// appointment and appointment_status
db.appointment.belongsTo(db.appointmentStatus, {
  foreignKey: 'appointment_status_id'
});
// appointment and appointment team
db.appointmentTeam.belongsTo(db.appointment, {
  foreignKey: 'appointment_id'
});
db.appointment.hasMany(db.appointmentTeam, {
  foreignKey: 'appointment_id'
});
// appointment team and person (employee)
db.appointmentTeam.belongsTo(db.person, {
  as: 'employee',
  foreignKey: 'employee_id'
});
// appointment team and appointment team roles
db.appointmentTeam.belongsTo(db.appointmentTeamRole, {
  foreignKey: 'appointment_team_role_id'
});
// appointment comment and appointment
db.appointmentComment.belongsTo(db.appointment, {
  foreignKey: 'appointment_id'
});
// appointment comment and person (employee)
db.appointmentComment.belongsTo(db.person, {
  as: 'employee',
  foreignKey: 'employee_id'
});


// patient_medication and people (person_id)
db.patientMedication.belongsTo(db.person, {
  foreignKey: 'patient_id'
});

// patient_medication and medications
db.patientMedication.belongsTo(db.medication, {
  foreignKey: 'medication_id'
});

// patient_medication and medication_frequencies
db.patientMedication.belongsTo(db.medicationFrequency, {
  foreignKey: 'medication_frequency_id'
});

// patient_medication and medication_measurements
db.patientMedication.belongsTo(db.medicationMeasurement, {
  foreignKey: 'medication_measurement_id'
});

// patient_medication and people (prescribed_by)
db.patientMedication.belongsTo(db.person, {
  foreignKey: 'prescribed_by'
});

// patient_medication and pharmacies

db.patientMedication.belongsTo(db.pharmacy, {
  foreignKey: 'pharmacy_id'
});

//lab_result and lab_test
db.labResult.belongsTo(db.labTest, {
  foreignKey: 'lab_test_id'
});


//lab_result and lab_measurement
db.labResult.belongsTo(db.labMeasurement, {
  foreignKey: 'lab_measurement_id'
});

//lab_result and lab
db.labResult.belongsTo(db.lab, {
  foreignKey: 'lab_id'
});

//lab_result and person
db.labResult.belongsTo(db.person, {
  foreignKey: 'performed_by'
});


//lab and patient
db.lab.belongsTo(db.person, {
  foreignKey: 'patient_id',
  as: 'patient'
});

//lab and person
db.lab.belongsTo(db.person, {
  foreignKey: 'ordered_by_id',
  as: 'orderer'
});

//lab and person
db.lab.belongsTo(db.person, {
  foreignKey: 'lab_reviewed_by',
  as: 'reviewer'
});


//lab_comment and employee
db.labComment.belongsTo(db.person, {
  foreignKey: 'employee_id'
});


//lab_comment and lab
db.labComment.belongsTo(db.lab, {
  foreignKey: 'lab_id'
});



// people and bills
db.bill.hasMany(db.person, {
  foreignKey: 'person_id'
});
db.person.belongsTo(db.bill, {
  foreignKey: 'person_id'
});

// people and insurances
db.insurance.hasMany(db.person, {
  foreignKey: 'person_id'
});
db.person.belongsTo(db.insurance, {
  foreignKey: 'person_id'
});

// people and msgs
db.msg.hasMany(db.person, {
  foreignKey: 'person_id'
});
db.person.belongsTo(db.msg, {
  foreignKey: 'person_id'
});

// have this grab dynamically in from the database
db.ROLES = ["patient", "admin", "doctor", "nurse"];

module.exports = db;
