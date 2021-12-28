import React, { Component } from "react";
import AppointmentRequestManagementDataService from "../services/appointment-request-management.service";
import { Link } from "react-router-dom";

export default class AppointmentRequestManagementList extends Component {
  constructor(props) {
    super(props);
    this.retrieveAppointmentRequestManagement = this.retrieveAppointmentRequestManagement.bind(this);
    this.setActiveAppointmentRequestManagement = this.setActiveAppointmentRequestManagement.bind(this);

    this.denyAppointmentRequest = this.denyAppointmentRequest.bind(this);

    this.state = {
      appointmentRequestManagement: [],
      currentAppointmentRequestManagement: null,
      currentIndex: -1,
    }

    console.log(this.state);
  }

  denyAppointmentRequest() {    
    AppointmentRequestManagementDataService.deny(this.state.currentAppointmentRequestManagement.appointment_request_id)
      .then(() => {
        window.location.reload();
      })
      .catch(e => {
        console.log(e);
      });
  }

  componentDidMount() {
    this.retrieveAppointmentRequestManagement();
  }

  retrieveAppointmentRequestManagement() {
    AppointmentRequestManagementDataService.getAll()
      .then(response => {
        this.setState({
          appointmentRequestManagement: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  setActiveAppointmentRequestManagement(appointmentRequestManagement, index) {console.log(appointmentRequestManagement);
    this.setState({
      currentAppointmentRequestManagement: appointmentRequestManagement,
      currentIndex: index
    });
  }


  render() {
    const { appointmentRequestManagement, currentAppointmentRequestManagement, currentIndex } = this.state;
    
    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>Appointment Request Management List</h4>

          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Status</th>
                <th scope="col">Date Range</th>
                <th scope="col">Patient</th>
                <th scope="col">Doctor</th>
              </tr>
            </thead>
            <tbody>
              {appointmentRequestManagement &&
                appointmentRequestManagement.map((thisRequest, index) => (
                  <tr  
                    role="row" 
                    key={thisRequest.person_id}
                    onClick={() => this.setActiveAppointmentRequestManagement(thisRequest, index)}
                  >
                    <td>{thisRequest.status}</td>
                    <td>{thisRequest.date_min} to {thisRequest.date_max}</td>
                    <td>{thisRequest.patient.firstName} {thisRequest.patient.lastName}</td>
                    <td>{thisRequest.doctor.firstName} {thisRequest.doctor.lastName}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="col-md-6">
          {currentAppointmentRequestManagement ? ( 
            <div>
              <h4>Appointment Request Info</h4>
              <div>
                <label>
                  <strong>Patient:</strong>
                </label>{" "}
                {currentAppointmentRequestManagement.patient.firstName} {currentAppointmentRequestManagement.patient.lastName}
              </div>
              <div>
                <label>
                  <strong>Doctor:</strong>
                </label>{" "}
                {currentAppointmentRequestManagement.doctor.firstName} {currentAppointmentRequestManagement.doctor.lastName}
              </div>
              <div>
                <label>
                  <strong>Date Range:</strong>
                </label>{" "}
                {currentAppointmentRequestManagement.date_min} to {currentAppointmentRequestManagement.date_max}
              </div>
              <div>
                <label>
                  <strong>Time:</strong>
                </label>{" "}
                {currentAppointmentRequestManagement.appointment_request_time.time}
              </div>
              
              <Link
                to={"/appointments/request/manage/" + currentAppointmentRequestManagement.appointment_request_id+"/approve"}
                className="btn btn-primary btn-block"
              >
                Approve
              </Link>
              <button
                className="btn btn-danger btn-block"
                onClick={this.denyAppointmentRequest}
              >
                Deny
              </button>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on an Appointment Request...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
