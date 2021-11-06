import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail,isDate} from "validator";


import AuthService from "../services/auth.service";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const email = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const date = value => {
  if (!isDate(value)) {
      return (
          <div className="alert alert-danger" role="alert">
              This is not a valid date.
          </div>
      );
  }
};


const vusername = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const vfirstname = value => {
  if (value.length < 2 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The firstname must be between 2 and 40 characters.
      </div>
    );
  }
};

const vlastname = value => {
  if (value.length < 2 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The lastname must be between 2 and 40 characters.
      </div>
    );
  }
};

// double check 
const vaddress = value => {
  const letters = /^[\s0-9a-zA-Z]+$/;
  if (!letters.test(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        invalid address
      </div>
    );
  }
};

// const vsex = value => {
  
// };

// const vgender = value => {
  
// };


const vstate = value => {
  if (value.length < 2 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        invalid state 
      </div>
    );
  }
  
};

const vcity = value => {
  if (value.length < 2 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        invalid city 
      </div>
    );
  }
  
};


const vzip = value => {
  const zipletters =  /^([0-9]{5})$/;
  if (!zipletters.test(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        Invalid address
      </div>
    );
  }
  
};



// add fields of dob 
// firstname:req.body.firstname,
//     lastname:req.body.lastname,
//     address: req.body.address,
//     sex:req.body.sex,
//     gender:req.body.gender,
//     birthday:req.body.birthday,
//     state:req.body.state,
//     city:req.body.city,
//     zip:req.body.zip
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
    // this.onChangeSex = this.onChangeSex.bind(this);
    // this.onChangeGender = this.onChangeGender.bind(this);
    this.onChangeBirthday = this.onChangeBirthday.bind(this);
    this.onChangeState = this.onChangeState.bind(this);
    this.onChangeCity = this.onChangeCity.bind(this);
    this.onChangeZip = this.onChangeZip.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      firstname:"",
      lastname:"",
      address:"",
      // sex:"",
      // gender:"",
      birthday:"",
      state:"",
      city:"",
      zip:"",
      successful: false,
      message: ""

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
      firstname: e.target.value
    });
  }

  onChangeLastName(e){
    this.setState({
      lastname: e.target.value
    });
  }

  onChangeAddress(e){
    this.setState({
      address: e.target.value
    });
  }

  // onChangeSex(e){
  //   this.setState({
  //     sex: e.target.value
  //   });
  // }

  // onChangeGender(e){
  //   this.setState({
  //     gender: e.target.value
  //   });
  // }
  
  onChangeBirthday(e){
    this.setState({
      birthday: e.target.value
    });
  }

  onChangeState(e){
    this.setState({
      state: e.target.value
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
  
  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.register(
        this.state.username,
        this.state.email,
        this.state.password,
        this.state.firstname,
        this.state.lastname,
        this.state.address,
        this.state.birthday,
        // this.state.sex,
        // this.state.gender,
        this.state.state,
        this.state.city,
        this.state.zip
      ).then(
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
                    validations={[required, vusername]}
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
                    validations={[required, email]}
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
                    validations={[required, vpassword]}
                  />
                </div>

                {/* add other information */}
                <div className="form-group">
                  <label htmlFor="firstname">FirstName</label>
                  <Input
                    type="firstname"
                    className="form-control"
                    name="firstname"
                    value={this.state.firstname}
                    onChange={this.onChangeFirstName}
                    validations={[required, vfirstname]}
                  />
                </div>


                <div className="form-group">
                  <label htmlFor="lastname">LastName</label>
                  <Input
                    type="lastname"
                    className="form-control"
                    name="lastname"
                    value={this.state.lastname}
                    onChange={this.onChangeLastName}
                    validations={[required, vlastname]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <Input
                    type="address"
                    className="form-control"
                    name="address"
                    value={this.state.address}
                    onChange={this.onChangeAddress}
                    validations={[required, vaddress]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="birthday">Birthday</label>
                  <Input
                    type="birthday"
                    className="form-control"
                    name="birthday"
                    value={this.state.birthday}
                    onChange={this.onChangeBirthday}
                    validations={[required, date]}
                  />
                </div>

                {/* <div className="form-group">
                  <label htmlFor="sex">Sex</label>
                  <Input
                    type="sex"
                    className="form-control"
                    name="sex"
                    value={this.state.sex}
                    onChange={this.onChangeSex}
                    validations={[required, vsex]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="gender">Gender</label>
                  <Input
                    type="gender"
                    className="form-control"
                    name="gender"
                    value={this.state.gender}
                    onChange={this.onChangeGender}
                    validations={[required, vgender]}
                  />
                </div> */}

                <div className="form-group">
                  <label htmlFor="state">State</label>
                  <Input
                    type="state"
                    className="form-control"
                    name="state"
                    value={this.state.state}
                    onChange={this.onChangeState}
                    validations={[required, vstate]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <Input
                    type="city"
                    className="form-control"
                    name="city"
                    value={this.state.city}
                    onChange={this.onChangeCity}
                    validations={[required, vcity]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="zip">Zip</label>
                  <Input
                    type="zip"
                    className="form-control"
                    name="zip"
                    value={this.state.zip}
                    onChange={this.onChangeZip}
                    validations={[required, vzip]}
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