import React, { Component } from "react";
import BillManagementDataService from "../services/bill-management.service";
import { Link } from "react-router-dom";



export default class BillManagementList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchBillManagement = this.onChangeSearchBillManagement.bind(this);
   

    this.deleteBillManagement = this.deleteBillManagement.bind(this);
    this.retrieveBillManagement = this.retrieveBillManagement.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveBillManagement = this.setActiveBillManagement.bind(this);
    this.searchBill = this.searchBill.bind(this);

    this.state = {
      BillManagement: [],
      currentBillManagement: null,
      currentIndex: -1,
      searchParams: {
        
        bill_amount: "",

        person_id:""
      }
    }
  }

  componentDidMount() {
    this.retrieveBillManagement();
  }

  deleteBillManagement() {    
    BillManagementDataService.delete(this.state.currentBillManagement.bill_id)
      .then(() => {
        
        window.location.reload();
      })
      .catch(e => {
        console.log(e);
      });
  }

  onChangeSearchBillManagement(e) {
    const searchBillManagement = e.target.value;
    this.setState({ 
      searchParams: { ...this.state.searchParams, bill_amount: searchBillManagement} 
    });
    console.log(this.state);
  }

 

  retrieveBillManagement() {
    BillManagementDataService.getAll()
      .then(response => {
        this.setState({
          billnManagement: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveBillManagement();
    this.setState({
      currentBillManagement: null,
      currentIndex: -1
    });
  }

  setActiveBillManagement(billManagement, index) {console.log(billManagement);
    this.setState({
      currentBillManagement: billManagement,
      currentIndex: index
    });
  }

  searchBill() {
    this.setState({
      currentBillManagement: null,
      currentIndex: -1
    });

    BillManagementDataService.findBill(this.state.searchParams)
      .then(response => {
        this.setState({
          billManagement: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { billManagement, currentBillManagement, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Bill Amount"
              value={this.state.searchParams.billManagement}
              onChange={this.onChangeSearchBillManagement}
            />
            
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchBill}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Bill Management List</h4>

          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Bill Amount</th>
                
              </tr>
            </thead>
            <tbody>
              {billManagement &&
                billManagement.map((billManagement, index) => (
                  <tr 
                    role="row" 
                    key={billManagement.bill_id}
                    onClick={() => this.setActiveBillManagement(billManagement, index)}
                  >
                    <td>{billManagement.bill_amount}</td>
                  
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="col-md-6">
          {currentBillManagement ? ( 
            <div>
              <h4>Bill Ammount</h4>
              <div>
                <label>
                  <strong>Amount:</strong>
                </label>{" "}
                {currentBillManagement.bill_id} {currentBillManagement.bill_amount}
              </div>
             

              <Link
                to={"/bill-management/" + currentBillManagement.bill_id}
                className="btn btn-primary btn-block"
              >
                Edit
              </Link>
              <button
                className="btn btn-danger btn-block"
                onClick={this.deleteBillManagement}
              >
                Delete
              </button>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Bill...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}