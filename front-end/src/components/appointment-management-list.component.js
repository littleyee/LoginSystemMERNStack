import React, { Component } from "react";
import AppointmentManagementDataService from "../services/appointment-management.service";
import { Link } from "react-router-dom";

export default class AppointmentManagementList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchFirstName = this.onChangeSearchFirstName.bind(this);
    this.onChangeSearchLastName = this.onChangeSearchLastName.bind(this);
    this.onChangeSearchBirthday = this.onChangeSearchBirthday.bind(this);

    this.cancelAppointmentManagement = this.cancelAppointmentManagement.bind(this);
    this.retrieveAppointmentManagement = this.retrieveAppointmentManagement.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveAppointmentManagement = this.setActiveAppointmentManagement.bind(this);
    this.searchAppointment = this.searchAppointment.bind(this);

    this.state = {
      appointmentManagement: [],
      currentAppointmentManagement: null,
      currentIndex: -1,
      searchParams: {
        firstName: "",
        lastName: "",
        birthday: ""
      }
    }
  }

  componentDidMount() {
    this.retrieveAppointmentManagement();
  }

  cancelAppointmentManagement() {    
    AppointmentManagementDataService.cancel(this.state.currentAppointmentManagement.appointment_id)
      .then(() => {
        //this.props.history.push('/appointment-management')
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

  retrieveAppointmentManagement() {
    AppointmentManagementDataService.getAll()
      .then(response => {
        // simplify doctor
        for (let appointment_index in response.data) {
          var temp_date = new Date(response.data[appointment_index].appointment_date);
          response.data[appointment_index].appointment_date = 
            temp_date.getFullYear() + "-" + 
            ('0' + temp_date.getDate()).slice(-2)  + "-" + 
            ('0' + (temp_date.getMonth()+1)).slice(-2) + " " + 
            ('0' + temp_date.getHours()).slice(-2) + ":" + 
            ('0' + temp_date.getMinutes()).slice(-2);
          for (let appointment_team_index in response.data[appointment_index].appointment_teams) {
            if(response.data[appointment_index].appointment_teams[appointment_team_index].appointment_team_role_id == 1)
              response.data[appointment_index].doctor = response.data[appointment_index].appointment_teams[appointment_team_index];
          }
        }
        this.setState({
          appointmentManagement: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveAppointmentManagement();
    this.setState({
      currentAppointmentManagement: null,
      currentIndex: -1
    });
  }

  setActiveAppointmentManagement(appointmentManagement, index) {
    this.setState({
      currentAppointmentManagement: appointmentManagement,
      currentIndex: index
    });
  }

  searchAppointment() {
    this.setState({
      currentAppointmentManagement: null,
      currentIndex: -1
    });

    AppointmentManagementDataService.findAppointment(this.state.searchParams)
      .then(response => {
        this.setState({
          appointmentManagement: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { appointmentManagement, currentAppointmentManagement, currentIndex } = this.state;

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
                onClick={this.searchAppointment}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Appointment Management List</h4>

          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Appointment Status</th>
                <th scope="col">Appointment Date</th>
                <th scope="col">Patient</th>
                <th scope="col">Doctor</th>
              </tr>
            </thead>
            <tbody>
              {appointmentManagement &&
                appointmentManagement.map((appointments, index) => (
                  <tr 
                    role="row" 
                    key={appointments.appointment_id}
                    onClick={() => this.setActiveAppointmentManagement(appointments, index)}
                  >
                  <td>{appointments.appointment_status.appointment_status}</td>
                  <td>{appointments.appointment_date}</td>
                  <td>{appointments.patient.firstName} {appointments.patient.lastName}</td>
                  <td>{appointments.doctor.employee.firstName} {appointments.doctor.employee.lastName}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="col-md-6">
          {currentAppointmentManagement ? ( 
            <div>
              <h4>Appointment Info</h4>
              <div>
                <label>
                  <strong>State:</strong>
                </label>{" "}
                {currentAppointmentManagement.appointment_status.appointment_status}
              </div>
              <div>
                <label>
                  <strong>Patient Name:</strong>
                </label>{" "}
                {currentAppointmentManagement.patient.firstName} {currentAppointmentManagement.patient.lastName}
              </div>
              <div>
                <label>
                  <strong>Doctor:</strong>
                </label>{" "}
                {currentAppointmentManagement.doctor.employee.firstName} {currentAppointmentManagement.doctor.employee.lastName}
              </div>
              <div>
                <label>
                  <strong>Appointment Date:</strong>
                </label>{" "}
                {currentAppointmentManagement.appointment_date}
              </div>
              
              <Link
                to={"/appointment-management/" + currentAppointmentManagement.appointment_id}
                className="btn btn-primary btn-block"
              >
                Edit
              </Link>
              <button
                className="btn btn-danger btn-block"
                onClick={this.cancelAppointmentManagement}
              >
                Cancel
              </button>

            </div>
          ) : (
            <div>
              <br />
              <p>Please click on an appointment...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
