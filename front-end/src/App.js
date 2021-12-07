import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {Container, Navbar, Nav, NavDropdown} from 'react-bootstrap';

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";

import Forgot from "./components/forgot.component";
import ForgotUserAccessCode from "./components/forgot-user-access-code.component";
import ResetPassword from "./components/reset-password.component";

import Home from "./components/home.component";

import Profile from "./components/profile.component";
import ProfileEdit from "./components/profile-edit.component";

import BoardUser from "./components/board-user.component";
//import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";

import PersonManagementCreate from "./components/person-management-create.component";
import PersonManagement from "./components/person-management.component";
import PersonManagementList from "./components/person-management-list";


import MedicationManagementCreate from "./components/medication-management-create.component";
import MedicationManagement from "./components/medication-management.component";
import MedicationManagementList from "./components/medication-management-list";

// import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      isAdmin: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
console.log(user);
    if (user) {
      this.setState({
        currentUser: user,
        isAdmin: user.roles.includes("ROLE_ADMIN"),
      });
    }
    
    EventBus.on("logout", () => {
      EventBus.remove("logout");
    });
  }

  logOut() {
    AuthService.logout();
    this.setState({
      isAdmin: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser, isAdmin } = this.state;

    return (
      <div>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="/">myHealthcare</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/home">Home</Nav.Link>
                {isAdmin && ([
                  <Nav.Link href="/admin">Admin Board</Nav.Link>,
                  <NavDropdown title="Person Management" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/person-management">List / Search</NavDropdown.Item>
                    <NavDropdown.Item href="/person-management/create">Create</NavDropdown.Item>
                  </NavDropdown>
               ])}
               {isAdmin && ([
                  <Nav.Link href="/admin">Admin Board</Nav.Link>,
                  <NavDropdown title="Medication Management" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/medication-management">List / Search</NavDropdown.Item>
                    <NavDropdown.Item href="/medication-management/create">Add Medication</NavDropdown.Item>
                  </NavDropdown>
               ])}
                {currentUser && ([
                  <Nav.Link href="/profile">{currentUser.username}</Nav.Link>
                ])}
              </Nav>
              <Nav className="ml-auto">
                {currentUser ? (
                  <Nav.Link href="/login" onClick={this.logOut}>Logout</Nav.Link>
                ) : ([
                  <Nav.Link href="/login">Login</Nav.Link>,
                  <Nav.Link href="/register">Register</Nav.Link>
                ])}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            
            <Route exact path="/forgot" component={Forgot} />
            <Route exact path="/forgotUserAccessCode" component={ForgotUserAccessCode} />
            <Route exact path="/resetPassword" component={ResetPassword} />

            <Route exact path="/profile" component={Profile} />
            <Route exact path="/profile/edit" component={ProfileEdit} />

            <Route path="/user" component={BoardUser} />
            <Route path="/admin" component={BoardAdmin} />

            <Route exact path="/person-management/:patient_id/medications" component={MedicationManagementList} />
            <Route exact path="/person-management/:patient_id/medications/create" component={MedicationManagementCreate} />
            <Route path="/person-management/:patient_id/medications/:medication_id" component={MedicationManagement} />
            
            <Route exact path="/person-management" component={PersonManagementList} />
            <Route exact path="/person-management/create" component={PersonManagementCreate} />
            <Route path="/person-management/:person_id" component={PersonManagement} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;