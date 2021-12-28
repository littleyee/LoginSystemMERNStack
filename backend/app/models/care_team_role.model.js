module.exports = (sequelize, Sequelize) => {
  const CareTeamRole = sequelize.define("care_team_roles", {
    care_team_role_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    care_team_role: {
      type: Sequelize.STRING
    }
  });

  return CareTeamRole;
};
