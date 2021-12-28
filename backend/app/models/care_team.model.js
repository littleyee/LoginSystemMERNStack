module.exports = (sequelize, Sequelize) => {
  const CareTeam = sequelize.define("care_teams", {
    care_team_id: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    employee_id:{
      type: Sequelize.INTEGER
    },
    care_team_role_id:{
      type: Sequelize.INTEGER
    },
    patient_id:{
      type: Sequelize.INTEGER
    }
  });

  return CareTeam;
};
