module.exports = (sequelize, Sequelize) => {
    const MedicationFrequency = sequelize.define("medication_frequency", {
      medication_frequency_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      medication_frequency: {
        type: Sequelize.STRING
      }
    });
  
    return MedicationFrequency ;
  };
  