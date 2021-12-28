import React, { Component } from "react";
import PersonManagementDataService from "../services/person-management.service";
import LabManagementDataService from "../services/lab-management.service";
import { Link } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import CheckButton from "react-validation/build/button";
import { vrequired, vemail, vdate } from "../common/validators";
import { vfirstName, vlastName, vaddress, vcity, vzip } from "../common/person-validators";


export default class LabManagementList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchLab = this.onChangeSearchLab.bind(this);
    this.deleteLabManagement = this.deleteLabManagement.bind(this);
    this.retrieveLabManagement = this.retrieveLabManagement.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveLabManagement = this.setActiveLabManagement.bind(this);
    this.searchLab = this.searchLab.bind(this);

    this.state = {
      patient_id: this.props.match.params.patient_id,
      labManagement: [],
      currentLabManagement: null,
      currentIndex: -1,
      
      searchParams: {
        lab: "",
      }
    }
  }

  
  componentDidMount() {
    this.retrieveLabManagement();
  }

  onChangeSearchLab(e) {
    const searchLab = e.target.value;
    this.setState({ 
      searchParams: { ...this.state.searchParams, lab: searchLab} 
    });
    console.log(this.state);
  }

  deleteLabManagement() {    
    LabManagementDataService.delete(this.state.currentLabManagement.lab_id)
      .then(() => {
        window.location.reload();
      })
      .catch(e => {
        console.log(e);
      });
  }

  retrieveLabManagement() {
    console.log(this.state.patient_id);
    LabManagementDataService.getAll(this.state.patient_id)
      .then(response => {
        console.log(response);
        this.setState({
          labManagement: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchLab() {
    this.setState({
      currentLabManagement: null,
      currentIndex: -1
    });

    LabManagementDataService.findLab(this.state.searchParams)
      .then(response => {
        this.setState({
          
          labManagement: response.data
        });
      }).then(console.log(this.state.labManagement))  
      .catch(e => {
        
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveLabManagement();
    this.setState({
      currentLabManagement: null,
      currentIndex: -1
    });
  }

  setActiveLabManagement(thisLab, index) {
    this.setState({
      currentLabManagement: thisLab,
      currentIndex: index
    });
  }


  render() {
    const { labManagement, currentLabManagement, currentIndex } = this.state;
console.log(this.state);
    return (
  
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Lab Name"
              value={this.state.searchParams.lab}
              onChange={this.onChangeSearchLab}
            />
           
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchLab}
              >
                Search
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-8">

          <Link
            to={"/person-management/"+ this.state.patient_id +"/labs/create"}
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
                <th scope="col">Lab Reviewed Date</th>
                <th scope="col">Lab Ordered Date</th>
                <th scope="col">Ordered By</th>
              </tr>
            </thead>
            <tbody>
              {labManagement &&
                labManagement.map((thisLab, index) => (
                  <tr 
                    role="row" 
                    key={thisLab.lab_id}
                    onClick={() => this.setActiveLabManagement(thisLab, index)}
                  > 
                    {<td>{thisLab.lab_reviewed_date}</td> }
                    <td>{thisLab.ordered_date}</td>
                    <td>{thisLab.ordered_by_id}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className="col-md-6">
          {currentLabManagement ? ( 
            
            <div>
              <h4>Lab Info</h4>
              
              <div>
                <label>
                  <strong>Patient:</strong>
                </label>{" "}
                {currentLabManagement.patient.firstName}{currentLabManagement.patient.LastName}
              </div>

              <div>
                <label>
                  <strong>Ordered Date:</strong>
                </label>{" "}
                {currentLabManagement.ordered_date}
              </div>

              <div>
                <label>
                  <strong>Lab Done Date:</strong>
                </label>{" "}
                {currentLabManagement.lab_done_date}
              </div>

              <div>
                <label>
                  <strong>Lab Ordered By:</strong>
                </label>{" "}
                {currentLabManagement.orderer.firstName} {currentLabManagement.orderer.lastName}
              </div>

              <div>
                <label>
                  <strong>Lab Reviewed By:</strong>
                </label>{" "}
                {currentLabManagement.reviewer.firstName} {currentLabManagement.reviewer.lastName}
              </div>

              <div>
                <label>
                  <strong>Lab Review Date:</strong>
                </label>{" "}
                {currentLabManagement.lab_reviewed_date}
              </div>

                          
              <Link
                to={"/person-management/" + currentLabManagement.patient_id +"/labs/" +currentLabManagement.lab_id}
                className="btn btn-primary btn-block"
              >
                Edit Lab
              </Link>

              
              
              <button
                className="btn btn-danger btn-block"
                onClick={this.deleteLabManagement}
              >
                Delete
              </button>

            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a lab record...</p>
            </div>
          )}
        </div>
    
        
        </div>
    )       
  }
}
