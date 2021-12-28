module.exports = (sequelize, Sequelize) => {
  const AppointmentRequestTime = sequelize.define("appointment_request_times", {
    appointment_time_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    time: {
      type: Sequelize.STRING
    }
  });

  return AppointmentRequestTime;
};
