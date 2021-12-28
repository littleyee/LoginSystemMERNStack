import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import CheckButton from "react-validation/build/button";

import { vbill_amount } from "../common/bill-validators";

import BillManagementDataService from "../services/bill-management.service";


export default class BillManagement extends Component {
  constructor(props) {
    super(props);
    this.onChangeBillID = this.onChangeBillID.bind(this);
    this.onChangeBillManagement = this.onChangeBillManagement.bind(this);
    

    this.getBillManagement = this.getBillManagement.bind(this);
    this.updateBillManagement = this.updateBillManagement.bind(this);

    this.state = {
      currentBillManagement: {
        bill_id: "",

        bill_amount: "",

        person_id:""
        
      }
    };
  }

  onChangeBillID(e) {
    const bill_id = e.target.value;

    this.setState(function(prevState) {
      return {
        currentBillManagement: {
          ...prevState.currentBillManagement,
          bill_id: bill_id,
          
        }
      };
    });
  }

  onChangeBillManagement(e) {
    const bill_amount = e.target.value;   
    const person_id = e.target.value;

    this.setState(prevState => ({
      currentBillManagement: {
        ...prevState.currentBillManagement,
        bill_amount: bill_amount,
        person_id: person_id
      }
    }));
  }



  

  getBillManagement(bill_id) {
    BillManagementDataService.get(bill_id)
      .then(response => {
        this.setState({
          currentBillManagement: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateBillManagement(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      BillManagementDataService.update(
        this.state.currentBillManagement.bill_id,
        this.state.currentBillManagement
      ).then(
        response => {
          this.props.history.push('/bill-management')
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

 

  render() {
    const { currentBillManagement } = this.state;

    return (
      <div>
        {currentBillManagement ? (
          <div className="edit-form">
            <h4>Edit Bill</h4>
              <Form
                onSubmit={this.updateBillManagement}
                ref={c => {
                  this.form = c;
                }}
              >
                {!this.state.submitted && (
                  <div>
                    <div className="form-group">
                      <label htmlFor="bill_amount">Bill Amount</label>
                      <Input
                        type="text"
                        className="form-control"
                        name="bill_amount"
                        value={currentBillManagement.bill_amount}
                        onChange={this.onChangeBillManagement}
                        validations={[vbill_amount]}
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
            <p>Could not find bill</p>
          </div>
        )}
      </div>
    );
  }
}
