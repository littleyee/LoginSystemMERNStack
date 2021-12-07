module.exports = (sequelize, Sequelize) => {
  const SexAtBirth = sequelize.define("sex_at_birth", {
    sex_at_birth_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    sex_at_birth: {
      type: Sequelize.STRING
    }
  });

  return SexAtBirth;
};
