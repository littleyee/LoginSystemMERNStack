module.exports = (sequelize, Sequelize) => {
    const LabTest = sequelize.define("lab_test", {
      lab_test_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      test: {
        type: Sequelize.STRING
      }
    });
  
    return LabTest;
  };
  