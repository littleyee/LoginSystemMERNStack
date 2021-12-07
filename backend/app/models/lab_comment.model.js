module.exports = (sequelize, Sequelize) => {
    const LabComment = sequelize.define("lab_comment", {
      lab_comment_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
    //   should be patient id, but the patient table is not defined yet, I use person_id instead
    //   person_id: {
    //     type: Sequelize.INTEGER
    //   },
      employee_id: {
        type: Sequelize.INTEGER
      },
      lab_id: {
        type: Sequelize.INTEGER
      },
      comment:{
        type: Sequelize.STRING
      },
     creation_date: {
        type: Sequelize.DATEONLY
      }
    });
  
    return LabComment;
  };