module.exports = (sequelize, Sequelize) => {
  const Person = sequelize.define("people", {
    person_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING,
      unique: true
    },
    address: {
      type: Sequelize.STRING
    },
    birthday: {
      type: Sequelize.DATEONLY
    },
    sex_at_birth_id: {
      type: Sequelize.INTEGER
    },
    gender_id: {
      type: Sequelize.INTEGER
    },
    pronoun_id: {
      type: Sequelize.INTEGER
    },
    state_id: {
      type: Sequelize.INTEGER
    },
    city: {
      type: Sequelize.STRING
    },
    zip: {
      type: Sequelize.INTEGER
    }
  });

  return Person;
};