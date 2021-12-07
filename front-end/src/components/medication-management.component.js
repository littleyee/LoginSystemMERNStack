import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import CheckButton from "react-validation/build/button";
import { vrequired, vemail, vdate } from "../common/validators";
import { vfirstName, vlastName, vaddress, vcity, vzip } from "../common/person-validators";

import MedicationManagementDataService from "../services/medication-management.service";


export default class MedicationManagement extends Component {
  constructor(props) {
    super(props);
    this.onChangePatientId = this.onChangePatientId.bind(this);
    this.onChangeAmount = this.onChangeAmount.bind(this);
    this.onChangeMedicationFrequencyId = this.onChangeMedicationFrequencyId.bind(this);
    this.onChangeMedicationMeasurementId = this.onChangeMedicationMeasurementId .bind(this);
    this.onChangePrescribedBy = this.onChangePrescribedBy.bind(this);
    this.onChangePrescribedOn= this.onChangePrescribedOn.bind(this);
    this.onChangePharmacyId = this.onChangePharmacyId.bind(this);

    this.getMedicationManagement = this.getMedicationManagement.bind(this);
    this.updateMedicationManagement = this.updateMedicationManagement.bind(this);

    this.state = {

      currentMedicationManagement: {
        patient_id: "",

        medication_id: "",
        amount: "",
        medication_frequency_id: "",
        medication_measurement_id: "",
        prescribed_by: "",
        prescribed_on: "",
        pharmacy_id: ""
      },
      message: "",
      submitted: false,
  
      // dropdown options
      medications: [],
      medicationFrequencies: [],
      medicationMeasurements: [],
      doctors: [],    
      pharmacies: [],
        
    };
     
  }

  onChangeMedicationID(e) {
    const medication_id = e.target.value;

    this.setState(function(prevState) {
      return {
        currentMedicationManagement: {
          ...prevState.currentMedicationManagement,
          medication_id: medication_id
        }
      };
    });
  }

  onChangeMedicationFrequencyId(e) {
    const medication_frequency_id = e.target.value;
    this.setState(function(prevState) {
      return {
        currentMedicationManagement: {
          ...prevState.currentMedicationManagement,
          medication_frequency_id:medication_frequency_id
        }
      };
    });
  }

  onChangeMedicationMeasurementId(e) {
    const medication_measurement_id = e.target.value;
    this.setState(function(prevState) {
      return {
        currentMedicationManagement: {
          ...prevState.currentMedicationManagement,
          medication_measurement_id:medication_measurement_id
        }
      };
    });
  }


  getMedicationManagement(medication_id) {
    MedicationManagementDataService.get(medication_id)
      .then(response => {
        this.setState({
          currentMedicationManagement: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateMedicationManagement(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      MedicationManagementDataService.update(
        this.state.currentMedicationManagement.medication_id,
        this.state.currentMedicationManagement
      ).then(
        response => {
          this.props.history.push('/medication-management')
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
    this.getMedicationManagement(this.props.match.params.medication_id);

    
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
    const { currentMedicationManagement } = this.state;

    return (
      <div>
        {currentMedicationManagement ? (
          <div className="edit-form">
            <h4>Edit Medication</h4>
              <Form
                onSubmit={this.updateMedicationManagement}
                ref={c => {
                  this.form = c;
                }}
              >
                {!this.state.submitted && ( <div>
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
                          {item.medications}
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
                          {item.medicationFrequencies}
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
                          {item.medicationMeasurements}
                        </option>
                      ))}
                  </Select>
                </div>

                {/* <div className="form-group">
                  <label htmlFor="medication_frequency_id">Medication Frequency</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="email"
                    value={this.state.medication_frequency_id}
                    onChange={this.onChangeMedicationFrequency}
                    // validations={[vrequired, vemail]}
                  />
                </div> */}

                {/* <div className="form-group">
                  <label htmlFor="medication_measurement_id">Medication Measurement</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="birthday"
                    value={this.state.medication_measurement_id}
                    onChange={this.onChangeMedicationMeasurementId}
                    // validations={[vrequired, vdate]}
                  />
                </div> */}

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
                          {item.pharmacies}
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
        ) : (
          <div>
            <br />
            <p>Could not find medication</p>
          </div>
        )}
      </div>
    );
  }
}
