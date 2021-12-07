module.exports = (sequelize, Sequelize) => {
    const PatientMedication = sequelize.define("patient_medication", {
      patient_medication_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
    //   should be patient id, but the patient table is not defined yet, I use person_id instead
    //   person_id: {
    //     type: Sequelize.INTEGER
    //   },
      patient_id: {
        type: Sequelize.INTEGER
      },
      medication_id: {
        type: Sequelize.INTEGER
      },
      amount:{
        type: Sequelize.INTEGER
      },
      medication_frequency_id: {
        type: Sequelize.INTEGER
      },
      medication_measurement_id: {
        type: Sequelize.INTEGER
      },
      //should be employee id
      prescribed_by:{
        type: Sequelize.INTEGER
    },
     prescribed_on: {
        type: Sequelize.DATEONLY
      },
    pharmacy_id: {
        type: Sequelize.INTEGER
      }
    });
  
    return PatientMedication;
  };