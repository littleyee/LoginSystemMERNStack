import React, { Component } from "react";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import TextArea from "react-validation/build/textarea";
import Select from "react-validation/build/select";
import CheckButton from "react-validation/build/button";
import { vrequired, vdate } from "../common/validators";

import AppointmentRequestDataService from "../services/appointment-request.service";

export default class AppointmentRequest extends Component {
  constructor(props) {
    super(props);
    this.saveAppointmentRequest = this.saveAppointmentRequest.bind(this);

    this.onChangeDoctorID = this.onChangeDoctorID.bind(this);
    this.onChangeDateMin = this.onChangeDateMin.bind(this);
    this.onChangeDateMax = this.onChangeDateMax.bind(this);
    this.onChangeAppointmentTimeID = this.onChangeAppointmentTimeID.bind(this);
    this.onChangeReason = this.onChangeReason.bind(this);

    this.state = {
      person_id: "", // this is hardcoded as current user
      patient_id: "",
      doctor_id: "",
      date_min: "",
      date_max: "",
      appointment_time_id: "",
      reason: "",

      // dropdown options
      doctors: [],
      appointment_times: [],

      submitted: false,
      message: "",
    };
  }

  onChangeDoctorID(e) {
    this.setState({
      doctor_id: e.target.value
    });
  }

  onChangeDateMin(e) {
    this.setState({
      date_min: e.target.value
    });
  }

  onChangeDateMax(e) {
    this.setState({
      date_max: e.target.value
    });
  }

  onChangeAppointmentTimeID(e) {
    this.setState({
      appointment_time_id: e.target.value
    });
  }

  onChangeReason(e) {
    this.setState({
      reason: e.target.value
    });
  }

  saveAppointmentRequest(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      var data = {
        person_id: this.state.person_id,
      
        doctor_id: this.state.doctor_id,
        date_min: this.state.date_min,
        date_max: this.state.date_max,
        appointment_time_id: this.state.appointment_time_id,
        reason: this.state.reason,
      };
      AppointmentRequestDataService.create(data)
        .then(
          response => {
            this.props.history.push("/appointments");
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
    AppointmentRequestDataService.getDoctors().then(
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
    AppointmentRequestDataService.getAppointmentRequestTimes().then(
      response => {
        this.setState({
          appointment_times: response.data.result
        });
      },
      error => {
        this.setState({
          appointment_times:
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
    return (
      <div className="col-md-12">
          <Form
            onSubmit={this.saveAppointmentRequest}
            ref={c => {
              this.form = c;
            }}
          >
            {!this.state.submitted && (
              <div>
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

                <div class="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="date_min">Date Min</label>
                      <Input
                        type="text"
                        className="form-control"
                        name="date_min"
                        value={this.state.date_min}
                        onChange={this.onChangeDateMin}
                        validations={[vrequired, vdate]}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="date_max">Date Max</label>
                      <Input
                        type="text"
                        className="form-control"
                        name="date_max"
                        value={this.state.date_max}
                        onChange={this.onChangeDateMax}
                        validations={[vrequired, vdate]}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="appointment_time_id">Time</label>
                  <Select
                    value={this.state.appointment_time_id}
                    onChange={this.onChangeAppointmentTimeID}
                    validations={[vrequired]}
                  >
                    <option value="">Select One</option>
                    {this.state.appointment_times.length > 0 &&
                      this.state.appointment_times.map(item => (
                        <option key={item.appointment_time_id} value={item.appointment_time_id}>
                          {item.time}
                        </option>
                      ))}
                  </Select>
                </div>

                <div className="form-group">
                  <label htmlFor="reason">Reason</label>
                  <TextArea
                    type="text"
                    className="form-control"
                    name="reason"
                    onChange={this.onChangeReason}
                    validations={[vrequired]}
                  >
                    {this.state.reason}
                  </TextArea>
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
