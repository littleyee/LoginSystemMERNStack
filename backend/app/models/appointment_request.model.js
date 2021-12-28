module.exports = (sequelize, Sequelize) => {
  const AppointmentRequest = sequelize.define("appointment_requests", {
    appointment_request_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    status: {
      type: Sequelize.STRING
    },
    patient_id: {
      type: Sequelize.INTEGER
    },
    doctor_id: {
      type: Sequelize.INTEGER
    },
    date_min: {
      type: Sequelize.DATEONLY
    },
    date_max: {
      type: Sequelize.DATEONLY
    },
    appointment_time_id: {
      type: Sequelize.INTEGER
    },
    reason: {
      type: Sequelize.STRING
    }
  });

  return AppointmentRequest;
};