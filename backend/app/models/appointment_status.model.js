module.exports = (sequelize, Sequelize) => {
  const AppointmentStatus = sequelize.define("appointment_statuses", {
    appointment_status_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    appointment_status: {
      type: Sequelize.STRING
    }
  });

  return AppointmentStatus;
};
