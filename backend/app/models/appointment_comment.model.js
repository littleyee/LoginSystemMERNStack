module.exports = (sequelize, Sequelize) => {
  const AppointmentComments = sequelize.define("appointment_comments", {
    appointment_team_id: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    appointment_id:{
      type: Sequelize.INTEGER
    },
    person_id:{
      type: Sequelize.INTEGER
    },
    comment:{
      type: Sequelize.STRING
    },
  });

  return AppointmentComments;
};
