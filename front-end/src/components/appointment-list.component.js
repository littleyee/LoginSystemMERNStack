import React, { Component } from "react";
import AppointmentDataService from "../services/appointment.service";
import { Link } from "react-router-dom";

export default class AppointmentList extends Component {
  constructor(props) {
    super(props);
    this.retrieveAppointments = this.retrieveAppointments.bind(this);
    this.setActiveAppointment = this.setActiveAppointment.bind(this);
    this.canelAppointment = this.canelAppointment.bind(this);

    this.state = {
      appointments: [],
      currentAppointment: null,
      currentIndex: -1,
    }
  }

  canelAppointment() {
    AppointmentDataService.cancel(this.state.currentAppointment.appointment_id)
    .then(() => {
      //this.props.history.push('/person-management')
      window.location.reload();
    })
    .catch(e => {
      console.log(e);
    });
  }

  componentDidMount() {
    this.retrieveAppointments();
  }

  retrieveAppointments() {
    AppointmentDataService.findAllMyAppointments()
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
          appointments: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  setActiveAppointment(appointments, index) {
    this.setState({
      currentAppointment: appointments,
      currentIndex: index
    });
  }

  render() {
    const { appointments, currentAppointment, currentIndex } = this.state;
console.log(this.state);
    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>Appointment List</h4>

          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Appointment Status</th>
                <th scope="col">Appointment Date</th>
                <th scope="col">Doctor</th>
              </tr>
            </thead>
            <tbody>
              {appointments &&
                appointments.map((appointments, index) => (
                  <tr 
                    role="row" 
                    key={appointments.person_id}
                    onClick={() => this.setActiveAppointment(appointments, index)}
                  >
                    <td>{appointments.appointment_status.appointment_status}</td>
                    <td>{appointments.appointment_date}</td>
                    <td>{appointments.doctor.employee.firstName} {appointments.doctor.employee.lastName}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="col-md-6">
          {currentAppointment ? ( 
            <div>
              <h4>Appointment Info</h4>
              <div>
                <label>
                  <strong>State:</strong>
                </label>{" "}
                {currentAppointment.appointment_status.appointment_status}
              </div>
              <div>
                <label>
                  <strong>Patient Name:</strong>
                </label>{" "}
                {currentAppointment.patient.firstName} {currentAppointment.patient.lastName}
              </div>
              <div>
                <label>
                  <strong>Doctor:</strong>
                </label>{" "}
                {currentAppointment.doctor.employee.firstName} {currentAppointment.doctor.employee.lastName}
              </div>
              <div>
                <label>
                  <strong>Appointment Date:</strong>
                </label>{" "}
                {currentAppointment.appointment_date}
              </div>
              
              <button
                className="btn btn-danger btn-block"
                onClick={this.canelAppointment}
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
