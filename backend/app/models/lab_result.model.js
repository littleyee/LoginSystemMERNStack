module.exports = (sequelize, Sequelize) => {
    const LabResult = sequelize.define("lab_result", {
      lab_result_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
   
      lab_id: {
        type: Sequelize.INTEGER
      },
      lab_test_id: {
        type: Sequelize.INTEGER
      },
      result: {
        type: Sequelize.STRING
      },
      lab_measurement_id: {
        type: Sequelize.INTEGER
      },
      comment: {
        type: Sequelize.STRING
      },
      performed_by_id: {
        type: Sequelize.INTEGER
      },
    });
  
    return LabResult;
  };