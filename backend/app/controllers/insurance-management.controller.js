const db = require("../models");
const Insurance = db.insurance;

const Op = db.Sequelize.Op;

// Create and Save a new Insurance


exports.create = (req, res) => {
  // Validate request
  if (req.body.insurance_amount == ""
     )  {
        res.status(400).send({
          message: "Insurance Amount can not be empty!"
        });
        return;
      }

  // Create the Insurance
  const insuranceManagement = {
    
    insurance_amount: req.body.insurance_amount,
    person_id:req.body.person_id
    
  };

  // Save Insurance in the database
  Insurance.create(insuranceManagement)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Insurance Amount."
      });
    });
};

// Retrieve all Insurances from the database.
exports.findAll = (req, res) => {
  const insurance_id = req.query.insurance_id;
  var condition = insurance_id ? { insurance_id: { [Op.like]: `%${insurance_id}%` } } : null;

  Insurance.findAll({
    
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

// Retrieve all Insurances from the database.
exports.findInsurance = (req, res) => {
  const insurance_amount = req.body.insurance_amount;
  
  
  var condition = {};
  if(insurance_amount != "" && typeof(insurance_amount) != undefined)
    condition.insurance_amount = { [Op.like]: `%${insurance_amount}%` };
  

  Insurance.findAll({
    
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


// Find a single Insurance with insurance_id
exports.findOne = (req, res) => {
  const insurance_id = req.params.insurance_id;

  Insurance.findByPk(insurance_id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Insurance with insurance_id=" + insurance_id
      });
    });
};

// Update a Insurance by the insurance_id in the request
exports.update = (req, res) => {
  const insurance_id = req.params.insurance_id;

  Insurance.update(req.body, {
    where: { insurance_id: insurance_id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Insurance was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update BIll with id=${id}. Maybe Insurance was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Insurance with id=" + id
      });
    });
};

// Delete a Insurance with the specified insurance_id in the request
exports.delete = (req, res) => {
  const insurance_id = req.params.insurance_id;

  Insurance.destroy({
    where: { insurance_id: insurance_id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Insurance was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Insurance with id=${id}. Maybe Insurance was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Insurance with id=" + id
      });
    });
};
