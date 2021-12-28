module.exports = (sequelize, Sequelize) => {
  const AppointmentTeam = sequelize.define("appointment_teams", {
    appointment_team_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    employee_id:{
      type: Sequelize.INTEGER
    },
    appointment_team_role_id:{
      type: Sequelize.INTEGER
    },
    appointment_id:{
      type: Sequelize.INTEGER
    }
  });

  return AppointmentTeam;
};
