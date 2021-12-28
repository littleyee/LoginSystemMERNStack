import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import TextArea from "react-validation/build/textarea";
import Select from "react-validation/build/select";
import CheckButton from "react-validation/build/button";
import { vrequired, vtimestamp } from "../common/validators";

import AppointmentManagementDataService from "../services/appointment-management.service";

export default class AppointmentManagement extends Component {
  constructor(props) {
    super(props);

    this.onChangeAppointmentStatusID = this.onChangeAppointmentStatusID.bind(this);
    this.onChangePatientID = this.onChangePatientID.bind(this);
    this.onChangeDoctorID = this.onChangeDoctorID.bind(this);
    this.onChangeAppointmentDate = this.onChangeAppointmentDate.bind(this);

    this.getAppointmentManagement = this.getAppointmentManagement.bind(this);
    this.updateAppointmentManagement = this.updateAppointmentManagement.bind(this);

    this.state = {
      currentAppointmentManagement: {
        appointment_status_id: "",
        patient_id: "",
        doctor_id: "",
        appointment_date: "",
      },
      message: "",
      submitted: false,
  
      // dropdown options
      appointment_statuses: [],
      patients: [],
      doctors: [],
    };
  }

  onChangeAppointmentStatusID(e) {
    const appointment_status_id = e.target.value;

    this.setState(function(prevState) {
      return {
        currentAppointmentManagement: {
          ...prevState.currentAppointmentManagement,
          appointment_status_id: appointment_status_id
        }
      };
    });
  }
  onChangePatientID(e) {
    const patient_id = e.target.value;

    this.setState(function(prevState) {
      return {
        currentAppointmentManagement: {
          ...prevState.currentAppointmentManagement,
          patient_id: patient_id
        }
      };
    });
  }
  onChangeDoctorID(e) {
    const doctor_id = e.target.value;

    this.setState(function(prevState) {
      return {
        currentAppointmentManagement: {
          ...prevState.currentAppointmentManagement,
          doctor_id: doctor_id
        }
      };
    });
  }
  onChangeAppointmentDate(e) {
    const appointment_date = e.target.value;

    this.setState(function(prevState) {
      return {
        currentAppointmentManagement: {
          ...prevState.currentAppointmentManagement,
          appointment_date: appointment_date
        }
      };
    });
  }

  getAppointmentManagement(appointment_id) {
    AppointmentManagementDataService.get(appointment_id)
      .then(response => {

        var temp_date = new Date(response.data.appointment_date);
        response.data.appointment_date = 
          temp_date.getFullYear() + "-" + 
          ('0' + temp_date.getDate()).slice(-2)  + "-" + 
          ('0' + (temp_date.getMonth()+1)).slice(-2) + " " + 
          ('0' + temp_date.getHours()).slice(-2) + ":" + 
          ('0' + temp_date.getMinutes()).slice(-2);
        this.setState({
          currentAppointmentManagement: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateAppointmentManagement(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AppointmentManagementDataService.update(
        this.state.currentAppointmentManagement.appointment_id,
        this.state.currentAppointmentManagement
      ).then(
        response => {
          this.props.history.push('/appointment-management')
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
            successful: false,
            message: resMessage
          });
        })
        .catch(e => {
          console.log(e);
        });
    }
  }

  componentDidMount() {
    this.getAppointmentManagement(this.props.match.params.appointment_id);
    
     // get drop down information
     AppointmentManagementDataService.getAppointmentStatuses().then(
      response => {
        this.setState({
          appointment_statuses: response.data.result
        });
      },
      error => {
        this.setState({
          appointment_statuses:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );
    AppointmentManagementDataService.getPatients().then(
     response => {
       this.setState({
         patients: response.data.result
       });
     },
     error => {
       this.setState({
         patients:
           (error.response &&
             error.response.data &&
             error.response.data.message) ||
           error.message ||
           error.toString()
       });
     }
   );
    AppointmentManagementDataService.getDoctors().then(
      response => {
        this.setState({
          doctors: response.data.result
        });
      },
      error => {
        this.setState({
          doctors:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    const { currentAppointmentManagement } = this.state;

    return (
      <div>
        {currentAppointmentManagement ? (
          <div className="edit-form">
            <h4>Edit Appointment</h4>
              <Form
                onSubmit={this.updateAppointmentManagement}
                ref={c => {
                  this.form = c;
                }}
              >
                {!this.state.submitted && (
                  <div>
                    <div className="form-group">
                      <label htmlFor="appointment_status_id">Appointment Status</label>
                      <Select
                        value={currentAppointmentManagement.appointment_status_id}
                        onChange={this.onChangeAppointmentStatusID}
                        validations={[vrequired]}
                      >
                        <option value="">Select One</option>
                        {this.state.appointment_statuses.length > 0 &&
                          this.state.appointment_statuses.map(item => (
                            <option key={item.appointment_status_id} value={item.appointment_status_id}>
                              {item.appointment_status}
                            </option>
                          ))}
                      </Select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="patient_id">Patient</label>
                      <Select
                        value={currentAppointmentManagement.patient_id}
                        onChange={this.onChangePatientID}
                        validations={[vrequired]}
                      >
                        <option value="">Select One</option>
                        {this.state.patients.length > 0 &&
                          this.state.patients.map(item => (
                            <option key={item.person_id} value={item.person_id}>
                              {item.firstName} {item.lastName}
                            </option>
                          ))}
                      </Select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="doctor_id">Doctor</label>
                      <Select
                        value={currentAppointmentManagement.doctor_id}
                        onChange={this.onChangeDoctorID}
                        validations={[vrequired]}
                      >
                        <option value="">Select One</option>
                        {this.state.doctors.length > 0 &&
                          this.state.doctors.map(item => (
                            <option key={item.person_id} value={item.person_id}>
                              {item.firstName} {item.lastName}
                            </option>
                          ))}
                      </Select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="appointment_date">Appointment Date</label>
                      <Input
                        type="text"
                        className="form-control"
                        name="appointment_date"
                        value={currentAppointmentManagement.appointment_date}
                        onChange={this.onChangeAppointmentDate}
                        validations={[vrequired, vtimestamp]}
                      />
                    </div>

                    <div className="form-group">
                      <button className="btn btn-primary btn-block">Save</button>
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
        ) : (
          <div>
            <br />
            <p>Could not find user</p>
          </div>
        )}
      </div>
    );
  }
}
