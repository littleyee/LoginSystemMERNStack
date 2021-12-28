const db = require("../models");
const Msg = db.msg;

const Op = db.Sequelize.Op;

// Create and Save a new Msg


exports.create = (req, res) => {
  // Validate request
  if (req.body.msg_text == ""
     )  {
        res.status(400).send({
          message: "Msg Text can not be empty!"
        });
        return;
      }

  // Create the Msg
  const msgManagement = {
    
    msg_text: req.body.msg_text,
    person_id:req.body.person_id
    
  };

  // Save Msg in the database
  Msg.create(msgManagement)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Msg Text."
      });
    });
};

// Retrieve all Msgs from the database.
exports.findAll = (req, res) => {
  const msg_id = req.query.msg_id;
  var condition = msg_id ? { msg_id: { [Op.like]: `%${msg_id}%` } } : null;

  Msg.findAll({
    
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

// Retrieve all Msgs from the database.
exports.findMsg = (req, res) => {
  const msg_text = req.body.msg_text;
  
  
  var condition = {};
  if(msg_text != "" && typeof(msg_text) != undefined)
    condition.msg_text = { [Op.like]: `%${msg_text}%` };
  

  Msg.findAll({
    
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


// Find a single Msg with msg_id
exports.findOne = (req, res) => {
  const msg_id = req.params.msg_id;

  Msg.findByPk(msg_id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Msg with msg_id=" + msg_id
      });
    });
};

// Update a Msg by the msg_id in the request
exports.update = (req, res) => {
  const msg_id = req.params.msg_id;

  Msg.update(req.body, {
    where: { msg_id: msg_id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Msg was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update BIll with id=${id}. Maybe Msg was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Msg with id=" + id
      });
    });
};

// Delete a Msg with the specified msg_id in the request
exports.delete = (req, res) => {
  const msg_id = req.params.msg_id;

  Msg.destroy({
    where: { msg_id: msg_id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Msg was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Msg with id=${id}. Maybe Msg was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Msg with id=" + id
      });
    });
};
