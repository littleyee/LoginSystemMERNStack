const db = require("../models");
const User = db.user;
const Person = db.person;
const Gender = db.gender;
const Pronoun = db.pronoun;
const SexAtBirth = db.sexAtBirth;
const State = db.state;

// this function could be optimized but I an not completely sure how to call additional exports or new functions on this page.
exports.profileEdit = (req, res) => {
  Person.findOne({
    include: [{
      model: User,
      required: true,
      where: {
        username: req.body.username
      }
     }
    ],
  })
    .then(person => {
      if (!person) {
        return res.status(404).send({ message: "Person Not found." });
      }

      // update person information
      person.set({
        email: req.body.email,
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        address: req.body.address,
        birthday:req.body.birthday,
        gender_id: req.body.gender_id,
        pronoun_id: req.body.pronoun_id,
        sex_at_birth_id: req.body.sex_at_birth_id,
        state_id: req.body.state_id,
        city:req.body.city,
        zip:req.body.zip
      });
      person.save().then(result => {
        if (!result ) {
          return res.status(404).send({ message: "Update failed." });
        }

        // the reason why we are not using the result promise is because it does not include eager loaded associations like gender,sex,pronouns,state
        // get saved data
        Person.findOne({
          include: [{
            model: User,
            required: true,
            where: {
              username: person.user.username
            }
           },
           {
            model: Gender,
            required: true
           },
           {
            model: Pronoun,
            required: true
           },
           {
            model: SexAtBirth,
            required: true
           },
           {
            model: State,
            required: true
           }
          ],
        })
          .then(updatedPerson => {
            console.log(updatedPerson);
            if (!updatedPerson) {
              return res.status(404).send({ message: "Person Not found." });
            }

            // success
            // redirect to /profile
            res.status(200).send({
              // profile information
              username: updatedPerson.username,
              email: updatedPerson.email,
              firstName: updatedPerson.firstName,
              lastName: updatedPerson.lastName,
              address: updatedPerson.address,
              birthday: updatedPerson.birthday,
              gender: updatedPerson.gender.gender,
              gender_id: updatedPerson.gender_id,
              pronoun: updatedPerson.pronoun.pronoun,
              pronoun_id: updatedPerson.pronoun_id,
              sex_at_birth: updatedPerson.sex_at_birth.sex_at_birth,
              sex_at_birth_id: updatedPerson.sex_at_birth_id,
              state: updatedPerson.state.state,
              state_id: updatedPerson.state_id,
              city: updatedPerson.city,
              zip: updatedPerson.zip
            });
          }) // end findOne then
          .catch(err => {
            res.status(500).send({ message: err.message });
          }); // end findOne
        }) // end save then
        .catch(err => {
          res.status(500).send({ message: err.message });
        }); // end save
    }) // end findOne then
    .catch(err => {
      res.status(500).send({ message: err.message });
    }); // end findOne
};
