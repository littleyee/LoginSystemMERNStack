module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    username: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    password: {
      type: Sequelize.STRING
    },
    person_id:{
      type: Sequelize.INTEGER
    }
  });

  return User;
};
