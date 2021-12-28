import React, { Component } from "react";
import PersonManagementDataService from "../services/person-management.service";
import { Link } from "react-router-dom";

export default class PersonManagementList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchFirstName = this.onChangeSearchFirstName.bind(this);
    this.onChangeSearchLastName = this.onChangeSearchLastName.bind(this);
    this.onChangeSearchBirthday = this.onChangeSearchBirthday.bind(this);

    this.deletePersonManagement = this.deletePersonManagement.bind(this);
    this.retrievePersonManagement = this.retrievePersonManagement.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActivePersonManagement = this.setActivePersonManagement.bind(this);
    this.searchPerson = this.searchPerson.bind(this);

    this.state = {
      personManagement: [],
      currentPersonManagement: null,
      currentIndex: -1,
      searchParams: {
        firstName: "",
        lastName: "",
        birthday: ""
      }
    }
  }

  componentDidMount() {
    this.retrievePersonManagement();
  }

  deletePersonManagement() {    
    PersonManagementDataService.delete(this.state.currentPersonManagement.person_id)
      .then(() => {
        //this.props.history.push('/person-management')
        window.location.reload();
      })
      .catch(e => {
        console.log(e);
      });
  }

  onChangeSearchFirstName(e) {
    const searchFirstName = e.target.value;
    this.setState({ 
      searchParams: { ...this.state.searchParams, firstName: searchFirstName} 
    });
    console.log(this.state);
  }

  onChangeSearchLastName(e) {
    const searchLastName = e.target.value;
    this.setState({ 
      searchParams: { ...this.state.searchParams, lastName: searchLastName} 
    });
    console.log(this.state);
  }

  onChangeSearchBirthday(e) {
    const searchBirthday = e.target.value;
    this.setState({ 
      searchParams: { ...this.state.searchParams, birthday: searchBirthday} 
    });
    console.log(this.state);
  }

  retrievePersonManagement() {
    PersonManagementDataService.getAll()
      .then(response => {
        this.setState({
          personManagement: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrievePersonManagement();
    this.setState({
      currentPersonManagement: null,
      currentIndex: -1
    });
  }

  setActivePersonManagement(personManagement, index) {
    this.setState({
      currentPersonManagement: personManagement,
      currentIndex: index
    });
  }

  searchPerson() {
    this.setState({
      currentPersonManagement: null,
      currentIndex: -1
    });

    PersonManagementDataService.findPerson(this.state.searchParams)
      .then(response => {
        this.setState({
          personManagement: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { personManagement, currentPersonManagement, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="First Name"
              value={this.state.searchParams.firstName}
              onChange={this.onChangeSearchFirstName}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Last Name"
              value={this.state.searchParams.lastName}
              onChange={this.onChangeSearchLastName}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Birthday"
              value={this.state.searchParams.birthday}
              onChange={this.onChangeSearchBirthday}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchPerson}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Person Management List</h4>

          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Birthday</th>
              </tr>
            </thead>
            <tbody>
              {personManagement &&
                personManagement.map((personManagement, index) => (
                  <tr 
                    role="row" 
                    key={personManagement.person_id}
                    onClick={() => this.setActivePersonManagement(personManagement, index)}
                  >
                    <td>{personManagement.firstName}</td>
                    <td>{personManagement.lastName}</td>
                    <td>{personManagement.birthday}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="col-md-6">
          {currentPersonManagement ? ( 
            <div>
              <h4>Person Info</h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentPersonManagement.firstName} {currentPersonManagement.lastName}
              </div>
              <div>
                <label>
                  <strong>Email:</strong>
                </label>{" "}
                {currentPersonManagement.email}
              </div>
              <div>
                <label>
                  <strong>Birthday:</strong>
                </label>{" "}
                {currentPersonManagement.birthday}
              </div>
              <div>
                <label>
                  <strong>Gender:</strong>
                </label>{" "}
                {currentPersonManagement.gender.gender}
              </div>
              <div>
                <label>
                  <strong>Pronouns:</strong>
                </label>{" "}
                {currentPersonManagement.pronoun.pronoun}
              </div>
              <div>
                <label>
                  <strong>Sex at Birth:</strong>
                </label>{" "}
                {currentPersonManagement.sex_at_birth.sex_at_birth}
              </div>
              <div>
                <label>
                  <strong>Address:</strong>
                </label>{" "}
                {currentPersonManagement.address}
              </div>
              <div>
                <label>
                  <strong>City:</strong>
                </label>{" "}
                {currentPersonManagement.city}
              </div>
              <div>
                <label>
                  <strong>State:</strong>
                </label>{" "}
                {currentPersonManagement.state.state}
              </div>
              <div>
                <label>
                  <strong>Zip:</strong>
                </label>{" "}
                {currentPersonManagement.zip}
              </div>
              <Link
                to={"/person-management/" + currentPersonManagement.person_id + "/labs"}
                className="btn btn-primary btn-block"
              >
                Lab
              </Link>
              
              <Link
                to={"/person-management/" + currentPersonManagement.person_id + "/medications"}
                className="btn btn-primary btn-block"
              >
                Medication Record
              </Link>
              <Link
                to={"/person-management/" + currentPersonManagement.person_id}
                className="btn btn-primary btn-block"
              >
                Edit
              </Link>
              <button
                className="btn btn-danger btn-block"
                onClick={this.deletePersonManagement}
              >
                Delete
              </button>

            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a User...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
