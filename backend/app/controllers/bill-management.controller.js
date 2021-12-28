const db = require("../models");
const Bill = db.bill;

const Op = db.Sequelize.Op;

// Create and Save a new Bill


exports.create = (req, res) => {
  // Validate request
  if (req.body.bill_amount == ""
     )  {
        res.status(400).send({
          message: "Bill Amount can not be empty!"
        });
        return;
      }

  // Create the Bill
  const billManagement = {
    
    bill_amount: req.body.bill_amount,
    person_id:req.body.person_id
    
  };

  // Save Bill in the database
  Bill.create(billManagement)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Bill Amount."
      });
    });
};

// Retrieve all Bills from the database.
exports.findAll = (req, res) => {
  const bill_id = req.query.bill_id;
  var condition = bill_id ? { bill_id: { [Op.like]: `%${bill_id}%` } } : null;

  Bill.findAll({
    
    where: condition 
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving people."
      });
    });
};

// Retrieve all Bills from the database.
exports.findBill = (req, res) => {
  const bill_amount = req.body.bill_amount;
  
  
  var condition = {};
  if(bill_amount != "" && typeof(bill_amount) != undefined)
    condition.bill_amount = { [Op.like]: `%${bill_amount}%` };
  

  Bill.findAll({
    
    where: condition 
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving people."
      });
    });
};


// Find a single Bill with bill_id
exports.findOne = (req, res) => {
  const bill_id = req.params.bill_id;

  Bill.findByPk(bill_id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Bill with bill_id=" + bill_id
      });
    });
};

// Update a Bill by the bill_id in the request
exports.update = (req, res) => {
  const bill_id = req.params.bill_id;

  Bill.update(req.body, {
    where: { bill_id: bill_id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Bill was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update BIll with id=${id}. Maybe Bill was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Bill with id=" + id
      });
    });
};

// Delete a Bill with the specified bill_id in the request
exports.delete = (req, res) => {
  const bill_id = req.params.bill_id;

  Bill.destroy({
    where: { bill_id: bill_id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Bill was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Bill with id=${id}. Maybe Bill was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Bill with id=" + id
      });
    });
};
