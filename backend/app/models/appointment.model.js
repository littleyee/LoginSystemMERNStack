module.exports = (sequelize, Sequelize) => {
  const Appointment = sequelize.define("appointments", {
    appointment_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    appointment_status_id: {
      type: Sequelize.INTEGER
    },
    appointment_date: {
      type: "TIMESTAMP"
    },
    patient_id: {
      type: Sequelize.INTEGER
    }
  });

  return Appointment;
};