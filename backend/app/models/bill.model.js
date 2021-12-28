module.exports = (sequelize, Sequelize) => {
    const Bill = sequelize.define("bill_amounts", {
      bill_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      bill_amount: {
        type: Sequelize.INTEGER
      },
    person_id: {
      type: Sequelize.INTEGER,
      
    },
  });
    
  return Bill;
  };
  //Keep in mind that the define(table_name) should not have spaces ie It should be Bill_Amount not Bill Amount or we get error.