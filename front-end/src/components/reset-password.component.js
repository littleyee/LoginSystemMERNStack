import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { vpassword } from "../common/user-validators";

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

export default class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.handleRequest = this.handleRequest.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangePassword2 = this.onChangePassword2.bind(this);

    this.state = {
      username: this.props.location.state.username,
      password: "",
      password2: "",
      loading: false,
      message: ""
    };
  }


  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  onChangePassword2(e) {
    this.setState({
      password2: e.target.value
    });
  }

  handleRequest(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.resetPassword(this.state.username, this.state.password, this.state.password2).then(
        () => {
          this.props.history.push("/login");
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
            loading: false,
            message: resMessage
          });
        }
      );
    } else {
      this.setState({
        loading: false
      });
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
            onSubmit={this.handleRequest}
            ref={c => {
              this.form = c;
            }}
          >

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

            <div className="form-group">
              <label htmlFor="password2">Re-type Password</label>
              <Input
                type="password"
                className="form-control"
                name="password2"
                value={this.state.password2}
                onChange={this.onChangePassword2}
                validations={[required, vpassword]}
              />
            </div>

            <div className="form-group">
              <button
                className="btn btn-primary btn-block"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Reset Password</span>
              </button>
            </div>

            {this.state.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
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