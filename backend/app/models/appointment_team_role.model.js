module.exports = (sequelize, Sequelize) => {
  const AppointmentTeamRole = sequelize.define("appointment_team_roles", {
    appointment_team_role_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    appointment_team_role: {
      type: Sequelize.STRING
    }
  });

  return AppointmentTeamRole;
};
