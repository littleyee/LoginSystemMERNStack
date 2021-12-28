import React, { Component } from "react";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import TextArea from "react-validation/build/textarea";
import Select from "react-validation/build/select";
import CheckButton from "react-validation/build/button";
import { vrequired, vtimestamp } from "../common/validators";

import AppointmentManagementDataService from "../services/appointment-management.service";

export default class AppointmentManagementCreate extends Component {
  constructor(props) {
    super(props);
    this.saveAppointmentManagement = this.saveAppointmentManagement.bind(this);

    this.onChangeAppointmentStatusID = this.onChangeAppointmentStatusID.bind(this);
    this.onChangePatientID = this.onChangePatientID.bind(this);
    this.onChangeDoctorID = this.onChangeDoctorID.bind(this);
    this.onChangeAppointmentDate = this.onChangeAppointmentDate.bind(this);

    this.state = {
      appointment_status_id: "",
      patient_id: "",
      doctor_id: "",
      appointment_date: "",

      // dropdown options
      patients: [],
      doctors: [],
      appointment_statuses: [],

      submitted: false,
      message: "",
    };
  }
  
  onChangeAppointmentStatusID(e) {
    this.setState({
      appointment_status_id: e.target.value
    });
  }
  onChangePatientID(e) {
    this.setState({
      patient_id: e.target.value
    });
  }
  
  onChangeDoctorID(e) {
    this.setState({
      doctor_id: e.target.value
    });
  }

  onChangeAppointmentDate(e) {
    this.setState({
      appointment_date: e.target.value
    });
  }

  saveAppointmentManagement(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      var data = {
        appointment_status_id: this.state.appointment_status_id,
        patient_id: this.state.patient_id,
        doctor_id: this.state.doctor_id,
        appointment_date: this.state.appointment_date,
      };
      AppointmentManagementDataService.create(data)
        .then(
          response => {
            this.props.history.push("/appointment-management");
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
          }
        )
        .catch(e => {
          console.log(e);
        });
    }
  }

  componentDidMount() {
    // get drop down information
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
  }

  render() {console.log(this.state);
    return (
      <div className="col-md-12">
          <Form
            onSubmit={this.saveAppointmentManagement}
            ref={c => {
              this.form = c;
            }}
          >
            {!this.state.submitted && (
              <div>
                <div className="form-group">
                  <label htmlFor="appointment_status_id">Appointment Status</label>
                  <Select
                    value={this.state.appointment_status_id}
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
                    value={this.state.patient_id}
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
                    value={this.state.doctor_id}
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
                    value={this.state.appointment_date}
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
    );
  }
}
