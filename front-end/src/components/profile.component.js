import React, { Component } from "react";
import { Link } from "react-router-dom";

import AuthService from "../services/auth.service";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: AuthService.getCurrentUser()
    };
  }


  /*
        <p>
          <strong>Token:</strong>{" "}
          {currentUser.accessToken}
        </p>
        <strong>Authorities:</strong>
        <ul>
          {currentUser.roles &&
            currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
        </ul>
  */
  render() {
    const { currentUser } = this.state;

    return (
      <div className="container">
        <header className="jumbotron">
          <h3>
            Your Profile
          </h3>
        </header>
        <p>
          <strong>Username:</strong>{" "}
          {currentUser.username}
        </p>
        <p>
          <strong>Email:</strong>{" "}
          {currentUser.email}
        </p>
        <p>
          <strong>First Name:</strong>{" "}
          {currentUser.firstName}
        </p>
        <p>
          <strong>Last Name:</strong>{" "}
          {currentUser.lastName}
        </p>
        <p>
          <strong>Birthday:</strong>{" "}
          {currentUser.birthday}
        </p>
        <p>
          <strong>Gender:</strong>{" "}
          {currentUser.gender}
        </p>
        <p>
          <strong>Pronouns:</strong>{" "}
          {currentUser.pronoun}
        </p>
        <p>
          <strong>Sex at Birth:</strong>{" "}
          {currentUser.sex_at_birth}
        </p>
        <p>
          <strong>Address:</strong>{" "}
          {currentUser.address}
        </p>
        <p>
          <strong>City:</strong>{" "}
          {currentUser.city}
        </p>
        <p>
          <strong>State:</strong>{" "}
          {currentUser.state}
        </p>
        <p>
          <strong>Zip:</strong>{" "}
          {currentUser.zip}
        </p>
        <Link to={"/profile/edit"}>
          Edit Profile
        </Link>
      </div>
    );
  }
}