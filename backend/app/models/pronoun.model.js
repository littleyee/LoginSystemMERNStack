module.exports = (sequelize, Sequelize) => {
  const Pronoun = sequelize.define("pronouns", {
    pronoun_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    pronoun: {
      type: Sequelize.STRING
    }
  });

  return Pronoun;
};
