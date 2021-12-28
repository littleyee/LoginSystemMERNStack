import React, { Component } from "react";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import CheckButton from "react-validation/build/button";
import { vrequired, vtimestamp } from "../common/validators";

import AppointmentRequestManagementDataService from "../services/appointment-request-management.service";

export default class AppointmentRequestManagementApprove extends Component {
  constructor(props) {
    super(props);
    this.approveAppointmentRequest = this.approveAppointmentRequest.bind(this);

    this.onChangeDoctorID = this.onChangeDoctorID.bind(this);
    this.onChangeAppointmentDate = this.onChangeAppointmentDate.bind(this);

    this.state = {
      appointment_request_id: this.props.match.params.appointment_request_id,
      appointment_request_info: "",
      appointment_date: "",
      doctor_id: "",

      // dropdown options
      doctors: [],

      submitted: false,
      message: "",
    };
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

  approveAppointmentRequest(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      var data = {
        appointment_date: this.state.appointment_date,
        doctor_id: this.state.doctor_id,
      };
      AppointmentRequestManagementDataService.approve(this.state.appointment_request_id, data)
        .then(
          response => {
            this.props.history.push("/appointments/request/manage/list");
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
    this.state.appointment_request_info = AppointmentRequestManagementDataService.findByAppointmentRequestID(this.state.appointment_request_id);

    // get drop down information
    AppointmentRequestManagementDataService.getDoctors().then(
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

  render() { console.log(this.state);
    return (
      <div className="col-md-12">
          <Form
            onSubmit={this.approveAppointmentRequest}
            ref={c => {
              this.form = c;
            }}
          >
            {!this.state.submitted && (
              <div>
                <div> Display appointment request info here </div>

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
