module.exports = (sequelize, Sequelize) => {
    const MedicationMeasurement = sequelize.define("medication_measurement", {
      medication_measurement_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      medication_measurement: {
        type: Sequelize.STRING
      }
    });
  
    return MedicationMeasurement ;
  };
  