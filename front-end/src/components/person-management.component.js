import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import CheckButton from "react-validation/build/button";
import { vrequired, vemail, vdate } from "../common/validators";
import { vfirstName, vlastName, vaddress, vcity, vzip } from "../common/person-validators";

import PersonManagementDataService from "../services/person-management.service";
import PersonService from "../services/person.service";

export default class PersonManagement extends Component {
  constructor(props) {
    super(props);
    this.onChangePersonID = this.onChangePersonID.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeGenderId = this.onChangeGenderId.bind(this);
    this.onChangePronounId = this.onChangePronounId.bind(this);
    this.onChangeSexAtBirthId = this.onChangeSexAtBirthId.bind(this);
    this.onChangeStateId = this.onChangeStateId.bind(this);
    this.onChangeBirthday = this.onChangeBirthday.bind(this);
    this.onChangeCity = this.onChangeCity.bind(this);
    this.onChangeZip = this.onChangeZip.bind(this);

    this.getPersonManagement = this.getPersonManagement.bind(this);
    this.updatePersonManagement = this.updatePersonManagement.bind(this);

    this.state = {
      currentPersonManagement: {
        person_id: "",

        email: "",
        firstName: "",
        lastName: "",
        address: "",
        sex_at_birth_id: "",
        gender_id: "",
        pronoun_id: "",
        state_id: "",
        birthday: "",
        city: "",
        zip: "",
      },
      message: "",
      submitted: false,
  
      // dropdown options
      genders: [],
      pronouns: [],
      sexAtBirths: [],
      states: [],
    };
  }

  onChangePersonID(e) {
    const person_id = e.target.value;

    this.setState(function(prevState) {
      return {
        currentPersonManagement: {
          ...prevState.currentPersonManagement,
          person_id: person_id
        }
      };
    });
  }

  onChangeEmail(e) {
    const email = e.target.value;   

    this.setState(prevState => ({
      currentPersonManagement: {
        ...prevState.currentPersonManagement,
        email: email
      }
    }));
  }

  onChangeFirstName(e) {
    const firstName = e.target.value;   

    this.setState(prevState => ({
      currentPersonManagement: {
        ...prevState.currentPersonManagement,
        firstName: firstName
      }
    }));
  }

  onChangeLastName(e) {
    const lastName = e.target.value;   

    this.setState(prevState => ({
      currentPersonManagement: {
        ...prevState.currentPersonManagement,
        lastName: lastName
      }
    }));
  }

  onChangeAddress(e) {
    const address = e.target.value;   

    this.setState(prevState => ({
      currentPersonManagement: {
        ...prevState.currentPersonManagement,
        address: address
      }
    }));
  }

  onChangeGenderId(e) {
    const sex_at_birth_id = e.target.value;   

    this.setState(prevState => ({
      currentPersonManagement: {
        ...prevState.currentPersonManagement,
        sex_at_birth_id: sex_at_birth_id
      }
    }));
  }

  onChangePronounId(e) {
    const gender_id = e.target.value;   

    this.setState(prevState => ({
      currentPersonManagement: {
        ...prevState.currentPersonManagement,
        gender_id: gender_id
      }
    }));
  }

  onChangeSexAtBirthId(e) {
    const pronoun_id = e.target.value;   

    this.setState(prevState => ({
      currentPersonManagement: {
        ...prevState.currentPersonManagement,
        pronoun_id: pronoun_id
      }
    }));
  }

  onChangeStateId(e) {
    const state_id = e.target.value;   

    this.setState(prevState => ({
      currentPersonManagement: {
        ...prevState.currentPersonManagement,
        state_id: state_id
      }
    }));
  }

  onChangeBirthday(e) {
    const birthday = e.target.value;   

    this.setState(prevState => ({
      currentPersonManagement: {
        ...prevState.currentPersonManagement,
        birthday: birthday
      }
    }));
  }

  onChangeCity(e) {
    const city = e.target.value;   

    this.setState(prevState => ({
      currentPersonManagement: {
        ...prevState.currentPersonManagement,
        city: city
      }
    }));
  }

  onChangeZip(e) {
    const zip = e.target.value;   

    this.setState(prevState => ({
      currentPersonManagement: {
        ...prevState.currentPersonManagement,
        zip: zip
      }
    }));
  }

