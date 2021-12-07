module.exports = (sequelize, Sequelize) => {
    const PatientInfo = sequelize.define("patients", {
      patient_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
    //   should be patient id, but the patient table is not defined yet, I use person_id instead
    //   person_id: {
    //     type: Sequelize.INTEGER
    //   },
      person_id: {
        type: Sequelize.INTEGER
      },

      insurance_id: {
        type: Sequelize.INTEGER
      }
    });
  
    return PatientInfo;
  };