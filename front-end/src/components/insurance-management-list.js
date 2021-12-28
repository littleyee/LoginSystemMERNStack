import React, { Component } from "react";
import InsuranceManagementDataService from "../services/insurance-management.service";
import { Link } from "react-router-dom";



export default class InsuranceManagementList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchInsuranceManagement = this.onChangeSearchInsuranceManagement.bind(this);
   

    this.deleteInsuranceManagement = this.deleteInsuranceManagement.bind(this);
    this.retrieveInsuranceManagement = this.retrieveInsuranceManagement.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveInsuranceManagement = this.setActiveInsuranceManagement.bind(this);
    this.searchInsurance = this.searchInsurance.bind(this);

    this.state = {
      InsuranceManagement: [],
      currentInsuranceManagement: null,
      currentIndex: -1,
      searchParams: {
        
        insurance_amount: "",

        person_id:""
      }
    }
  }

  componentDidMount() {
    this.retrieveInsuranceManagement();
  }

  deleteInsuranceManagement() {    
    InsuranceManagementDataService.delete(this.state.currentInsuranceManagement.insurance_id)
      .then(() => {
        
        window.location.reload();
      })
      .catch(e => {
        console.log(e);
      });
  }

  onChangeSearchInsuranceManagement(e) {
    const searchInsuranceManagement = e.target.value;
    this.setState({ 
      searchParams: { ...this.state.searchParams, insurance_amount: searchInsuranceManagement} 
    });
    console.log(this.state);
  }

 

  retrieveInsuranceManagement() {
    InsuranceManagementDataService.getAll()
      .then(response => {
        this.setState({
          insurancenManagement: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveInsuranceManagement();
    this.setState({
      currentInsuranceManagement: null,
      currentIndex: -1
    });
  }

  setActiveInsuranceManagement(insuranceManagement, index) {console.log(insuranceManagement);
    this.setState({
      currentInsuranceManagement: insuranceManagement,
      currentIndex: index
    });
  }

  searchInsurance() {
    this.setState({
      currentInsuranceManagement: null,
      currentIndex: -1
    });

    InsuranceManagementDataService.findInsurance(this.state.searchParams)
      .then(response => {
        this.setState({
          insuranceManagement: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { insuranceManagement, currentInsuranceManagement, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Insurance Amount"
              value={this.state.searchParams.insuranceManagement}
              onChange={this.onChangeSearchInsuranceManagement}
            />
            
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchInsurance}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Insurance Management List</h4>

          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Insurance Amount</th>
                
              </tr>
            </thead>
            <tbody>
              {insuranceManagement &&
                insuranceManagement.map((insuranceManagement, index) => (
                  <tr 
                    role="row" 
                    key={insuranceManagement.insurance_id}
                    onClick={() => this.setActiveInsuranceManagement(insuranceManagement, index)}
                  >
                    <td>{insuranceManagement.insurance_amount}</td>
                  
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="col-md-6">
          {currentInsuranceManagement ? ( 
            <div>
              <h4>Insurance Ammount</h4>
              <div>
                <label>
                  <strong>Amount:</strong>
                </label>{" "}
                {currentInsuranceManagement.insurance_id} {currentInsuranceManagement.insurance_amount}
              </div>
             

              <Link
                to={"/insurance-management/" + currentInsuranceManagement.insurance_id}
                className="btn btn-primary btn-block"
              >
                Edit
              </Link>
              <button
                className="btn btn-danger btn-block"
                onClick={this.deleteInsuranceManagement}
              >
                Delete
              </button>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Insurance...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}