  getPersonManagement(person_id) {
    PersonManagementDataService.get(person_id)
      .then(response => {
        this.setState({
          currentPersonManagement: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePersonManagement(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      PersonManagementDataService.update(
        this.state.currentPersonManagement.person_id,
        this.state.currentPersonManagement
      ).then(
        response => {
          this.props.history.push('/person-management')
          window.location.reload();
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage
          });
        })
        .catch(e => {
          console.log(e);
        });
    }
  }

  componentDidMount() {
    this.getPersonManagement(this.props.match.params.person_id);
    
    // get drop down information
    PersonService.getGenders().then(
      response => {
        this.setState({
          genders: response.data.result
        });
      },
      error => {
        this.setState({
          genders:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );
    PersonService.getPronouns().then(
      response => {
        this.setState({
          pronouns: response.data.result
        });
      },
      error => {
        this.setState({
          pronouns:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );
    PersonService.getSexAtBirths().then(
      response => {console.log(response.data.result);
        this.setState({
          sexAtBirths: response.data.result
        });
      },
      error => {
        this.setState({
          sexAtBirths:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );
    PersonService.getStates().then(
      response => {
        this.setState({
          states: response.data.result
        });
      },
      error => {
        this.setState({
          states:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    const { currentPersonManagement } = this.state;

    return (
      <div>
        {currentPersonManagement ? (
          <div className="edit-form">
            <h4>Edit User</h4>
              <Form
                onSubmit={this.updatePersonManagement}
                ref={c => {
                  this.form = c;
                }}
              >
                {!this.state.submitted && (
                  <div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <Input
                        type="text"
                        className="form-control"
                        name="email"
                        value={currentPersonManagement.email}
                        onChange={this.onChangeEmail}
                        validations={[vrequired, vemail]}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="firstName">FirstName</label>
                      <Input
                        type="text"
                        className="form-control"
                        name="firstName"
                        value={currentPersonManagement.firstName}
                        onChange={this.onChangeFirstName}
                        validations={[vrequired, vfirstName]}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="lastName">LastName</label>
                      <Input
                        type="text"
                        className="form-control"
                        name="lastName"
                        value={currentPersonManagement.lastName}
                        onChange={this.onChangeLastName}
                        validations={[vrequired, vlastName]}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="birthday">Birthday</label>
                      <Input
                        type="text"
                        className="form-control"
                        name="birthday"
                        value={currentPersonManagement.birthday}
                        onChange={this.onChangeBirthday}
                        validations={[vrequired, vdate]}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="gender_id">Gender</label>
                      <Select
                        value={currentPersonManagement.gender_id}
                        onChange={this.onChangeGenderId}
                        validations={[vrequired]}
                      >
                        <option value="">Select One</option>
                        {this.state.genders.length > 0 &&
                          this.state.genders.map(item => (
                            <option key={item.gender_id} value={item.gender_id}>
                              {item.gender}
                            </option>
                          ))}
                      </Select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="pronoun_id">Pronoun</label>
                      <Select
                        value={currentPersonManagement.pronoun_id}
                        onChange={this.onChangePronounId}
                        validations={[vrequired]}
                      >
                        <option value="">Select One</option>
                        {this.state.pronouns.length > 0 &&
                          this.state.pronouns.map(item => (
                            <option key={item.pronoun_id} value={item.pronoun_id}>
                              {item.pronoun}
                            </option>
                          ))}
                      </Select>
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="sex_at_birth_id">Sex At Birth</label>
                      <Select
                        value={currentPersonManagement.sex_at_birth_id}
                        onChange={this.onChangeSexAtBirthId}
                        validations={[vrequired]}
                      >
                        <option value="">Select One</option>
                        {this.state.sexAtBirths.length > 0 &&
                          this.state.sexAtBirths.map(item => (
                            <option key={item.sex_at_birth_id} value={item.sex_at_birth_id}>
                              {item.sex_at_birth}
                            </option>
                          ))}
                      </Select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="address">Address</label>
                      <Input
                        type="text"
                        className="form-control"
                        name="address"
                        value={currentPersonManagement.address}
                        onChange={this.onChangeAddress}
                        validations={[vrequired, vaddress]}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="city">City</label>
                      <Input
                        type="text"
                        className="form-control"
                        name="city"
                        value={currentPersonManagement.city}
                        onChange={this.onChangeCity}
                        validations={[vrequired, vcity]}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="state_id">State</label>
                      <Select
                        value={currentPersonManagement.state_id}
                        onChange={this.onChangeStateId}
                        validations={[vrequired]}
                      >
                        <option value="">Select One</option>
                        {this.state.states.length > 0 &&
                          this.state.states.map(item => (
                            <option key={item.state_id} value={item.state_id}>
                              {item.state}
                            </option>
                          ))}
                      </Select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="zip">Zip</label>
                      <Input
                        type="text"
                        className="form-control"
                        name="zip"
                        value={currentPersonManagement.zip}
                        onChange={this.onChangeZip}
                        validations={[vrequired, vzip]}
                      />
                    </div>

                    <div className="form-group">
                      <button className="btn btn-primary btn-block">Save</button>
                    </div>
                  </div>
                )}

                {this.state.message && (
                  <div className="form-group">
                    <div
                      className={
                        this.state.successful
                          ? "alert alert-success"
                          : "alert alert-danger"
                      }
                      role="alert"
                    >
                      {this.state.message}
                    </div>
                  </div>
                )}
                <CheckButton
                  style={{ display: "none" }}
                  ref={c => {
                    this.checkBtn = c;
                  }}
                />
              </Form>
          </div>
        ) : (
          <div>
            <br />
            <p>Could not find user</p>
          </div>
        )}
      </div>
    );
  }
}
