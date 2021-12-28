import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import CheckButton from "react-validation/build/button";

import { vrequired, vemail, vdate } from "../common/validators";
import { vfirstName, vlastName, vaddress, vcity, vzip } from "../common/person-validators";
import { vusername, vpassword } from "../common/user-validators";

import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import PersonService from "../services/person.service";



export default class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
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

    this.state = {
      username: "",
      email: "",
      password: "",
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
      successful: false,
      message: "",
      // dropdown options
      genders: [],
      pronouns: [],
      sexAtBirths: [],
      states: [],
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  onChangeFirstName(e){
    this.setState({
      firstName: e.target.value
    });
  }

  onChangeLastName(e){
    this.setState({
      lastName: e.target.value
    });
  }

  onChangeAddress(e){
    this.setState({
      address: e.target.value
    });
  }

  onChangeGenderId(e){
    this.setState({
      gender_id: e.target.value
    });
  }

  onChangePronounId(e){
    this.setState({
      pronoun_id: e.target.value
    });
  }

  onChangeSexAtBirthId(e){
    this.setState({
      sex_at_birth_id: e.target.value
    });
  }

  onChangeStateId(e){
    this.setState({
      state_id: e.target.value
    });
  }
  
  onChangeBirthday(e){
    this.setState({
      birthday: e.target.value
    });
  }

  onChangeCity(e){
    this.setState({
      city: e.target.value
    });
  }

  onChangeZip(e){
    this.setState({
      zip: e.target.value
    });
  }

  componentDidMount() {
    PersonService.getGenders().then(
      response => {
        this.setState({
          genders: response.data.result
        });
      },
      error => {
        console.log(error);
      }
    );
    PersonService.getPronouns().then(
      response => {
        this.setState({
          pronouns: response.data.result
        });
      },
      error => {
        console.log(error);
      }
    );
    PersonService.getSexAtBirths().then(
      response => {
        this.setState({
          sexAtBirths: response.data.result
        });
      },
      error => {
        console.log(error);
      }
    );
    PersonService.getStates().then(
      response => {
        this.setState({
          states: response.data.result
        });
      },
      error => {
        console.log(error);
      }
    );
  }
  
  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.register({
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        birthday: this.state.birthday,
        gender_id: this.state.gender_id,
        pronoun_id: this.state.pronoun_id,
        sex_at_birth_id: this.state.sex_at_birth_id,
        state_id: this.state.state_id,
        city: this.state.city,
        zip: this.state.zip
      }).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
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
        }
      );
    }
  }

  render() {
    return (
      <div className="col-md-12">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <Form
            onSubmit={this.handleRegister}
            ref={c => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    validations={[vrequired, vusername]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    validations={[vrequired, vemail]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    validations={[vrequired, vpassword]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="firstName">FirstName</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="firstName"
                    value={this.state.firstName}
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
                    value={this.state.lastName}
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
                    value={this.state.birthday}
                    onChange={this.onChangeBirthday}
                    validations={[vrequired, vdate]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="gender_id">Gender</label>
                  <Select
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
                    value={this.state.address}
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
                    value={this.state.city}
                    onChange={this.onChangeCity}
                    validations={[vrequired, vcity]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="state_id">State</label>
                  <Select
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
                    value={this.state.zip}
                    onChange={this.onChangeZip}
                    validations={[vrequired, vzip]}
                  />
                </div>

                <div className="form-group">
                  <button className="btn btn-primary btn-block">Sign Up</button>
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
      </div>
    );
  }
}