import React, { Component } from "react";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import CheckButton from "react-validation/build/button";
import { vrequired, vemail, vdate } from "../common/validators";
import { vfirstName, vlastName, vaddress, vcity, vzip } from "../common/person-validators";

import MedicationManagementDataService from "../services/medication-management.service";
// import MedicationService from "../services/medication.service";


export default class MedicationManagementCreate extends Component {
  constructor(props) {
    super(props);
    this.saveMedicationManagement = this.saveMedicationManagement.bind(this);
    // this.onChangePatientId = this.onChangePatientId.bind(this);
    this.onChangeMedicationId = this.onChangeMedicationId.bind(this);
    this.onChangeAmount = this.onChangeAmount.bind(this);
    this.onChangeMedicationFrequencyId = this.onChangeMedicationFrequencyId.bind(this);
    this.onChangeMedicationMeasurementId = this.onChangeMedicationMeasurementId .bind(this);
    this.onChangePrescribedBy = this.onChangePrescribedBy.bind(this);
    this.onChangePrescribedOn= this.onChangePrescribedOn.bind(this);
    this.onChangePharmacyId = this.onChangePharmacyId.bind(this);

    this.state = {
        patient_id: this.props.match.params.patient_id,// null,
        medication_id: "",
        amount: "",
        medication_frequency_id: "",
        medication_measurement_id: "",
        prescribed_by: "", // dropdown list of all doctors
        prescribed_on: "",
        pharmacy_id: "",
       
        medications: [],
        medicationFrequencies: [],
        medicationMeasurements: [],
        doctors: [],
        pharmacies: [],

        submitted: false,
        message: "",
    };
    console.log(this.state);
  }

//   onChangePatientId(e) {
//     this.setState({
//       patient_id: e.target.value
//     });
//   }

  onChangeMedicationId(e) {
    this.setState({
      medication_id: e.target.value
    });
  }

  onChangeAmount(e) {
    this.setState({
      amount: e.target.value
    });
  }

  onChangeMedicationFrequencyId(e) {
    this.setState({
      medication_frequency_id: e.target.value
    });
  }

  onChangeMedicationMeasurementId(e) {
    this.setState({
      medication_measurement_id: e.target.value
    });
  }

  onChangePrescribedBy(e) {
    this.setState({
       prescribed_by: e.target.value
    });
  }

  onChangePrescribedOn(e) {
    this.setState({
       prescribed_on: e.target.value
    });
  }

  onChangePharmacyId(e) {
    this.setState({
        pharmacy_id: e.target.value
    });
  }

  saveMedicationManagement(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      var data = {
        patient_id: this.state.patient_id,
        medication_id: this.state.medication_id,
        amount: this.state.amount,
        medication_frequency_id: this.state.medication_frequency_id,
        medication_measurement_id: this.state.medication_measurement_id,
        prescribed_by: this.state.prescribed_by,
        prescribed_on: this.state.prescribed_on,
        pharmacy_id: this.state.pharmacy_id,
      };

      MedicationManagementDataService.create(data)
        .then(
          response => {
            this.props.history.push("/person-management/"+ this.state.patient_id+ "/medications");
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
    

     MedicationManagementDataService.getMedications().then(
       response => {
         this.setState({
           medications: response.data.result
         });
       },
      error => {
        this.setState({
          meciations:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );

    MedicationManagementDataService.getMedicationFrequencies().then(
      response => {
        console.log(response);
        this.setState({
          medicationFrequencies: response.data.result
        });
      },
      error => {
        this.setState({
          medicationFrequencies:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );

    MedicationManagementDataService.getMedicationMeasurements().then(
      response => {
        console.log(response);
        this.setState({
          medicationMeasurements: response.data.result
        });
      },
      error => {
        this.setState({
          medicationMeasurements:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );

    MedicationManagementDataService.getDoctors().then(
        response => {
          this.setState({
            doctors: response.data.result
          });
          console.log(this.state);
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

    MedicationManagementDataService.getPharmacies().then(
      response => {
        this.setState({
          pharmacies: response.data.result
        });
      },
      error => {
        this.setState({
          pharmacies:
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
            onSubmit={this.saveMedicationManagement}
            ref={c => {
              this.form = c;
            }}
          >
            {!this.state.submitted && (
              <div>
                <div className="form-group">
                  <label htmlFor="medication_id">Medication</label>
                  <Select
                    value={this.state.medication_id}
                    onChange={this.onChangeMedicationId}
                    validations={[vrequired]}
                  >
                    <option value="">Select One</option>
                    {this.state.medications.length > 0 &&
                      this.state.medications.map(item => (
                        <option key={item.medication_id} value={item.medication_id}>
                          {item.medication}
                        </option>
                      ))}
                  </Select>
                </div>

                <div className="form-group">
                  <label htmlFor="amount">Amount</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="amount"
                    value={this.state.amount}
                    onChange={this.onChangeAmount}
                    validations={[vrequired]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="medication_frequency_id">Medication Frequency</label>
                  <Select
                    value={this.state.medication_frequency_id}
                    onChange={this.onChangeMedicationFrequencyId}
                    validations={[vrequired]}
                  >
                    <option value="">Select One</option>
                    {this.state.medicationFrequencies.length > 0 &&
                      this.state.medicationFrequencies.map(item => (
                        <option key={item.medication_frequency_id} value={item.medication_frequency_id}>
                          {item.medication_frequency}
                        </option>
                      ))}
                  </Select>
                </div>

                <div className="form-group">
                  <label htmlFor="medication_measurement_id">Medication Measurement</label>
                  <Select
                    value={this.state.medication_measurement_id}
                    onChange={this.onChangeMedicationMeasurementId}
                    validations={[vrequired]}
                  >
                    <option value="">Select One</option>
                    {this.state.medicationMeasurements.length > 0 &&
                      this.state.medicationMeasurements.map(item => (
                        <option key={item.medication_measurement_id} value={item.medication_measurement_id}>
                          {item.medication_measurement}
                        </option>
                      ))}
                  </Select>
                </div>


                <div className="form-group">
                  <label htmlFor="prescribed_by">Prescribed By</label>
                  <Select
                    value={this.state.prescribed_by}
                    onChange={this.onChangePrescribedBy}
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
                  <label htmlFor="prescribed_on">Prescribed On</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="prescribed_on"
                    value={this.state.prescribed_on}
                    onChange={this.onChangePrescribedOn}
                    validations={[vrequired, vdate]}
                  />
                </div> 

                <div className="form-group">
                  <label htmlFor="pharmacy_id">Pharmacy</label>
                  <Select
                    value={this.state.pharmacy_id}
                    onChange={this.onChangePharmacyId}
                    validations={[vrequired]}
                  >
                    <option value="">Select One</option>
                    {this.state.pharmacies.length > 0 &&
                      this.state.pharmacies.map(item => (
                        <option key={item.pharmacy_id} value={item.pharmacy_id}>
                          {item.name}
                        </option>
                      ))}
                  </Select>
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
