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
// users and access codes
db.user.hasMany(db.userAccessCode, {
  foreignKey: 'username'
});
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
db.gender.hasMany(db.person, {
  foreignKey: 'gender_id'
});
db.person.belongsTo(db.gender, {
  foreignKey: 'gender_id'
});

// people and pronouns
db.pronoun.hasMany(db.person, {
  foreignKey: 'pronoun_id'
});
db.person.belongsTo(db.pronoun, {
  foreignKey: 'pronoun_id'
});

// people and sex at birth
db.sexAtBirth.hasMany(db.person, {
  foreignKey: 'sex_at_birth_id'
});
db.person.belongsTo(db.sexAtBirth, {
  foreignKey: 'sex_at_birth_id'
});

// people and states
db.state.hasMany(db.person, {
  foreignKey: 'state_id'
});
db.person.belongsTo(db.state, {
  foreignKey: 'state_id'
});


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
  foreignKey: 'patient_id'
});

//lab and person
db.lab.belongsTo(db.person, {
  foreignKey: 'ordered_by_id'
});

//lab and person
db.lab.belongsTo(db.person, {
  foreignKey: 'lab_reviewed_by'
});


//lab_comment and employee
db.labComment.belongsTo(db.person, {
  foreignKey: 'employee_id'
});


//lab_comment and lab
db.labComment.belongsTo(db.lab, {
  foreignKey: 'lab_id'
});






db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
