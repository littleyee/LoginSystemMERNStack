module.exports = (sequelize, Sequelize) => {
    const Msg = sequelize.define("msg_amounts", {
      msg_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      msg_text: {
        type: Sequelize.STRING
      },
    person_id: {
      type: Sequelize.INTEGER,
      
    },
  });
    
  return Bill;
  };