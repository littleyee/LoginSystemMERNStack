const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:3000",
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// database
const db = require("./app/models");
const { pharmacy, lab } = require("./app/models");

db.sequelize.sync();
// force: true will drop the table if it already exists
/* db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Database with { force: true }');
  initial();
}); */

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to our healthcare application!" });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/profile.routes')(app);
require('./app/routes/person.routes')(app);
require('./app/routes/person-management.routes')(app);
require('./app/routes/medication-management.routes')(app);

require('./app/routes/lab-management.routes')(app);
require('./app/routes/lab-comment.routes')(app);
require('./app/routes/lab-result.routes')(app);


require('./app/routes/bill-management.routes')(app);
require('./app/routes/insurance-management.routes')(app);
require('./app/routes/msg-management.routes')(app);

require('./app/routes/appointment.routes')(app);
require('./app/routes/appointment-request.routes')(app);
require('./app/routes/appointment-request-management.routes')(app);
require('./app/routes/appointment-management.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// this can all be deleted once we remove the complete resync
const Role = db.role;

const Gender = db.gender;
const Pronoun = db.pronoun;
const SexAtBirth = db.sexAtBirth;
const State = db.state;
const Medication = db.medication;
const MedicationFrequency = db.medicationFrequency;
const MedicationMeasurement = db.medicationMeasurement;
const Pharmacy = db.pharmacy
const Person = db.person
const Lab = db.lab
const LabResult = db.labResult
const LabComment = db.labComment


const AppointmentRequestTime = db.appointmentRequestTime;
const AppointmentStatus = db.appointmentStatus;
const AppointmentTeamRole = db.appointmentTeamRole;

function initial() {
  // Genders
  Gender.create({gender: "Man"});
  Gender.create({gender: "Woman"});
  Gender.create({gender: "Non-Binary"});
  // Pronouns
  Pronoun.create({pronoun: "He / Him"});
  Pronoun.create({pronoun: "She / Her"});
  Pronoun.create({pronoun: "They / Them"});
  // Sex At Birth
  SexAtBirth.create({sex_at_birth: "Male"});
  SexAtBirth.create({sex_at_birth: "Female"});
  SexAtBirth.create({sex_at_birth: "Intersexed"});
  // States
  State.create({state: "Alabama"});
  State.create({state: "Alaska"});
  State.create({state: "Arizona"});
  State.create({state: "Arkansas"});
  State.create({state: "California"});
  State.create({state: "Colorado"});
  State.create({state: "Connecticut"});
  State.create({state: "Delaware"});
  State.create({state: "Florida"});
  State.create({state: "Georgia"});
  State.create({state: "Hawaii"});
  State.create({state: "Idaho"});
  State.create({state: "Illinois"});
  State.create({state: "Indiana"});
  State.create({state: "Iowa"});
  State.create({state: "Kansas"});
  State.create({state: "Kentucky"});
  State.create({state: "Louisiana"});
  State.create({state: "Maine"});
  State.create({state: "Maryland"});
  State.create({state: "Massachusetts"});
  State.create({state: "Michigan"});
  State.create({state: "Minnesota"});
  State.create({state: "Mississippi"});
  State.create({state: "Missouri"});
  State.create({state: "Montana"});
  State.create({state: "Nebraska"});
  State.create({state: "Nevada"});
  State.create({state: "New Hampshire"});
  State.create({state: "New Jersey"});
  State.create({state: "New Mexico"});
  State.create({state: "New York"});
  State.create({state: "North Carolina"});
  State.create({state: "North Dakota"});
  State.create({state: "Ohio"});
  State.create({state: "Oklahoma"});
  State.create({state: "Oregon"});
  State.create({state: "Pennsylvania"});
  State.create({state: "Rhode Island"});
  State.create({state: "South Carolina"});
  State.create({state: "South Dakota"});
  State.create({state: "Tennessee"});
  State.create({state: "Texas"});
  State.create({state: "Utah"});
  State.create({state: "Vermont"});
  State.create({state: "Virginia"});
  State.create({state: "Washington"});
  State.create({state: "West Virginia"});
  State.create({state: "Wisconsin"});
  State.create({ state: "Wyoming" });

    // medications (these should not be hard coded)
    Medication.create({ medication: 'Zoloft' });
    Medication.create({ medication: 'Advil' }); 
    Medication.create({ medication: 'Adderall' });
    Medication.create({ medication: 'Acetaminophen' });

    // medication frequencies
    MedicationFrequency.create({ medication_frequency: 'once a day' });
    MedicationFrequency.create({ medication_frequency: 'twice a day' });
    MedicationFrequency.create({ medication_frequency: 'three times a day' });
    MedicationFrequency.create({ medication_frequency: 'once a week' });
    MedicationFrequency.create({ medication_frequency: 'twice a week' });
    MedicationFrequency.create({ medication_frequency: 'once a month' });

    // medication measurements
    MedicationMeasurement.create({ medication_measurement: 'mg' });
    MedicationMeasurement.create({ medication_measurement: 'g' });
    MedicationMeasurement.create({ medication_measurement: 'ml' });

    // phamacies
    Pharmacy.create({name: 'target' });
    Pharmacy.create({name: 'cvs' });
    Pharmacy.create({name: 'walmart' });

  
  
    

  // appointment request times
  AppointmentRequestTime.create({time: "Mornings"});
  AppointmentRequestTime.create({time: "Afternoons"});
  AppointmentRequestTime.create({time: "Evenings"});

  // appointment statuses
  AppointmentStatus.create({appointment_status_id: 1, appointment_status: "Cancelled"});
  AppointmentStatus.create({appointment_status_id: 2, appointment_status: "Upcoming"});
  AppointmentStatus.create({appointment_status_id: 3, appointment_status: "Checked Out"});
  AppointmentStatus.create({appointment_status_id: 4, appointment_status: "Checked In"});

  // appointment team roles
  AppointmentTeamRole.create({appointment_team_role: "Primary Doctor"});
  AppointmentTeamRole.create({appointment_team_role: "Secondary Doctor"});
  AppointmentTeamRole.create({appointment_team_role: "Nurse"});

  // roles
  Role.create({name: "patient"});
  Role.create({name: "doctor"});
  Role.create({name: "nurse"});
  Role.create({name: "admin"}); // front desk office staff
  Role.create({name: "ITAdmin"});
}