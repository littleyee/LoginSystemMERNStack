module.exports = (sequelize, Sequelize) => {
    const Lab = sequelize.define("lab", {
      lab_id: {
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
      ordered_by_id: {
        type: Sequelize.INTEGER
      },
     ordered_date: {
        type: Sequelize.DATEONLY
      },
      lab_done_date: {
        type: Sequelize.DATEONLY
      },
      lab_reviewed_by: {
        type: Sequelize.INTEGER
      },
      lab_reviewed_date: {
        type: Sequelize.DATEONLY
      }
    });
  
    return Lab;
  };