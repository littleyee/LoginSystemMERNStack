module.exports = (sequelize, Sequelize) => {
    const Insurance = sequelize.define("insurance_amounts", {
      insurance_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      insurance_amount: {
        type: Sequelize.INTEGER
      },
    person_id: {
      type: Sequelize.INTEGER,
      
    },
  });
    
  return Bill;
  };