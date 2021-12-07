module.exports = (sequelize, Sequelize) => {
    const Medication = sequelize.define("medication", {
      medication_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      medication: {
        type: Sequelize.STRING
      }
    });
  
    return Medication;
  };
  