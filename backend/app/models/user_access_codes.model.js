module.exports = (sequelize, Sequelize) => {
  const UserAccessCode = sequelize.define("user_access_codes", {
    // add more fields, dob, address, city, states, add to controller 
    user_access_code_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    access_code: {
      type: Sequelize.STRING
    },
    username: {
      type: Sequelize.STRING
    },
    created_on:{
      type: Sequelize.DATE 
    },
    is_used:{
      type: Sequelize.BOOLEAN
    }
  });

  return UserAccessCode;
};
