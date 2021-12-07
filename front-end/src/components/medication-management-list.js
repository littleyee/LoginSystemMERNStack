import React, { Component } from "react";
import PersonManagementDataService from "../services/person-management.service";
import MedicationManagementDataService from "../services/medication-management.service";
import { Link } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import CheckButton from "react-validation/build/button";
import { vrequired, vemail, vdate } from "../common/validators";
import { vfirstName, vlastName, vaddress, vcity, vzip } from "../common/person-validators";


export default class MedicationManagementList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchMedication = this.onChangeSearchMedication.bind(this);

    this.deleteMedicationManagement = this.deleteMedicationManagement.bind(this);
    this.retrieveMedicationManagement = this.retrieveMedicationManagement.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveMedicationManagement = this.setActiveMedicationManagement.bind(this);
    this.searchMedication = this.searchMedication.bind(this);

    this.state = {
      patient_id: this.props.match.params.patient_id,// null,
      medicationManagement: [],
      currentMedicationManagement: null,
      currentIndex: -1,
      
      searchParams: {
        medication: "",
      }
    }
  }
  componentDidMount() {
    //this.getPersonManagement(this.props.match.params.person_id);
    
    this.retrieveMedicationManagement();
  }

  onChangeSearchMedication(e) {
    const searchMedication = e.target.value;
    this.setState({ 
      searchParams: { ...this.state.searchParams, medication: searchMedication} 
    });
    console.log(this.state);
  }

  deleteMedicationManagement() {    
    MedicationManagementDataService.delete(this.state.currentMedicationManagement.medication_id)
      .then(() => {
        window.location.reload();
      })
      .catch(e => {
        console.log(e);
      });
  }

  retrieveMedicationManagement() {
    console.log(this.state.patient_id);
    MedicationManagementDataService.getAll(this.state.patient_id)
      .then(response => {
        console.log(response);
        this.setState({
          medicationManagement: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchMedication() {
    this.setState({
      currentMedicationManagement: null,
      currentIndex: -1
    });

    MedicationManagementDataService.findMedication(this.state.searchParams)
      .then(response => {
        this.setState({
          medicationManagement: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveMedicationManagement();
    this.setState({
      currentMedicationManagement: null,
      currentIndex: -1
    });
  }

  setActiveMedicationManagement(medicationManagement, index) {console.log(medicationManagement);
    this.setState({
      currentMedicationManagement: medicationManagement,
      currentIndex: index
    });
  }

  render() {
    const { medicationManagement, currentMedicationManagement, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Medication Name"
              value={this.state.searchParams.medication}
              onChange={this.onChangeSearchMedication}
            />
           
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchMedication}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <Link
            to={"/person-management/"+ this.state.patient_id +"/medications/create"}
            className="btn btn-primary btn-block"
          >
            Create
          </Link>
        </div>
       
        <div className="col-md-6">
          {/* <h4>Person List</h4> */}

          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Medication</th>
                <th scope="col">Measurement</th>
                <th scope="col">Frequency</th>
              </tr>
            </thead>
            <tbody>
              {medicationManagement &&
                medicationManagement.map((medicationManagement, index) => (
                  <tr 
                    role="row" 
                    key={medicationManagement.medication_id}
                    onClick={() => this.setActiveMedicationManagement(medicationManagement, index)}
                  > 
                    <td>{medicationManagement.medication}</td>
                    <td>{medicationManagement.measurement}</td>
                    <td>{medicationManagement.frequency}</td>

                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className="col-md-6">
          {currentMedicationManagement ? ( 
            <div>
              <h4>Medication Info</h4>
              
              <div>
                <label>
                  <strong>Medication:</strong>
                </label>{" "}
                {currentMedicationManagement.medication} 
              </div>

              <div>
                <label>
                  <strong>Medication Measurement:</strong>
                </label>{" "}
                {currentMedicationManagement.medicationMeasurement}
              </div>

              <div>
                <label>
                  <strong>Medication Frequency:</strong>
                </label>{" "}
                {currentMedicationManagement.medicationFrequency}
              </div>

              <div>
                <label>
                  <strong>Prescribe by:</strong>
                </label>{" "}
                {currentMedicationManagement.prescribed_by}
              </div>

              <div>
                <label>
                  <strong>Prescribe on:</strong>
                </label>{" "}
                {currentMedicationManagement.prescribed_on}
              </div>

              <div>
                <label>
                  <strong>Pharmacy:</strong>
                </label>{" "}
                {currentMedicationManagement.pharmacy}
              </div>


              
              <Link
                to={"/medication-management/" + currentMedicationManagement.medication_id}
                className="btn btn-primary btn-block"
              >
                Edit Medication
              </Link>

              
              
              <button
                className="btn btn-danger btn-block"
                onClick={this.deleteMedicationManagement}
              >
                Delete
              </button>

            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a medication record...</p>
            </div>
          )}
        </div>
    
        
        </div>
    )       
  }
}
