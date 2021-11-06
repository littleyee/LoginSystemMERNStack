module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    // add more fields, dob, address, city, states, add to controller 
    username: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    firstname:{
      type: Sequelize.STRING
    },
    lastname:{
      type: Sequelize.STRING
    },
    address:{
      type: Sequelize.STRING
    },
    birthday:{
      type: Sequelize.DATE
    },
    // // sex:{
    //   type: Sequelize.STRING
    // },
    // // gender:{
    //   type: Sequelize.STRING
    // },
    state:{
      type: Sequelize.STRING
    },
    city:{
      type: Sequelize.STRING
    },
    zip:{
      type: Sequelize.INTEGER 
    }
  });

  return User;
};
