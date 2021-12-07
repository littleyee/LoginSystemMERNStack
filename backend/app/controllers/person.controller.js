const db = require("../models");
const Person = db.person;
const Gender = db.gender;
const Pronoun = db.pronoun;
const SexAtBirth = db.sexAtBirth;
const State = db.state;

exports.getGenders = (req, res) => {
  Gender.findAll().then(result  => {
    if (!result ) {
      return res.status(404).send({ message: "Options not found." });
    }

    res.status(200).send({
      result
    });
  });
};
exports.getPronouns = (req, res) => {
  Pronoun.findAll().then(result  => {
    if (!result ) {
      return res.status(404).send({ message: "Options not found." });
    }

    res.status(200).send({
      result
    });
  });
};
exports.getSexAtBirths = (req, res) => {
  SexAtBirth.findAll().then(result  => {
    if (!result ) {
      return res.status(404).send({ message: "Options not found." });
    }

    res.status(200).send({
      result
    });
  });
};
exports.getStates = (req, res) => {
  State.findAll().then(result  => {
    if (!result ) {
      return res.status(404).send({ message: "Options not found." });
    }

    res.status(200).send({
      result
    });
  });
};