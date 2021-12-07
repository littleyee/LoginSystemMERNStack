module.exports = (sequelize, Sequelize) => {
    const Pharmacy = sequelize.define("pharmacy", {
    pharmacy_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      state_id: {
        type: Sequelize.INTEGER
      }
      
    });
  
    return Pharmacy;
  };