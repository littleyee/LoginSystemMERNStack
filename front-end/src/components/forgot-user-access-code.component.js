import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

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

export default class ForgotUserAccessCode extends Component {
  constructor(props) {
    super(props);
    this.handleRequest = this.handleRequest.bind(this);
    this.onChangeUserAccessCode = this.onChangeUserAccessCode.bind(this);

    this.state = {
      username: this.props.location.state.username,
      userAccessCode: "",
      loading: false,
      message: ""
    };
  }

  onChangeUserAccessCode(e) {
    this.setState({
      userAccessCode: e.target.value
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
      AuthService.forgotUserAccessCode(this.state.username, this.state.userAccessCode).then(
        () => {
          this.props.history.push("/resetPassword", { username: this.state.username });
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
              <label htmlFor="userAccessCode">User Access Code (1234)</label>
              <Input
                type="userAccessCode"
                className="form-control"
                name="userAccessCode"
                value={this.state.userAccessCode}
                onChange={this.onChangeUserAccessCode}
                validations={[required]}
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
                <span>Next</span>
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