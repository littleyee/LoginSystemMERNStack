module.exports = (sequelize, Sequelize) => {
    const LabMeasurement = sequelize.define("lab_measurement", {
      lab_measurement_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      lab_measurement: {
        type: Sequelize.STRING
      }
    });
  
    return LabMeasurement ;
  };
  