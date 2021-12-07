module.exports = (sequelize, Sequelize) => {
  const State = sequelize.define("states", {
    state_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    state: {
      type: Sequelize.STRING
    }
  });

  return State;
};
