module.exports = (sequelize, Sequelize) => {
  const Gender = sequelize.define("genders", {
    gender_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    gender: {
      type: Sequelize.STRING
    }
  });

  return Gender;
};
